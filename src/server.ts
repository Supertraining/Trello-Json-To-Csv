import express, { Router } from "express";
import { EngineOptions } from "./interfaces/interfaces.js";
import { env } from "./config/env.js";

export function Server(
  PORT: number,
  router: Router,
  // apiPath: string,
  middlewares: any,
  engineOptions: EngineOptions
) {
  return {
    port: PORT || 4000,
    router: router,
    middlewares: middlewares || [],
    engineOptions: engineOptions || {},
    // apiPath: apiPath,
    app: express(),
    start: async function () {
      this.app.set(this.engineOptions.engine, this.engineOptions.name);
      this.app.set(this.engineOptions.views, this.engineOptions.path);
      this.app.use([...this.middlewares]);
      this.app.use("/",this.router);

      this.app.listen(this.port, () => {
        console.log(`🚀 Server running in ${env.nodeEnv} mode on port ${this.port}`);
      });
    },
  };
}
