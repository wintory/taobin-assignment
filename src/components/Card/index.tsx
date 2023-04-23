import {
  CardContent,
  Typography,
  Card as MUICard,
  useTheme,
  Box,
} from '@mui/material';
import { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  selected?: boolean;
  handleSelected?: () => void;
  disabled: boolean;
  icon?: ReactNode;
}

const Card: FC<CardProps> = ({
  title,
  description,
  selected = false,
  handleSelected,
  disabled,
  icon,
}) => {
  const theme = useTheme();
  const isSelected = selected && !disabled;

  const handleClick = () => {
    if (!disabled && handleSelected) {
      handleSelected();
    }
  };

  return (
    <MUICard
      sx={{
        position: 'relative',
        width: '100%',
        border: `1px solid ${
          isSelected ? theme.palette.primary.main : theme.palette.grey[400]
        }`,
        backgroundColor: isSelected
          ? theme.palette.grey[100]
          : theme.palette.common.white,
        boxShadow: 'none',
        borderRadius: '1.6rem',
        my: 1,
        cursor: disabled ? 'initial' : 'pointer',
        opacity: disabled ? '0.5' : '1',
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography
          variant="h5"
          color="text.secondary"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          gutterBottom
        >
          <b>{title}</b>
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          <b>description:</b> {description || '-'}
        </Typography>
      </CardContent>
      {icon && (
        <Box position="absolute" top="1.6rem" right="1.6rem">
          {icon}
        </Box>
      )}
    </MUICard>
  );
};

export default Card;
