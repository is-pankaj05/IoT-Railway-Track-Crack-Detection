import { useCallback, useEffect, useState } from "react";
import {
  fetchTrackTelemetry,
  sendRoverCommand,
} from "../api/trackMonitor.js";

const INITIAL_TELEMETRY = {
  status: "Connecting to track monitor...",
  lat: 0,
  lon: 0,
  d1: 0,
  d2: 0,
};

export function useTrackMonitor() {
  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [commandStatus, setCommandStatus] = useState(null);
  const [isSendingCommand, setIsSendingCommand] = useState(false);
  const warning = telemetry.status.includes("WARNING");

  useEffect(() => {
    let active = true;
    let timeoutId;
    const controller = new AbortController();

    async function refreshTelemetry() {
      try {
        const nextTelemetry = await fetchTrackTelemetry(controller.signal);
        if (!active) return;

        setTelemetry(nextTelemetry);
        setIsConnected(true);
        setError("");
        setLastUpdated(new Date());
      } catch (requestError) {
        if (!active || requestError.name === "AbortError") return;
        setIsConnected(false);
        setError(
          "Unable to connect to the monitor. Connect to the Railway_Safety Wi-Fi network and try again.",
        );
      } finally {
        if (active) timeoutId = window.setTimeout(refreshTelemetry, 1000);
      }
    }

    refreshTelemetry();
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!warning || !("speechSynthesis" in window)) return undefined;

    const message = new SpeechSynthesisUtterance(
      "Warning. Track damage detected.",
    );
    window.speechSynthesis.speak(message);
    return () => window.speechSynthesis.cancel();
  }, [warning]);

  const sendCommand = useCallback(async (command, label) => {
    setIsSendingCommand(true);
    setCommandStatus(null);

    try {
      await sendRoverCommand(command);
      setCommandStatus({ message: `${label} command sent`, isError: false });
    } catch (requestError) {
      setCommandStatus({
        message: `Unable to send command: ${requestError.message}. Check your connection.`,
        isError: true,
      });
    } finally {
      setIsSendingCommand(false);
    }
  }, []);

  return {
    telemetry,
    isConnected,
    error,
    lastUpdated,
    commandStatus,
    isSendingCommand,
    sendCommand,
  };
}
