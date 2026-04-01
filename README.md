# Prueba técnica Contento

Este proyecto muestra una lista de publicaciones obtenidas desde `https://jsonplaceholder.typicode.com/posts` y, al hacer clic en un título, consulta el detalle de la publicación a través de un servidor backend en Node.js.

## Requisitos

- Node.js 18 o superior

## Archivos principales

- `index.html`: interfaz web que carga la lista de publicaciones y muestra el detalle seleccionado.
- `server.js`: servidor Node.js que sirve la página y actúa como intermediario para consultar `https://jsonplaceholder.typicode.com/posts/{id}`.

## Cómo ejecutarlo

1. Abre una terminal en la carpeta del proyecto.
2. Inicia el servidor con:

```bash
node server.js
```

3. Abre tu navegador en:

```text
http://127.0.0.1:3000/
```

## Cómo probarlo

1. Espera a que cargue la lista de publicaciones.
2. Haz clic en cualquiera de los títulos.
3. Verifica que, en el panel de detalle, aparezca el contenido (`body`) de la publicación seleccionada.

## Endpoints disponibles

- `GET /`: sirve la página principal.
- `GET /health`: devuelve un estado simple del servidor.
- `GET /api/posts/:id`: consulta el detalle de una publicación en JSONPlaceholder y lo devuelve al navegador.
