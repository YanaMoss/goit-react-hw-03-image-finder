import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarForm,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { query: '' };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
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
      <SearchbarForm>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarForm>
    );
  }
}
