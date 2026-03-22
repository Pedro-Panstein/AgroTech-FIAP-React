import { useState, useEffect, useRef } from "react";
import Transaction from "./Components/Finances/Transaction";
import { DownloadIcon, UploadIcon } from "./Components/Finances/Icons";
import Card from "./Components/Finances/Card";
import ActionButton from "./Components/Finances/ActionButton";
import NewTransactionModal from "./Components/Finances/NewTransactionModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import plusIcon from "./../assets/AiOutlinePlus.png";
import filterIcon from "./../assets/filter-icon.png";
import "../css/financeiro.css";

export default function Finances() {
  const [chatOpen, setChatOpen] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const dados = localStorage.getItem("transacoes_financeiro");
    if (dados) {
      setTransacoes(JSON.parse(dados));
    }
  }, []);

  useEffect(() => {
    if (transacoes.length > 0) {
      localStorage.setItem("transacoes_financeiro", JSON.stringify(transacoes));
    }
  }, [transacoes]);

  const calcularDashboard = () => {
    const ganhos = transacoes
      .filter((t) => t.tipo === "ganho")
      .reduce((acc, t) => acc + t.valor, 0);

    const gastos = transacoes
      .filter((t) => t.tipo === "gasto")
      .reduce((acc, t) => acc + t.valor, 0);

    const saldo = ganhos - gastos;

    return {
      ganhos: ganhos.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
      gastos: gastos.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
      saldo: saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    };
  };

  const dashboard = calcularDashboard();

  const ultimasTransacoes = [...transacoes].reverse().slice(0, 10);

  const formatarValor = (valor, tipo) => {
    const prefix = tipo === "gasto" ? "-" : "";
    return prefix + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  const handleNovaTransacao = (novaTransacao) => {
    setTransacoes([...transacoes, novaTransacao]);
  };

  const exportarCSV = () => {
    let csv = "tipo,descricao,valor,data\n";

    transacoes.forEach((t) => {
      csv += `${t.tipo},${t.descricao},${t.valor},${t.data}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "financeiro.csv";
    link.click();
  };

  const importarCSV = (arquivo) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const linhas = e.target.result.split("\n").slice(1);
      const novasTransacoes = [];

      linhas.forEach((l) => {
        const [tipo, descricao, valor, data] = l.split(",");
        if (tipo && descricao && valor && data) {
          novasTransacoes.push({
            tipo,
            descricao,
            valor: parseFloat(valor),
            data,
          });
        }
      });

      setTransacoes([...transacoes, ...novasTransacoes]);
    };

    reader.readAsText(arquivo);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      importarCSV(e.target.files[0]);
    }
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="main-background-color">
      <main className="h-auto gap-5 p-4 bg p-md-5 d-flex flex-column">
        <div>
          <h2 className="mb-3 fw-bold">Financeiro</h2>

          <div className="flex-wrap gap-2 p-4 rounded w-100 d-flex bg-secondary-opacity gap-md-3 justify-content-between align-items-center">
            <div className="gap-4 d-flex">
              <ActionButton
                icon={plusIcon}
                label="Adicionar"
                onClick={() => setShowModal(true)}
              />
              <ActionButton icon={filterIcon} label="Filtros" />
            </div>

            <div className="gap-4 d-flex ">
              <label
                className="gap-2 px-3 py-1 m-0 rounded d-flex align-items-center bg-tertiary outline-2"
                style={{ cursor: "pointer" }}
              >
                <UploadIcon />
                Importar dados
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>

              <button
                className="gap-2 px-3 py-1 rounded d-flex align-items-center bg-tertiary outline-2"
                onClick={exportarCSV}
              >
                <DownloadIcon />
                Exportar CSV
              </button>
            </div>
          </div>
        </div>

        <div className="row g-5 cards-container">
          <Card title="Ganhos" value={dashboard.ganhos} color="green" />
          <Card title="Gastos" value={dashboard.gastos} color="red" />
          <Card title="Saldo Final" value={dashboard.saldo} color="blue" />
        </div>

        <div>
          <div className="p-3 d-flex flex-column bg-tertiary rounded-top">
            <span className="fs-5 fw-bold">Transações recentes</span>
            <span>Suas ultimas 10 transações registradas</span>
          </div>

          <div className="gap-3 p-3 d-flex flex-column bg-tertiary-opacity rounded-bottom">
            {ultimasTransacoes.length > 0 ? (
              ultimasTransacoes.map((t, index) => (
                <Transaction
                  key={index}
                  type={t.tipo === "gasto" ? "red" : "green"}
                  title={t.descricao}
                  value={formatarValor(t.valor, t.tipo)}
                />
              ))
            ) : (
              <div className="p-3 text-center text-muted">
                Nenhuma transação registrada ainda.
              </div>
            )}
          </div>
        </div>

        {/* Botão flutuante do Chat */}
        <button
          id="chat-ball"
          className="bottom-0 p-3 m-4 text-white border-0 shadow-lg position-fixed end-0 rounded-circle bg-success"
          style={{ width: "60px", height: "60px", zIndex: 1000 }}
          onClick={toggleChat}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>

        {/* Janela do Chat */}
        <div
          id="chat-content"
          className={`card shadow p-3 fade-in ${chatOpen ? "show" : ""}`}
          style={{
            display: chatOpen ? "block" : "none",
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            zIndex: 1001,
          }}
        >
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Fechar"
            id="close-chat"
            onClick={() => setChatOpen(false)}
          ></button>
          <h5 className="mt-2">Precisa de ajuda?</h5>
          <p>Fale conosco e tire suas dúvidas!</p>
          <a href="/" className="btn btn-success">
            Iniciar conversa
          </a>
        </div>
      </main>

      <NewTransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSave={handleNovaTransacao}
      />
    </div>
  );
}
