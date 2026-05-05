import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerCarta.css";

function Cartas({ setCartaEditar }) {

  const navigate = useNavigate();

  const [cartas, setCartas] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [paginaActual, setPaginaActual] =
    useState(1);

  const cartasPorPagina = 5;

  // 🔎 CARGAR CARTAS

  useEffect(() => {

    obtenerCartas();

  }, []);

  const obtenerCartas = async () => {

    const response =
      await 
        fetch("https://api.hoc.cl/cartas"
      );

    const data =
      await response.json();

    setCartas(data);

  };

  // 🗑 ELIMINAR

  const eliminarCarta = async (id) => {

    const confirmar =
      confirm("¿Eliminar carta?");

    if (!confirmar) return;

    await fetch(
      `https://api.hoc.cl/cartas/${id}`,
      {
        method: "DELETE"
      }
    );

    obtenerCartas();

  };

  // 🔎 FILTRO

  const cartasFiltradas =
    cartas.filter((carta) =>
      carta.nombre
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  // 📄 PAGINACIÓN

  const indiceUltimaCarta =
    paginaActual * cartasPorPagina;

  const indicePrimeraCarta =
    indiceUltimaCarta -
    cartasPorPagina;

  const cartasActuales =
    cartasFiltradas.slice(
      indicePrimeraCarta,
      indiceUltimaCarta
    );

  const totalPaginas =
    Math.ceil(
      cartasFiltradas.length /
      cartasPorPagina
    );

  return (

    <div className="vercartas-container">

      <h2 className="vercartas-title">
        Lista de Cartas
      </h2>

      {/* 🔎 BUSCADOR */}

      <input
        className="vercartas-buscador"
        placeholder="Buscar carta..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
      />

      <table className="vercartas-tabla">

        <thead>

          <tr>

            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Edición</th>
            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {cartasActuales.map(
            (carta) => (

            <tr key={carta.id}>

              <td>

                <img
                  src={
                    "https://api.hoc.cl/uploads/" +
                    carta.imagen
                  }
                  className="carta-img"
                  alt={carta.nombre}
                />

              </td>

              <td>{carta.nombre}</td>

              <td>
                ${carta.precio}
              </td>

              <td>
                {carta.edicion}
              </td>

              <td>

                {/* ✏ EDITAR */}

                <button
                  className="btn-editar"
                  onClick={() => {

                    setCartaEditar(carta);

                    navigate(
                      "/panel/agregar"
                    );

                  }}
                >
                   Editar
                </button>

                {/* 🗑 ELIMINAR */}

                <button
                  className="btn-eliminar"
                  onClick={() =>
                    eliminarCarta(
                      carta.id
                    )
                  }
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* 📄 PAGINACIÓN */}

      <div className="paginacion">

        <button
          disabled={
            paginaActual === 1
          }
          onClick={() =>
            setPaginaActual(
              paginaActual - 1
            )
          }
        >
          ⬅ Anterior
        </button>

        <span
          style={{
            margin: "0 10px"
          }}
        >
          Página {paginaActual}
          de {totalPaginas}
        </span>

        <button
          disabled={
            paginaActual ===
            totalPaginas
          }
          onClick={() =>
            setPaginaActual(
              paginaActual + 1
            )
          }
        >
          Siguiente ➡
        </button>

      </div>

    </div>

  );

}

export default Cartas;