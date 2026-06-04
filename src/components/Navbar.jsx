import { useRef } from "react";

const Navbar = ({ searchQuery, setSearchQuery }) => {

  const searchRef = useRef(null);

  const handleFocusSearch = () => {
    searchRef.current.focus();
  };

  return (
    <nav className="navbar">
      {/* bagian kiri: logo dan nama website */}
      <div className="navbar-brand">
        <span className="brand-logo">👥</span>
        <span className="brand-name">Minstagram</span>
      </div>

      {/* bagian kanan: search bar */}
      <div className="navbar-search">
        <input
          ref={searchRef}
          type="text"
          className="search-input"
          placeholder="🔍 Cari nama atau username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn" onClick={handleFocusSearch}>
          Cari
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
