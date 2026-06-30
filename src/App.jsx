import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Productos from "./pages/Productos";
import Clima from "./pages/Clima";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main className="contenido">
          <Routes>
            <Route path="/" element={<Navigate to="/productos" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route
              path="/productos"
              element={
                <RutaProtegida>
                  <Productos />
                </RutaProtegida>
              }
            />
            <Route
              path="/clima"
              element={
                <RutaProtegida>
                  <Clima />
                </RutaProtegida>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
