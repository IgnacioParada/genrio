import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useState } from "react";
import "./components/PanelLayout.css";

import Tienda from "./pages/Tienda";
import Login from "./pages/Login";

import VerCarta from "./pages/VerCarta";
import AgregarCarta from "./pages/AgregarCarta";

import Sidebar from "./components/Sidebar";

/* 🛒 IMPORTAR CARRITO */
import { CarritoProvider } from "./components/CarritoContext";

/* 🛒 IMPORTAR COMPONENTE CARRITO */
import Carrito from "./components/Carrito";

function App() {

  const [cartaEditar,
    setCartaEditar] =
      useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  return (

    <CarritoProvider>

      <BrowserRouter>

        <Routes>

          {/* 🛍 TIENDA */}

          <Route
            path="/"
            element={
              <>
                <Tienda />

                {/* 🛒 CARRITO SOLO EN TIENDA */}
                <Carrito />
              </>
            }
          />

          {/* 🔐 LOGIN */}

          <Route
            path="/login"
            element={
              <Login setToken={setToken} />
            }
          />

          {/* 🔧 PANEL ADMIN */}

          <Route
            path="/panel/*"
            element={
              token
                ? (

                  <div className="panel-layout">

                    {/* PANEL LATERAL */}

                    <Sidebar
                      setCartaEditar={
                        setCartaEditar
                      }
                    />

                    {/* CONTENIDO */}

                    <div className="panel-content">

                      <Routes>

                        <Route
                          path="ver"
                          element={
                            <VerCarta
                              setCartaEditar={
                                setCartaEditar
                              }
                            />
                          }
                        />

                        <Route
                          path="agregar"
                          element={
                            <AgregarCarta
                              cartaEditar={
                                cartaEditar
                              }
                              setCartaEditar={
                                setCartaEditar
                              }
                            />
                          }
                        />

                        {/* ruta por defecto */}

                        <Route
                          path="*"
                          element={
                            <Navigate to="ver" />
                          }
                        />

                      </Routes>

                    </div>

                  </div>

                )
                : (
                  <Navigate to="/login" />
                )
            }
          />

        </Routes>

      </BrowserRouter>

    </CarritoProvider>

  );

}

export default App;