import { Box, Button, Icon, styled, Typography } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import Card from '../components/Card';
import PageWrapper from '../components/PageWrapper';
import RepositoryModal from '../containers/RepositoryModal';
import useFavoriteRepo from '../hooks/useFavoriteRepo';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const [isOpenAddRepo, setIsOpenAddRepo] = useState<boolean>(false);
  const { favoriteRepo, handleAddFavoriteRepo, handleRemoveFavoriteRepo } =
    useFavoriteRepo();
  const hasFavoriteRepo = favoriteRepo.length > 0;

  const handleCloseAddRepo = () => {
    setIsOpenAddRepo(false);
  };

  return (
    <PageWrapper>
      <Wrapper>
        <Typography variant="h3">My repos</Typography>
        <Box width="100%" height="100%" mt={5} textAlign="left">
          <AddButton
            onClick={() => setIsOpenAddRepo(!isOpenAddRepo)}
            variant="outlined"
            color="primary"
          >
            <Typography variant="subtitle1">Edit Favorite Repo</Typography>
          </AddButton>
        </Box>
        <Box
          width="100%"
          height="100%"
          display="block"
          alignItems="center"
          justifyContent="center"
          textAlign="left"
          mt={2}
        >
          {hasFavoriteRepo ? (
            favoriteRepo.map(data => {
              return (
                <Fragment key={data.id}>
                  <Card
                    disabled={false}
                    title={data.full_name}
                    description={data.description}
                    icon={
                      <DeleteIcon
                        color="error"
                        fontSize="large"
                        onClick={() => handleRemoveFavoriteRepo(data.id)}
                      />
                    }
                  />
                </Fragment>
              );
            })
          ) : (
            <div>
              <Typography variant="subtitle1">
                No Favorite Repository.
              </Typography>
            </div>
          )}
        </Box>
      </Wrapper>
      <RepositoryModal
        favoriteRepo={favoriteRepo}
        setFavoriteRepo={handleAddFavoriteRepo}
        isOpen={isOpenAddRepo}
        onClose={handleCloseAddRepo}
      />
    </PageWrapper>
  );
};

export default Home;
