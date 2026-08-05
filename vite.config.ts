import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: "localhost",
        port: 3000,
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
