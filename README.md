# Galería NASA APOD

Aplicación fullstack de práctica que consume la API pública de la NASA (APOD — Astronomy Picture of the Day) para mostrar una galería de imágenes astronómicas con funcionalidad de favoritos, almacenados en una base de datos MySQL.

---

## Requisitos previos

- Node.js v18 o superior
- MySQL corriendo (se puede usar XAMPP)
- API Key de la NASA: [https://api.nasa.gov/](https://api.nasa.gov/)

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/matu-8/react-tp2-libreria-nasa-aguero.git
cd react-tp2-libreria-nasa-aguero
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear el archivo `.env` en `/backend` con el siguiente contenido:

```
PORT=3000
NASA_API_URL=https://api.nasa.gov/planetary/apod
NASA_API_KEY=tu_api_key_de_nasa

DB_HOST=localhost
DB_PORT=3306
DB_NAME=galeria_nasa
DB_USER=root
DB_PASSWORD=
```

> La contraseña de MySQL en XAMPP es vacía por defecto.

### 3. Crear la base de datos en MySQL

Ejecutar en phpMyAdmin o en la consola MySQL:

```sql
CREATE DATABASE galeria_nasa;
```
O crear la base de datos a mano dentro de PHPMyAdmin

Sequelize crea la tabla `Favorites` automáticamente al iniciar el servidor.

### 4. Configurar el Frontend
Abrir otra terminal

```bash
cd frontend-react/front_galeria_nasa
npm install
```

---

## Ejecución

### Backend (desde `/backend`)

```bash
npm run dev
```

Salida esperada:
```
>> Conexión a MySQL establecida correctamente
>> Tablas sincronizadas con la base de datos
>>> Servidor corriendo en el puerto 3000
```

### Frontend (desde `/frontend-react/front_galeria_nasa`)

```bash
npm run dev
```

Abrir en el navegador: `http://localhost:5173`

---

## Endpoints del Backend

| Método | URL | Descripción |
|--------|-----|-------------|
| `GET` | `/api/images?count=6` | Imágenes aleatorias del APOD de la NASA |
| `GET` | `/api/favorites` | Lista todos los favoritos guardados |
| `POST` | `/api/favorites` | Guarda una imagen como favorito |
| `PUT` | `/api/favorites/:id` | Edita la nota de un favorito |
| `DELETE` | `/api/favorites/:id` | Elimina un favorito |

### Ejemplo de body para POST `/api/favorites`

```json
{
  "title": "Nombre de la imagen",
  "date": "2024-01-15",
  "url": "https://apod.nasa.gov/...",
  "hdurl": "https://apod.nasa.gov/...",
  "explanation": "Descripción de la NASA",
  "media_type": "image"
}
```