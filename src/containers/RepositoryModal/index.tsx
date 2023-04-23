import {
  Box,
  Button,
  CircularProgress,
  Input,
  Modal,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import { FC, Fragment } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Card from '../../components/Card';
import isNil from 'lodash/isNil';
import useOrientation from '../../hooks/useOrientation';
import { FavoriteRepo } from '../../types/repository';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import useRepoModal from '../../hooks/useRepoModal';

interface RepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteRepo?: FavoriteRepo[];
  setFavoriteRepo: (value: FavoriteRepo[]) => void;
}

export const ModalWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  maxWidth: '80vw',
  maxHeight: '80vh',
  boxSizing: 'border-box',
  overflow: 'auto',
  backgroundColor: theme.palette.common.white,
  borderRadius: '1.6rem',
  padding: '1.6rem',
}));

const RepositoryModal: FC<RepositoryModalProps> = ({
  isOpen,
  onClose,
  favoriteRepo = [],
  setFavoriteRepo,
}) => {
  const { isMobile } = useOrientation();
  const {
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
  } = useRepoModal({ onClose, setFavoriteRepo });

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalWrapper>
        <Box position="relative" height="10rem">
          <Typography id="modal-modal-title" variant="h4" mb={2}>
            Repositories
          </Typography>
          <CloseIcon
            fontSize="medium"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: '1.2rem',
              top: '1.2rem',
              cursor: 'pointer',
            }}
          />
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="h5">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          position="relative"
          overflow="auto"
          height="calc(100% - 14rem)"
          px="0.8rem"
        >
          {!isFirstStep && (
            <Box
              color="error.main"
              border="1px solid"
              borderRadius="1.6rem"
              px="0.8rem"
              my={2}
            >
              <Typography id="modal-modal-title" variant="h5" my={2}>
                <b> Please Confirm your favorite items</b>
              </Typography>
            </Box>
          )}
          <Box
            width="100%"
            display="grid"
            gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
            gap={isMobile ? 0 : 2}
          >
            {showData ? (
              showData.map(data => {
                const hasFavorited = !isNil(
                  favoriteRepo.find(v => v.id === data.id)
                );
                const isSelected = !isNil(favorite.find(v => v.id === data.id));
                return (
                  <Fragment key={data.id}>
                    <Card
                      handleSelected={() => handleSelectedRepo(data.id)}
                      title={data.full_name}
                      description={data.description}
                      selected={isSelected}
                      disabled={hasFavorited}
                      icon={
                        isSelected ? (
                          <StarIcon fontSize="medium" color="warning" />
                        ) : (
                          <StarOutlineIcon fontSize="medium" />
                        )
                      }
                    />
                  </Fragment>
                );
              })
            ) : (
              <Typography variant="h5">No data</Typography>
            )}
          </Box>
          {isFirstStep && (isLoading || hasNextPage) && (
            <Box
              ref={loadingRef}
              display="flex"
              justifyContent="center"
              width="100%"
              py={6}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
        </Box>
        <Box
          position="relative"
          height="4rem"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          {!isFirstStep && !isMobile && (
            <Input
              inputProps={{ maxLength: 255 }}
              sx={{ width: '100%', fontSize: '1.8rem' }}
              placeholder="Add note for starred repository"
              onChange={e => handleSetNote(e.target.value)}
            />
          )}
          <Button variant="text" color="primary" onClick={handleClickBack}>
            <Typography variant="h5">
              {isFirstStep ? 'Cancel' : 'Back'}
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={favorite.length <= 0}
            onClick={handleClickNext}
          >
            <Typography variant="h5">
              {isFirstStep ? 'Next' : 'Confirm'}
            </Typography>
          </Button>
        </Box>
      </ModalWrapper>
    </Modal>
  );
};

export default RepositoryModal;
