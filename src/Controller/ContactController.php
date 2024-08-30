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

        $sender = new ContactDTO();
        $sender->name = $data['name'];
        $sender->email = $data['email'];
        $sender->message = $data['message'];

        $errors = $validator->validate($sender);
        if (!count($errors) > 0) {
            try {
                $mailerService->sendContactEmail($sender);

                return new JsonResponse(['success' => $mailerService], 200);
            } catch (\Exception $e) {
                return new JsonResponse(['success' => false, 'error' => 'Cant sent your mail internal error'], 500);
            }
        } else {
            return new JsonResponse(['success' => false, 'error' => (string) $errors], 405);
        }
    }
}
