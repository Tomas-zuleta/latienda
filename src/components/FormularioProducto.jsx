import { useEffect, useState } from "react";

const vacio = {
  IdCategoria: "",
  Nombre: "",
  Precio: "",
  Stock: "",
  Estado: true,
};

export default function FormularioProducto({
  productoInicial,
  alGuardar,
  alCancelar,
  guardando,
}) {
  const [form, setForm] = useState(vacio);

  useEffect(() => {
    if (productoInicial) {
      setForm({
        IdCategoria: productoInicial.idCategoria ?? "",
        Nombre: productoInicial.nombre ?? "",
        Precio: productoInicial.precio ?? "",
        Stock: productoInicial.stock ?? "",
        Estado: productoInicial.estado ?? true,
      });
    } else {
      setForm(vacio);
    }
  }, [productoInicial]);

  function manejarCambio(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function manejarSubmit(e) {
    e.preventDefault();
    alGuardar({
      IdCategoria: Number(form.IdCategoria),
      Nombre: form.Nombre,
      Precio: Number(form.Precio),
      Stock: Number(form.Stock),
      Estado: form.Estado,
    });
  }

  return (
    <form className="form-producto" onSubmit={manejarSubmit}>
      <h2>{productoInicial ? "Editar producto" : "Nuevo producto"}</h2>

      <label className="campo">
        <span>Nombre</span>
        <input
          name="Nombre"
          value={form.Nombre}
          onChange={manejarCambio}
          required
        />
      </label>

      <div className="campo-fila">
        <label className="campo">
          <span>Categoría (ID)</span>
          <input
            name="IdCategoria"
            type="number"
            value={form.IdCategoria}
            onChange={manejarCambio}
            required
          />
        </label>

        <label className="campo">
          <span>Precio</span>
          <input
            name="Precio"
            type="number"
            step="0.01"
            value={form.Precio}
            onChange={manejarCambio}
            required
          />
        </label>

        <label className="campo">
          <span>Stock</span>
          <input
            name="Stock"
            type="number"
            value={form.Stock}
            onChange={manejarCambio}
            required
          />
        </label>
      </div>

      <label className="campo campo-checkbox">
        <input
          name="Estado"
          type="checkbox"
          checked={form.Estado}
          onChange={manejarCambio}
        />
        <span>Producto activo</span>
      </label>

      <div className="acciones-form">
        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        {productoInicial && (
          <button type="button" className="btn-secundario" onClick={alCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
