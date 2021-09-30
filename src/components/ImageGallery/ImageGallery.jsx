import { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Button } from '../Button/Button';
import fetchImages from '../services/image-api';
import { ImageGalleryItem } from './ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    images: [],
    total: '',
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;
    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      fetchImages({ page: 1, query: nextQuery })
        .then(response =>
          this.setState({
            images: [prevState.images, ...response.data.hits],
            total: response.data.totalHits,
          }),
        )
        .finally(() => this.setState({ loading: false }));
    }
    if (prevPage !== nextPage) {
      fetchImages({ page: nextPage, query: prevQuery }).then(response =>
        this.setState({ images: [prevState.images, ...response.data.hits] }),
      );
    }
  }
  render() {
    const { images, loading, total } = this.state;
    console.log(images.length);
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
        {images.length < total && (
          <Button type={'button'} title={'Load more'} />
        )}
      </div>
    );
  }
}
