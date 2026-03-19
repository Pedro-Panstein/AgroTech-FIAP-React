import { useState } from "react";
import "../css/login.css";
import image from "../assets/logo.png";
import bgImage from "../assets/login-bg.png";
import { useNavigate } from "react-router-dom";

function Login({ setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usernameInput.trim() === "" || password.trim() === "") {
      setError("Por favor, preencha usuário e senha.");
      return;
    }

    localStorage.setItem("username", usernameInput.trim());
    setUsername(usernameInput.trim());
    navigate("/");
  };

  return (
    <main id="login-content" style={{ position: "relative", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

      <section className="d-flex flex-column flex-md-row gap-4 gap-md-5 justify-content-center align-items-center p-4 p-md-5 text-center text-md-start">
        <img src={image} alt="Logo Agro connect" height="140" width="140" />
        <div className="d-flex flex-column align-items-center align-items-md-start">
          <span className="agro-title-login fw-bold d-none d-md-inline">
            AGRO CONNECT
          </span>
          <p className="fw-bold text-white fs-3 fs-md-3 mb-0">
            Conectando <span className="color-tertiary">você</span> para o
            amanhã
          </p>
        </div>
      </section>

      <section className="m-2">
        <div className="login-box">
          <h2 className="login-title">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username-field" className="form-label text-white">
                Nome do usuário
              </label>
              <input
                type="text"
                id="username-field"
                className="form-control p-2"
                placeholder="Digite aqui o seu nome"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="form-control p-2"
                placeholder="Digite aqui a sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger fw-bold">{error}</p>}
            <button type="submit" className="btn-login w-100">
              ENTRAR
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
