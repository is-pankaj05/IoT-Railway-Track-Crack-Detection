import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      minify: mode === "esp32" ? false : "esbuild",
      sourcemap: mode === "esp32",
    },
    server: {
      host: "0.0.0.0",
      proxy: {
        "/data": {
          target: env.VITE_ESP32_URL || "http://192.168.4.1",
          changeOrigin: true,
        },
        "/forward": {
          target: env.VITE_ESP32_URL || "http://192.168.4.1",
          changeOrigin: true,
        },
        "/backward": {
          target: env.VITE_ESP32_URL || "http://192.168.4.1",
          changeOrigin: true,
        },
        "/stop": {
          target: env.VITE_ESP32_URL || "http://192.168.4.1",
          changeOrigin: true,
        },
      },
    },
  };
});
