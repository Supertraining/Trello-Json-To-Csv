import { fileURLToPath } from "url";
import path from "path";
import { ServerConfig } from "../interfaces/interfaces.js";

const nodeEnv = process.env.NODE_ENV?.trim();

nodeEnv === "dev" && process.loadEnvFile();

const { PORT, API_PATH, NODE_ENV, CORS_ORIGIN } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const env: ServerConfig = {
  port: PORT ? parseInt(PORT) : 4000,
//   apiPath: API_PATH ?? "/trello-json-to-csv",
  nodeEnv: NODE_ENV ?? "development",
  corsOrigin: CORS_ORIGIN ?? "*",
  viewEngine: {
    engine: "view engine",
    name: "ejs",
    views: "views",
    path: path.join(__dirname, "../../../src", "views"),
  },
} as const;
