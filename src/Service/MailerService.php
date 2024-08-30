<?php

namespace App\Service;

use App\DTO\ContactDTO;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class MailerService
{
    public function __construct(private MailerInterface $mailer)
    {
    }

    public function sendContactEmail(ContactDTO $sender): void
    {
        $mail = (new TemplatedEmail())
          ->to($_ENV['CONTACT_MAIL'])
          ->subject('Message du portfolio par '.$sender->name)
          ->from($_ENV['NOREPLY_MAIL'])
          ->htmlTemplate('email/contact.html.twig')
          ->context(['data' => $sender]);

        $this->mailer->send($mail);
    }
}
