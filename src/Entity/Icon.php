<?php

namespace App\Entity;

use App\Repository\IconRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: IconRepository::class)]
#[UniqueEntity('name', message: 'Une icône avec ce nom existe déjà')]
class Icon
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('icon.read')]
    private ?int $id = null;

    #[ORM\Column(length: 60)]
    #[Assert\NotBlank()]
    #[Assert\Length(max: 60, maxMessage: 'Le nom ne doit pas faire plus de 60 caractères')]
    #[Groups('icon.read')]
    private ?string $name = null;

    #[ORM\Column]
    private ?bool $isTechnology = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank()]
    #[Assert\Length(max: 3000, maxMessage: 'Le code du SVG ne doit pas dépasser 1500 caractères')]
    #[Groups('icon.read')]
    private ?string $svg = null;

    /**
     * @var Collection<int, Link>
     */
    #[ORM\OneToMany(targetEntity: Link::class, mappedBy: 'icon')]
    private Collection $links;

    public function __construct()
    {
        $this->links = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Link>
     */
    public function getLinks(): Collection
    {
        return $this->links;
    }

    public function addLink(Link $link): static
    {
        if (!$this->links->contains($link)) {
            $this->links->add($link);
            $link->setIcon($this);
        }

        return $this;
    }

    public function removeLink(Link $link): static
    {
        if ($this->links->removeElement($link)) {
            // set the owning side to null (unless already changed)
            if ($link->getIcon() === $this) {
                $link->setIcon(null);
            }
        }

        return $this;
    }
}
