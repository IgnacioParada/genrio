import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {

  /* 🔄 CARGAR DESDE LOCALSTORAGE */

  const [carrito, setCarrito] = useState(() => {

    const guardado =
      localStorage.getItem("carrito");

    return guardado
      ? JSON.parse(guardado)
      : [];

  });

  /* 💾 GUARDAR EN LOCALSTORAGE */

  useEffect(() => {

    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );

  }, [carrito]);


  /* AGREGAR */

  const agregarAlCarrito = (carta) => {

    setCarrito(prev => [

      ...prev,

      carta

    ]);

  };


  /* ELIMINAR */

  const eliminarDelCarrito = (index) => {

    setCarrito(prev =>
      prev.filter((_, i) =>
        i !== index
      )
    );

  };


  /* VACIAR */

  const vaciarCarrito = () => {

    setCarrito([]);

  };


  return (

    <CarritoContext.Provider
      value={{

        carrito,

        agregarAlCarrito,

        eliminarDelCarrito,

        vaciarCarrito

      }}
    >

      {children}

    </CarritoContext.Provider>

  );

}


export function useCarrito() {

  return useContext(CarritoContext);

}