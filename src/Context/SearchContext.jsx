/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (localStorage.getItem("item", searchTerm) !== "null") {
      setSearchTerm(localStorage.getItem("item"));
    }
  }, [searchTerm]);
  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  return <SearchContext.Provider value={{ searchTerm, updateSearchTerm }}>{children}</SearchContext.Provider>;
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export { SearchProvider, useSearch };
