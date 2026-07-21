import PropTypes from 'prop-types';
import usePagination, { DOTS } from './usePagination';
import PaginationItem from './PaginationItem';
import './Pagination.scss';

const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  siblingCount = 1,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalItems,
    pageSize,
    siblingCount,
  });

  if (paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav className="pagination" aria-label="Pagination">
      <PaginationItem
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </PaginationItem>

      {paginationRange.map((page, index) => {
        if (page === DOTS) {
          return (
            <span key={`dots-${index}`} className="pagination-dots">
              ...
            </span>
          );
        }

        return (
          <PaginationItem
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PaginationItem>
        );
      })}

      <PaginationItem
        disabled={currentPage === lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PaginationItem>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
