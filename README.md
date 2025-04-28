# Proyecto MERN - Gestión de Usuarios (Backend)

Este proyecto es una aplicación MERN (MongoDB, Express, React, Node.js) centrada en la **gestión de usuarios**. Esta parte corresponde exclusivamente al **backend**, que incluye:
- Autenticación con JWT
- Gestión CRUD de usuarios
- Validaciones
- Paginación
- Filtros
- Seed de usuarios

Este repositorio implementa el backend de la aplicación, mientras que el frontend en React está en otro repositorio.

## Estructura del Proyecto

La estructura de directorios está organizada de la siguiente manera:

## Estructura del proyecto

```
src/
├── controllers/
│   └── auth.controller.js
│   └── users.controller.js
├── libs/
│   └── config.js
│   └── seed.js
│   └── seedUsers.js
├── middlewares/
│   └── auth.middleware.js
│   └── handleValidation.middleware.js
│   └── validateLogin.middleware.js
│   └── validateUser.middleware.js
├── models/
│   └── user.models.js
├── routes/
│   └── auth.routes.js
│   └── users.routes.js
├── app.js
├── db.js
├── index.json
├── .env
├── package-lock.json
├── package.json
├── README.md

```

## Cómo Ejecutar el Proyecto

1. Clona el repositorio y entra al directorio:

```bash
git clone https://github.com/usuario/mi-repo.git
cd src
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con el siguiente contenido:

```
PORT=4000
JWT_SECRET=secretito
```

4. Ejecuta el servidor en modo desarrollo:
Esto ejecutará el servidor utilizando nodemon para recargar automáticamente los cambios en el código.

```bash
npm run dev
```

### Requisitos previos

- Node.js (v18 o superior)
- MongoDB (local o Atlas)
- (importante) Ejecutar mongod desde la consola CMD
- Git (opcional)
- Postman o similar para probar la API
- (Opcional) nodemon para recargar automáticamente el servidor
- Instalar dependencias (npm init -y, npm install express mongoose bcryptjs jsonwebtoken dotenv cors morgan, npm install --save-dev nodemon)



## Tecnologías y Librerías

- **Express**: Framework backend
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación segura
- **Dotenv**: Variables de entorno
- **Bcryptjs**: Encriptación de contraseñas
- **Morgan**: Logger de peticiones HTTP
- **Cors**: Manejo de orígenes cruzados


## Endpoints de la API

- **POST /api/auth/login**: Iniciar sesión con credenciales (correo y contraseña)
- **GET /api/users**: Obtener todos los usuarios (con filtros, paginación y búsqueda)
- **GET /api/users/:id**:  Obtener un usuario por ID
- **POST /api/users**: Crear un nuevo usuario
- **PUT /api/users/:id**: Actualizar un usuario por ID
- **DELETE /api/users/:id**: Eliminar un usuario por ID

## Desafíos y Decisiones

- MongoDB: Se eligió MongoDB por su flexibilidad y facilidad para trabajar con datos anidados, lo que es útil para estructuras complejas como direcciones de usuarios.

- Autenticación: Se implementó autenticación JWT para manejar de manera segura las sesiones de usuario. Los tokens se incluyen en los encabezados de las peticiones y se verifican en los middlewares de las rutas protegidas.

- Validaciones: Se implementaron middlewares para centralizar la validación de datos en las rutas, asegurando que los datos ingresados sean correctos antes de que lleguen a la base de datos.

- Paginación y Filtros: Para mejorar el rendimiento y la experiencia del usuario, se implementó paginación y filtros en las rutas de obtención de usuarios.
