import { Box, Button, Input, styled, Typography } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import Card from '../components/Card';
import PageWrapper from '../components/PageWrapper';
import RepositoryModal from '../containers/RepositoryModal';
import useFavoriteRepo from '../hooks/useFavoriteRepo';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import GithubHeader from 'assets/images/github-header-image.png';
import AddIcon from '@mui/icons-material/Add';

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
  const {
    favoriteRepo,
    handleAddFavoriteRepo,
    handleRemoveFavoriteRepo,
    resultSearchRepo,
    handleSearch,
  } = useFavoriteRepo();
  const hasFavoriteRepo = favoriteRepo.length > 0;

  const handleCloseAddRepo = () => {
    setIsOpenAddRepo(false);
  };

  return (
    <PageWrapper>
      <Wrapper>
        <img alt="header" src={GithubHeader} width="100%" />
        <Box width="100%" height="100%" mt={5} textAlign="right">
          <AddButton
            onClick={() => setIsOpenAddRepo(!isOpenAddRepo)}
            variant="outlined"
            color="primary"
          >
            <AddIcon fontSize="large" />
            <Typography ml={1} p={1} variant="h5">
              Add more repos
            </Typography>
          </AddButton>
          {hasFavoriteRepo && (
            <Box width="100%" pt={2}>
              <Input
                inputProps={{ maxLength: 255 }}
                startAdornment={
                  <SearchIcon fontSize="large" sx={{ mr: '0.8rem' }} />
                }
                sx={{ width: '100%', fontSize: '1.8rem' }}
                placeholder="Search by name, description, date and note"
                onChange={e => handleSearch(e.target.value)}
              />
            </Box>
          )}
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
          {!hasFavoriteRepo && (
            <Box
              justifyContent="center"
              height="30rem"
              display="flex"
              alignItems="center"
            >
              <Typography variant="h4">No Favorite Repository.</Typography>
            </Box>
          )}
          {hasFavoriteRepo && (
            <>
              {resultSearchRepo.length > 0 ? (
                resultSearchRepo.map(data => {
                  return (
                    <Fragment key={data.id}>
                      <Card
                        link={data.html_url}
                        date={data.starredDate}
                        disabled={false}
                        title={data.full_name}
                        description={data.description}
                        note={data.note}
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
                <Box
                  justifyContent="center"
                  height="30rem"
                  display="flex"
                  alignItems="center"
                >
                  <Typography variant="h4">No search result.</Typography>
                </Box>
              )}
            </>
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
