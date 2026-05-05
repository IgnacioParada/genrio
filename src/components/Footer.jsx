import { useState } from "react";
import "./Footer.css";

function Footer() {

  const [mostrarModal, setMostrarModal] = useState(false);

  // 🆕 NUEVO MODAL
  const [mostrarConsulta, setMostrarConsulta] =
    useState(false);

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* QUIÉNES SOMOS */}

        <div className="footer-section">

          <h3> Genrio Store</h3>

          <p>

            Somos una tienda dedicada a la venta de cartas
            individuales (singles) de Pokémon TCG.
            Ofrecemos cartas originales, en excelente
            estado y listas para tu colección o juego.

          </p>

        </div>

        {/* CONTACTO */}

        {/* CONTACTO */}

<div className="footer-section contact">

  <div className="contact-grid">

    {/* COLUMNA IZQUIERDA */}

    <div className="contact-left">

      <h3>📱 Contáctanos</h3>

      <a
        href="https://instagram.com/genrio.store"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >

        <img
          src="/icons/instagram.png"
          alt="Instagram"
          className="social-icon"
        />

        Instagram

      </a>

      <a
        href="https://wa.me/56963253840"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >

        <img
          src="/icons/whatsapp.png"
          alt="WhatsApp"
          className="social-icon"
        />

        WhatsApp

      </a>

    </div>


    {/* COLUMNA DERECHA */}

    <div className="contact-right">

      <button
        className="delivery-btn"
        onClick={() => setMostrarModal(true)}
      >

        📦 Métodos de entrega

      </button>

      <button
        className="delivery-btn"
        onClick={() => setMostrarConsulta(true)}
      >

        🧾 Consulta tu carta

      </button>

    </div>

  </div>

</div>

      </div>

      {/* COPYRIGHT */}

      <div className="footer-bottom">

        © 2026 Genrio Store — Todos los derechos reservados.

      </div>


      {/* ===================== */}
      {/* MODAL MÉTODOS ENTREGA */}
      {/* ===================== */}

      {mostrarModal && (

        <div
          className="modal-overlay"
          onClick={() => setMostrarModal(false)}
        >

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <h3>📦 Métodos de entrega</h3>

            <div className="delivery-info">

              📍 Entrega presencial en  
              <strong> Temuco — Salida Norte</strong>

              <br /><br />

              🚚 Envíos por pagar a todo Chile

              <div className="shipping-logos">

                <img
                  src="/icons/chilexpress.png"
                  alt="Chilexpress"
                />

                <img
                  src="/icons/starken.jpg"
                  alt="Starken"
                />

                <img
                  src="/icons/bluexpress.png"
                  alt="Bluexpress"
                />

              </div>

            </div>

            <button
              className="close-modal"
              onClick={() => setMostrarModal(false)}
            >

              Cerrar

            </button>

          </div>

        </div>

      )}


      {/* ===================== */}
      {/* 🆕 MODAL CONSULTA */}
      {/* ===================== */}

      {mostrarConsulta && (

        <div
          className="modal-overlay"
          onClick={() =>
            setMostrarConsulta(false)
          }
        >

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <h3>🧾 ¿Cómo consultar tu carta?</h3>

            <div className="delivery-info">

              🔎 Busca tu carta en la galería.

              <br /><br />

              🛒 Presiona
              <strong> "Agregar al carrito"</strong>.

              <br /><br />

              📦 Abre el carrito y revisa
              las cartas agregadas.

              <br /><br />

              💬 Presiona
              <strong>
                "Enviar por WhatsApp"
              </strong>
              para consultar disponibilidad.

              <br /><br />

              ⚡ Te responderemos lo antes posible
              con disponibilidad y detalles.

            </div>

            <button
              className="close-modal"
              onClick={() =>
                setMostrarConsulta(false)
              }
            >

              Entendido 👍

            </button>

          </div>

        </div>

      )}

    </footer>

  );

}

export default Footer;