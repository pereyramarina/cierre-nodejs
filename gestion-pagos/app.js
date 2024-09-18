const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/database/connection');
const userRoutes = require('./src/routes/userRoutes');
const upload = require('./src/utils/fileUpload');
const socketHandler = require('./src/sockets/notificationSocket');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/users', userRoutes);

// Socket.IO
socketHandler(io);

// Sincronizar base de datos y levantar servidor
sequelize.sync()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('Error conectando a la base de datos:', err));
