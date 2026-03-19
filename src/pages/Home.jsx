import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supportLogo from "../assets/support-logo.png";
import newsImage from "../assets/news.jpg";
import NewsCard from "./Components/NewsCard.jsx";
import TutorialModal from "./Components/TutorialModal.jsx";
import "../css/home.css";
import FaleConoscoWidget from "./Components/FaleConoscoWidget.jsx";

function Home() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);
  const [dateText, setDateText] = useState("");
  const [usernameColor, setUsernameColor] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  useEffect(() => {
    if (!username || username === "") {
      window.location.reload();
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setDateText(`Atualizado em ${formattedDate}`);

    const hora = today.getHours();
    if (hora >= 5 && hora < 12) {
      setUsernameColor("#2e7d32");
    } else if (hora >= 12 && hora < 18) {
      setUsernameColor("#ef6c00");
    } else {
      setUsernameColor("#1e3a8a");
    }

    const tutorialSeen = localStorage.getItem("tutorialSeen");
    if (!tutorialSeen) {
      setShowTutorial(true);
    }
  }, [username, navigate]);

  const handleCloseTutorial = () => {
    localStorage.setItem("tutorialSeen", "true");
    setShowTutorial(false);
  };

  return (
    <main className="p-3 m-5">
      <section className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h1 className="m-0">
          Seja bem-vindo(a){" "}
          <span className="color-secondary" style={{ color: usernameColor }}>
            {username}
          </span>
        </h1>

        <div className="d-flex gap-2">
          <button
            id="btnReverTutorial"
            className="btn btn-outline-success mt-2 mt-md-0"
            onClick={() => setShowTutorial(true)}
          >
            Rever tutorial
          </button>
          <button
            className="btn btn-danger mt-2 mt-md-0"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </section>

      {dateText && (
        <div id="homepage-date" className="small text-muted mt-1">
          {dateText}
        </div>
      )}

      <p className="fs-3">Veja as melhores notícias do mundo agro no momento</p>

      <section className="bg-secondary-opacity p-3 rounded-3 mt-4">
        <div className="row g-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="col-md-4" key={i}>
              <NewsCard
                image={newsImage}
                title="IA reduz custos de produção em até 18% em fazendas brasileiras"
                meta="Agrotecnologia — 28 Nov 2025"
                text="Um levantamento da Embrapa com startups do agro mostra que soluções de Inteligência Artificial estão cortando custos de produção em até 18% em propriedades de médio porte. A tecnologia é usada em monitoramento climático, previsão de pragas e otimização da irrigação."
              />
            </div>
          ))}
        </div>
      </section>

      <FaleConoscoWidget/>

      <TutorialModal open={showTutorial} onClose={handleCloseTutorial} />
    </main>
  );
}

export default Home;