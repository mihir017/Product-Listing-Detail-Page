import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';

const useProducts = ({ page = 1, pageSize = 20 } = {}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getProducts({ page, pageSize });

        if (ignore) return;

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to fetch products.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, [page, pageSize]);

  return {
    products,
    total,
    loading,
    error,
  };
};

export default useProducts;
