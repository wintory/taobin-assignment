import { Box, Button, styled, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import RepositoryModal from '../containers/RepositoryModal';
import useRepository from '../hooks/useRepository';

const Wrapper = styled(Box)(() => ({
  display: 'block',
  padding: '1.6rem',
}));

const AddButton = styled(Button)(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const Home: FC = () => {
  const { repositories, isOpenAddRepo, favoriteRepo, setIsOpenAddRepo } =
    useRepository();
  const hasFavoriteRepo = useMemo(
    () => favoriteRepo.length > 0,
    [favoriteRepo.length]
  );

  return (
    <PageWrapper>
      <Wrapper>
        <Typography variant="h5">My repos</Typography>
        <Box width="100%" height="100%" mt={5} textAlign="left">
          <AddButton
            onClick={() => setIsOpenAddRepo(!isOpenAddRepo)}
            variant="outlined"
            color="primary"
          >
            Add Repo
          </AddButton>
        </Box>
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={2}
        >
          {hasFavoriteRepo ? <div /> : <div>No Favorite Repository.</div>}
        </Box>
      </Wrapper>
      <RepositoryModal
        isOpen={isOpenAddRepo}
        onClose={() => setIsOpenAddRepo(false)}
      />
    </PageWrapper>
  );
};

export default Home;
