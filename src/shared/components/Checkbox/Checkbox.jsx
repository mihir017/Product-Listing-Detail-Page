import PropTypes from 'prop-types';
import './Checkbox.scss';

const Checkbox = ({ id, label, checked, disabled = false, onChange }) => {
  const isControlled = checked !== undefined;

  return (
    <label className="checkbox" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        onChange={onChange}
        {...(isControlled ? { checked } : {})}
      />
      <span className="checkbox__label">{label}</span>
    </label>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
