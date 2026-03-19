import { useEffect, useRef } from "react";

function TutorialModal({ open, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!open && iframeRef.current) {
      iframeRef.current.src = "";
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-tutorial open">
      <div className="tutorial-content">
        <button
          type="button"
          className="btn-close float-end"
          aria-label="Fechar"
          onClick={onClose}
        ></button>

        <iframe
          ref={iframeRef}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/nZSm9ohrRm0"
          title="Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="btn-wrapper mt-3">
          <button className="btn btn-success w-100 mb-2" onClick={onClose}>
            Utilizar o sistema
          </button>
          <button className="btn btn-secondary w-100" onClick={onClose}>
            Pular tutorial
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorialModal;