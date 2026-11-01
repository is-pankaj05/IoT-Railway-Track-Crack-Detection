export function TrackMark() {
  return (
    <svg
      aria-hidden="true"
      className="brand-mark"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path d="M15 5h18l4 5v21l-13 12L11 31V10l4-5Z" />
      <path d="M17 8 14 29m17-21 3 21M13 16h22m-21 8h20m-16-2 10 10m-9-10-4 9" />
      <path d="M9 35h30M16 40h16" />
    </svg>
  );
}

export function StatusIcon({ warning }) {
  return warning ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="m12 3 9 16H3l9-16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v4m0 3h.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="m5 12 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function SensorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 9a10 10 0 0 1 14 0M8 12a6 6 0 0 1 8 0m-5.8 3a2.5 2.5 0 0 1 3.6 0M12 18h.01"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function ControlIcon({ type }) {
  const paths = {
    forward: "M12 19V5m-6 6 6-6 6 6",
    backward: "M12 5v14m6-6-6 6-6-6",
    stop: "M7 7h10v10H7z",
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={paths[type]}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
