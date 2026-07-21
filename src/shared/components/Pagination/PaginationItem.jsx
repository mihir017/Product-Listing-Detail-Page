import PropTypes from 'prop-types';

const PaginationItem = ({ active, disabled, children, onClick }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`pagination-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

PaginationItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default PaginationItem;
