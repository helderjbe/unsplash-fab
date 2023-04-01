import "./SearchField.css";
import searchIcon from "../../assets/icons/search.svg";

export interface SearchFieldProps {
  search: string;
  onChange: (search: string) => void;
}

export function SearchField({ onChange, search }: SearchFieldProps) {
  return (
    <div className="search-bar">
      <div className="search-icon">
        <img
          src={searchIcon}
          alt="search"
          style={{ width: "14px", height: "14px" }}
        />
      </div>
      <input
        type="text"
        placeholder="Search pictures ..."
        className="search-input"
        value={search}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
