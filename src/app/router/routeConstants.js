export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  NOT_FOUND: '*',
};

export const buildPath = {
  productDetail: (id) => ROUTES.PRODUCT_DETAIL.replace(':id', id),
};
