import './App.css';
import AppProvider from './AppProvider';
import { Route, HashRouter, Routes } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/Home'));
const PageNotFoundPage = lazy(() => import('./pages/PageNotFound'));

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<PageNotFoundPage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
