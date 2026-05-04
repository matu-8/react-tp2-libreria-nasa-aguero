# Tasks — Galería NASA APOD

> **Regla de proceso:** Al terminar cada fase se detiene el desarrollo.
> El personal técnico debe revisar y aprobar antes de continuar.

---

## 🔵 FASE 1 — Backend: Configuración base y endpoint GET

**Objetivo:** Dejar el backend limpio, correctamente configurado y con el endpoint GET funcionando contra la API de la NASA.

- [x] **1.1** Corregir `.env.example` — documentar las variables necesarias (`PORT`, `NASA_API_URL`, `NASA_API_KEY`)
- [x] **1.2** Corregir `src/config/server.js`:
  - [x] Importar `dotenv/config` al inicio
  - [x] Usar `process.env.PORT` con fallback a `3000`
  - [x] Agregar middleware `express.json()` (necesario para recibir body en POST/PUT)
- [x] **1.3** Lógica de fetch consolidada directamente en el controller (se descartó el enfoque de service a pedido del equipo):
  - [x] Corregir bug de variable `response` no definida
  - [x] Recibir `count` como parámetro (query param `?count=N`)
  - [x] Usar `async/await` + `try/catch` correcto
  - [x] Retornar los datos en formato JSON
- [x] **1.4** Implementar `src/controllers/images.controller.js`:
  - [x] Función `getImages` → fetch directo a NASA con `count=6`
  - [x] Responde con los datos en formato JSON
  - [x] Manejo de errores con status correspondiente
- [x] **1.5** Actualizar `src/routes/server.route.js`:
  - [x] Conectar `GET /api/images` → `getImages` controller
  - [x] Rutas placeholder eliminadas
- [x] **1.6** Servidor levanta y responde correctamente

⏸️ **PAUSA — Esperar confirmación del personal técnico**

---

## 🔵 FASE 2 — Backend: Endpoints POST, PUT, DELETE (Favoritos en memoria)

**Objetivo:** Implementar los endpoints de favoritos. Como la NASA API es read-only, el almacenamiento de favoritos se simula en memoria del servidor (array en runtime).

**Nota:** Durante esta fase se decidió incorporar MySQL + Sequelize en lugar del array en memoria original.

- [x] **2.1** Instalar dependencias: `sequelize` y `mysql2`
- [x] **2.2** Crear `src/config/database.js` — instancia de Sequelize con variables de entorno
- [x] **2.3** Crear `src/models/Favorite.js` — modelo con campos: `id`, `title`, `date`, `url`, `hdurl`, `explanation`, `media_type`, `note`, `createdAt`, `updatedAt`
- [x] **2.4** Crear `src/controllers/favorites.controller.js`:
  - [x] `getFavorites` → GET — lista todos (con mensaje si no hay favoritos)
  - [x] `addFavorite` → POST — crea registro en MySQL (`note` inicia vacía)
  - [x] `updateFavorite` → PUT — edita nota por `:id`
  - [x] `deleteFavorite` → DELETE — elimina por `:id`
- [x] **2.5** Crear `src/routes/favorites.route.js` con las 4 rutas
- [x] **2.6** Registrar rutas de favoritos en `server.js` bajo `/api/favorites`
- [x] **2.7** `initialize()` convertida a `async` — autentica DB y sincroniza tablas antes de levantar el servidor
- [x] **2.8** Endpoints probados y funcionando contra MySQL

⏸️ **PAUSA — Esperar confirmación del personal técnico**

---

## ✅ FASE 3 — Frontend: Galería + Favoritos (CRUD completo)

**Objetivo:** Implementar todos los requerimientos mínimos del frontend: componente principal, formulario, lista, ítem, y filtro; con useState, useEffect, fetch async/await, y estados de carga/error.

### Estructura y configuración
- [x] **3.1** Crear estructura de carpetas: `src/components/`, `src/hooks/`
- [x] **3.2** Crear `src/index.css` (evitar error de importación en `main.jsx`)

### Custom Hooks
- [x] **3.3** Crear `src/hooks/useGallery.js`:
  - [x] Estado: `images`, `loading`, `error`
  - [x] `useEffect` para carga inicial de 6 imágenes
  - [x] Función `loadMore()` → concatena 6 más al estado
  - [x] fetch con async/await al backend `GET /api/images?count=6`
- [x] **3.4** Crear `src/hooks/useFavorites.js`:
  - [x] Estado: `favorites`, `loading`, `error`
  - [x] `useEffect` para carga inicial con `GET /api/favorites`
  - [x] `addFavorite(imageData)` → `POST /api/favorites`
  - [x] `editNote(id, note)` → `PUT /api/favorites/:id`
  - [x] `removeFavorite(id)` → `DELETE /api/favorites/:id`

### Componentes
- [x] **3.5** Crear `src/components/ImageCard.jsx` — Ítem de galería
- [x] **3.6** Crear `src/components/Gallery.jsx` — Lista de elementos con IntersectionObserver
- [x] **3.7** Crear `src/components/FavoriteForm.jsx` — Formulario de creación
- [x] **3.8** Crear `src/components/SearchBar.jsx` — Filtro o búsqueda
- [x] **3.9** Crear `src/components/FavoriteCard.jsx` — Ítem de favoritos con PUT y DELETE
- [x] **3.10** Crear `src/components/Favorites.jsx` — Lista de favoritos
- [x] **3.11** Actualizar `src/App.jsx` — Componente principal con navegación
- [x] **3.12** Flujo completo verificado

**Nota:** El proyecto se trasladó a `front_galeria_nasa/` (nueva carpeta creada por el equipo).

⏸️ **PAUSA — Esperar confirmación del personal técnico**

---

## ✅ FASE 4 — Revisión final y documentación

- [x] **4.1** Manejo de errores revisado — todos los componentes y hooks manejan error y loading
- [x] **4.2** `.env` excluido del repositorio via `.gitignore` ✔️
- [x] **4.3** `README.md` actualizado con guia completa de instalación, endpoints y estructura
- [x] **4.4** `walkthrough.md` actualizado con resumen final

⏸️ **PAUSA — Revisión final del personal técnico**

---

## 📋 Leyenda

| Símbolo | Significado |
|---------|-------------|
| `[ ]` | Pendiente |
| `[/]` | En progreso |
| `[x]` | Completado |
| ⏸️ | Punto de pausa — requiere aprobación |
