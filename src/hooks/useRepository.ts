import { Repository } from './../types/repository';
import { useMemo, useState } from 'react';
import { getRepositories } from '../services/repository';
import { PAGE_LIMIT } from '../constants';
import { useQuery } from '@tanstack/react-query';
const useRepository = () => {
  const [favoriteRepo, setFavoriteRepo] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const { data, refetch } = useQuery(['repositories'], () =>
    getRepositories(page, PAGE_LIMIT)
  );
  const repositories: Repository[] = useMemo(() => data?.items, [data?.items]);

  const handleAddFavoriteRepo = (repoId: number) => {
    setFavoriteRepo([...favoriteRepo, repoId]);
  };

  const handleRemoveFavoriteRepo = (id: number) => {
    const result = favoriteRepo.filter(val => val !== id);
    setFavoriteRepo(result);
  };

  return {
    repositories,
    favoriteRepo,
    page,
    setPage,
    handleAddFavoriteRepo,
    handleRemoveFavoriteRepo,
    getRepositories: refetch,
  };
};

export default useRepository;
