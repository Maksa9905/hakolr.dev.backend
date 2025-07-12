// Простая тестовая функция для Vercel
module.exports = async function handler(req, res) {
    try {
        console.log(`${req.method} ${req.url}`);

        // CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // Обрабатываем OPTIONS запросы
        if (req.method === 'OPTIONS') {
            res.status(200).end();
            return;
        }

        // Простой API ответ
        if (req.url === '/api/health' || req.url === '/health') {
            res.status(200).json({
                status: 'ok',
                message: 'Vercel serverless function is working',
                timestamp: new Date().toISOString(),
                method: req.method,
                url: req.url,
            });
            return;
        }

        // Отладочная информация о файловой системе
        const path = require('path');
        const fs = require('fs');

        // Проверяем разные возможные пути
        const possiblePaths = [
            path.join(__dirname, '../dist'),
            path.join(__dirname, 'dist'),
            path.join(process.cwd(), 'dist'),
            '/var/task/dist',
            './dist'
        ];

        let distInfo = {};

        for (const distPath of possiblePaths) {
            try {
                const stats = fs.statSync(distPath);
                const files = fs.readdirSync(distPath);
                distInfo[distPath] = {
                    exists: true,
                    isDirectory: stats.isDirectory(),
                    files: files.slice(0, 10), // первые 10 файлов
                    filesCount: files.length
                };
            } catch (e) {
                distInfo[distPath] = {
                    exists: false,
                    error: e.message
                };
            }
        }

        // Информация о текущем окружении
        const envInfo = {
            __dirname: __dirname,
            'process.cwd()': process.cwd(),
            'process.env.NODE_ENV': process.env.NODE_ENV,
            'process.env.VERCEL': process.env.VERCEL,
            'process.env.VERCEL_ENV': process.env.VERCEL_ENV,
        };

        // Список файлов в корне
        let rootFiles = [];
        try {
            rootFiles = fs.readdirSync(process.cwd());
        } catch (e) {
            rootFiles = ['Error reading root: ' + e.message];
        }

        res.status(200).json({
            status: 'debug',
            message: 'Отладочная информация о файловой системе',
            timestamp: new Date().toISOString(),
            distInfo: distInfo,
            envInfo: envInfo,
            rootFiles: rootFiles.slice(0, 20), // первые 20 файлов
        });

    } catch (error) {
        console.error('Handler error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });
    }
}; 