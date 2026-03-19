import { Link } from "react-router-dom";

function NotFound() {
  const login = localStorage.getItem("username");

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-3 text-danger">404</h1>
      <p className="lead">Ops! Página não encontrada.</p>
      <Link to="/" className="btn bg-green mt-3">
        {login ? "Voltar para Home" : "Voltar para Login"}
      </Link>
    </div>
  );
}

export default NotFound;
