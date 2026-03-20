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

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowModal(false);
      }}
    >
      <div
        className="bg-white p-4 rounded-lg"
        style={{ width: "400px", maxWidth: "90%" }}
      >
        <div className="flex justify-between items-center mb-3">
          <h5 className="m-0 font-bold">Adicionar Transação</h5>
          <button
            className="close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Tipo:</label>
            <select name="tipo" className="w-full px-3 py-2 border rounded">
              <option value="ganho">Ganho</option>
              <option value="gasto">Gasto</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Descrição:</label>
            <input
              name="descricao"
              className="w-full px-3 py-2 border rounded"
              type="text"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">
              Valor (R$):
            </label>
            <input
              name="valor"
              className="w-full px-3 py-2 border rounded"
              type="number"
              step="0.01"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Data:</label>
            <input
              name="data"
              className="w-full px-3 py-2 border rounded"
              type="date"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
