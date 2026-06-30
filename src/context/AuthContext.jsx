import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  async function login(email, password) {
    const res = await api.post("/Auth/login", {
      Email: email,
      Password: password,
    });

    const { token, nombre, roles } = res.data;
    const datosUsuario = { nombre, roles };

    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);

    return datosUsuario;
  }

  async function registrar(datos) {
    // datos: { TipoDoc, NroDoc, Nombre, Email, Password, Roles }
    const res = await api.post("/Auth/Registrar", datos);
    return res.data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  const estaAutenticado = !!localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ usuario, estaAutenticado, login, registrar, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return ctx;
}
