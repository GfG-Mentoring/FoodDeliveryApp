import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Login } from './pages/login';
import Dashboard from './pages/Dashboard';
import { Restaurant } from './pages/Restaurant';
import { FoodCatalogue } from './pages/FoodCatalogue';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './types';

function App() {
  const authData = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authData.isLoggedIn && window.location.pathname !== '/login') {
      // using window api here to change location
      // because navigate api cannot be used outside router Provider.
      window.location.replace('/login');
    }
  }, [authData]);

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Dashboard />,
      children: [
        {
          path: '/',
          element: <Restaurant />,
        },
        {
          path: '/restaurant/:id',
          element: <FoodCatalogue />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
