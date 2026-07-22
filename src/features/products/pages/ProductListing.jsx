import { useState } from 'react';
import useFilters from '@/features/filters/hooks/useFilters';
import FilterSidebar from '@/features/filters/components/FilterSidebar';
import useProducts from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import Pagination from '@/shared/components/Pagination';
import './ProductListing.scss';

const ProductListing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { filters, setPage } = useFilters();
  const { products, total, loading, error, refetchCatalog } =
    useProducts(filters);

  const activeFilterCount =
    (filters.search.trim() ? 1 : 0) +
    filters.categories.length +
    filters.brands.length +
    (filters.minPrice !== '' || filters.maxPrice !== '' ? 1 : 0);

  return (
    <div
      className={`product-listing ${
        isSidebarOpen ? 'product-listing--sidebar-open' : ''
      }`}
    >
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="product-listing__content">
        <div className="product-listing__meta">
          <div className="product-listing__heading">
            {!isSidebarOpen ? (
              <button
                type="button"
                className="product-listing__filters-btn"
                onClick={() => setIsSidebarOpen(true)}
              >
                Filters
                {activeFilterCount > 0 ? (
                  <span className="product-listing__filters-count">
                    {activeFilterCount}
                  </span>
                ) : null}
              </button>
            ) : null}
            <h1>Products</h1>
          </div>

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
