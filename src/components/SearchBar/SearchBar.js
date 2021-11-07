import { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import styles from "./SearchBar.module.css";

const {
  searchbar,
  searchForm,
  searchFormButton,
  searchFormInput,
  searchFormButtonLabel,
} = styles;

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { query } = this.state;

    if (query.trim() === "") {
      toast.error("Please enter the name of the request");
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: "" });
  };
  render() {
    const { query } = this.state;
    return (
      <header className={searchbar}>
        <form className={searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={searchFormButton}>
            <span className={searchFormButtonLabel}>Search</span>
          </button>
          <input
            className={searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
