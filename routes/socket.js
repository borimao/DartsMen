const data_save = require('./../Model/data_save');
const user_save = require('./../Model/user_save');

const socket_event = (socket) => {
  console.log('A user connected');
  socket.on('data_save', (data) => data_save(data));
  socket.on('user_save', (data) => {
    socket.emit('user_list', user_save(data))
  });
}

module.exports = socket_event;
