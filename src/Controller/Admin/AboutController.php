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

class AboutController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager, private AboutRepository $repository)
    {
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
        $value = strlen(strip_tags($data['content']));
        $csrf = $data['csrf_token'];

        if ($this->isCsrfTokenValid('about', $csrf)) {
            if ($value > 0 && $value < 1000) {
                try {
                    $about = $this->entityManager->getRepository(About::class)->find(['id' => 1]);
                    $about->setContent($data['content']);
                    $this->entityManager->flush();

                    return $this->json(['success' => true]);
                } catch (\Throwable $th) {
                    return $this->json(['success' => false, 'error' => 'impossible de sauvegarder les données, une erreur interne est survenue'], 500);
                }
            }

            return $this->json(['success' => false, 'error' => 'Les données fournies ne sont pas correctes'], 406);
        }

        return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
    }
}
