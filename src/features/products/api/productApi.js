import api from '@/api/axios';
import { ENDPOINTS, PRODUCT_LIST_FIELDS } from '@/api/endpoints';

export const getAllProducts = async () => {
  const response = await api.get(ENDPOINTS.PRODUCTS, {
    params: {
      limit: 0,
      select: PRODUCT_LIST_FIELDS,
    },
  });

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get(ENDPOINTS.CATEGORY_LIST);
  return response.data;
};
