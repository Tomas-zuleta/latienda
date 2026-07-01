import { useEffect, useState } from "react";
import api from "../api/axios";
import FormularioProducto from "../components/FormularioProducto";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  async function cargarProductos() {
    setCargando(true);
    setError("");

    try {
      const res = await api.get("/Producto/Lista");
      setProductos(res.data.response ?? []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  async function manejarGuardar(datos) {
    setGuardando(true);
    setError("");

    try {
      if (productoEditando) {
        await api.put(
          `/Producto/Editar/${productoEditando.idProducto}`,
          datos
        );
      } else {
        await api.post("/Producto/Guardar", datos);
      }

      setMostrarForm(false);
      setProductoEditando(null);
      await cargarProductos();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar el producto.");
    } finally {
      setGuardando(false);
    }
  }

  async function manejarEliminar(idProducto) {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      await api.delete(`/Producto/Eliminar/${idProducto}`);
      await cargarProductos();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el producto.");
    }
  }

  async function abrirEdicion(producto) {
    try {
      const res = await api.get(`/Producto/Obtener/${producto.idProducto}`);

      setProductoEditando(res.data.response);
      setMostrarForm(true);
    } catch (err) {
      console.error(err);

      // Si falla el Obtener, usa los datos que ya tenía
      setProductoEditando(producto);
      setMostrarForm(true);
    }
  }

  function abrirNuevo() {
    setProductoEditando(null);
    setMostrarForm(true);
  }

  return (
    <div className="pagina">
      <div className="pagina-header">
        <h1>Productos</h1>

        <button onClick={abrirNuevo}>
          + Nuevo producto
        </button>
      </div>

      {error && <div className="auth-error">{error}</div>}

      {mostrarForm && (
        <FormularioProducto
          productoInicial={productoEditando}
          guardando={guardando}
          alGuardar={manejarGuardar}
          alCancelar={() => {
            setMostrarForm(false);
            setProductoEditando(null);
          }}
        />
      )}

      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados todavía.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr key={p.idProducto}>
                <td>{p.nombre}</td>
                <td>{p.categoriaNombre}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.estado ? "Activo" : "Inactivo"}</td>

                <td className="acciones-tabla">
                  <button onClick={() => abrirEdicion(p)}>
                    Editar
                  </button>

                  <button
                    className="btn-peligro"
                    onClick={() => manejarEliminar(p.idProducto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}