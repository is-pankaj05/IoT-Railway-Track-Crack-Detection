import DashboardFooter from "./components/DashboardFooter.jsx";
import DashboardHeader from "./components/DashboardHeader.jsx";
import RoverControls from "./components/RoverControls.jsx";
import TelemetryPanel from "./components/TelemetryPanel.jsx";
import TrackStatus from "./components/TrackStatus.jsx";
import { useTrackMonitor } from "./hooks/useTrackMonitor.js";

function App() {
  const {
    telemetry,
    isConnected,
    error,
    lastUpdated,
    commandStatus,
    isSendingCommand,
    sendCommand,
  } = useTrackMonitor();
  const warning = telemetry.status.includes("WARNING");

  return (
    <main className="app">
      <div className="topline">
        <div className="topline-inner">
          <span>RAIL INFRASTRUCTURE MONITORING</span>
          <span className="system-code">FIELD UNIT&nbsp; / &nbsp;01</span>
        </div>
      </div>

      <div className="page-shell">
        <DashboardHeader isConnected={isConnected} />
        <TrackStatus status={telemetry.status} warning={warning} error={error} />
        <TelemetryPanel telemetry={telemetry} lastUpdated={lastUpdated} />
        <RoverControls
          commandStatus={commandStatus}
          isSendingCommand={isSendingCommand}
          onSendCommand={sendCommand}
        />
        <DashboardFooter />
      </div>
    </main>
  );
}

export default App;
