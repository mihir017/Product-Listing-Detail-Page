export const ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORY_LIST: '/products/category-list',
};

export const PRODUCT_LIST_FIELDS = [
  'id',
  'title',
  'price',
  'discountPercentage',
  'rating',
  'thumbnail',
  'category',
  'brand',
  'stock',
  'reviews',
].join(',');
