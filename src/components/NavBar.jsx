import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { estaAutenticado, usuario, logout } = useAuth();
  const navigate = useNavigate();

  function manejarLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-marca">
        La Tienda
      </Link>

      <div className="navbar-links">
        {estaAutenticado ? (
          <>
            <Link to="/productos">Productos</Link>
            <Link to="/clima">Clima</Link>
            <span className="navbar-usuario">Hola, {usuario?.nombre}</span>
            <button className="btn-secundario" onClick={manejarLogout}>
              Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/registro">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
