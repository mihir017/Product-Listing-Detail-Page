import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllProducts, getCategories } from '../api/productApi';
import { getUniqueBrands } from '../utils/productHelpers';
import { ProductCatalogContext } from './productCatalogContextObject';

const formatCategoryLabel = (value) => {
  if (!value) return '';

  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const normalizeCategories = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((category) => {
    const value = typeof category === 'string' ? category : category.slug;
    return {
      value,
      label: formatCategoryLabel(value),
    };
  });
};

export function ProductCatalogProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);

      setAllProducts(productsResponse.products || []);
      setCategories(normalizeCategories(categoriesResponse));
    } catch (err) {
      setError(err.message || 'Failed to load catalog.');
      setAllProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load products + categories once on app start
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial catalog fetch
    fetchCatalog();
  }, [fetchCatalog]);

  const brands = useMemo(
    () => getUniqueBrands(allProducts),
    [allProducts]
  );

  const value = useMemo(
    () => ({
      allProducts,
      categories,
      brands,
      loading,
      error,
      refetchCatalog: fetchCatalog,
    }),
    [
      allProducts,
      categories,
      brands,
      loading,
      error,
      fetchCatalog,
    ]
  );

  return (
    <ProductCatalogContext.Provider value={value}>
      {children}
    </ProductCatalogContext.Provider>
  );
}
