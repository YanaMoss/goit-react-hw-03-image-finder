import { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Button } from '../Button/Button';
import fetchImages from '../services/image-api';
import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryContainer } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    total: '',
    loading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      fetchImages({ page: this.state.page, query: nextQuery })
        .then(response =>
          this.setState({
            images: [...response.data.hits],
            total: response.data.totalHits,
          }),
        )
        .finally(() => this.setState({ loading: false }));
    }
    if (prevPage < nextPage) {
      this.setState({ loading: true });
      fetchImages({ page: nextPage, query: prevQuery })
        .then(response =>
          this.setState({
            images: [...prevState.images, ...response.data.hits],
          }),
        )
        .finally(() => this.setState({ loading: false }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  nextPage() {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  }

  getImage = imageId => {
    this.props.onClick(imageId);
  };

  render() {
    const { images, loading, total } = this.state;
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
        <ImageGalleryContainer>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              id={id}
              url={largeImageURL}
              name={tags}
              getImage={this.getImage}
            />
          ))}
        </ImageGalleryContainer>
        {images.length < total && (
          <Button
            type={'button'}
            title={'Load more'}
            onClick={() => this.nextPage()}
          />
        )}
      </div>
    );
  }
}
