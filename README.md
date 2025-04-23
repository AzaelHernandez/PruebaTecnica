# Proyecto MERN - Gestión de Usuarios (Backend)

Este proyecto es una aplicación MERN (MongoDB, Express, React, Node.js) centrada en la **gestión de usuarios**. Esta parte corresponde exclusivamente al **backend**, que incluye autenticación con JWT, gestión CRUD de usuarios, validaciones, paginación, filtros y seed de usuarios.



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
cd backend
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

```bash
npm run dev
```

### Requisitos previos

- Node.js (v18 o superior)
- MongoDB (local o Atlas)
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

## Desafíos y Decisiones

- Se decidió usar MongoDB por su flexibilidad con estructuras anidadas (como `address`).
- Se implementaron middlewares para centralizar validaciones y manejo de errores.


