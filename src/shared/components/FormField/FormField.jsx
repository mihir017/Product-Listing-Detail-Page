import PropTypes from 'prop-types';
import './FormField.scss';

const FormField = ({ label, error, children }) => {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`.trim()}>
      {label ? <span className="form-field__label">{label}</span> : null}
      {children}
      {error ? <p className="form-field__error">{error}</p> : null}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
};

export default FormField;
