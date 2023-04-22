import { FavoriteRepo } from './../types/repository';
import { useState } from 'react';
import { getRepositories } from '../services/repository';
import { PAGE_LIMIT } from '../constants';
import { useQuery } from '@tanstack/react-query';

const useRepository = () => {
  const [favoriteRepo, setFavoriteRepo] = useState<FavoriteRepo[]>([]);
  const [isOpenAddRepo, setIsOpenAddRepo] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { isLoading, refetch } = useQuery(['repositories'], async () => {
    const { items = [] } = await getRepositories(page, PAGE_LIMIT);

    setRepositories([...repositories, ...items]);
  });

  const handleAddFavoriteRepo = (repoData: FavoriteRepo[]) => {
    setFavoriteRepo([...favoriteRepo, ...repoData]);
  };

  const handleRemoveFavoriteRepo = (repoIds: number[]) => {
    const result = favoriteRepo.filter(val => !repoIds.includes(val.id));
    setFavoriteRepo(result);
  };

  const handleCloseAddRepo = () => {
    setIsOpenAddRepo(false);
    setRepositories([]);
  };

  const getMoreRepositoryData = (page: number) => {
    setPage(page);
    refetch();
  };

  return {
    repositories,
    favoriteRepo,
    page,
    getRepositories: refetch,
    getMoreRepositoryData,
    setPage,
    isLoading,
    handleAddFavoriteRepo,
    handleRemoveFavoriteRepo,
    handleCloseAddRepo,
    isOpenAddRepo,
    setIsOpenAddRepo,
  };
};

export default useRepository;
