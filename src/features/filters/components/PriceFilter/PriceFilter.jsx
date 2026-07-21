import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Input from '@/shared/components/Input';
import FormField from '@/shared/components/FormField';
import './PriceFilter.scss';

const PriceFilter = ({
  minPrice = '',
  maxPrice = '',
  error = '',
  onApply,
}) => {
  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);

  useEffect(() => {
    // Keep draft inputs in sync when filters reset / applied values change
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync draft from controlled filter values
    setDraftMinPrice(minPrice);
    setDraftMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    onApply?.({
      minPrice: draftMinPrice,
      maxPrice: draftMaxPrice,
    });
  };

  return (
    <FormField error={error}>
      <div className="price-filter">
        <div className="price-filter__inputs">
          <Input
            type="number"
            placeholder="Min Price"
            value={draftMinPrice}
            onChange={(event) => setDraftMinPrice(event.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={draftMaxPrice}
            onChange={(event) => setDraftMaxPrice(event.target.value)}
          />
        </div>

        <button
          type="button"
          className="price-filter__apply"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </FormField>
  );
};

PriceFilter.propTypes = {
  minPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  onApply: PropTypes.func,
};

export default PriceFilter;
