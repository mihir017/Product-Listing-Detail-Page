import PropTypes from 'prop-types';
import './FilterSection.scss';

const FilterSection = ({ title, children }) => {
  return (
    <section className="filter-section">
      <h3 className="filter-section__title">{title}</h3>
      {children}
    </section>
  );
};

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default FilterSection;
