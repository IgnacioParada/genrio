import { useState, useEffect } from "react";
import GaleriaCartas from "../components/GaleriaCartas";
import "./Home.css";

export default function Home() {

  const images = [
    "/images/slider1.png",
    "/images/slider2.png",
    "/images/slider.png"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="home">

      <div className="container">

        <img
          src="/images/logo.png"
          className="logo"
          alt="Logo"
        />

        <div className="slider">

          <img
            src={images[current]}
            className="slider-image"
            alt="slider"
          />

        </div>

        <div className="social">

          <a href="#">
            <img src="/images/facebook.png" alt="Facebook" />
          </a>

          <a href="#">
            <img src="/images/instagram.png" alt="Instagram" />
          </a>

        </div>

        <GaleriaCartas />

      </div>

    </div>

  );
}