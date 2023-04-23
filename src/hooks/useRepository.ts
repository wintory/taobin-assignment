import { Repository } from './../types/repository';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRepositories } from '../services/repository';
import { PAGE_LIMIT } from '../constants';
import { uniqBy } from 'lodash';

const useRepository = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState(0);
  const hasNextPage = useMemo(() => page <= maxPage, [page, maxPage]);

  const getRepositoryData = useCallback(async (currentPage?: number) => {
    setIsLoading(true);
    const {
      items = [],
      total_count,
    }: { items: Repository[]; total_count: number } = await getRepositories(
      page,
      PAGE_LIMIT
    );
    const result = uniqBy([...repositories, ...items], data => data.id);
    const max = Math.round(total_count / page);

    if (maxPage !== max) {
      setMaxPage(max);
    }

    if (currentPage) {
      setPage(currentPage);
    }
    setRepositories(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getRepositoryData();
  }, []);

  return {
    repositories,
    setRepositories,
    page,
    getRepositoryData,
    setPage,
    isLoading,
    hasNextPage,
  };
};

export default useRepository;
