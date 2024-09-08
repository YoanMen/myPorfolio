<?php

namespace App\Controller;

use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProjectController extends AbstractController
{
    #[Route('/projets/{slug}', name: 'app_project.show')]
    public function index(string $slug, ProjectRepository $projectRepository): Response
    {
        if ($this->isGranted('ROLE_USER')) {
            $project = $projectRepository->findOneBy(['slug' => $slug]);

            return $this->render('project/index.html.twig', [
                'project' => $project,
            ]);
        }

        $project = $projectRepository->findOneBy(['slug' => $slug, 'isVisible' => true]);

        if (!$project) {
            $this->addFlash('message', "Cette page n'existe pas");

            return $this->redirectToRoute('app_home');
        }

        return $this->render('project/index.html.twig', [
            'project' => $project,
        ]);
    }
}
