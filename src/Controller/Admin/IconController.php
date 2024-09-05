<?php

namespace App\Controller\Admin;

use App\Entity\Icon;
use App\Repository\IconRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class IconController extends AbstractController
{
    #[Route('/admin/icon', name: 'app_admin.icon')]
    public function index(IconRepository $iconRepository, Request $request): Response
    {
        $page = $request->query->getInt('page', 1);
        $iconsEntities = $iconRepository->paginateIcon($page, 10);
        $maxPage = ceil($iconsEntities->count() / 10);

        $icons = [];

        foreach ($iconsEntities as $icon) {
            $icons[] =
                [
                    'id' => $icon->getId(),
                    'name' => $icon->getName(),
                    'svg' => $icon->getSvg(),
                    'isTechnology' => $icon->isTechnology(),
                ];
        }

        return $this->render('admin/icon/index.html.twig', [
            'icons' => $icons,
            'page' => $page,
            'maxPage' => $maxPage,
        ]);
    }

    #[Route('/admin/icon/create', name: 'app_admin.icon.create')]
    public function create(ValidatorInterface $validator, EntityManagerInterface $entityManager, Request $request): Response|JsonResponse
    {
        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $data = json_decode($request->getContent(), true);

            $csrf = $data['csrf_token'];
            $name = htmlspecialchars(trim($data['name']));
            $svg = strip_tags(trim($data['svg']), '<svg><path><rect>');
            $isTechnology = $data['isTechnology'];

            if ($this->isCsrfTokenValid('create_icon', $csrf)) {
                try {
                    $icon = new Icon();
                    $icon->setName($name);
                    $icon->setSvg($svg);
                    $icon->setTechnology($isTechnology);

                    $errors = $validator->validate($icon);

                    if (count($errors) > 0) {
                        $errorsList = [];

                        foreach ($errors as $error) {
                            $errorsList[] = $error->getMessage();
                        }

                        return $this->json(['success' => false, 'error' => $errorsList], 500);
                    }

                    $entityManager->persist($icon);
                    $entityManager->flush();

                    $this->addFlash(
                        'message',
                        $icon->getName().' a été créée'
                    );

                    return $this->json(['success' => true]);
                } catch (\Throwable $th) {
                    return $this->json(['success' => false, 'error' => 'impossible de sauvegarder les données, une erreur interne est survenue'], 500);
                }
            }

            return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
        }

        return $this->render('admin/icon/create.html.twig', []);
    }

    #[Route('/admin/icon/{id}', methods: ['GET', 'POST'], name: 'app_admin.icon.update')]
    public function update(ValidatorInterface $validator, EntityManagerInterface $entityManager, int $id, Request $request): Response|JsonResponse
    {
        $icon = $entityManager->getRepository(Icon::class)->findOneBy(['id' => $id]);

        if ('POST' == $_SERVER['REQUEST_METHOD']) {
            $data = json_decode($request->getContent(), true);

            $csrf = $data['csrf_token'];
            $name = htmlspecialchars(trim($data['name']));
            $svg = strip_tags(trim($data['svg']), '<svg><path><rect>');
            $isTechnology = $data['isTechnology'];

            if ($this->isCsrfTokenValid('update_icon', $csrf)) {
                try {
                    $icon->setName($name);
                    $icon->setSvg($svg);
                    $icon->setTechnology($isTechnology);

                    $errors = $validator->validate($icon);

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
                        $icon->getName().' a été modifiée'.$errors
                    );

                    return $this->json(['success' => true]);
                } catch (\Throwable $th) {
                    return $this->json(['success' => false, 'error' => 'impossible de sauvegarder les données, une erreur interne est survenue'], 500);
                }
            }

            return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
        }

        return $this->render('admin/icon/update.html.twig', [
            'icon' => [
                'id' => $icon->getId(),
                'name' => $icon->getName(),
                'svg' => $icon->getSvg(),
                'isTechnology' => $icon->isTechnology(),
            ],
        ]);
    }

    #[Route('/admin/icon/{id}', methods: ['DELETE'], name: 'app_admin.icon.delete')]
    public function remove(int $id, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $csrf = $data['csrf_token'];

        if ($this->isCsrfTokenValid('icon_delete', $csrf)) {
            try {
                $icon = $entityManager->getRepository(Icon::class)->findOneBy(['id' => $id]);
                $entityManager->remove($icon);
                $entityManager->flush();

                $this->addFlash(
                    'message',
                    $icon->getName().' a été supprimée'
                );

                return $this->json(['success' => true]);
            } catch (\Throwable $th) {
                return $this->json(['success' => false, 'error' => 'impossible de supprimer les données, une erreur interne est survenue'], 500);
            }
        }

        return $this->json(['success' => false, 'error' => 'La clé CSRF n\'est pas valide'], 401);
    }
}
