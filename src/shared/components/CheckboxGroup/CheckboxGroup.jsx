import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import './CheckboxGroup.scss';

const CheckboxGroup = ({
  options = [],
  values = [],
  value = '',
  multiple = true,
  name,
  onChange,
}) => {
  const isChecked = (optionValue) => {
    if (multiple) {
      return values.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleChange = (optionValue) => {
    onChange?.(optionValue);
  };

  return (
    <div className="checkbox-group">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          id={name ? `${name}-${option.value}` : option.value}
          label={option.label}
          checked={isChecked(option.value)}
          onChange={() => handleChange(option.value)}
        />
      ))}
    </div>
  );
};

CheckboxGroup.propTypes = {
  options: PropTypes.array.isRequired,
  values: PropTypes.array,
  value: PropTypes.string,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default CheckboxGroup;
