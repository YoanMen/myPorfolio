<?php

namespace App\Service;

use App\Entity\Icon;
use App\Entity\Link;
use App\Entity\Project;
use App\Repository\IconRepository;
use App\Utils\UnwantedTags;
use Doctrine\ORM\EntityManagerInterface;

class ProjectHelperService
{
    public function __construct(private IconRepository $iconRepository, private UnwantedTags $unwantedTags) {}

    /**
     * setLinksAndTechnology.
     *
     * @param array<Link> $links
     * @param array<Icon> $technologies
     */
    public function setLinksAndTechnology(Project $project, array $links, array $technologies, EntityManagerInterface $entityManager): void
    {
        $this->removeLinksFromProject($project, $links);
        $this->removeTechnologiesFromProject($project, $technologies);
        $this->addLinksToProject($project, $links, $entityManager);
        $this->addTechnologiesToProject($project, $technologies);
    }

    /**
     * addLinksToProject.
     *
     * @param array<mixed> $links
     */
    private function addLinksToProject(Project $project, array $links, EntityManagerInterface $entityManager): void
    {
        foreach ($links as $element) {
            $icon = $this->iconRepository->findOneBy(['id' => $element['id']]);
            $url = $this->unwantedTags->strip_unwanted_tags($element['url'], ['iframe', 'script']);

            $link = new Link();
            $link->setUrl($url);
            $link->setIcon($icon);
            $link->setProject($project);

            $project->addLink($link);
        }
    }

    /**
     * removeLinksFromProject.
     *
     * @param array<mixed> $links
     */
    private function removeLinksFromProject(Project $project, array $links): void
    {
        foreach ($project->getLinks() as $oldLink) {
            $project->removeLink($oldLink);
        }
    }

    /**
     * addTechnologiesToProject.
     *
     * @param array<mixed> $technologies
     */
    private function addTechnologiesToProject(Project $project, array $technologies): void
    {
        foreach ($technologies as $technology) {
            $icon = $this->iconRepository->findOneBy(['id' => $technology['id']]);
            $project->addTechnology($icon);
        }
    }

    /**
     * removeTechnologiesFromProject.
     *
     * @param array<mixed> $technologies
     */
    private function removeTechnologiesFromProject(Project $project, array $technologies): void
    {
        foreach ($project->getTechnologies() as $oldTechnology) {
            $project->removeTechnology(technology: $oldTechnology);
        }
    }

    /**
     * setTechnologiesAndLinks.
     *
     * @return array<mixed>
     */
    public function setTechnologiesAndLinks(Project $project): array
    {
        $technologies = [];
        $links = [];

        foreach ($project->getTechnologies() as $technology) {
            $technologies[] = ['id' => $technology->getId()];
        }

        foreach ($project->getLinks() as $link) {
            $links[] = [
                'id' => $link->getIcon()->getId(),
                'url' => $link->getUrl(),
            ];
        }

        return ['technologies' => $technologies, 'links' => $links];
    }
}
