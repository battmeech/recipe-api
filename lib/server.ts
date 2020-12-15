import { app } from './app';
import { Config } from './config';
import { logger } from './logger';
import mongoose from 'mongoose';

logger.info('Establishing connection to database');
mongoose.connect(Config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
logger.info('Connected to MongoDB');

app.listen(Config.port);
