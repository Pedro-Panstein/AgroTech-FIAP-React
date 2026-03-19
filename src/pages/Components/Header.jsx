import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import hamburger from "../../assets/hamburger-bar.svg";
import "../../css/header.css";

function Header() {
  return (
    <header className="navbar navbar-expand-lg p-2">
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center gap-3">
          <img
            src={logo}
            alt="Logo AC"
            width="90"
            height="80"
            className="p-1"
          />
          <span className="separator_bar mx-2 d-none d-md-inline"></span>
          <span className="agro-title fw-bold d-none d-md-inline">
            AGRO CONNECT
          </span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img src={hamburger} width="50" height="50" alt="Menu" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="nav-link">
                Financeiro
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="nav-link">
                Vendas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
