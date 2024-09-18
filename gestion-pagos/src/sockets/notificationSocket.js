const socketHandler = (io) => {
    io.on('connection', (socket) => {
      console.log('Un administrador se ha conectado');
  
      socket.on('newPayment', (payment) => {
        io.emit('paymentUpdate', payment); // Emitir a todos los admins conectados
      });
  
      socket.on('disconnect', () => {
        console.log('Administrador desconectado');
      });
    });
  };
  
  module.exports = socketHandler;
  