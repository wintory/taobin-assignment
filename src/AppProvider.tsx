import { CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary fallback={<>Something went wrong.</>}>
      <Suspense fallback={<CircularProgress color="primary" />}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppProvider;
