<?php

namespace App\Controller;

use App\Repository\IconRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class IconController extends AbstractController
{
    #[Route('/icons', methods: ['GET'], name: 'app_icon')]
    public function index(IconRepository $iconRepository): JsonResponse
    {
        $icons = $iconRepository->findBy(['isTechnology' => false]);

        return $this->json($icons, 200, [], ['groups' => 'icon.link']);
    }
}
