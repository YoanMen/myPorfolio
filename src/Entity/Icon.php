<?php

namespace App\Entity;

use App\Repository\IconRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: IconRepository::class)]
#[UniqueEntity('name', message: 'Une icône avec ce nom existe déjà')]
class Icon
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 60)]
    #[Assert\NotBlank()]
    #[Assert\Length(max: 60, maxMessage: 'Le nom ne doit pas faire plus de 60 caractères')]
    private ?string $name = null;

    #[ORM\Column]
    private ?bool $isTechnology = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank()]
    #[Assert\Length(max: 1500, maxMessage: 'Le code du SVG ne doit pas dépasser 1500 caractères')]
    private ?string $svg = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function isTechnology(): ?bool
    {
        return $this->isTechnology;
    }

    public function setTechnology(bool $isTechnology): static
    {
        $this->isTechnology = $isTechnology;

        return $this;
    }

    public function getSvg(): ?string
    {
        return $this->svg;
    }

    public function setSvg(string $svg): static
    {
        $this->svg = $svg;

        return $this;
    }
}
