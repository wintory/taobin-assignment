import {
  Box,
  Modal,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface RepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '60rem',
  maxHeight: '60rem',
  boxSizing: 'border-box',
  overflowY: 'auto',
  backgroundColor: theme.palette.common.white,
  borderRadius: '1.6rem',
  padding: '1.6rem',
}));

const RepositoryModal: FC<RepositoryModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Repositories', 'Confirmation'];

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalWrapper>
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
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </ModalWrapper>
    </Modal>
  );
};

export default RepositoryModal;
