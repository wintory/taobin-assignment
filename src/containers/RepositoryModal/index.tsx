import {
  Box,
  Button,
  Modal,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Card from '../../components/Card';
import isNil from 'lodash/isNil';
import useOrientation from '../../hooks/useOrientation';
import useRepository from '../../hooks/useRepository';
import { FavoriteRepo } from '../../types/repository';

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
  favoriteRepo,
  setFavoriteRepo,
}) => {
  const [favorite, setFavorite] = useState<FavoriteRepo[]>([]);
  const { isMobile } = useOrientation();
  const { repositories } = useRepository();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Choose Favorite Repositories', 'Confirmation'];
  const isFirstStep = activeStep === 0;
  const showData = useMemo(
    () => (isFirstStep ? repositories : favorite),
    [activeStep, repositories]
  );

  const handleClose = () => {
    setFavorite([]);
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
      if (result) setFavorite([...favorite, result]);
    }
  };

  const handleClickNext = () => {
    if (isFirstStep) {
      setActiveStep(activeStep + 1);
      return;
    }

    setFavoriteRepo(favorite);
    handleClose();
  };

  const handleClickBack = () => {
    if (isFirstStep) {
      handleClose();
      return;
    }

    setActiveStep(activeStep - 1);
  };

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
            gap={2}
          >
            {showData ? (
              showData.map(data => (
                <Fragment key={data.id}>
                  <Card
                    handleSelected={() => handleSelectedRepo(data.id)}
                    title={data.full_name}
                    description={data.description}
                    selected={!isNil(favorite.find(v => v.id === data.id))}
                  />
                </Fragment>
              ))
            ) : (
              <Typography variant="h5">No data</Typography>
            )}
          </Box>
        </Box>
        <Box
          position="relative"
          height="4rem"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
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
