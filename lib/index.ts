import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { Config } from './config';
import { logger } from './logger';
import { initialiseRoutes } from './routes/initialise';

const app = express();

app.use(cors());
app.use(express.json());
initialiseRoutes(app);

logger.info('Establishing connection to database');
mongoose.connect(Config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
logger.info('Connected to MongoDB');

app.listen(Config.port);
