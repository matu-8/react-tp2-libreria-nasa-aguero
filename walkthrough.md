# Walkthrough — Galería NASA APOD (proyecto_nodejs)

## Análisis Inicial del Proyecto

**Fecha de análisis:** 2026-04-05

---

## Estado actual del proyecto (base recibida)

### Estructura general

```
proyecto_nodejs/
├── README.md                  (vacío)
├── backend/
│   ├── .env                   ✅ Configurado (API_KEY_URL de NASA)
│   ├── .env.example           ⚠️  Solo tiene "api_key ="
│   ├── .gitignore
│   ├── fetch.js               ⚠️  Borrador — tiene bug (usa `response` sin definir)
│   ├── index.js               ✅ Punto de entrada correcto (llama a initialize())
│   ├── package.json           ✅ Ver detalle abajo
│   └── src/
│       ├── config/
│       │   └── server.js      ✅ Express + cors montado, puerto hardcodeado en 3000
│       ├── controllers/
│       │   └── images.controller.js  ⚠️  Solo importa fetch.js, sin lógica real
│       └── routes/
│           └── server.route.js  ⚠️  Rutas placeholder con mensajes mock
└── frontend-react/
    └── frontend-demo-react/
        ├── package.json        ✅ Ver detalle abajo
        ├── vite.config.js
        ├── index.html
        └── src/
            ├── App.jsx         ⚠️  Solo imprime "Hola mundo"
            └── main.jsx        ✅ Punto de entrada React estándar
```

---

### Análisis de `package.json` — Backend

| Campo | Valor |
|-------|-------|
| `name` | `proyecto_nodejs` |
| `version` | `1.0.0` |
| `type` | `module` ✅ (ECMAScript — import/export habilitado) |
| `main` | `index.js` |
| `scripts.dev` | `node --watch index.js` ✅ (hot reload nativo de Node) |
| `dependencies` | `cors ^2.8.6`, `dotenv ^17.4.0`, `express ^5.2.1` |

> **Express 5.x** ya está instalado — soporta async/await nativamente en handlers (no se necesita wrapper para capturar errores async).

**Dependencias faltantes detectadas:** Ninguna para el scope actual según las tecnologías solicitadas. Todas las requeridas (express, cors, dotenv) ya están instaladas.

---

### Análisis de `package.json` — Frontend

| Campo | Valor |
|-------|-------|
| `name` | `frontend-demo-react` |
| `type` | `module` ✅ (ESM) |
| `scripts.dev` | `vite` |
| React | `^19.2.4` |
| Build tool | `vite ^8.0.1` |
| Babel compiler | `babel-plugin-react-compiler ^1.0.0` ✅ |

---

### Problemas identificados (a corregir en fases)

| Archivo | Problema | Prioridad |
|---------|----------|-----------|
| `backend/.env` | API_KEY sin comillas (válido en dotenv, pero inconsistente) | Baja |
| `backend/.env.example` | Solo dice `api_key =` sin estructura clara | Baja |
| `backend/fetch.js` | Bug: usa variable `response` que no existe; nombre de función poco descriptivo; no usa la variable `url` recibida como parámetro | Alta |
| `backend/src/config/server.js` | Puerto hardcodeado en `3000` en lugar de usar `process.env.PORT` | Media |
| `backend/src/config/server.js` | No importa `dotenv` | Alta |
| `backend/src/controllers/images.controller.js` | Sin implementar — solo la importación | Alta |
| `backend/src/routes/server.route.js` | Rutas placeholder sin conectar al controller | Alta |
| `frontend-react/.../src/main.jsx` | Importa `./index.css` que no existe en `src/` | Media |
| `frontend-react/.../src/App.jsx` | Sin implementar | Alta |

---

## Historial de fases ejecutadas

---

## ✅ Fase 1 — Backend: Configuración base y endpoint GET NASA APOD
- **Estado:** Completada

### Archivos modificados
| Archivo | Cambio |
|---------|--------|
| `.env.example` | Documentadas variables: `PORT`, `NASA_API_URL`, `NASA_API_KEY` |
| `src/config/server.js` | Agregado `dotenv/config`, `PORT` desde env, `express.json()` |
| `src/controllers/images.controller.js` | Implementado `getImages()` con fetch directo a NASA APOD |
| `src/routes/server.route.js` | Conectado `GET /api/images` al controller |
| `fetch.js` | Eliminado (era código borrador con bug) |

### Decisiones técnicas
- Se descartó el patrón service/controller a pedido del equipo — la lógica de fetch vive directamente en el controller.
- No se usó `throw` — los errores se manejan con `res.status().json()` en el mismo controller.
- El `count` se recibe como query param (`?count=6`), con fallback a 6 por defecto.

---

## ✅ Fase 2 — Backend: MySQL + Sequelize + CRUD Favoritos
- **Estado:** Completada

### Cambio de alcance
Originalmente se planeó almacenamiento en memoria (`const favorites = []`). Durante la fase se decidió incorporar **MySQL + Sequelize** para persistencia real de datos.

### Paquetes instalados
- `sequelize` — ORM para interactuar con MySQL
- `mysql2` — driver MySQL requerido por Sequelize

### Archivos creados
| Archivo | Descripción |
|---------|-------------|
| `src/config/database.js` | Instancia de Sequelize con credenciales desde `.env` |
| `src/models/Favorite.js` | Modelo que define la tabla `Favorites` en MySQL |
| `src/controllers/favorites.controller.js` | CRUD completo con Sequelize |
| `src/routes/favorites.route.js` | 4 rutas: GET / POST / PUT /:id / DELETE /:id |

### Archivos modificados
| Archivo | Cambio |
|---------|--------|
| `src/config/server.js` | `initialize()` convertida a `async` — autentica DB y sincroniza tablas antes de levantar |
| `.env.example` | Agregadas variables: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` |

### Estructura de la tabla `Favorites`
| Columna | Tipo | Notas |
|---------|------|-------|
| `id` | INTEGER | Auto increment, PK |
| `title` | STRING | Requerido |
| `date` | STRING | |
| `url` | TEXT | Requerido |
| `hdurl` | TEXT | |
| `explanation` | TEXT | |
| `media_type` | STRING | |
| `note` | TEXT | Inicia vacío — se edita con PUT |
| `createdAt` | DATETIME | Auto Sequelize |
| `updatedAt` | DATETIME | Auto Sequelize |

### Decisiones técnicas
- `note` inicia siempre como `''` en el POST — el usuario la edita después con PUT.
- Se usó `findByPk()` para buscar por ID en PUT y DELETE.
- Se detectó y resolvió problema de tabla corrupta en MySQL (InnoDB vs data dictionary). Solución: `DROP TABLE` en phpMyAdmin + `sync({ force: true })` una vez.
- El `sync()` sin flags queda como configuración final.

---

## ✅ Fase 3 — Frontend: Galería + Favoritos (CRUD completo)
- **Estado:** Completada

### Nota de infraestructura
El equipo creó una nueva carpeta `front_galeria_nasa/` en lugar de usar `frontend-demo-react/`. Todos los archivos fueron creados en la nueva ubicación.

### Archivos creados
| Archivo | Descripción |
|---------|-------------|
| `src/index.css` | Base CSS para evitar error de importación |
| `src/hooks/useGallery.js` | GET imágenes NASA + scroll infinito con loadingRef |
| `src/hooks/useFavorites.js` | CRUD completo de favoritos (GET/POST/PUT/DELETE) |
| `src/components/ImageCard.jsx` | Ítem de galería con botón "Guardar en favoritos" |
| `src/components/Gallery.jsx` | Lista de imágenes con IntersectionObserver |
| `src/components/FavoriteForm.jsx` | Formulario de creación de favorito con nota opcional |
| `src/components/SearchBar.jsx` | Filtro por título en tiempo real (input controlado) |
| `src/components/FavoriteCard.jsx` | Ítem favorito con edición de nota (PUT) y eliminación (DELETE) |
| `src/components/Favorites.jsx` | Lista de favoritos con SearchBar integrado |
| `src/App.jsx` | Componente principal con navegación y estado global |

### Decisiones técnicas
- `useFavorites` se instancia únicamente en `App.jsx` para tener una sola fuente de verdad. El estado se distribuye por props.
- `useGallery` usa un `useRef` interno (`loadingRef`) para prevenir llamadas duplicadas desde el `IntersectionObserver`.
- `FavoriteCard` no resetea `deleting` en caso exitoso porque el componente desaparece solo al actualizarse el array en el hook.
- Requerimientos mínimos cubiertos: componente principal, formulario, lista, ítem, filtro, useState, useEffect, fetch async/await, estados de carga/error.

---

## ✅ Fase 4 — Revisión final y documentación
- **Estado:** Completada

### Acciones realizadas
- `.gitignore` verificado — `.env` y `node_modules` excluidos correctamente
- `README.md` escrito con guia completa: instalación, configuración, endpoints, flujo y estructura
- Manejo de errores revisado en todos los hooks y componentes
- Documentación interna (comentarios JSDoc) presente en archivos clave del backend

---

## Resumen del proyecto completo

| Capa | Tecnología | Estado |
|------|-----------|--------|
| Servidor | Express 5 + Node.js ESM | ✅ |
| Base de datos | MySQL + Sequelize | ✅ |
| API externa | NASA APOD | ✅ |
| Frontend | React 19 + Vite 8 | ✅ |
| CRUD completo | GET / POST / PUT / DELETE | ✅ |
| Scroll infinito | IntersectionObserver | ✅ |
| Filtro | Búsqueda por título en tiempo real | ✅ |

---

## 🔧 Mejoras post-entrega

### Corrección del scroll infinito
- **Problema:** `IntersectionObserver` con `threshold: 1.0` no disparaba la carga adicional al llegar al final de la galería.
- **Causa:** Con `threshold: 1.0`, el 100% del elemento centinela debe estar visible. Variaciones subpixel impedian que se alcanzara ese umbral exacto.
- **Solución aplicada por el equipo:** Cambiar a `threshold: 0`, que dispara en cuanto cualquier parte del centinela entra al viewport.

### Lazy loading de imágenes
- **Aplicado:** `loading="lazy"` en el `<img>` de `ImageCard.jsx`.
- **Efecto:** El navegador solo descarga la imagen cuando está próxima a entrar al viewport, mejorando la percepción de velocidad.

### Elevación de estado (`useGallery` a `App.jsx`)
- **Problema detectado:** Al navegar a favoritos y volver a la galería, el componente `Gallery` se desmontaba y remontaba, perdiendo las imágenes cargadas y realizando nuevas peticiones a la NASA.
- **Solución:** Mover `useGallery` de `Gallery.jsx` a `App.jsx`, siguiendo el mismo patrón ya usado con `useFavorites`.
- **Resultado:** Las imágenes persisten en el estado de `App.jsx` durante toda la sesión. `Gallery` recibe `images`, `loading`, `error` y `loadMore` como props.
- **Archivos modificados:** `App.jsx` (agrega hook) y `Gallery.jsx` (recibe props en lugar del hook).
