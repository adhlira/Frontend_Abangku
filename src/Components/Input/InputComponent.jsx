import TextInput from "../../TextInput";
import { useState } from "react";
import { useSearch } from "../../Context/SearchContext";
import { useNavigate } from "react-router-dom";
export default function InputComponent() {
  const { updateSearchTerm } = useSearch();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    const term = e.target.value;
    setSearchInput(term);
  };

  const handleEnterKeyPress = (e, navigate) => {
    const searchInputValue = searchInput.trim();

    if (e.key === "Enter" && searchInputValue !== "") {
      updateSearchTerm(searchInputValue);
      localStorage.setItem("item", searchInputValue);
      navigate("/search");
      handleScroll()
    }
  };
  const handleClick = () => {
    if (searchInput.trim() !== "") {
      const searchInputValue = searchInput.trim();
      updateSearchTerm(searchInputValue);
      localStorage.setItem("item", searchInputValue);
      navigate("/search");
    }
  };

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="form-input">
        <TextInput required={true} label="" placeholder="Search your cloth..." onChange={handleInput} onKeyDown={(e) => handleEnterKeyPress(e, navigate, handleScroll)} className="input" />
        <button
          className="btn-Search"
          onChange={handleInput}
          onClick={() => {
            handleClick(navigate);
            handleScroll();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </>
  );
}
