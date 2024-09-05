<?php

namespace App\Repository;

use App\Entity\Icon;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Icon>
 */
class IconRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Icon::class);
    }

    /**
     * paginateIcon.
     *
     * @return Paginator<Icon>
     */
    public function paginateIcon(int $page, int $limit): Paginator
    {
        return new Paginator($this
            ->createQueryBuilder('i')
            ->setFirstResult(($page - 1) * $limit)
            ->setMaxResults($limit)
            ->getQuery()
            ->setHint(Paginator::HINT_ENABLE_DISTINCT, false), false);
    }
}
