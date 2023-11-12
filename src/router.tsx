import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import NotFoundPage from './pages/not-found-page/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:id',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
