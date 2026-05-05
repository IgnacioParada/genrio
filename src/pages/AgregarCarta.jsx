import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarCarta.css";

function AgregarCarta({
  cartaEditar,
  setCartaEditar
}) {

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
      setPrecio(String(cartaEditar.precio)); // 🔥 FIX
      setEdicion(cartaEditar.edicion);

      setPreview(
        "https://api.hoc.cl/uploads/" +
        cartaEditar.imagen
      );

    } else {

      setNombre("");
      setPrecio("");
      setEdicion("");
      setImagen(null);
      setPreview(null);

    }

  }, [cartaEditar]);

  // 🖼 PREVIEW IMAGEN
  const manejarImagen = (e) => {

    const file = e.target.files[0];

    setImagen(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };

  // 💾 GUARDAR
  const guardarCarta = async () => {

    // 🔥 VALIDACIÓN
    if (!precio || Number(precio) <= 0) {
      alert("Ingrese un precio válido");
      return;
    }

    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("precio", Number(precio)); // 🔥 FIX
    formData.append("edicion", edicion);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    // ✏️ EDITAR
    if (cartaEditar) {

      await fetch(
        `https://api.hoc.cl/cartas/${cartaEditar.id}`,
        {
          method: "PUT",
          body: formData
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
          body: formData
        }
      );

      alert("Carta agregada");

    }

    setCartaEditar(null);
    navigate("/panel/ver");

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
        type="file"
        onChange={manejarImagen}
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

