import useFilters from '../../hooks/useFilters';
import { useProductCatalog } from '@/features/products/context/useProductCatalog';
import CheckboxGroup from '@/shared/components/CheckboxGroup';
import FilterSection from '../FilterSection';
import PriceFilter from '../PriceFilter';
import './FilterSidebar.scss';

const FilterSidebar = () => {
  const {
    filters,
    errors,
    toggleCategory,
    toggleBrand,
    applyPrice,
    resetFilters,
  } = useFilters();

  const {
    categories,
    brands,
    loading: catalogLoading,
  } = useProductCatalog();

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '';

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h2 className="filter-sidebar__title">Filters</h2>
        {hasActiveFilters ? (
          <button
            type="button"
            className="filter-sidebar__reset"
            onClick={resetFilters}
          >
            Clear all
          </button>
        ) : null}
      </div>

      <FilterSection title="Category">
        {catalogLoading ? (
          <p className="filter-sidebar__hint">Loading categories...</p>
        ) : (
          <CheckboxGroup
            name="category"
            options={categories}
            multiple
            values={filters.categories}
            onChange={toggleCategory}
          />
        )}
      </FilterSection>

      <FilterSection title="Price">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          error={errors.price}
          onApply={applyPrice}
        />
      </FilterSection>

      <FilterSection title="Brand">
        {brands.length === 0 ? (
          <p className="filter-sidebar__hint">No brands available</p>
        ) : (
          <CheckboxGroup
            name="brand"
            options={brands}
            multiple
            values={filters.brands}
            onChange={toggleBrand}
          />
        )}
      </FilterSection>
    </aside>
  );
};

export default FilterSidebar;
