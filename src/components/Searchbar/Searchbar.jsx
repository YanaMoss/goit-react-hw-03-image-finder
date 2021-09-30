import { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = { query: '' };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.replace(' ', '+') });
    console.log(this.state.query);
  };

  handleSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.info('Введите текс для поиска.');
      return;
    }
    this.props.onSubmit(query);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
