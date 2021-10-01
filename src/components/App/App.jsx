import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import fetchImages from '../services/image-api';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    openModal: false,
    image: {
      id: '',
      url: '',
      name: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.state.image;
    if (prevState.image.id !== this.state.image.id) {
      fetchImages({ id: id }).then(response =>
        this.setState({
          openModal: true,
          image: {
            id: response.data.hits[0].id,
            url: response.data.hits[0].largeImageURL,
            name: response.data.hits[0].tags,
          },
        }),
      );
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
    const { id, url, name } = this.state.image;
    const { query, openModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleImage} />
        <ImageGallery
          query={query}
          onClick={imageId => this.getImage(imageId)}
        />
        {openModal && (
          <Modal onClose={this.toggleModal}>
            <img src={url} alt={name} openImage={this.openImage} />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
