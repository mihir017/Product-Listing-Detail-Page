import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import Pagination from '@/shared/components/Pagination';

const PAGE_SIZE = 10;

const ProductListing = () => {
  const [page, setPage] = useState(1);

  const { products, total, loading, error } = useProducts({
    page,
    pageSize: PAGE_SIZE,
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="product-listing">
      <h1>Products</h1>
      <ProductGrid products={products} />
      <Pagination
        currentPage={page}
        totalItems={total}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ProductListing;
