<?php

namespace App\Controller;

use App\DTO\ContactDTO;
use App\Service\MailerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ContactController extends AbstractController
{
    #[Route('/contact', methods: ['POST'], name: 'app_contact')]
    public function index(Request $request, ValidatorInterface $validator, MailerService $mailerService): JsonResponse
    {
        $content = $request->getContent();
        $data = json_decode($content, true);
        $csrf = $data['csrf_token'];

        $sender = new ContactDTO();
        $sender->name = $data['name'];
        $sender->email = $data['email'];
        $sender->message = $data['message'];

        if ($this->isCsrfTokenValid('contact', $csrf)) {
            $errors = $validator->validate($sender);
            if (!count($errors) > 0) {
                try {
                    $mailerService->sendContactEmail($sender);

                    return new JsonResponse(['success' => $mailerService]);
                } catch (\Exception $th) {
                    return new JsonResponse(['success' => false, 'error' => 'Impossible d\'envoyer votre mail, erreur interne'], 500);
                }
            } else {
                return new JsonResponse(['success' => false, 'error' => (string) $errors], 405);
            }
        } else {
            return new JsonResponse(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
        }
    }
}
