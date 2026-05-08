import { useState, useRef, useEffect } from "react";
import { useCarrito } from "../components/CarritoContext";
import "./Carrito.css";

function Carrito() {

  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito
  } = useCarrito();

  const [abierto, setAbierto] =
    useState(false);

  // REFERENCIA AL PANEL
  const panelRef = useRef(null);
  const botonRef = useRef(null);

  const toggleCarrito = () => {
    setAbierto(!abierto);
  };

  // 🔴 CERRAR AL HACER CLICK AFUERA
  useEffect(() => {

    function handleClickFuera(event) {

      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        botonRef.current &&
        !botonRef.current.contains(event.target)
      ) {

        setAbierto(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickFuera
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickFuera
      );

    };

  }, []);

  const enviarWhatsApp = () => {

    if (carrito.length === 0) return;

    let mensaje =
      "Hola, quisiera consultar por disponibilidad de estas cartas:%0A%0A";

    carrito.forEach(carta => {

      mensaje +=
        `• ${carta.nombre} — $${carta.precio}%0A`;

    });

    mensaje += "%0AGracias.";

    const numero = "56963253840";

    const url =
      `https://wa.me/${numero}?text=${mensaje}`;

    window.open(url, "_blank");

  };

  return (

    <>

      {/* BOTÓN */}

      <div
        className="carrito-boton"
        onClick={toggleCarrito}
        ref={botonRef}
      >

        <img
          src="/icons/carrito.png"
          alt="Carrito"
          className="icono-carrito"
        />

        {carrito.length > 0 && (

          <span className="carrito-contador">

            {carrito.length}

          </span>

        )}

      </div>


      {/* PANEL */}

      {abierto && (

        <div
          className="carrito-panel"
          ref={panelRef}
        >

          <h3>🛒 Carrito</h3>

          {carrito.length === 0 ? (

            <p>No hay cartas agregadas.</p>

          ) : (

            carrito.map((carta, index) => (

              <div
                key={carta.id}
                className="carrito-item"
              >

                {/* IMAGEN */}

                <img
  src={carta.imagen}
  alt={carta.nombre}
  className="carrito-img"
  onError={(e) => {
    e.target.src = "/images/no-image.png";
  }}
/>

                {/* INFO */}

                <div className="carrito-info">

                  <span className="nombre">
                    {carta.nombre}
                  </span>

                  <span className="precio">
                    ${carta.precio}
                  </span>

                </div>

                {/* ELIMINAR */}

    <button
  onClick={(e) => {

    e.stopPropagation();

    eliminarDelCarrito(index);

  }}
>

  ❌

</button>

              </div>

            ))

          )}

          {carrito.length > 0 && (

            <>

              <button
                className="btn-whatsapp"
                onClick={enviarWhatsApp}
              >

                💬 Enviar por WhatsApp

              </button>

              <button
                className="btn-vaciar"
                onClick={vaciarCarrito}
              >

                Vaciar carrito

              </button>

            </>

          )}

        </div>

      )}

    </>

  );

}

export default Carrito;