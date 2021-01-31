import cors from 'cors';
import express from 'express';
import { router } from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static('client/build'));

export { app };
