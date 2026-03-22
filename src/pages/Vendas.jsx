// ================================================
//  AGRO CONNECT — Vendas (React)
//  Fase 5 — migração mantendo visual original
// ================================================

import { useState, useEffect, useRef } from "react";
import FaleConoscoWidget from "./Components/FaleConoscoWidget.jsx";

// ================================================
//  STORAGE
// ================================================

const STORAGE_KEY = "agro_vendas_storage_v1";

function saveToStorage(vendas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vendas));
}

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// ================================================
//  UTILITÁRIOS
// ================================================

function parseCurrencyToNumber(str) {
  if (!str) return 0;
  return Number(str.replace(/[R$\s\.]/g, "").replace(",", ".")) || 0;
}

function formatCurrency(value) {
  const v = value.replace(/\D/g, "");
  const n = (Number(v) / 100).toFixed(2);
  const parts = n.split(".");
  let intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${intPart},${parts[1]}`;
}

function exportCSV(vendas) {
  if (!vendas.length) return;
  const header = "data,produto,cliente,valor\n";
  const lines = vendas
    .map((v) => `${v.data},${v.produto},${v.cliente},${v.valor.replace("R$ ", "")}`)
    .join("\n");
  const blob = new Blob([header + lines], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vendas.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function getMesAtual() {
  const meses = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO",
  ];
  const d = new Date();
  return `${meses[d.getMonth()]} ${d.getFullYear()}`;
}

// ================================================
//  COMPONENTE: CardResumo
// ================================================

function CardResumo({ titulo, valor }) {
  return (
    <div className="col-md-3">
      <div className="card caixa-resumo h-100">
        <div className="card-header">{titulo}</div>
        <div className="card-body d-flex align-items-center justify-content-center">
          <h2
            className="fw-bolder text-center mb-0"
            style={{ fontSize: valor.length > 8 ? "1.2rem" : "2rem", wordBreak: "break-word" }}
          >
            {valor}
          </h2>
        </div>
      </div>
    </div>
  );
}

// ================================================
//  COMPONENTE: UltimaVenda
// ================================================

function UltimaVenda({ venda }) {
  if (!venda) {
    return (
      <tr>
        <td>00/00/0000</td>
        <td>—</td>
        <td>—</td>
        <td>R$ 0,00</td>
      </tr>
    );
  }
  const [ano, mes, dia] = venda.data.split("-");
  return (
    <tr>
      <td>{`${dia}/${mes}/${ano}`}</td>
      <td>{venda.produto}</td>
      <td>{venda.cliente}</td>
      <td>{venda.valor}</td>
    </tr>
  );
}

// ================================================
//  COMPONENTE: FormVenda
// ================================================

const PRODUTO_SUGGESTIONS = ["Tomate", "Alface", "Cebola", "Pepino", "Cenoura"];
const CLIENTE_SUGGESTIONS = ["Fazenda São José", "Mercado Central", "Padaria Bom Pão", "Restaurante Verde"];

function FormVenda({ onSalvar, onToast }) {
  const [data, setData] = useState("");
  const [produto, setProduto] = useState("");
  const [cliente, setCliente] = useState("");
  const [valor, setValor] = useState("");

  function handleValorChange(e) {
    setValor(formatCurrency(e.target.value));
  }

  function handleSalvar() {
    if (!data || !produto.trim() || !cliente.trim() || !valor) {
      onToast("Preencha todos os campos!", true);
      return;
    }
    if (parseCurrencyToNumber(valor) <= 0) {
      onToast("Valor inválido.", true);
      return;
    }
    onSalvar({
      data,
      produto: produto.trim().toUpperCase(),
      cliente: cliente.trim().toUpperCase(),
      valor,
    });
    setData("");
    setProduto("");
    setCliente("");
    setValor("");
    onToast("Venda salva com sucesso!");
  }

  return (
    <div className="col-md-6">
      <div className="card tabela-card h-100">
        <div className="card-header fw-semibold">Cadastrar Nova Venda</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-sm mb-0 align-middle text-center">
              <thead style={{ backgroundColor: "#c8e6c9" }}>
                <tr>
                  <th>Data da Venda</th>
                  <th>Produto</th>
                  <th>Cliente</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="date"
                      className="form-control text-center"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="Produto"
                      list="prod-list"
                      value={produto}
                      onChange={(e) => setProduto(e.target.value)}
                    />
                    <datalist id="prod-list">
                      {PRODUTO_SUGGESTIONS.map((p) => <option key={p} value={p} />)}
                    </datalist>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="Cliente"
                      list="cli-list"
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                    />
                    <datalist id="cli-list">
                      {CLIENTE_SUGGESTIONS.map((c) => <option key={c} value={c} />)}
                    </datalist>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="R$ 0,00"
                      inputMode="decimal"
                      value={valor}
                      onChange={handleValorChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3">
            <button
              className="btn w-100 fw-bold text-white"
              id="btn-salvar"
              style={{ backgroundColor: "var(--secondary-color)", borderRadius: "14px" }}
              onClick={handleSalvar}
            >
              SALVAR VENDA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================
//  COMPONENTE: TabelaMensal
// ================================================

function TabelaMensal({ vendas }) {
  const mapa = new Map();
  vendas.forEach((v) => mapa.set(v.cliente, (mapa.get(v.cliente) || 0) + 1));
  const rows = Array.from(mapa.entries());

  return (
    <div className="col-md-6">
      <div className="card tabela-card h-100">
        <div className="card-header fw-semibold">Vendas do Mês</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-sm mb-0 align-middle text-center">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Quantidade de Compras</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan="2">—</td></tr>
                ) : (
                  rows.map(([cli, qtd]) => (
                    <tr key={cli}>
                      <td>{cli}</td>
                      <td>{qtd}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================
//  COMPONENTE: GraficoProdutos
// ================================================

function GraficoProdutos({ produtos }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const barW = 50;
    const gap = 40;
    const paddingLeft = 20;
    const totalWidth = paddingLeft + produtos.length * (barW + gap);
    canvas.width = Math.max(300, totalWidth);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!produtos.length) return;

    const values = produtos.map(([, qtd]) => qtd);
    const labels = produtos.map(([nome]) => nome);
    const max = Math.max(1, ...values);
    ctx.font = "11px sans-serif";

    labels.forEach((label, i) => {
      const x = paddingLeft + i * (barW + gap);
      const h = (values[i] / max) * 100;
      const y = canvas.height - h - 20;
      ctx.fillStyle = "#14521f";
      ctx.fillRect(x, y, barW, h);
      ctx.fillStyle = "#000";
      const labelX = x + barW / 2 - ctx.measureText(label).width / 2;
      ctx.fillText(label, labelX, canvas.height - 5);
      const countX = x + barW / 2 - ctx.measureText(String(values[i])).width / 2;
      ctx.fillText(values[i], countX, y - 5);
    });
  }, [produtos]);

  return (
    <div style={{ overflowX: "auto" }}>
      <canvas ref={canvasRef} height={140}></canvas>
    </div>
  );
}

// ================================================
//  COMPONENTE: TabelaProdutos
// ================================================

function TabelaProdutos({ vendas }) {
  const mapa = new Map();
  vendas.forEach((v) => {
    const p = v.produto;
    mapa.set(p, (mapa.get(p) || 0) + 1);
  });
  const produtos = Array.from(mapa.entries());

  return (
    <div className="col-md-6">
      <div className="card tabela-card h-100">
        <div className="card-header fw-semibold">Quantidade de Vendas dos Produtos</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-sm mb-0 align-middle text-center">
              <thead>
                <tr>
                  {produtos.length === 0
                    ? <th>—</th>
                    : produtos.map(([nome]) => <th key={nome}>{nome}</th>)
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  {produtos.length === 0
                    ? <td>0</td>
                    : produtos.map(([nome, qtd]) => <td key={nome}>{qtd}</td>)
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <GraficoProdutos produtos={produtos} />
        </div>
      </div>
    </div>
  );
}

// ================================================
//  COMPONENTE: Toast
// ================================================

function Toast({ mensagem, erro, visivel }) {
  if (!visivel) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 999999,
        minWidth: "250px",
      }}
      className="toast show"
    >
      <div
        className="toast-header"
        style={{ background: erro ? "#ffdddd" : "#c8e6c9" }}
      >
        <strong className="me-auto">Agro Connect</strong>
      </div>
      <div className="toast-body">{mensagem}</div>
    </div>
  );
}

// ================================================
//  COMPONENTE PRINCIPAL: Vendas
// ================================================

function Vendas() {
  const [vendas, setVendas] = useState(() => loadFromStorage());
  const [toast, setToast] = useState({ visivel: false, mensagem: "", erro: false });

  useEffect(() => {
    saveToStorage(vendas);
  }, [vendas]);

  useEffect(() => {
    if (toast.visivel) {
      const t = setTimeout(() => setToast((prev) => ({ ...prev, visivel: false })), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function showToast(mensagem, erro = false) {
    setToast({ visivel: true, mensagem, erro });
  }

  function handleSalvar(novaVenda) {
    setVendas((prev) => [...prev, novaVenda]);
  }

  const totalVendas = vendas.length.toString().padStart(2, "0");
  const totalClientes = new Set(vendas.map((v) => v.cliente)).size.toString().padStart(2, "0");
  const ultimaVenda = vendas.length ? vendas[vendas.length - 1] : null;

  const mapaClientes = new Map();
  vendas.forEach((v) => mapaClientes.set(v.cliente, (mapaClientes.get(v.cliente) || 0) + 1));
  let melhorCliente = "—";
  let maiorQtd = 0;
  mapaClientes.forEach((qtd, cli) => { if (qtd > maiorQtd) { maiorQtd = qtd; melhorCliente = cli; } });

  const mapaProdutos = new Map();
  vendas.forEach((v) => mapaProdutos.set(v.produto, (mapaProdutos.get(v.produto) || 0) + 1));
  let maisVendido = "—";
  let maiorProd = 0;
  mapaProdutos.forEach((qtd, prod) => { if (qtd > maiorProd) { maiorProd = qtd; maisVendido = prod; } });

  return (
    <main className="container p-5">
      <h2 className="fw-bolder text-center display-5" id="titulo-principal">
        {getMesAtual()}
      </h2>

      {/* Linha 1: resumos + última venda */}
      <div className="row g-3 align-items-stretch mb-3">
        <CardResumo titulo="Número de Vendas" valor={totalVendas} />
        <CardResumo titulo="Mais Vendido" valor={maisVendido} />

        <div className="col-md-6">
          <div className="card tabela-card h-100">
            <div className="card-header fw-semibold">Última Venda</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered table-sm mb-0 align-middle text-center">
                  <thead>
                    <tr>
                      <th>Data da Venda</th>
                      <th>Produto</th>
                      <th>Cliente</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <UltimaVenda venda={ultimaVenda} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linha 2: clientes + formulário */}
      <div className="row g-3 align-items-stretch">
        <CardResumo titulo="Clientes" valor={totalClientes} />
        <CardResumo titulo="Melhor Cliente" valor={melhorCliente} />
        <FormVenda onSalvar={handleSalvar} onToast={showToast} />
      </div>

      {/* Linha 3: tabela mensal + tabela produtos */}
      <div className="row g-3 mt-4">
        <TabelaMensal vendas={vendas} />
        <TabelaProdutos vendas={vendas} />
      </div>

      {/* Botão exportar CSV */}
      <div className="mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => exportCSV(vendas)}
        >
          Exportar CSV
        </button>
      </div>

      <FaleConoscoWidget />

      <Toast
        visivel={toast.visivel}
        mensagem={toast.mensagem}
        erro={toast.erro}
      />
    </main>
  );
}

export default Vendas;
