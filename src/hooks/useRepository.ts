import { Repository } from './../types/repository';
import { useState } from 'react';
import { getRepositories } from '../services/repository';
import { PAGE_LIMIT } from '../constants';

const useRepository = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const getRepositoryData = async (currentPage?: number, limit?: number) => {
    try {
      setIsLoading(true);
      const lim = limit || PAGE_LIMIT;
      const {
        items = [],
        total_count,
      }: { items: Repository[]; total_count: number } = await getRepositories(
        currentPage || page,
        lim
      );
      if (items) {
        const max = Math.round(total_count / lim);

        if (maxPage !== max) {
          setMaxPage(max);
          setHasNextPage(page <= max);
        }

        if (currentPage) {
          setPage(currentPage);
        }
        setRepositories([...repositories, ...items]);
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      setHasNextPage(false);
      alert('Cannot get repository, please close modal and try again');
    }
  };

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
