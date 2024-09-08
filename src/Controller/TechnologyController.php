<?php

namespace App\Controller;

use App\Repository\IconRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class TechnologyController extends AbstractController
{
    #[Route('/technology', methods: ['GET'], name: 'app_technology')]
    public function index(IconRepository $iconRepository): JsonResponse
    {
        $technologies = $iconRepository->findBy(['isTechnology' => true]);

        return $this->json($technologies, 200, [], ['groups' => 'icon.read']);
    }
}
