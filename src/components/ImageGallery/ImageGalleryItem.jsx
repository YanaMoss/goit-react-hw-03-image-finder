import PropTypes from 'prop-types';
import { ImageGalleryItemComponent } from './ImageGallery.styled';

export const ImageGalleryItem = props => {
  const { id, url, name, getImage } = props;
  return (
    <ImageGalleryItemComponent
      key={id}
      id={id}
      onClick={e => getImage(e.currentTarget.id)}
    >
      <img
        src={url}
        alt={name}
        width="400"
        height="250"
        className="ImageGalleryItem-image"
      />
    </ImageGalleryItemComponent>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
