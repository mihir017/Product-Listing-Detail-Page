import { useEffect, useState } from 'react';
import { getProductById } from '../api/productApi';

const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    let ignore = false;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getProductById(id);

        if (!ignore) {
          setProduct(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load product.');
          setProduct(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};

export default useProductDetail;
