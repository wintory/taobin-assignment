import { CircularProgress, GlobalStyles } from '@mui/material';
import { FC, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getGlobalStyle } from './styles/globalStyle';
import theme from './styles/theme';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <>
      <ErrorBoundary fallback={<>Something went wrong.</>}>
        <GlobalStyles styles={getGlobalStyle(theme)} />
        <Suspense fallback={<CircularProgress color="primary" />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default AppProvider;
