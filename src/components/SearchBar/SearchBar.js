import { useState } from "react";
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

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter the name of the request");
      return;
    }

    onSubmit(query);
    setQuery("");
  };
  return (
    <header className={searchbar}>
      <form className={searchForm} onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
