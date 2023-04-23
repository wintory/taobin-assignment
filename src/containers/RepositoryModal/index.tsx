import {
  Box,
  Divider,
  Modal,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import { FC, Fragment, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Card from '../../components/Card';
import { Repository } from '../../types/repository';
import useOrientation from '../../hooks/useOrientation';

interface RepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Repository[];
}

export const ModalWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
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
  data = [],
}) => {
  const { isMobile } = useOrientation();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Repositories', 'Confirmation'];

  const handleClickNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalWrapper>
        <Box position="sticky">
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Repositories
          </Typography>
          <CloseIcon
            fontSize="medium"
            onClick={onClose}
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
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box position="relative" height="30rem" overflow="auto">
          <Box
            width="100%"
            height="100%"
            display="grid"
            gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
            gap={2}
          >
            {data.map(({ id, full_name, description }) => (
              <Fragment key={id}>
                <Card
                  title={full_name}
                  description={description}
                  selected={false}
                />
              </Fragment>
            ))}
          </Box>
        </Box>
      </ModalWrapper>
    </Modal>
  );
};

export default RepositoryModal;
