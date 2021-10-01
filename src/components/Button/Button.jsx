import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

export const Button = ({ title, type, onClick }) => (
  <LoadMore type={type} onClick={onClick}>
    {title}
  </LoadMore>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
