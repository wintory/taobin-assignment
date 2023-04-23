import { FavoriteRepo, Repository } from './../types/repository';
import { useState } from 'react';
import { getRepositories } from '../services/repository';
import { PAGE_LIMIT } from '../constants';
import { useQuery } from '@tanstack/react-query';
import uniq from 'lodash/uniq';
import { uniqBy } from 'lodash';

const useRepository = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [page, setPage] = useState<number>(1);
  const { isLoading, refetch } = useQuery(['repositories'], async () => {
    const { items = [] }: { items: Repository[] } = await getRepositories(
      page,
      PAGE_LIMIT
    );
    const result = uniqBy(items, data => data.id);

    setRepositories(result);
  });

  const getMoreRepositoryData = (page: number) => {
    setPage(page);
    refetch();
  };

  return {
    repositories,
    setRepositories,
    page,
    getRepositories: refetch,
    getMoreRepositoryData,
    setPage,
    isLoading,
  };
};

export default useRepository;
