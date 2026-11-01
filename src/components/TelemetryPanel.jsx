import { LocationIcon, SensorIcon } from "./Icons.jsx";
import "./telemetry-panel.css";

function SensorCard({ number, distance }) {
  return (
    <article className="data-card">
      <div className="card-top">
        <span className="card-icon sensor-icon">
          <SensorIcon />
        </span>
        <span className="card-index">SENSOR {number}</span>
      </div>
      <p className="data-label">Ultrasonic sensor {Number(number)}</p>
      <p className="data-reading">
        {distance}
        <span>cm</span>
      </p>
      <div className="measurement-rule">
        <span style={{ width: `${Math.min(distance / 2, 100)}%` }} />
      </div>
      <p className="card-foot">DISTANCE MEASUREMENT</p>
    </article>
  );
}

function LocationCard({ lat, lon }) {
  const hasLocation = lat !== 0 || lon !== 0;

  return (
    <article className="data-card location-card">
      <div className="card-top">
        <span className="card-icon location-icon">
          <LocationIcon />
        </span>
        <span className="card-index">GPS MODULE</span>
      </div>
      <p className="data-label">Last known position</p>
      <div className="coordinates">
        <div>
          <span>LATITUDE</span>
          <strong>{lat.toFixed(6)}</strong>
        </div>
        <div>
          <span>LONGITUDE</span>
          <strong>{lon.toFixed(6)}</strong>
        </div>
      </div>
      {hasLocation ? (
        <a
          className="map-link"
          href={`https://maps.google.com/?q=${lat},${lon}`}
          target="_blank"
          rel="noreferrer"
        >
          OPEN IN MAPS <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="map-unavailable">WAITING FOR GPS FIX</span>
      )}
    </article>
  );
}

function TelemetryPanel({ telemetry, lastUpdated }) {
  return (
    <>
      <div className="section-heading">
        <div>
          <p className="section-kicker">
            <span className="kicker-line" />
            SENSOR NETWORK
          </p>
          <h2>Live telemetry</h2>
        </div>
        <p className="updated-at">
          {lastUpdated
            ? `UPDATED ${lastUpdated.toLocaleTimeString()}`
            : "WAITING FOR DATA"}
        </p>
      </div>

      <section className="telemetry-grid" aria-label="Live sensor data">
        <SensorCard number="01" distance={telemetry.d1} />
        <SensorCard number="02" distance={telemetry.d2} />
        <LocationCard lat={telemetry.lat} lon={telemetry.lon} />
      </section>
    </>
  );
}

export default TelemetryPanel;
