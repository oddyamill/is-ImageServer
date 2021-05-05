const { createServer } = require('http');
const { request } = require('https');

const base = process.env.BASE_URL || 'https://.is-inside.me'; // тип введи сам и получи конфетку

createServer(async (req, res) => {
    if (!req.url || req.url === '/') return res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Length': Buffer.byteLength('прив))') }).end('прив))');
    if (!['GET', 'HEAD'].includes(req.method)) res.writeHead(405, { 'Allow': 'GET, HEAD' }).end();

    const stream = await new Promise(resolve => request(base + req.url, resolve).end());
    if (stream.statusCode !== 200) res.writeHead(stream.statusCode).end();
    if (stream.headers['content-length'] === '47619') return res.writeHead(404).end(); // проверка патау конечно

    res.setHeader('Content-Length', stream.headers['content-length']); // мы же адекваты...?
    res.setHeader('Content-Type', stream.headers['content-type']); // крч без этого оно скачивало как не странно =(

    stream.pipe(res);
}).listen(+process.env.PORT || 80, () => console.log('работаю капец'));
