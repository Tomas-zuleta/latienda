import axios from "axios";

// 👉 Cambia esto por la URL real de tu API en Somee
const api = axios.create({
  baseURL: "http://latiendatomas.somee.com/api",
});

// Agrega el token a cada petición si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el token expiró o es inválido, el servidor responde 401.
// En ese caso, limpiamos sesión para forzar un nuevo login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
    return Promise.reject(error);
  }
);

export default api;
