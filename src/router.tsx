import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home/home';
import { UncontrolledComponentsApproach } from './pages/uncontrolled-components-approach/uncontrolled-components-approach';
import { ReactHookForm } from './pages/react-hook-form/react-hook-form';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/uncontrolled-components-approach',
    element: <UncontrolledComponentsApproach />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookForm />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
