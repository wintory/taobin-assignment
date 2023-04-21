import { useCallback, useState } from 'react';
const useRepository = () => {
  const [repositories, setRepositories] = useState();
  const [favoriteRepo, setFavoriteRepo] = useState([]);

  const getRepositories = useCallback(() => {}, []);

  return {};
};

export default useRepository;
