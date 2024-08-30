<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'about' => "Mon parcours personnel est étroitement lié à ma passion pour la programmation, une passion qui a commencé il y a plusieurs années comme un simple passe-temps. Initialement attiré par la création de jeux vidéo, j'ai découvert Flutter, ce qui m'a incité à apprendre à développer mes propres applications. Après plusieurs années d'apprentissage et de pratique, j'ai décidé de transformer cette passion en profession. C'est ainsi que j'ai entrepris une reconversion vers le métier de développeur Web et mobile. Actuellement, je suis en formation pour obtenir le titre de Développeur Web et Mobile (DWWM), ce qui m'a permis de découvrir de nouveaux horizons et d'acquérir des compétences solides.",
        ]);
    }
}
