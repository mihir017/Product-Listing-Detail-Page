import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import RouteWrapper from './RouteWrapper';
import NotFound from '@/shared/components/NotFound';

const router = createBrowserRouter([
  ...routes.map(({ component: Component, layout: Layout, ...route }) => ({
    ...route,
    element: <RouteWrapper Component={Component} Layout={Layout} />,
  })),
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
