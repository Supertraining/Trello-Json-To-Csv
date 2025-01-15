import { Server } from './src/server.js';
import router from './src/routes/routes.js';
import { env } from './src/config/env.js';
import { middlewares } from './src/config/middleware.js';


const app = Server(env.port, router, middlewares, env.viewEngine);

try {
    await app.start();
} catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
}