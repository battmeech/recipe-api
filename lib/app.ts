import cors from 'cors';
import express from 'express';
import path from 'path';
import { Config } from './config';
import { router } from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

if (Config.env === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

export { app };
