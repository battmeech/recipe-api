import * as winston from 'winston';
import { Config } from './config';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
            info =>
                `[${info.timestamp}] ${info.level.toUpperCase()}: ${
                    info.message
                }`
        )
    ),
    defaultMeta: { service: 'recipe-store' },
    transports: [
        new winston.transports.Console({
            level: Config.logLevel,
            handleExceptions: true,
        }),
    ],
});
