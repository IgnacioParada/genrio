import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setToken }) {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const login = async () => {

    setError("");

    try {

      const response =
        await 
          fetch("https://api.hoc.cl/api/login", 
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              email,
              password
            })
          }
        );

      const data =
        await response.json();

      if (data.token) {

        // guardar token
        localStorage.setItem(
          "token",
          data.token
        );

        // actualizar estado
        setToken(data.token);

        // ir al panel
        navigate("/panel");

      } else {

        setError(
          "Email o contraseña incorrectos"
        );

      }

    } catch (err) {

      setError(
        "No se pudo conectar al servidor"
      );

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        {/* LOGO */}

        <img
          src="/images/logo.png"
          alt="Genrio Store"
          className="login-logo"
        />

        <h2>Panel Administrador</h2>

        {/* ERROR */}

        {error && (

          <div className="error-box">
            {error}
          </div>

        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Ingresar
        </button>

      </div>

    </div>

  );

}

export default Login;