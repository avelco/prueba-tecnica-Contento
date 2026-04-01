const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;
const INDEX_PATH = path.join(__dirname, 'index.html');

async function serveIndex(response) {
    const html = await fs.readFile(INDEX_PATH, 'utf8');

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(html);
}

async function servePostDetails(response, postId) {
    const upstreamResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    if (!upstreamResponse.ok) {
        response.writeHead(upstreamResponse.status, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: 'No se pudo obtener la publicación solicitada.' }));
        return;
    }

    const post = await upstreamResponse.json();

    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({
        id: post.id,
        title: post.title,
        body: post.body
    }));
}

const server = http.createServer(async (request, response) => {
    try {
        if (!request.url) {
            response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end('Solicitud inválida.');
            return;
        }

        const requestUrl = new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`);

        if (request.method === 'GET' && requestUrl.pathname === '/') {
            await serveIndex(response);
            return;
        }

        if (request.method === 'GET' && requestUrl.pathname === '/health') {
            response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            response.end(JSON.stringify({ ok: true }));
            return;
        }

        if (request.method === 'GET' && requestUrl.pathname === '/favicon.ico') {
            response.writeHead(204);
            response.end();
            return;
        }

        const postDetailsMatch = request.method === 'GET'
            ? requestUrl.pathname.match(/^\/api\/posts\/(\d+)$/)
            : null;

        if (postDetailsMatch) {
            await servePostDetails(response, postDetailsMatch[1]);
            return;
        }

        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Ruta no encontrada.');
    } catch (error) {
        response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: error.message }));
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
