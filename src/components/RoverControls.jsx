import { TrackMark, ControlIcon } from "./Icons.jsx";
import "./rover-controls.css";

function RoverControls({
  commandStatus,
  isSendingCommand,
  onSendCommand,
}) {
  return (
    <section className="controls-section">
      <div className="section-heading controls-heading">
        <div>
          <p className="section-kicker">
            <span className="kicker-line" />
            REMOTE OPERATION
          </p>
          <h2>Rover controls</h2>
        </div>
        <p className="control-hint">USE WITH CAUTION</p>
      </div>
      <div className="controls-panel">
        <div className="control-copy">
          <span className="control-emblem">
            <TrackMark />
          </span>
          <div>
            <strong>MANUAL OVERRIDE</strong>
            <p>Send movement commands to the track rover.</p>
          </div>
        </div>
        <div className="button-group">
          <button
            className="control-button control-forward"
            disabled={isSendingCommand}
            onClick={() => onSendCommand("forward", "Forward")}
          >
            <ControlIcon type="forward" />
            <span>Forward</span>
          </button>
          <button
            className="control-button control-stop"
            disabled={isSendingCommand}
            onClick={() => onSendCommand("stop", "Stop")}
          >
            <ControlIcon type="stop" />
            <span>Stop</span>
          </button>
          <button
            className="control-button control-backward"
            disabled={isSendingCommand}
            onClick={() => onSendCommand("backward", "Backward")}
          >
            <ControlIcon type="backward" />
            <span>Backward</span>
          </button>
        </div>
        {commandStatus && (
          <p
            className={`command-message ${
              commandStatus.isError ? "command-message--error" : ""
            }`}
            role="status"
          >
            {commandStatus.message}
          </p>
        )}
      </div>
    </section>
  );
}

export default RoverControls;
