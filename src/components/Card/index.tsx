import {
  CardContent,
  Typography,
  Card as MUICard,
  useTheme,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { FC } from 'react';

interface CardProps {
  title: string;
  description?: string;
  selected?: boolean;
  handleSelected?: () => void;
}

const Card: FC<CardProps> = ({
  title,
  description,
  selected = false,
  handleSelected,
}) => {
  const theme = useTheme();
  return (
    <MUICard
      sx={{
        position: 'relative',
        width: '100%',
        border: `1px solid ${
          selected ? theme.palette.primary.main : theme.palette.grey[400]
        }`,
        backgroundColor: selected
          ? theme.palette.grey[100]
          : theme.palette.common.white,
        boxShadow: 'none',
        borderRadius: '1.6rem',
        my: 1,
        cursor: 'pointer',
      }}
      onClick={handleSelected && handleSelected}
    >
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
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
      <Box position="absolute" top="1.6rem" right="1.6rem">
        {selected ? (
          <StarIcon fontSize="medium" color="warning" />
        ) : (
          <StarOutlineIcon fontSize="medium" />
        )}
      </Box>
    </MUICard>
  );
};

export default Card;
