const { NestFactory } = require('@nestjs/core');
const { ValidationPipe } = require('@nestjs/common');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { AppModule } = require('../dist/src/app/app.module');
const express = require('express');

let app;

async function createApp() {
    if (!app) {
        const server = express();
        app = await NestFactory.create(AppModule, new ExpressAdapter(server));

        // CORS
        app.enableCors({
            origin: true,
            credentials: true,
        });

        // Валидация
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            transform: true,
        }));

        // Префикс
        app.setGlobalPrefix('api');
        await app.init();
    }
    return app;
}

module.exports = async function handler(req, res) {
    const app = await createApp();
    const server = app.getHttpAdapter().getInstance();

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    return server(req, res);
}; 