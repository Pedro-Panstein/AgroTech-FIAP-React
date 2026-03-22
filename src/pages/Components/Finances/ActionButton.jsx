function ActionButton({ icon, label, onClick }) {
  return (
    <button
      className="d-flex gap-2 align-items-center py-1 px-3 bg-tertiary rounded outline-2"
      onClick={onClick}
    >
      <img src={icon} width={20} height={20} alt={label} />
      <p className="m-0">{label}</p>
    </button>
  );
}

export default ActionButton;
