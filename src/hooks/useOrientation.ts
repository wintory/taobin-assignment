import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

type OrientationData = {
  width?: number;
  height?: number;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
};

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationData>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isDesktop: false,
    isTablet: false,
  });
  const theme = useTheme();

  useEffect(() => {
    const handleResizeWindow = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < theme.breakpoints.values.md;
      const isTablet =
        width >= theme.breakpoints.values.md &&
        width < theme.breakpoints.values.lg;
      const isDesktop = width >= theme.breakpoints.values.lg;

      setOrientation({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
      });
    };

    window.addEventListener('resize', handleResizeWindow);
    handleResizeWindow();

    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  return orientation;
};

export default useOrientation;
