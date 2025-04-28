# Proyecto MERN - Gestión de Usuarios (Frontend)

Este proyecto es una aplicación MERN (MongoDB, Express, React, Node.js) centrada en la **gestión de usuarios**. Esta parte corresponde exclusivamente al **frontend**, que está construido con React y se conecta al backend a través de API REST.

- Autenticación con JWT
- Mostrar la lista de usuarios con filtros y paginación
- Crear, editar y eliminar usuarios
- Visualización y edición de perfil de usuario
- Filtros
- Seed de usuarios

Este repositorio implementa el frontend de la aplicación, mientras que el backend en Node.js y Express está en otro repositorio.

## Estructura del Proyecto

La estructura de directorios está organizada de la siguiente manera:

## Estructura del proyecto

```
├── client/
├── public/              
│   ├── src/
│   │   ├── assets/       	
│   │   ├── components/   
│   │   │   ├── users/
│   │   │   │   ├── AddUserForm.jsx
│   │   │   │   ├── EditUserForm.jsx
│   │   │   │   └── UserFiltersjsx
│   │   │   │   └── UserTable.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   │   ├── AuthContect.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   ├── services/
│   │   │   ├── api.js    	
│   │   │   └── auth.js   	
│   │   ├── styles/
│   │   │   ├── DashboardPages.css
│   │   │   ├── login.css
│   │   ├── utils/
│   │   │   └── helpers.js	
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx      	
│   ├── .env
│   ├── .gitignore
│   ├── .eslint.config.js
│   ├── .index.html
│   ├── package-lock.json              	
│   └── package.json
│   └── README.md
│   └── vite.config.js
```

## Cómo Ejecutar el Proyecto

1. Clona el repositorio y entra al directorio:

```bash
git clone https://github.com/usuario/mi-repo.git
cd client
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con el siguiente contenido:

```
VITE_API_URL=http://localhost:4000/api
```

4. Ejecuta el servidor en modo desarrollo:
Esto ejecutará el servidor utilizando nodemon para recargar automáticamente los cambios en el código.

```bash
npm run dev
```

### Requisitos previos

- Node.js (v18 o superior)
- Un servidor backend corriendo (ver README del backend)
- (Opcional) Instalar dependencias globales como create-react-app para inicializar el proyecto si se desea modificar la estructura.


## Tecnologías y Librerías

- **React**: Librería para construir la interfaz de usuario
- **Axios**: Cliente HTTP para realizar peticiones a la API
- **JWT**: Autenticación con tokens para proteger las rutas
- **React Router**: Manejo de rutas y navegación
- **React Context**: Gestión de estado global (autenticación, usuarios)
- **Morgan**: Logger de peticiones HTTP
- **Cors**: Manejo de orígenes cruzados


## Componentes y Rutas

- **/login**: Página para iniciar sesión. Envia las credenciales al backend y guarda el token JWT.
- **/dashboard**: Página principal para visualizar todos los usuarios con filtros, búsqueda y paginación.
- **GET /api/users/:id**:  Obtener un usuario por ID
- **POST /api/users**: Crear un nuevo usuario
- **PUT /api/users/:id**: Actualizar un usuario por ID
- **DELETE /api/users/:id**: Eliminar un usuario por ID

## Desafíos y Decisiones

- Autenticación: Se implementó la autenticación utilizando JWT para manejar el estado de sesión del usuario y proteger las rutas.

- Manejo de estado global: Se utilizó React Context para manejar el estado de autenticación y los datos de los usuarios a lo largo de la aplicación.