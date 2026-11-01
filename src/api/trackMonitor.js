const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/$/,
  "",
);

export async function fetchTrackTelemetry(signal) {
  const response = await fetch(`${API_BASE_URL}/data`, { signal });
  if (!response.ok) {
    throw new Error(`Monitor returned HTTP ${response.status}`);
  }

  const data = await response.json();

  return {
    status: String(data.status ?? "Status unavailable"),
    lat: Number(data.lat) || 0,
    lon: Number(data.lon) || 0,
    d1: Number(data.d1) || 0,
    d2: Number(data.d2) || 0,
  };
}

export async function sendRoverCommand(command) {
  const response = await fetch(`${API_BASE_URL}/${command}`);
  if (!response.ok) {
    throw new Error(`Command returned HTTP ${response.status}`);
  }
}
