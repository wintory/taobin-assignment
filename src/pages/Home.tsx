import { FC } from 'react';
import useRepository from '../hooks/useRepository';

const Home: FC = () => {
  const { repositories, favoriteRepo } = useRepository();

  return null;
};

export default Home;
