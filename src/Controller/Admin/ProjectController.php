<?php

namespace App\Controller\Admin;

use App\Entity\Project;
use App\Repository\ProjectRepository;
use App\Service\ProjectHelperService;
use App\Service\ValidateEntityService;
use App\Utils\UnwantedTags;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProjectController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ValidateEntityService $validateEntity,
        private ProjectHelperService $projectHelper,
        private UnwantedTags $unwantedTags,
    ) {}

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
            $content = $this->unwantedTags->strip_unwanted_tags($data['content'], ['iframe', 'script']);
            $links = $data['links'];
            $technologies = $data['technologies'];
            $isVisible = $data['isVisible'];

            if ($this->isCsrfTokenValid('create_project', $csrf)) {
                try {
                    $project = new Project();
                    $project->setName($name)
                        ->setSlug($slug)
                        ->setContent($content)
                        ->setVisible($isVisible);

                    $this->projectHelper->setLinksAndTechnology($project, $links, $technologies, $this->entityManager);
                    $errors = $this->validateEntity->validate($project);

                    if ($errors) {
                        return $this->json(['success' => false, 'error' => $errors], 500);
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
            $content = $this->unwantedTags->strip_unwanted_tags($data['content'], ['iframe', 'script']);

            $links = $data['links'];
            $technologies = $data['technologies'];
            $isVisible = $data['isVisible'];
            $csrf = $data['csrf_token'];

            if ($this->isCsrfTokenValid('update_project', $csrf)) {
                try {
                    $project->setName($name)
                        ->setSlug($slug)
                        ->setContent($content)
                        ->setVisible($isVisible);

                    $this->projectHelper->setLinksAndTechnology($project, $links, $technologies, $this->entityManager);

                    $errors = $this->validateEntity->validate($project);

                    if ($errors) {
                        return $this->json(['success' => false, 'error' => $errors], 500);
                    }

                    $this->entityManager->persist($project);
                    $this->entityManager->flush();

                    $this->addFlash(
                        'message',
                        'Le projet ' . $project->getName() . ' a été modifiée'
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
                'technologies' => $this->projectHelper->setTechnologiesAndLinks($project)['technologies'],
                'links' => $this->projectHelper->setTechnologiesAndLinks($project)['links'],
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
}
