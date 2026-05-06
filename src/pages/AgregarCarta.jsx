import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarCarta.css";

function AgregarCarta({ cartaEditar, setCartaEditar }) {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [edicion, setEdicion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🧠 CARGAR DATOS AL EDITAR
  useEffect(() => {

    if (cartaEditar) {

      setNombre(cartaEditar.nombre);
      setPrecio(String(cartaEditar.precio));
      setEdicion(cartaEditar.edicion);

      setPreview(cartaEditar.imagen);

    } else {

      setNombre("");
      setPrecio("");
      setEdicion("");
      setImagen(null);
      setPreview(null);

    }

  }, [cartaEditar]);

  // 🖼 PREVIEW IMAGEN (solo visual)
  const manejarImagen = (e) => {

    const file = e.target.files[0];

    setImagen(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };

  // 💾 GUARDAR
  const guardarCarta = async () => {

    if (!precio || Number(precio) <= 0) {
      alert("Ingrese un precio válido");
      return;
    }

    const data = {
      nombre,
      precio: Number(precio),
      edicion,
      imagen: imagen 
    };

    try {

      // ✏️ EDITAR
      if (cartaEditar) {

        await fetch(
          `https://api.hoc.cl/cartas/${cartaEditar.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        );

        alert("Carta actualizada");

      }

      // ➕ AGREGAR
      else {

        await fetch(
          "https://api.hoc.cl/cartas",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        );

        alert("Carta agregada");

      }

      setCartaEditar(null);
      navigate("/panel/ver");

    } catch (error) {

      console.error(error);
      alert("Error al guardar");

    }

  };

  return (

    <div className="agregar-container">

      <h2 className="agregar-title">
        {cartaEditar ? "Editar Carta" : "Agregar Carta"}
      </h2>

      {/* PREVIEW */}
      {preview && (
        <img
          src={preview}
          className="preview-img"
          alt="preview"
        />
      )}

      <input
        className="agregar-input"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        className="agregar-input"
        placeholder="Precio"
        type="number"
        step="1"
        min="0"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <input
        className="agregar-input"
        placeholder="Edición"
        value={edicion}
        onChange={(e) => setEdicion(e.target.value)}
      />

      <input
  className="agregar-input"
  placeholder="URL de imagen"
  value={imagen || ""}
  onChange={(e) => {
    setImagen(e.target.value);
    setPreview(e.target.value);
  }}
/>

      <button
        className="btn-guardar"
        onClick={guardarCarta}
      >
        {cartaEditar ? "Actualizar Carta" : "Guardar Carta"}
      </button>

    </div>

  );

}

export default AgregarCarta;
