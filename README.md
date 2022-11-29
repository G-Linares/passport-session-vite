# Express Session + Passport JS + React Js con Vite

## Acerca de la app

Aquí encontrarás el entregable correspondiente a la clase #26 de Back-End por CoderHouse.

### Contruido con

- React Js (Vite)
- Node.js
- Express
- Passport
- Express Session

### Se necesita Node y Docker para correr este programa.

Así puedes instalar node

- npm
  ```sh
  npm install npm@latest -g
  ```
  Y Aquí puedes instalar [Docker](https://docs.docker.com/get-docker/)

### Instalación

1. Clonar el repositorio
   ```sh
   git clone https://github.com/G-Linares/passport-session-vite
   ```
2. Instalar Paquetería en Client
   ```sh
   cd client
   npm install
   ```
3. Instalar Paquetería en Server
   ```sh
   cd server
   npm install
   ```
4. Crear archivo .env en carpeta ./server el archivo tiene que tener las mismas variables que .env.example si no se va a mover nada de puertos puedes copiar y pegar a tu archivo .env creado. Ahi encontraras contraseñas y Url's para mongo, cors y docker.

5. Iniciar Docker, abrir aplicación de escritorio o correr en línea de comandos.

6. Iniciar Compose de Docker,
   ```sh
   cd server
   docker-compose up -d
   ```
7. Verificar que Docker funcione correctamente y haya montado la Base de Datos (Mongo)

   ```sh
   docker ps
   ```

8. Si está corriendo en puerto 27017 podemos continuar.

9. Iniciar Server Side

   ```sh
   cd server
   npm start
   ```

10. Iniciar Client side

```sh
cd client
npm start
```

### Notas

Quiero mencionar que la applicación no cuenta con estilos en front, se hizo con el propósito de cumplir al 100% con la entrega y se evito ocupar tiempo extra en agregar estilos.
