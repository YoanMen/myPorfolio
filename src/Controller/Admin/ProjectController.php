<?php

namespace App\Controller\Admin;

use App\Entity\Link;
use App\Entity\Project;
use App\Repository\IconRepository;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Util\UnwantedTags;

class ProjectController extends AbstractController
{

    private UnwantedTags $unwantedTags;
    public function __construct(private EntityManagerInterface $entityManager, private IconRepository $iconRepository, private ValidatorInterface $validator)
    {
        $this->unwantedTags = new UnwantedTags();
    }

    #[Route('/admin/project', name: 'app_admin.project')]
    public function index(Request $request, ProjectRepository $projectRepository): Response
    {
        $page = $request->query->getInt('page', 1);
        $projectsEntities = $projectRepository->paginateProject($page, 10);
        $maxPage = ceil($projectsEntities->count() / 10);

        $projects = [];

        foreach ($projectsEntities as $project) {
            $projects[] =
                [
                    'id' => $project->getId(),
                    'name' => $project->getName(),
                    'slug' => $project->getSlug(),
                    'isVisible' => $project->isVisible(),
                    'content' => $project->getContent(),
                ];
        }

        return $this->render('admin/project/index.html.twig', [
            'projects' => $projects,
            'page' => $page,
            'maxPage' => $maxPage,
        ]);
    }

    #[Route('/admin/project/create', name: 'app_admin.project.create')]
    public function create(Request $request): Response|JsonResponse
    {
        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $data = json_decode($request->getContent(), true);

            $csrf = $data['csrf_token'];
            $name = htmlspecialchars($data['name']);
            $slug = htmlspecialchars($data['slug']);
            $content = $this->unwantedTags->strip_unwanted_tags($data['content'], ["iframe", "script"]);
            $links = $data['links'];
            $technologies = $data['technologies'];
            $isVisible = $data['isVisible'];

            if ($this->isCsrfTokenValid('create_project', $csrf)) {
                try {
                    $project = new Project();
                    $project->setName($name);
                    $project->setSlug($slug);
                    $project->setContent($content);
                    $project->setVisible($isVisible);

                    $this->addLinksToProject($project, $links);
                    $this->addTechnologiesToProject($project, $technologies);

                    $errors = $this->validator->validate($project);

                    if (count($errors) > 0) {
                        $errorsList = [];

                        foreach ($errors as $error) {
                            $errorsList[] = $error->getMessage();
                        }

                        return $this->json(['success' => false, 'error' => $errorsList], 500);
                    }

                    $this->entityManager->persist($project);
                    $this->entityManager->flush();

                    $this->addFlash(
                        'message',
                        'Le projet ' . $project->getName() . ' a été créée'
                    );

                    return $this->json(['success' => true]);
                } catch (\Throwable $th) {
                    return $this->json(['success' => false, 'error' => 'impossible de sauvegarder les données, une erreur interne est survenue'], 500);
                }
            }

            return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
        }

        return $this->render('admin/project/create.html.twig', []);
    }

    #[Route('/admin/project/{id}', methods: ['GET', 'POST'], name: 'app_admin.project.update')]
    public function update(int $id, Request $request): Response|JsonResponse
    {
        $project = $this->entityManager->getRepository(Project::class)->findOneBy(['id' => $id]);

        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $data = json_decode($request->getContent(), true);

            $csrf = $data['csrf_token'];
            $name = htmlspecialchars($data['name']);
            $slug = htmlspecialchars($data['slug']);
            $content = $this->unwantedTags->strip_unwanted_tags($data['content'], ["iframe", "script"]);

            $links = $data['links'];
            $technologies = $data['technologies'];
            $isVisible = $data['isVisible'];
            $csrf = $data['csrf_token'];

            if ($this->isCsrfTokenValid('update_project', $csrf)) {
                try {
                    $project->setName($name);
                    $project->setSlug($slug);
                    $project->setContent($content);
                    $project->setVisible($isVisible);

                    $this->removeLinksFromProject($project, $links);
                    $this->removeTechnologiesFromProject($project, $technologies);
                    $this->addLinksToProject($project, $links);
                    $this->addTechnologiesToProject($project, $technologies);

                    $errors = $this->validator->validate($project);

                    if (count($errors) > 0) {
                        $errorsList = [];

                        foreach ($errors as $error) {
                            $errorsList[] = $error->getMessage();
                        }

                        return $this->json(['success' => false, 'error' => $errorsList], 500);
                    }

                    $this->entityManager->persist($project);
                    $this->entityManager->flush();

                    $this->addFlash(
                        'message',
                        'Le projet ' . $project->getName() . ' a été modifiée' . $errors
                    );

                    return $this->json(['success' => true]);
                } catch (\Throwable $th) {
                    return $this->json(['success' => false, 'error' => 'impossible de sauvegarder les données, une erreur interne est survenue ' . $th->getMessage()], 500);
                }
            }

            return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
        }

        return $this->render('admin/project/update.html.twig', [
            'project' => [
                'id' => $project->getId(),
                'name' => $project->getName(),
                'slug' => $project->getSlug(),
                'content' => $project->getContent(),
                'isVisible' => $project->isVisible(),
                'technologies' => $this->setTechnologiesAndLinks($project)['technologies'],
                'links' => $this->setTechnologiesAndLinks($project)['links'],
            ],
        ]);
    }

    #[Route('/admin/project/{id}', methods: ['DELETE'], name: 'app_admin.project.delete')]
    public function remove(int $id, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $csrf = $data['csrf_token'];

        if ($this->isCsrfTokenValid('project_delete', $csrf)) {
            try {
                $project = $entityManager->getRepository(Project::class)->findOneBy(['id' => $id]);
                $entityManager->remove($project);
                $entityManager->flush();

                $this->addFlash(
                    'message',
                    'Le projet ' . $project->getName() . ' a été supprimée'
                );

                return $this->json(['success' => true]);
            } catch (\Throwable $th) {
                return $this->json(['success' => false, 'error' => 'impossible de supprimer les données, une erreur interne est survenue'], 500);
            }
        }

        return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
    }

    /**
     * addLinksToProject.
     *
     * @param array<mixed> $links
     */
    private function addLinksToProject(Project $project, array $links): void
    {
        foreach ($links as $element) {
            $icon = $this->iconRepository->findOneBy(['id' => $element['id']]);
            $url = $this->unwantedTags->strip_unwanted_tags($element['url'], ["iframe", "script"]);

            $link = new Link();
            $link->setUrl($url);
            $link->setIcon($icon);
            $link->setProject($project);

            $project->addLink($link);
            $this->entityManager->persist($link);
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
            $keep = false;

            foreach ($links as $link) {
                if ($oldLink->getId() == $link['id']) {
                    $keep = true;
                    break;
                }
            }
            if (!$keep) {
                $project->removeLink($oldLink);
            }
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
            $project->removeTechnology($oldTechnology);
            $keep = false;

            foreach ($technologies as $technology) {
                if ($oldTechnology->getId() == $technology['id']) {
                    $keep = true;
                    break;
                }
            }

            if (!$keep) {
                $project->removeTechnology($oldTechnology);
            }
        }
    }

    /**
     * setTechnologiesAndLinks.
     *
     * @return array<mixed>
     */
    private function setTechnologiesAndLinks(Project $project): array
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
