import { useFilterContext } from '../context/useFilterContext';

const useFilters = () => {
  const {
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
  } = useFilterContext();

  return {
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
  };
};

export default useFilters;
