import { useEffect, useState } from "react";
import axios from "axios";

// Ojo: WeatherForecastController usa [Route("[controller]")], SIN "api/".
// Por eso aquí NO usamos el cliente "api" (que ya tiene baseURL .../api),
// sino axios directo a la raíz del dominio.
const BASE_URL = "http://latiendatomas.somee.com";

export default function Clima() {
  const [pronostico, setPronostico] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/WeatherForecast`)
      .then((res) => setPronostico(res.data))
      .catch(() => setError("No se pudo cargar el pronóstico."))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="pagina">
      <h1>Pronóstico del tiempo</h1>

      {error && <div className="auth-error">{error}</div>}
      {cargando && <p>Cargando pronóstico...</p>}

      {!cargando && !error && (
        <div className="tarjetas-clima">
          {pronostico.map((dia, i) => (
            <div className="tarjeta-clima" key={i}>
              <p className="fecha-clima">{dia.date}</p>
              <p className="temp-clima">{dia.temperatureC}°C</p>
              <p className="resumen-clima">{dia.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
