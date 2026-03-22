export default function NewTransactionModal({
  showModal,
  setShowModal,
  onSave,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const tipo = e.target.tipo.value;
    const descricao = e.target.descricao.value.trim();
    const valor = parseFloat(e.target.valor.value);
    const data = e.target.data.value;

    if (!descricao || !valor || !data) {
      alert("Preencha todos os campos.");
      return;
    }

    onSave({ tipo, descricao, valor, data });
    setShowModal(false);
    e.target.reset();
  };

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowModal(false);
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Adicionar Transação</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="text-black form-label">Tipo:</label>
                <select name="tipo" className="form-select">
                  <option value="ganho">Ganho</option>
                  <option value="gasto">Gasto</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="text-black form-label">Descrição:</label>
                <input
                  name="descricao"
                  type="text"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="text-black form-label">Valor (R$):</label>
                <input
                  name="valor"
                  type="number"
                  step="0.01"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="text-black form-label">Data:</label>
                <input
                  name="data"
                  type="date"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}