import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths({ root: import.meta.dirname })],
  root: ".",
  test: {
    chaiConfig: {
      truncateThreshold: 0,
    },
    coverage: {
      include: ["src/**/*.ts", "src/**/*.tsx"],
      provider: "istanbul",
      reporter: ["json", "json-summary", "html"],
      reportOnFailure: true,
      thresholds: {
        "100": true,
        "src/**/*.(ts|tsx)": {
          "100": true,
        },
      },
    },
    environment: "node",
  },
});
