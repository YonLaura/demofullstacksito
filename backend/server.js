// server.js
const express = require('express');
const cors = require('cors');

// Cambiar el nombre a clienteRoutes y usar la ruta correcta
const clienteRoutes = require('./routers/ClienteRouters');

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    // Usamos /clientes en lugar de /productos
    this.app.use('/clientes', clienteRoutes);
  }

  start() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  }
}

const server = new Server();
server.start();
