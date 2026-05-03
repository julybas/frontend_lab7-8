import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-logo">📦 Inventory</div>

      <div className="nav-links">
        <Link className={isActive("/") ? "active" : ""} to="/">
          Admin
        </Link>

        <Link className={isActive("/gallery") ? "active" : ""} to="/gallery">
          Gallery
        </Link>
      </div>
    </nav>
  );
}
