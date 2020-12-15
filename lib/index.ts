import cors from 'cors';
import express from 'express';
import { Config } from './config';
import { initialiseRoutes } from './routes/initialise';

const app = express();

app.use(cors());
app.use(express.json());
initialiseRoutes(app);

app.listen(Config.port);
