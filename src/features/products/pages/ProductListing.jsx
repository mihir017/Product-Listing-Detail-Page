import useFilters from '@/features/filters/hooks/useFilters';
import FilterSidebar from '@/features/filters/components/FilterSidebar';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import Pagination from '@/shared/components/Pagination';
import './ProductListing.scss';

const ProductListing = () => {
  const { filters, setPage } = useFilters();
  const { products, total, loading, error, refetchCatalog } =
    useProducts(filters);

  return (
    <div className="product-listing">
      <FilterSidebar />

      <div className="product-listing__content">
        <div className="product-listing__meta">
          <h1>Products</h1>
          {!loading && !error ? (
            <p>
              {total} {total === 1 ? 'product' : 'products'} found
            </p>
          ) : null}
        </div>

        {loading ? <h2>Loading...</h2> : null}

        {!loading && error ? (
          <div className="product-listing__error">
            <h2>{error}</h2>
            <button type="button" onClick={refetchCatalog}>
              Retry
            </button>
          </div>
        ) : null}

        {!loading && !error && products.length === 0 ? (
          <p className="product-listing__empty">No Products Found</p>
        ) : null}

        {!loading && !error && products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <Pagination
              currentPage={filters.page}
              totalItems={total}
              pageSize={filters.pageSize}
              onPageChange={setPage}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductListing;
