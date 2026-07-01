import axios from "axios";

// URL de la API desplegada en Render
const api = axios.create({
  baseURL: "https://latiendas.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Agrega el token JWT a cada petición si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Si el token expiró o es inválido, limpiamos la sesión
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