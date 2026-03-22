import { CircleIcon } from "./Icons";

function Transaction({ type, title, value }) {
  return (
    <div
      className={`d-flex flex-wrap gap-2 bg-${type} p-3 align-items-center rounded`}
    >
      <CircleIcon color={type} />
      <span className="flex-grow-1 fw-bolder">{title}</span>
      <span className="fw-bold">{value}</span>
    </div>
  );
}

export default Transaction;
