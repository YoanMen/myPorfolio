<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AboutController extends AbstractController
{
    #[Route('/admin/about', name: 'app_admin.about')]
    public function index(): Response
    {
        return $this->render('admin/about/index.html.twig');
    }
}
