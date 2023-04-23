import uniqBy from 'lodash/uniqBy';
import { useState } from 'react';
import { FavoriteRepo } from '../types/repository';

const useFavoriteRepo = () => {
  const [favoriteRepo, setFavoriteRepo] = useState<FavoriteRepo[]>([]);

  const handleAddFavoriteRepo = (repoData: FavoriteRepo[]) => {
    const result = uniqBy([...favoriteRepo, ...repoData], v => v.id);
    setFavoriteRepo(result);
  };

  const handleRemoveFavoriteRepo = (repoIds: number) => {
    const text = 'Are you sure to remove starred item?';

    if (confirm(text) == true) {
      const result = favoriteRepo.filter(val => val.id !== repoIds);
      setFavoriteRepo(result);
    }
  };

  return {
    favoriteRepo,
    setFavoriteRepo,
    handleRemoveFavoriteRepo,
    handleAddFavoriteRepo,
  };
};

export default useFavoriteRepo;
