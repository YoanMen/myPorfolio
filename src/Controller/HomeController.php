<?php

namespace App\Controller;

use App\Repository\AboutRepository;
use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(AboutRepository $aboutRepository, ProjectRepository $projectRepository): Response
    {
        $about = $aboutRepository->findOneBy(['id' => 1]);
        $projects = $projectRepository->findBy(['isVisible' => true]);

        return $this->render('home/index.html.twig', [
            'about' => $about->getContent() ?? '',
            'projects' => $projects,
        ]);
    }
}
