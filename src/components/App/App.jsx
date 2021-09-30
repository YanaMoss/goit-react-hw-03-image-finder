import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
  };

  handleImage = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleImage} />
        <ImageGallery query={this.state.query} />
        <Modal />
        <ToastContainer />
      </div>
    );
  }
}
