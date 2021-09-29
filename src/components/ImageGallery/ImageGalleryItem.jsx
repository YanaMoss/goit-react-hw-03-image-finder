import react from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = props => {
  const { url, name } = props;
  return (
    <li className="ImageGalleryItem">
      <img src={url} alt={name} className="ImageGalleryItem-image" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
