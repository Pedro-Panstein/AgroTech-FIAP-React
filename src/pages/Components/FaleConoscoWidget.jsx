import { useState } from "react";
import supportLogo from "../../assets/support-logo.png";
import "../../css/home.css";
import { NavLink } from "react-router-dom";

function FaleConoscoWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fale-conosco">
      <div
        id="chat-ball"
        className="rounded-circle bg-success d-flex align-items-center justify-content-center"
        onClick={() => setOpen(!open)}
      >
        <img src={supportLogo} alt="Suporte" className="logo" />
      </div>

      {open && (
        <div id="chat-content" className="card shadow p-3 fade-in">
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
          ></button>
          <h5 className="mt-2">Precisa de ajuda?</h5>
          <p>Fale conosco e tire suas dúvidas!</p>
          <NavLink to="fale_conosco" className="btn btn-success">
            Financeiro
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default FaleConoscoWidget;
