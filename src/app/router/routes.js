import { lazy } from 'react';
import { ROUTES } from './routeConstants';
import DefaultLayout from '@/layouts/DefaultLayout';

const ProductListing = lazy(
  () => import('@/features/products/pages/ProductListing')
);
const ProductDetail = lazy(
  () => import('@/features/products/pages/ProductDetail')
);

export const routes = [
  {
    path: ROUTES.HOME,
    component: ProductListing,
    layout: DefaultLayout,
  },
  {
    path: ROUTES.PRODUCT_DETAIL,
    component: ProductDetail,
    layout: DefaultLayout,
  },
];
