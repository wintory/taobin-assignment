import './App.css';
import Home from './pages/Home';
import AppProvider from './AppProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
