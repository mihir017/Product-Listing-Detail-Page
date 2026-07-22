import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { validatePrice } from '../utils/validatePrice';
import { FilterContext } from './filterContextObject';

const DEFAULT_FILTERS = {
  search: '',
  categories: [],
  brands: [],
  minPrice: '',
  maxPrice: '',
  page: 1,
  pageSize: 10,
};

const DEFAULT_ERRORS = {
  price: '',
};

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const filtersRef = useRef(filters);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const toggleCategory = useCallback((category) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(category);
      const categories = exists
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category];

      return {
        ...prev,
        categories,
        page: 1,
      };
    });
  }, []);

  const toggleBrand = useCallback((brand) => {
    setFilters((prev) => {
      const exists = prev.brands.includes(brand);
      const brands = exists
        ? prev.brands.filter((item) => item !== brand)
        : [...prev.brands, brand];

      return {
        ...prev,
        brands,
        page: 1,
      };
    });
  }, []);

  const applyPrice = useCallback(({ minPrice = '', maxPrice = '' } = {}) => {
    const priceError = validatePrice(minPrice, maxPrice);

    setErrors((prev) => ({
      ...prev,
      price: priceError,
    }));

    if (priceError) {
      return false;
    }

    setFilters((prev) => ({
      ...prev,
      minPrice,
      maxPrice,
      page: 1,
    }));

    return true;
  }, []);

  const setMinPrice = useCallback(
    (minPrice) => {
      applyPrice({
        minPrice,
        maxPrice: filtersRef.current.maxPrice,
      });
    },
    [applyPrice]
  );

  const setMaxPrice = useCallback(
    (maxPrice) => {
      applyPrice({
        minPrice: filtersRef.current.minPrice,
        maxPrice,
      });
    },
    [applyPrice]
  );

  const setSearch = useCallback((search) => {
    setFilters((prev) => {
      if (prev.search === search) {
        return prev;
      }

      return {
        ...prev,
        search,
        page: 1,
      };
    });
  }, []);

  const setPage = useCallback((page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setErrors(DEFAULT_ERRORS);
  }, []);

  const value = useMemo(
    () => ({
      filters,
      errors,
      setSearch,
      toggleCategory,
      toggleBrand,
      applyPrice,
      setMinPrice,
      setMaxPrice,
      setPage,
      resetFilters,
    }),
    [
      filters,
      errors,
      setSearch,
      toggleCategory,
      toggleBrand,
      applyPrice,
      setMinPrice,
      setMaxPrice,
      setPage,
      resetFilters,
    ]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
