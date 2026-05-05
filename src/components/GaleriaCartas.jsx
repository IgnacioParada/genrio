import { useEffect, useState } from "react";
import "./GaleriaCartas.css";

/* 🛒 IMPORTAR CARRITO */
import { useCarrito } from "../components/CarritoContext";

export default function GaleriaCartas() {

  const [cartas, setCartas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // 🔥 FILTROS NUEVOS
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [edicionFiltro, setEdicionFiltro] = useState("");

  // PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const cartasPorPagina = 8;

  // MODAL
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);

  /* 🛒 FUNCION CARRITO */
  const { agregarAlCarrito } = useCarrito();

  // CARGAR CARTAS
  useEffect(() => {
    fetch("https://api.hoc.cl/cartas")
      .then(res => res.json())
      .then(data => setCartas(data));
  }, []);

  // 🔥 OBTENER EDICIONES ÚNICAS
  const edicionesUnicas = [...new Set(cartas.map(c => c.edicion))];

  // 🔥 FILTRAR CARTAS
  const cartasFiltradas = cartas.filter(carta => {

    const coincideBusqueda =
      carta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      carta.edicion.toLowerCase().includes(busqueda.toLowerCase());

    const coincidePrecioMin =
      !precioMin || carta.precio >= Number(precioMin);

    const coincidePrecioMax =
      !precioMax || carta.precio <= Number(precioMax);

    const coincideEdicion =
      !edicionFiltro || carta.edicion === edicionFiltro;

    return (
      coincideBusqueda &&
      coincidePrecioMin &&
      coincidePrecioMax &&
      coincideEdicion
    );
  });

  // PAGINACIÓN
  const indiceUltima = paginaActual * cartasPorPagina;
  const indicePrimera = indiceUltima - cartasPorPagina;

  const cartasActuales =
    cartasFiltradas.slice(
      indicePrimera,
      indiceUltima
    );

  const totalPaginas =
    Math.ceil(
      cartasFiltradas.length /
      cartasPorPagina
    );

  const cambiarPagina = (num) => {
    setPaginaActual(num);
  };

  return (

    <div className="galeria-container">

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar carta..."
        className="buscador"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
      />

      {/* 🔥 FILTROS */}
      <div className="filtros">

        <input
          type="number"
          placeholder="Precio mínimo"
          value={precioMin}
          onChange={(e) => {
            setPrecioMin(e.target.value);
            setPaginaActual(1);
          }}
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={(e) => {
            setPrecioMax(e.target.value);
            setPaginaActual(1);
          }}
        />

        <select
          value={edicionFiltro}
          onChange={(e) => {
            setEdicionFiltro(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="">Todas las ediciones</option>

          {edicionesUnicas.map((ed, i) => (
            <option key={i} value={ed}>
              {ed}
            </option>
          ))}

        </select>

      </div>

      {/* GALERÍA */}
      <div className="galeria">

        {cartasActuales.map(carta => (

          <div
            key={carta.id}
            className="carta"
            onClick={() =>
              setCartaSeleccionada(carta)
            }
          >

            <img src={`https://api.hoc.cl/uploads/${carta.imagen}`} />

            <h3>{carta.nombre}</h3>

            <p>{carta.edicion}</p>

            <p>
              ${Number(carta.precio).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

      {/* PAGINACIÓN */}
      <div className="paginacion">

        {Array.from(
          { length: totalPaginas },
          (_, i) => (

            <button
              key={i}
              onClick={() =>
                cambiarPagina(i + 1)
              }
              className={
                paginaActual === i + 1
                  ? "activa"
                  : ""
              }
            >
              {i + 1}
            </button>

          )
        )}

      </div>

      {/* ===== MODAL ===== */}
      {cartaSeleccionada && (

        <div
          className="modal"
          onClick={() =>
            setCartaSeleccionada(null)
          }
        >

          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="btn-cerrar-modal"
              onClick={() =>
                setCartaSeleccionada(null)
              }
            >
              ✕
            </button>

            <img src={`https://api.hoc.cl/uploads/${cartaSeleccionada.imagen}`} />

            <h2>
              {cartaSeleccionada.nombre}
            </h2>

            <p className="edicion">
              {cartaSeleccionada.edicion}
            </p>

            <p className="precio-grande">
              $
              {Number(
                cartaSeleccionada.precio
              ).toLocaleString()}
            </p>

            <button
              className="btn-agregar-carrito"
              onClick={() => {
                agregarAlCarrito(cartaSeleccionada);
              }}
            >
              Agregar al carrito
            </button>

          </div>

        </div>

      )}

    </div>
  );
}