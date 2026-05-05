import { Link } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ setCartaEditar }) {

  const [abierto, setAbierto] =
    useState(false);

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href =
      "/login";

  };

  const toggleMenu = () => {

    setAbierto(!abierto);

  };

  const cerrarMenu = () => {

    setAbierto(false);

  };

  return (

    <>
      {/* BOTÓN HAMBURGUESA */}

      <button
        className="hamburger"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* FONDO OSCURO */}

      {abierto && (

        <div
          className="overlay"
          onClick={cerrarMenu}
        />

      )}

      {/* SIDEBAR */}

      <div
        className={
          abierto
            ? "sidebar open"
            : "sidebar"
        }
      >

        {/* LOGO */}

        <img
          src="/images/logo.png"
          alt="Genrio Store"
          className="sidebar-logo"
        />

        <h2 className="sidebar-title">
          Panel
        </h2>

        {/* LINKS */}

        <Link
          to="/panel/ver"
          className="sidebar-link"
          onClick={cerrarMenu}
        >
          📋 Ver Cartas
        </Link>

        <Link
          to="/panel/agregar"
          className="sidebar-link"
          onClick={() => {

            setCartaEditar(null);
            cerrarMenu();

          }}
        >
          ➕ Agregar Carta
        </Link>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="logout-btn"
        >
          Cerrar sesión
        </button>

      </div>

    </>

  );

}

export default Sidebar;