<?php

namespace App\Entity;

use App\Repository\IconRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IconRepository::class)]
class Icon
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 60)]
    private ?string $name = null;

    #[ORM\Column]
    private ?bool $isTechnology = null;

    #[ORM\Column(type: Types::TEXT)]
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
