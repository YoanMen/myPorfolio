<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class IconController extends AbstractController
{
    #[Route('/admin/icon', name: 'app_admin.icon')]
    public function index(): Response
    {
        return $this->render('admin/icon/index.html.twig', [
            'icons' => [
                [
                    'id' => 1,
                    'name' => 'name01',
                    'svg' => '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 15h1.5V9H5v1.5h1zm2.5 0H13V9H8.5zm1.5-1.5v-3h1.5v3zm3.925 1.5h1.5v-2.25l1.75 2.25H19l-2.325-3L19 9h-1.825l-1.75 2.25V9h-1.5zM3 21V3h18v18zm2-2h14V5H5zm0 0V5z"/></svg>',
                    'test' => 'test'
                ],
                [
                    'name' => 'name02',
                    'svg' => 'svg02',
                    'id' => 2
                ]
            ],
        ]);
    }

    #[Route('/admin/icon/create', name: 'app_admin.icon.new')]
    public function create(): Response
    {
        return $this->render('admin/icon/create.html.twig', []);
    }

    #[Route('/admin/icon/{id}', name: 'app_admin.icon.edit')]
    public function edit(): Response
    {
        return $this->render('admin/icon/edit.html.twig', [
            'icon' => [
                [
                    'id' => 1,
                    'name' => 'name01',
                    'svg' => '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 15h1.5V9H5v1.5h1zm2.5 0H13V9H8.5zm1.5-1.5v-3h1.5v3zm3.925 1.5h1.5v-2.25l1.75 2.25H19l-2.325-3L19 9h-1.825l-1.75 2.25V9h-1.5zM3 21V3h18v18zm2-2h14V5H5zm0 0V5z"/></svg>',
                    'test' => 'test'
                ]
            ],
        ]);
    }

    #[Route('/admin/icon/{id}', methods: ['POST'], name: 'app_admin.icon.delete')]
    public function remove(): JsonResponse
    {
        return $this->json(['success' => true]);
    }
}
