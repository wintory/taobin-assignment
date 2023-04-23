import {
  CardContent,
  Typography,
  Card as MUICard,
  useTheme,
} from '@mui/material';
import { FC } from 'react';

interface CardProps {
  title: string;
  description?: string;
  selected: boolean;
}

const Card: FC<CardProps> = ({ title, description, selected }) => {
  const theme = useTheme();
  return (
    <MUICard
      sx={{
        width: '100%',
        border: '1px solid',
        borderRadius: '1.6rem',
        my: 1,
        border: selected
          ? `1px solid ${theme.palette.background.default}`
          : 'inherit',
      }}
    >
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </MUICard>
  );
};

export default Card;
