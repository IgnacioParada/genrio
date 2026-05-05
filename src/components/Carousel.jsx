import { useState, useEffect } from "react";

function Carousel() {

  const imagenes = [

    "images/banner1.png",
    "images/banner1.png",
    "images/banner1.png"

  ];

  const [indice,
    setIndice] =
      useState(0);

  useEffect(() => {

    const intervalo =
      setInterval(() => {

        setIndice((prev) =>
          (prev + 1) %
          imagenes.length
        );

      }, 3000);

    return () =>
      clearInterval(intervalo);

  }, []);

  return (

    <div style={styles.carousel}>

      <img
        src={imagenes[indice]}
        style={styles.imagen}
      />

    </div>

  );

}

const styles = {

  carousel: {
  width: "100%",
  overflow: "hidden"
},

imagen: {
  width: "100%",
  height: "auto"
}
};

export default Carousel;