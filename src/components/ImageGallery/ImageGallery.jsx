import { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Button } from '../Button/Button';
import fetchImages from '../services/image-api';
import { ImageGalleryItem } from './ImageGalleryItem';

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
    console.log(prevPage);
    console.log(nextPage);
    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });
      fetchImages({ page: this.state.page, query: nextQuery })
        .then(response =>
          this.setState({
            images: [prevState.images, ...response.data.hits],
            total: response.data.totalHits,
          }),
        )
        .finally(() => this.setState({ loading: false }));
    }
    if (prevPage < nextPage) {
      fetchImages({ page: nextPage, query: prevQuery }).then(response =>
        this.setState({ images: [...prevState.images, ...response.data.hits] }),
      );
    }
  }

  nextPage() {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
  }
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
        <ul className="ImageGallery">
          {images.map(({ id, previewURL, tags }) => (
            <ImageGalleryItem id={id} url={previewURL} name={tags} />
          ))}
        </ul>
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
