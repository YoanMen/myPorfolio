<?php

namespace App\Controller\Admin;

use App\Entity\Project;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectController extends AbstractController
{
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
                ];
        }


        return $this->render('admin/project/index.html.twig', [
            'projects' => $projects,
            'page' => $page,
            'maxPage' => $maxPage,
        ]);
    }

    #[Route('/admin/project/create', name: 'app_admin.project.create')]
    public function create(ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response|JsonResponse
    {
        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $data = json_decode($request->getContent(), true);

            $csrf = $data['csrf_token'];


            if ($this->isCsrfTokenValid('create_project', $csrf)) {
                try {
                    $project = new Project();

                    $errors = $validator->validate($project);

                    if (count($errors) > 0) {
                        $errorsList = [];

                        foreach ($errors as $error) {
                            $errorsList[] = $error->getMessage();
                        }

                        return $this->json(['success' => false, 'error' => $errorsList], 500);
                    }

                    $entityManager->persist($project);
                    $entityManager->flush();

                    $this->addFlash(
                        'message',
                        $project->getName() . ' a été créée'
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
    public function update(ValidatorInterface $validator, EntityManagerInterface $entityManager, int $id, Request $request): Response|JsonResponse
    {
        $project = $entityManager->getRepository(Project::class)->findOneBy(['id' => $id]);

        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $data = json_decode($request->getContent(), true);

            $csrf = $data['csrf_token'];


            if ($this->isCsrfTokenValid('update_project', $csrf)) {
                try {


                    $errors = $validator->validate($project);

                    if (count($errors) > 0) {
                        $errorsList = [];

                        foreach ($errors as $error) {
                            $errorsList[] = $error->getMessage();
                        }

                        return $this->json(['success' => false, 'error' => $errorsList], 500);
                    }

                    $entityManager->flush();

                    $this->addFlash(
                        'message',
                        $project->getName() . ' a été modifiée' . $errors
                    );

                    return $this->json(['success' => true]);
                } catch (\Throwable $th) {
                    return $this->json(['success' => false, 'error' => 'impossible de sauvegarder les données, une erreur interne est survenue'], 500);
                }
            }

            return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
        }

        return $this->render('admin/icon/update.html.twig', [
            'project' => [
                'id' => $project->getId(),
                'name' => $project->getName(),
            ],
        ]);
    }

    #[Route('/admin/project/{id}', methods: ['DELETE'], name: 'app_admin.project.delete')]
    public function remove(int $id, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $csrf = $data['csrf_token'];

        if ($this->isCsrfTokenValid('icon_delete', $csrf)) {
            try {
                $project = $entityManager->getRepository(Project::class)->findOneBy(['id' => $id]);
                $entityManager->remove($project);
                $entityManager->flush();

                $this->addFlash(
                    'message',
                    $project->getName() . ' a été supprimée'
                );

                return $this->json(['success' => true]);
            } catch (\Throwable $th) {
                return $this->json(['success' => false, 'error' => 'impossible de supprimer les données, une erreur interne est survenue'], 500);
            }
        }

        return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
    }
}
