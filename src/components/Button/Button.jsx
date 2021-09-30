import PropTypes from 'prop-types';

export const Button = ({ title, type, onClick }) => (
  <button type={type} onClick={onClick}>
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
