// ================================================
//  AGRO CONNECT — Calculadora de Safra (React)
//  Fase 5 — Nova funcionalidade
// ================================================

import { useState } from "react";
import FaleConoscoWidget from "./Components/FaleConoscoWidget.jsx";

// ================================================
//  CULTURAS com unidade padrão e produtividade
//  média de referência (sacas/ha ou ton/ha)
// ================================================

const CULTURAS = [
  { nome: "Soja",    unidade: "sacas", refProdHa: 58  },
  { nome: "Milho",   unidade: "sacas", refProdHa: 180 },
  { nome: "Trigo",   unidade: "sacas", refProdHa: 50  },
  { nome: "Café",    unidade: "sacas", refProdHa: 30  },
  { nome: "Algodão", unidade: "ton",   refProdHa: 4   },
  { nome: "Arroz",   unidade: "sacas", refProdHa: 100 },
  { nome: "Feijão",  unidade: "sacas", refProdHa: 25  },
  { nome: "Outra",   unidade: "sacas", refProdHa: null },
];

// ================================================
//  UTILITÁRIOS
// ================================================

function formatBRL(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getStatus(margem) {
  if (margem >= 20) return { label: "✅ Lucrativo",           icone: "✅", texto: "Lucrativo",           cor: "card-bg-green", textoCor: "card-text-green" };
  if (margem >= 0)  return { label: "⚠️ Ponto de Equilíbrio", icone: "⚠️", texto: "Ponto de Equilíbrio", cor: "card-bg-blue",  textoCor: "card-text-blue"  };
  return               { label: "❌ Prejuízo",               icone: "❌", texto: "Prejuízo",             cor: "card-bg-red",   textoCor: "card-text-red"   };
}

function imprimirRelatorio() {
  window.print();
}

// ================================================
//  COMPONENTE: CardResultado
// ================================================

function CardResultado({ titulo, valor, corBg, corTexto, icone }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className={`py-3 px-4 ${corBg} d-flex flex-column gap-2 h-100`} style={{ borderRadius: "16px" }}>
        <div className="d-flex align-items-center justify-content-between">
          <span className="fs-6 fw-bold">{titulo}</span>
          <span style={{ fontSize: "1.4rem" }}>{icone}</span>
        </div>
        <h3 className={`fs-4 fw-bolder ${corTexto} mb-0`}>{valor}</h3>
      </div>
    </div>
  );
}

// ================================================
//  COMPONENTE: FormularioCalculo
// ================================================

function FormularioCalculo({ onCalcular, onLimpar }) {
  const [cultura, setCultura] = useState("Soja");
  const [area, setArea] = useState("");
  const [producao, setProducao] = useState("");
  const [preco, setPreco] = useState("");
  const [custo, setCusto] = useState("");
  const [erro, setErro] = useState("");

  const culturaObj = CULTURAS.find((c) => c.nome === cultura);

  function handleCalcular() {
    const areaNum     = parseFloat(area.replace(",", "."));
    const producaoNum = parseFloat(producao.replace(",", "."));
    const precoNum    = parseFloat(preco.replace(",", "."));
    const custoNum    = parseFloat(custo.replace(",", "."));

    if (!cultura || isNaN(areaNum) || isNaN(producaoNum) || isNaN(precoNum) || isNaN(custoNum)) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }
    if (areaNum <= 0 || producaoNum <= 0 || precoNum <= 0 || custoNum < 0) {
      setErro("Os valores devem ser maiores que zero.");
      return;
    }

    setErro("");
    onCalcular({ cultura, unidade: culturaObj.unidade, refProdHa: culturaObj.refProdHa, areaNum, producaoNum, precoNum, custoNum });
  }

  function handleLimpar() {
    setCultura("Soja");
    setArea("");
    setProducao("");
    setPreco("");
    setCusto("");
    setErro("");
    onLimpar();
  }

  return (
    <div className="card tabela-card">
      <div className="card-header fw-semibold fs-5">🌱 Dados da Safra</div>
      <div className="card-body p-4">
        <div className="row g-4">

          {/* Cultura */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold d-block mb-1">🌿 Cultura</label>
            <small className="text-muted d-block mb-2">Selecione o tipo de plantação</small>
            <select
              className="form-select"
              value={cultura}
              onChange={(e) => setCultura(e.target.value)}
            >
              {CULTURAS.map((c) => (
                <option key={c.nome} value={c.nome}>{c.nome}</option>
              ))}
            </select>
          </div>

          {/* Área */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold d-block mb-1">📐 Área Plantada</label>
            <small className="text-muted d-block mb-2">Informe o total em hectares (ha)</small>
            <input
              type="number"
              className="form-control"
              placeholder="Ex: 100"
              min="0"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          {/* Produção estimada */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-bold d-block mb-1">📦 Produção Estimada</label>
            <small className="text-muted d-block mb-2">Total esperado em {culturaObj.unidade}</small>
            <input
              type="number"
              className="form-control"
              placeholder={`Ex: ${culturaObj.refProdHa ? culturaObj.refProdHa * 100 : 5000}`}
              min="0"
              value={producao}
              onChange={(e) => setProducao(e.target.value)}
            />
          </div>

          {/* Preço por unidade */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold d-block mb-1">
              💵 Preço por {culturaObj.unidade === "ton" ? "Tonelada (R$)" : "Saca (R$)"}
            </label>
            <small className="text-muted d-block mb-2">
              Valor de venda de <strong>cada {culturaObj.unidade === "ton" ? "tonelada" : "saca"}</strong> individualmente, em reais
            </small>
            <input
              type="number"
              className="form-control"
              placeholder="Ex: 130,00"
              min="0"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>

          {/* Custo total */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold d-block mb-1">💸 Custo Total de Produção</label>
            <small className="text-muted d-block mb-2">Soma de todos os gastos em reais (R$)</small>
            <input
              type="number"
              className="form-control"
              placeholder="Ex: 80000,00"
              min="0"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
            />
          </div>
        </div>

        {/* Erro */}
        {erro && (
          <div className="alert mt-3 mb-0 py-2" style={{ backgroundColor: "#ffdddd", border: "1px solid #dd1133", borderRadius: "8px", color: "#dd1133" }}>
            {erro}
          </div>
        )}

        {/* Botões */}
        <div className="d-flex gap-3 mt-4">
          <button
            className="btn w-100 fw-bold text-white"
            style={{ backgroundColor: "var(--secondary-color)", borderRadius: "14px" }}
            onClick={handleCalcular}
          >
            CALCULAR SAFRA
          </button>
          <button
            className="btn btn-outline-secondary w-100 fw-bold"
            style={{ borderRadius: "14px" }}
            onClick={handleLimpar}
          >
            LIMPAR
          </button>
        </div>
      </div>
    </div>
  );
}

// ================================================
//  COMPONENTE: Relatorio
// ================================================

function Relatorio({ resultado }) {
  if (!resultado) return null;

  const {
    cultura, unidade, refProdHa,
    areaNum, producaoNum, precoNum, custoNum,
  } = resultado;

  const produtividadeHa = producaoNum / areaNum;
  const receitaBruta    = producaoNum * precoNum;
  const lucro           = receitaBruta - custoNum;
  const margem          = (lucro / receitaBruta) * 100;
  const status          = getStatus(margem);

  const abaixoMedia = refProdHa && produtividadeHa < refProdHa * 0.8;
  const acimaMedia  = refProdHa && produtividadeHa > refProdHa * 1.2;

  return (
    <div id="area-relatorio">
      {/* Título do relatório */}
      <div
        className="d-flex flex-wrap align-items-center justify-content-between mb-4 p-3 rounded"
        style={{ backgroundColor: "var(--secondary-opacity)", borderRadius: "12px" }}
      >
        <div>
          <h4 className="fw-bold mb-1" style={{ color: "var(--primary-color)" }}>
            📋 Relatório de Safra — {cultura}
          </h4>
          <span className="text-muted">Área: {areaNum.toLocaleString("pt-BR")} ha &nbsp;|&nbsp; Produção: {producaoNum.toLocaleString("pt-BR")} {unidade}</span>
        </div>

      </div>

      {/* Cards de resultado */}
      <div className="row g-3 mb-4">
        <CardResultado
          titulo="Produtividade / ha"
          valor={`${produtividadeHa.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${unidade}/ha`}
          corBg="card-bg-blue"
          corTexto="card-text-blue"
          icone="📊"
        />
        <CardResultado
          titulo="Receita Bruta"
          valor={formatBRL(receitaBruta)}
          corBg="card-bg-green"
          corTexto="card-text-green"
          icone="💰"
        />
        <CardResultado
          titulo="Lucro Estimado"
          valor={formatBRL(lucro)}
          corBg={lucro >= 0 ? "card-bg-green" : "card-bg-red"}
          corTexto={lucro >= 0 ? "card-text-green" : "card-text-red"}
          icone={lucro >= 0 ? "📈" : "📉"}
        />
        <CardResultado
          titulo="Margem de Lucro"
          valor={`${margem.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`}
          corBg={status.cor}
          corTexto={status.textoCor}
          icone="🎯"
        />
      </div>

      {/* Status geral */}
      <div
        className={`p-3 rounded mb-4 d-flex align-items-center gap-3 ${status.cor}`}
        style={{ borderRadius: "12px" }}
      >
        <span className="fs-4">{status.icone}</span>
        <div>
          <strong className={`fs-5 ${status.textoCor}`}>{status.texto}</strong>
          <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
            {lucro >= 0
              ? `A safra de ${cultura} apresenta retorno positivo com margem de ${margem.toFixed(1)}%.`
              : `O custo de produção supera a receita em ${formatBRL(Math.abs(lucro))}.`}
          </p>
        </div>
      </div>

      {/* Tabela detalhada */}
      <div className="card tabela-card">
        <div className="card-header fw-semibold">Detalhamento Completo</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered table-sm mb-0 align-middle">
              <tbody>
                <tr>
                  <td className="fw-bold" style={{ width: "50%", backgroundColor: "#f9f9f9" }}>Cultura</td>
                  <td>{cultura}</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Área Plantada</td>
                  <td>{areaNum.toLocaleString("pt-BR")} ha</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Produção Total Estimada</td>
                  <td>{producaoNum.toLocaleString("pt-BR")} {unidade}</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Produtividade por Hectare</td>
                  <td>
                    {produtividadeHa.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} {unidade}/ha
                    {refProdHa && (
                      <span className={`ms-2 badge ${acimaMedia ? "bg-success" : abaixoMedia ? "bg-danger" : "bg-secondary"}`}>
                        {acimaMedia ? "Acima da média" : abaixoMedia ? "Abaixo da média" : "Na média"}
                        {" "}(ref: {refProdHa} {unidade}/ha)
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Preço por {unidade === "ton" ? "Tonelada" : "Saca"}</td>
                  <td>{formatBRL(precoNum)}</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Receita Bruta</td>
                  <td className="card-text-green fw-bold">{formatBRL(receitaBruta)}</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Custo Total de Produção</td>
                  <td className="card-text-red fw-bold">{formatBRL(custoNum)}</td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Lucro Estimado</td>
                  <td className={`fw-bold ${lucro >= 0 ? "card-text-green" : "card-text-red"}`}>
                    {formatBRL(lucro)}
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Margem de Lucro</td>
                  <td className={`fw-bold ${lucro >= 0 ? "card-text-green" : "card-text-red"}`}>
                    {margem.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold" style={{ backgroundColor: "#f9f9f9" }}>Status</td>
                  <td className="fw-bold">{status.label}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================
//  COMPONENTE PRINCIPAL: Calculadora
// ================================================

function Calculadora() {
  const [resultado, setResultado] = useState(null);

  function handleCalcular(dados) {
    setResultado(dados);
    setTimeout(() => {
      const el = document.getElementById("area-relatorio");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleLimpar() {
    setResultado(null);
  }

  return (
    <main className="container p-4 p-md-5">
      <h2 className="fw-bolder display-5 mb-1" style={{ color: "var(--primary-color)" }}>
        🌱 Calculadora de Safra
      </h2>
      <p className="text-muted mb-4">
        Informe os dados da sua lavoura e calcule a produtividade, receita e lucro estimado.
      </p>

      <FormularioCalculo onCalcular={handleCalcular} onLimpar={handleLimpar} />

      {resultado && (
        <div className="mt-5">
          <Relatorio resultado={resultado} />
        </div>
      )}

      <FaleConoscoWidget />
    </main>
  );
}

export default Calculadora;
