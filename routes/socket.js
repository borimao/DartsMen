const data_save = require('./../Model/data_save');

const socket_event = (socket) => {
  console.log('A user connected');
  socket.on('data_save', (data) => data_save(data));
}

module.exports = socket_event;
