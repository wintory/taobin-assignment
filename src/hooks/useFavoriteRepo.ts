import isNil from 'lodash/isNil';
import { useState } from 'react';
import { FavoriteRepo } from '../types/repository';

const useFavoriteRepo = () => {
  const [favoriteRepo, setFavoriteRepo] = useState<FavoriteRepo[]>([]);

  const handleAddFavoriteRepo = (repoData: FavoriteRepo[]) => {
    setFavoriteRepo([...favoriteRepo, ...repoData]);
  };

  const handleRemoveFavoriteRepo = (repoIds: number[]) => {
    const result = favoriteRepo.filter(val => !repoIds.includes(val.id));
    setFavoriteRepo(result);
  };

  return {
    favoriteRepo,
    setFavoriteRepo,
    handleAddFavoriteRepo,
    handleRemoveFavoriteRepo,
  };
};

export default useFavoriteRepo;
