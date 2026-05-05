import AgregarCarta from "./AgregarCarta";
import VerCartas from "./VerCarta";
import { useEffect, useState } from "react";
import "./Panel.css";

function Panel() {

  const [seccion, setSeccion] = useState("inicio");
  const [cartaEditar, setCartaEditar] =
    useState(null);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      window.location.href = "/";

    }

  }, []);

  return (

    <div className="panel-container">

      {/* MENÚ */}

      <div className="panel-menu">

        <h2 className="panel-title">
          Panel
        </h2>

        <button
          className="menu-btn"
          onClick={() =>
            setSeccion("inicio")
          }
        >
          🏠 Inicio
        </button>

        <button
          className="menu-btn"
          onClick={() => {

            setCartaEditar(null);
            setSeccion("agregar");

          }}
        >
          ➕ Agregar Carta
        </button>

        <button
          className="menu-btn"
          onClick={() =>
            setSeccion("lista")
          }
        >
          📋 Ver Cartas
        </button>

        <button
          className="logout-btn"
          onClick={() => {

            localStorage.removeItem("token");

            window.location.href = "/";

          }}
        >
          🚪 Cerrar sesión
        </button>

      </div>

      {/* CONTENIDO */}

      <div className="panel-content">

        {seccion === "inicio" && (
          <h1>Bienvenido 🚀</h1>
        )}

        {seccion === "agregar" && (

          <AgregarCarta
            cartaEditar={cartaEditar}
            setCartaEditar={setCartaEditar}
          />

        )}

        {seccion === "lista" && (

          <VerCartas
            setSeccion={setSeccion}
            setCartaEditar={setCartaEditar}
          />

        )}

      </div>

    </div>

  );

}

export default Panel;