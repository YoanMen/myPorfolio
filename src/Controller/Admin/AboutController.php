<?php

namespace App\Controller\Admin;

use App\Repository\AboutRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AboutController extends AbstractController
{
    #[Route('/admin/about', methods: ['GET'], name: 'app_admin.about')]
    public function index(AboutRepository $repository): Response
    {
        $about = $repository->findAll();
        return $this->render('admin/about/index.html.twig', ['about' => $about[0]]);
    }

    #[Route('/admin/about', methods: ['POST'], name: 'app_admin.about.save')]
    public function save(): JsonResponse
    {

        return $this->json([]);
    }
}
