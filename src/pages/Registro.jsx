import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Registro() {
  const [form, setForm] = useState({
    TipoDoc: "",
    NroDoc: "",
    Nombre: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const { registrar } = useAuth();
  const navigate = useNavigate();

  function manejarCambio(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function manejarSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      // Roles: ajusta el id según los roles que tengas creados en tu BD.
      // 2 suele usarse como "Cliente" en proyectos de este tipo; cámbialo si
      // tu tabla Roles usa otro id.
      await registrar({ ...form, Roles: [2] });
      setExito(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const msj = err.response?.data?.msj || "No se pudo completar el registro.";
      setError(msj);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={manejarSubmit}>
        <h1>Crear cuenta</h1>
        <p className="auth-subtitle">Regístrate para comprar en La Tienda</p>

        {error && <div className="auth-error">{error}</div>}
        {exito && (
          <div className="auth-exito">
            Cuenta creada. Redirigiendo a inicio de sesión...
          </div>
        )}

        <label className="campo">
          <span>Nombre completo</span>
          <input
            name="Nombre"
            value={form.Nombre}
            onChange={manejarCambio}
            required
          />
        </label>

        <div className="campo-select">
          <select
            name="TipoDoc"
            value={form.TipoDoc}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="CC">Cédula de Ciudadanía (CC)</option>
            <option value="TI">Tarjeta de Identidad (TI)</option>
          </select>
          </div>

        <div className="campo-fila">
          <label className="campo">
            <span>Número de documento</span>
            <input
              name="NroDoc"
              value={form.NroDoc}
              onChange={manejarCambio}
              required
            />
          </label>
        </div>

        <label className="campo">
          <span>Correo electrónico</span>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={manejarCambio}
            required
          />
        </label>

        <label className="campo">
          <span>Contraseña</span>
          <input
            type="password"
            name="Password"
            value={form.Password}
            onChange={manejarCambio}
            required
          />
        </label>

        <button type="submit" disabled={cargando}>
          {cargando ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
