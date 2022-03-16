import 'reflect-metadata';
import { useContainer as useRoutingContainer, useExpressServer as setApplicationConfig } from 'routing-controllers';
import { Container } from 'typedi';

import * as bodyParser from 'body-parser';
import Helmet from 'helmet';
import Express from 'express';
import morgan from 'morgan';
import path from 'path';

import * as controllers from '@app/controllers';
import { CommonUtils } from '@app/utils';

import { Config } from '@app/configs';

/* eslint-disable class-methods-use-this */
export class Application {
    private static instance: Application = new Application();

    constructor() {
        if (Application.instance) {
            return Application.instance;
        }
        Application.instance = this;
    }

    async start() {
        // Setup routing-controllers to use typedi container.
        useRoutingContainer(Container);

        const app = Express();
        console.log(path.join(__dirname, '../../frontend/build'))
        app.use(Express.static(path.join(__dirname, '../../frontend/build')));
        
        app.use(morgan('combined'));
        app.use(Helmet());
        app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
        app.use(bodyParser.json({ limit: '10mb' }));

        const cors = {
            allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
            exposeHeaders: ['X-Request-Id'],
            origin: 'http://localhost:3000',
        };
        setApplicationConfig(app, {
            controllers: CommonUtils.getObjectValues(controllers),
            cors,
            defaultErrorHandler: true,
            // middlewares,
            routePrefix: '/api',
            development: false,
        });
        app.listen(Config.port, () => {
            console.info(`server started on port ${Config.port}`);
        });
        return { app };
    }
}

process.on('unhandledRejection', console.error);

/* eslint-enable class-methods-use-this */
export const application = new Application();
application.start();
