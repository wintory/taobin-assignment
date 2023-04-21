import { FC, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<>Something went wrong.</>}>
      <Suspense fallback="Loading">{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AppProvider;
