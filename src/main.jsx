import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./css/index.css";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Vendas from "./pages/Vendas.jsx";
import Calculadora from "./pages/Calculadora.jsx";
import NotFound from "./pages/NotFound.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import Header from "./pages/Components/Header.jsx";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [hideHeader, setHideHeader] = useState();
  useEffect(() => {
    setHideHeader(window.location.pathname === "/login");
  }, [window.location.pathname]);

  return (
    <BrowserRouter>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={username ? <Home /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!username ? <Login setUsername={setUsername} /> : <Navigate to="/" />}/>
        <Route path="/vendas" element={username ? <Vendas /> : <Navigate to="/login" />}/>
        <Route path="/calculadora" element={username ? <Calculadora /> : <Navigate to="/login" />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);