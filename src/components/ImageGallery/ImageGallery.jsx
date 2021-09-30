import { Component } from 'react';
import Loader from 'react-loader-spinner';
import fetchImages from '../services/image-api';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    images: [],
    //  loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    //  this.setState({ loading: true });
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery) {
      fetchImages({ nextQuery })
        .then(response => response.data.hits)
        .then(images => this.setState({ images: images }));
      //   .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { images, loading } = this.state;
    return (
      <div>
        {loading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        <ul className="ImageGallery">
          {images.map(({ id, previewURL, tags }) => (
            <ImageGalleryItem id={id} url={previewURL} name={tags} />
          ))}
        </ul>
      </div>
    );
  }
}
