<?php

namespace App\Controller\Admin;

use App\Entity\About;
use App\Repository\AboutRepository;
use App\Service\ValidateEntityService;
use App\Utils\UnwantedTags;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AboutController extends AbstractController
{
    public function __construct(
        private UnwantedTags $unwantedTags,
        private ValidateEntityService $validateEntity,
        private EntityManagerInterface $entityManager,
        private AboutRepository $repository,
    ) {
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
        $content = $this->unwantedTags->strip_unwanted_tags($data['content'], ['iframe', 'script']);

        $csrf = $data['csrf_token'];

        if ($this->isCsrfTokenValid('about', $csrf)) {
            try {
                $about = $this->entityManager->getRepository(About::class)->find(['id' => 1]);
                $about->setContent($content);

                $errors = $this->validateEntity->validate($about);

                if ($errors) {
                    return $this->json(['success' => false, 'error' => $errors], 500);
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
