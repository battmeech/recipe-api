import cors from 'cors';
import express from 'express';
import path from 'path';
import { Config } from './config';
import { router } from './routes/router';

const app = express();

if (Config.env === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(cors());
app.use(express.json());
app.use(router);

export { app };
