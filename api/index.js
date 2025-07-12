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

        // Проверяем доступность файлов
        const path = require('path');
        const fs = require('fs');

        const distPath = path.join(__dirname, '../dist');
        console.log('Dist path:', distPath);

        let distFiles = [];
        try {
            distFiles = fs.readdirSync(distPath);
            console.log('Files in dist:', distFiles);
        } catch (e) {
            console.error('Cannot read dist directory:', e);
            res.status(500).json({
                error: 'Dist directory not found',
                message: e.message,
                distPath: distPath,
            });
            return;
        }

        // Пробуем загрузить NestJS только если dist доступен
        if (distFiles.length > 0) {
            res.status(200).json({
                status: 'building',
                message: 'Dist directory found, but NestJS initialization is disabled for testing',
                distFiles: distFiles,
                timestamp: new Date().toISOString(),
            });
        } else {
            res.status(500).json({
                error: 'No files in dist directory',
                distPath: distPath,
                timestamp: new Date().toISOString(),
            });
        }

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