<?php

namespace App\Tests;

use App\DTO\ContactDTO;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;


class ContactTest extends KernelTestCase
{

    public function testContactWithIncorrectData(): void
    {
        self::bootKernel();
        $container = $this->getContainer();

        $contact = new ContactDTO();
        $contact->name = '';
        $contact->email = '';
        $contact->message = '';

        $errors = $container->get('validator')->validate($contact);
        $this->assertCount(4, $errors);
    }

    public function testContactWithCorrectData(): void
    {
        self::bootKernel();
        $container = $this->getContainer();

        $contact = new ContactDTO();
        $contact->name = 'Patrick';
        $contact->email = 'Patrick@test.com';
        $contact->message = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur harum, quisquam,
        cumque laboriosam minus placeat iure eos animi expedita dolorum tempora adipisci. Ut reprehenderit voluptate
        maiores! Libero facere sint quos.';

        $errors = $container->get('validator')->validate($contact);

        $this->assertCount(0, $errors);
    }
}
