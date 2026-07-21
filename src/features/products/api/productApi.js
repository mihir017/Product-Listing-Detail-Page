import api from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';

export const getProducts = async ({ page = 1, pageSize = 20 } = {}) => {
  const skip = (page - 1) * pageSize;

  const response = await api.get(ENDPOINTS.PRODUCTS, {
    params: {
      limit: pageSize,
      skip,
    },
  });

  return response.data;
};
