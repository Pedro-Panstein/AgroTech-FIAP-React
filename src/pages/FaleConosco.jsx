import { useState } from "react"
import checkGIF from "../assets/checkGIF.gif"
import "../css/faleConosco.css"

function FaleConosco() {
  const [validated, setValidated] = useState(false)
  const [showModal, setShowModal] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      setValidated(true)
      return
    }

    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      form.reset()
      setValidated(false)
    }, 3000)
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">
          <i className="bi bi-chat-dots-fill text-success me-3"></i>
          Fale Conosco
        </h1>
        <p className="text-muted mb-4">
          Estamos aqui para ajudar! Entre em contato conosco pelo formulário abaixo.
        </p>
        <div className="alert alert-info d-inline-flex align-items-center mb-0">
          <i className="bi bi-info-circle-fill me-2"></i>
          Responderemos o mais breve possível, geralmente em até 24 horas.
        </div>
      </div>

      <div className="row g-4">
        {/* Formulário */}
        <div className="col-lg-7">
          <div className="card shadow border-0 rounded-4">
            <div className="card-header bg-success text-white py-3 rounded-top-4">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-pencil-square me-2"></i>Envie sua Mensagem
              </h3>
            </div>
            <div className="card-body p-4">
              <form className={validated ? "was-validated" : ""} noValidate onSubmit={handleSubmit}>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1 text-uppercase small">
                    <i className="bi bi-person-fill text-success me-2"></i>
                    Nome completo <span className="text-danger">*</span>
                  </h6>
                  <input type="text" className="form-control" placeholder="Digite seu nome completo" required />
                  <div className="invalid-feedback">Por favor, insira seu nome completo.</div>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1 text-uppercase small">
                    <i className="bi bi-envelope-fill text-success me-2"></i>
                    Email <span className="text-danger">*</span>
                  </h6>
                  <input type="email" className="form-control" placeholder="seuemail@exemplo.com" required />
                  <div className="invalid-feedback">Por favor, insira um e-mail válido.</div>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1 text-uppercase small">
                    <i className="bi bi-tag-fill text-success me-2"></i>
                    Assunto <span className="text-danger">*</span>
                  </h6>
                  <input type="text" className="form-control" placeholder="Qual o assunto da sua mensagem?" required />
                  <div className="invalid-feedback">Por favor, insira o assunto da mensagem.</div>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1 text-uppercase small">
                    <i className="bi bi-chat-text-fill text-success me-2"></i>
                    Mensagem <span className="text-danger">*</span>
                  </h6>
                  <textarea className="form-control" rows="5" placeholder="Digite sua mensagem aqui..." minLength="10" required></textarea>
                  <div className="invalid-feedback">Por favor, insira uma mensagem com pelo menos 10 caracteres.</div>
                  <small className="text-muted"><i className="bi bi-info-circle me-1"></i>Mínimo de 10 caracteres.</small>
                </div>

                <div className="mb-3">
                  <div className="form-check p-3 bg-light rounded-3">
                    <input className="form-check-input" type="checkbox" id="aceitoTermos" required />
                    <span className="fw-bold small">
                      Aceito os <a href="#" className="text-success text-decoration-none">Termos de Serviço</a> e
                      as <a href="#" className="text-success text-decoration-none">Políticas de Privacidade</a>
                      <span className="text-danger"> *</span>
                    </span>
                    <div className="invalid-feedback">Você deve aceitar os termos para continuar.</div>
                  </div>
                </div>

                <button type="submit" className="btn btn-success w-100 py-3 fw-bold">
                  <i className="bi bi-send-fill me-2"></i>Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="col-lg-5">
          <div className="card shadow border-0 rounded-4 mb-4">
            <div className="card-header bg-success text-white py-3 rounded-top-4">
              <h3 className="mb-0 fw-bold">
                <i className="bi bi-telephone-fill me-2"></i>Informações de Contato
              </h3>
            </div>
            <div className="card-body p-4">
              <div className="d-flex align-items-start mb-3 p-3 bg-light rounded-3">
                <div className="bg-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{width: 45, height: 45, minWidth: 45}}>
                  <i className="bi bi-envelope-fill text-white"></i>
                </div>
                <div className="ms-3" style={{minWidth: 0}}>
                  <h6 className="fw-bold mb-1 text-uppercase small">Email</h6>
                  <a href="mailto:suporte@agroconnect.com.br" className="text-success text-decoration-none text-break">
                    suporte@agroconnect.com.br
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3 p-3 bg-light rounded-3">
                <div className="bg-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{width: 45, height: 45, minWidth: 45}}>
                  <i className="bi bi-telephone-fill text-white"></i>
                </div>
                <div className="ms-3" style={{minWidth: 0}}>
                  <h6 className="fw-bold mb-1 text-uppercase small">Telefone</h6>
                  <a href="tel:+5511910101833" className="text-success text-decoration-none text-break">
                    (11) 91010-1833
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3 p-3 bg-light rounded-3">
                <div className="bg-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{width: 45, height: 45, minWidth: 45}}>
                  <i className="bi bi-clock-fill text-white"></i>
                </div>
                <div className="ms-3" style={{minWidth: 0}}>
                  <h6 className="fw-bold mb-1 text-uppercase small">Horário de Atendimento</h6>
                  <p className="text-muted mb-0">Segunda a Sexta: 8h às 18h</p>
                  <span className="badge bg-secondary mt-1">Sábado e Domingo: Fechado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-4 text-center">
              <i className="bi bi-headset text-success" style={{fontSize: "3rem"}}></i>
              <h5 className="fw-bold mt-3 mb-3">Precisa de Ajuda Imediata?</h5>
              <p className="text-muted mb-3">
                Nossa equipe está pronta para atendê-lo durante o horário comercial.
              </p>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-success fw-bold">
                  <i className="bi bi-whatsapp me-2"></i>WhatsApp
                </button>
                <button className="btn btn-outline-primary fw-bold">
                  <i className="bi bi-chat-dots me-2"></i>Chat Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de sucesso */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box text-center">
            <img src={checkGIF} width="100" height="100" alt="Sucesso" className="rounded-circle mb-3" />
            <h3 className="fw-bold text-success">
              <i className="bi bi-check-circle-fill me-2"></i>Mensagem Enviada!
            </h3>
            <p className="text-muted mt-2">Recebemos sua mensagem e entraremos em contato em breve.</p>
            <div className="alert alert-success mt-3 mb-0">
              <i className="bi bi-clock-history me-2"></i>
              <strong>Prazo de resposta:</strong> Até 24 horas úteis
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FaleConosco
