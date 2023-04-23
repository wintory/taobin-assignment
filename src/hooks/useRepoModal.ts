import dayjs from 'dayjs';
import { uniqBy } from 'lodash';
import debounce from 'lodash/debounce';
import { useMemo, useState, useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { FavoriteRepo } from '../types/repository';
import useRepository from './useRepository';

interface UseRepoModalProps {
  setFavoriteRepo: (value: FavoriteRepo[]) => void;
  onClose: () => void;
}

const useRepoModal = ({ setFavoriteRepo, onClose }: UseRepoModalProps) => {
  const [favorite, setFavorite] = useState<FavoriteRepo[]>([]);
  const [note, setNote] = useState<string>('');
  const {
    repositories,
    isLoading,
    getRepositoryData,
    page,
    setPage,
    hasNextPage,
  } = useRepository();
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;

  const [loadingRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: isFirstStep && hasNextPage,
    onLoadMore: () => getRepositoryData(page + 1),
    disabled: isLoading || !hasNextPage || !isFirstStep,
    rootMargin: '0px 0px 400px 0px',
  });
  const steps = ['Repositories', 'Confirmation'];
  const showData = useMemo(() => {
    if (isFirstStep) return uniqBy(repositories, v => v.id);

    return favorite;
  }, [activeStep, repositories]);

  const handleSetNote = debounce((v: string) => {
    setNote(v);
  }, 400);

  const handleClose = () => {
    setFavorite([]);
    setPage(0);
    setNote('');
    setActiveStep(0);
    onClose();
  };

  const handleSelectedRepo = (id: number) => {
    const hasData = favorite.find(v => v.id === id);

    if (hasData) {
      const result = favorite.filter(v => v.id !== id);
      setFavorite(result);
    } else {
      const result = repositories.find(v => v.id === id);

      if (result) {
        const { html_url, id, full_name, description } = result;
        const starredDate = dayjs().format('YYYY-MM-DD HH:mm');

        setFavorite([
          ...favorite,
          { html_url, id, full_name, description, starredDate },
        ]);
      }
    }
  };

  const handleClickNext = () => {
    if (isFirstStep) {
      setActiveStep(activeStep + 1);
      return;
    }

    let result = favorite;

    if (note) {
      result = result.map(v => ({ ...v, note }));
    }
    setFavoriteRepo(result);
    handleClose();
  };

  const handleClickBack = () => {
    if (isFirstStep) {
      handleClose();
      return;
    }

    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    getRepositoryData();
  }, []);

  return {
    favorite,
    loadingRef,
    steps,
    showData,
    handleSetNote,
    handleClickBack,
    handleClickNext,
    handleSelectedRepo,
    handleClose,
    isFirstStep,
    activeStep,
    isLoading,
    hasNextPage,
  };
};

export default useRepoModal;
