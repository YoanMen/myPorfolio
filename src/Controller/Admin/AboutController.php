<?php

namespace App\Controller\Admin;

use App\Entity\About;
use App\Repository\AboutRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Util\UnwantedTags;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class AboutController extends AbstractController
{
    private UnwantedTags $unwantedTags;
    public function __construct(private EntityManagerInterface $entityManager, private AboutRepository $repository, private ValidatorInterface $validator)
    {
        $this->unwantedTags = new UnwantedTags();
    }

    #[Route('/admin/about', methods: ['GET'], name: 'app_admin.about')]
    public function index(): Response
    {
        $about = $this->repository->findOneBy(['id' => 1]);

        return $this->render('admin/about/index.html.twig', ['about' => $about]);
    }

    #[Route('/admin/about', methods: ['POST'], name: 'app_admin.about.save')]
    public function save(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $content = $this->unwantedTags->strip_unwanted_tags($data['content'], ["iframe", "script"]);

        $csrf = $data['csrf_token'];

        if ($this->isCsrfTokenValid('about', $csrf)) {
            try {
                $about = $this->entityManager->getRepository(About::class)->find(['id' => 1]);
                $about->setContent($content);

                $errors = $this->validator->validate($about);

                if (count($errors) > 0) {
                    $errorsList = [];

                    foreach ($errors as $error) {
                        $errorsList[] = $error->getMessage();
                    }

                    return $this->json(['success' => false, 'error' => $errorsList], 500);
                }


                $this->entityManager->flush();

                return $this->json(['success' => true]);
            } catch (\Throwable $th) {
                return $this->json(['success' => false, 'error' => 'impossible de sauvegarder les données, une erreur interne est survenue'], 500);
            }
        }

        return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
    }
}
