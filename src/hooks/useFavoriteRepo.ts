import debounce from 'lodash/debounce';
import uniqBy from 'lodash/uniqBy';
import { useMemo, useState } from 'react';
import { FavoriteRepo } from '../types/repository';

const useFavoriteRepo = () => {
  const [favoriteRepo, setFavoriteRepo] = useState<FavoriteRepo[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const resultSearchRepo = useMemo(
    () =>
      favoriteRepo.filter(v => {
        if (searchText) {
          return (
            v.full_name.includes(searchText) ||
            v.description.includes(searchText) ||
            v.starredDate.includes(searchText) ||
            (v.note && v.note.includes(searchText))
          );
        }

        return true;
      }),
    [searchText, favoriteRepo]
  );

  const handleSearch = debounce((text: string) => {
    setSearchText(text);
  }, 400);

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
    handleSearch,
    resultSearchRepo,
  };
};

export default useFavoriteRepo;
