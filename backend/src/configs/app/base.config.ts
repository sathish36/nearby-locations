import { IConfig } from '@app/interfaces';

// Load environment variables from .env file
import { config as loadEnvConfig } from 'dotenv';

loadEnvConfig();

export abstract class BaseConfig implements IConfig {
    host: string = process.env.APP_HOST || 'localhost';

    port: number = parseInt(process.env.APP_PORT || '9009', 10);

    secret: string = process.env.SECRET || 'secret';
}
