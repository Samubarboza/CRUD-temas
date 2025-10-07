
# CRUD-Temas

Aplicación MVC con Node.js, Express y EJS para gestionar temas con funcionalidad de votación.

## Tecnologías

- Node.js
- Express
- EJS
- JavaScript (cliente)
- CSS estático

## Estructura de proyecto

.
├── app.js
├── src/
│   ├── routes/
│   ├── controllers/
│   └── servicios/ (o lógica de negocio)
├── views/
│   ├── layouts/
│   ├── partials/
│   └── páginas EJS
├── public/
│   ├── js/
│   └── css/
├── package.json
└── .gitignore

## Instalación

```bash
git clone https://github.com/Samubarboza/CRUD-temas.git
cd CRUD-temas
npm install
````

Opcional `.env`:

```PORT=3000```

## Ejecución

```bash
npm run dev     # si usas nodemon
npm start       # ejecución simple
# o
node app.js
```

Servidor: `http://localhost:3000` (o el `PORT` definido).

## Modelo: Tema

| Campo       | Tipo   | Descripción                     |
| ----------- | ------ | ------------------------------- |
| id          | number | Identificador único             |
| titulo      | string | Título del tema                 |
| descripcion | string | Descripción (opcional)          |
| votos       | number | Conteo de votos (por defecto 0) |
| creadoEn    | Date   | Fecha de creación               |

## Rutas / Endpoints

* **GET /** — Lista todos los temas (render EJS)
* **POST /temas** — Crea un nuevo tema
* **PUT /temas/:idTema** — Actualiza un tema
* **DELETE /temas/:idTema** — Elimina un tema
* **POST /temas/:idTema/votar** — Incrementa los votos de un tema

## Lógica cliente

* Acciones de **eliminar** y **votar** hechas con `fetch` hacia los endpoints correspondientes.
* En respuesta, se actualiza el DOM (votos, orden, eliminación) sin recargar la página.
* Ordenamiento visual: los temas con más votos aparecen primero.

## Buenas prácticas

* Separar rutas y controladores.
* Validar datos mínimos (por ejemplo, que `titulo` no quede vacío).
* Reordenar lista por votos luego de cada operación cliente-servidor.
* Usar vistas parciales para evitar duplicación en EJS.

## Extensiones sugeridas

* Persistencia en base de datos (SQLite, PostgreSQL, MongoDB).
* Paginación o búsqueda de temas.
* Validación con librerías (Joi, Zod).
* Tests de integración y unitarios.

## Contribución

* Crear un fork.
* Abrir una rama con tu feature/fix.
* Enviar pull request con descripción clara de cambios.

## Licencia

Definir una licencia explícita (por ejemplo MIT) en `LICENSE`.

## Autor

**Samu Barboza** — [https://github.com/Samubarboza](https://github.com/Samubarboza)
