import { StatusIcon } from "./Icons.jsx";
import "./track-status.css";

function TrackStatus({ status, warning, error }) {
  return (
    <>
      <section
        className={`status-panel ${warning ? "status-panel--warning" : ""}`}
      >
        <div className="status-copy">
          <div className="section-kicker">
            <span className="kicker-line" />
            LIVE TRACK CONDITION
          </div>
          <div className="status-heading">
            <span className="status-symbol">
              <StatusIcon warning={warning} />
            </span>
            <div>
              <p className="status-label">CURRENT STATUS</p>
              <h2>{status}</h2>
            </div>
          </div>
          <p className="status-caption">
            {warning
              ? "Potential track irregularity detected. Rover has been stopped."
              : "Track sensors are active and monitoring the route."}
          </p>
        </div>
        <div className="status-stamp" aria-hidden="true">
          <span>{warning ? "ATTENTION" : "TRACK CLEAR"}</span>
          <div className="stamp-track">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <small>SAFETY FIRST</small>
        </div>
      </section>

      {error && (
        <div className="error-banner" role="alert">
          <span className="error-icon">!</span>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}

export default TrackStatus;
