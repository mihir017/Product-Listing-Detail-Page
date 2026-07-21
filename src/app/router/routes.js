import { lazy } from 'react';
import { ROUTES } from './routeConstants';
import DefaultLayout from '@/layouts/DefaultLayout';

const ProductListing = lazy(
  () => import('@/features/products/pages/ProductListing')
);
const ProductDetailPage = lazy(
  () => import('@/features/products/pages/ProductDetailPage')
);

export const routes = [
  {
    path: ROUTES.HOME,
    component: ProductListing,
    layout: DefaultLayout,
  },
  {
    path: ROUTES.PRODUCT_DETAIL,
    component: ProductDetailPage,
    layout: DefaultLayout,
  },
];
