import PropTypes from 'prop-types';

export const ImageGalleryItem = props => {
  const { id, url, name } = props;
  return (
    <li key={id} className="ImageGalleryItem">
      <img
        src={url}
        alt={name}
        width="150"
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
