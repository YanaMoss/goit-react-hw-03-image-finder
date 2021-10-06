import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import fetchImageId from '../../services/image-api';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    openModal: false,
    loading: false,
    image: {
      id: '',
      url: '',
      name: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.state.image;
    if (prevState.image.id !== this.state.image.id) {
      this.setState({ loading: true });
      fetchImageId({ id: id })
        .then(response =>
          this.setState({
            openModal: true,
            image: {
              id: response.data.hits[0].id,
              url: response.data.hits[0].largeImageURL,
              name: response.data.hits[0].tags,
            },
          }),
        )
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleImage = query => {
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };
  getImage = id => {
    this.setState({ image: { id: id } });
  };
  render() {
    const { url, name } = this.state.image;
    const { loading, query, openModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleImage} />
        <ImageGallery
          query={query}
          onClick={imageId => this.getImage(imageId)}
        />
        {openModal && (
          <Modal onClose={this.toggleModal}>
            <img src={url} alt={name} />
          </Modal>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {loading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
      </div>
    );
  }
}
