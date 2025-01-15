import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env.js';
import { Middleware } from '../../interfaces.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const middlewares: Middleware = [
    express.json(),
    express.urlencoded({ extended: true }),
    express.static(path.join(__dirname, '..', 'public')),
    cors({
        origin: env.corsOrigin,
        optionsSuccessStatus: 200
    }),
    helmet()
];
