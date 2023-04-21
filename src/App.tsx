import './App.css';
import AppProvider from './AppProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/Home'));
const PageNotFoundPage = lazy(() => import('./pages/PageNotFound'));

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
