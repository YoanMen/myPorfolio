<?php

namespace App\Service;

use Symfony\Component\Validator\Validator\ValidatorInterface;

class ValidateEntityService
{
    public function __construct(private ValidatorInterface $validator)
    {
    }

    public function validate(mixed $entity): mixed
    {
        $errors = $this->validator->validate(value: $entity);

        if (count($errors) > 0) {
            $errorsList = [];

            foreach ($errors as $error) {
                $errorsList[] = $error->getMessage();
            }

            return $errorsList;
        }

        return null;
    }
}
