import useFilters from '@/features/filters/hooks/useFilters';
import './SearchBar.scss';

const SearchBar = () => {
  const { filters, setSearch } = useFilters();

  const handleClear = () => {
    setSearch('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search products..."
        value={filters.search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search products"
      />

      {filters.search ? (
        <button
          type="button"
          className="search-bar__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;
