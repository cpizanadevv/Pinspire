import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useState } from "react";

function SearchComponent() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/pins/${keyword}`);
      setKeyword('');
    }
  };
  return (
      <input
        className="search"
        type="text"
        placeholder="Search for ideas"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearch}
      />
  );
}

export default SearchComponent;
