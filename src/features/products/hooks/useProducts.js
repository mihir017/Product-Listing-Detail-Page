import { useMemo } from 'react';
import { useProductCatalog } from '../context/useProductCatalog';
import { filterProducts, paginateProducts } from '../utils/productHelpers';

const useProducts = (filters = {}) => {
  const { allProducts, loading, error, refetchCatalog } = useProductCatalog();

  const {
    search = '',
    categories = [],
    brands = [],
    minPrice = '',
    maxPrice = '',
    page = 1,
    pageSize = 10,
  } = filters;

  const filteredProducts = useMemo(
    () =>
      filterProducts(allProducts, {
        search,
        categories,
        brands,
        minPrice,
        maxPrice,
      }),
    [allProducts, search, categories, brands, minPrice, maxPrice]
  );

  const total = filteredProducts.length;

  const products = useMemo(
    () => paginateProducts(filteredProducts, page, pageSize),
    [filteredProducts, page, pageSize]
  );

  return {
    products,
    total,
    loading,
    error,
    refetchCatalog,
  };
};

export default useProducts;
