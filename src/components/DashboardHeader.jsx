import "./layout.css";

function DashboardHeader({ isConnected }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">
          <img
            src="/trackguard-rail-logo.svg"
            alt="TrackGuard railway logo"
          />
        </div>
        <div>
          <p className="brand-eyebrow">TRACK INSPECTION SYSTEM</p>
          <h1>
            Track<span>Guard</span>
          </h1>
        </div>
      </div>
      <div className={`connection ${isConnected ? "is-connected" : ""}`}>
        <span className="connection-dot" />
        <span>{isConnected ? "SYSTEM ONLINE" : "CONNECTING"}</span>
      </div>
    </header>
  );
}

export default DashboardHeader;
