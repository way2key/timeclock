const http = require('http');
const api = require('./api');
const action = require('./action/action');
const moment = require('moment');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '4000');
api.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(api);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

//Socket
const io = require('socket.io').listen(server);
var clockMachines = [];

const dashboard = io
.of('/dashboard')
.on('connection', socket => {
  console.log("Capitaine, le tableau de bord est connecté !");
  dashboard.emit("updateClockMachine", clockMachines);
  dashboard.on('disconnect', () => console.log('Capitaine, le tableau de bord vient de se déconnecter !'))
})

const allotStudent = io
.of('/allotStudent')
.on('connection', socket => {
  console.log("Capitaine, l'outils de répartition est en ligne");
  allotStudent.emit("updateClockMachine", clockMachines);
  allotStudent.on('disconnect', () => console.log("Capitaine, l'outil de réparation est hors-ligne"))
})

const clockMachine = io
.of('/clockMachine')
.on('connection', socket => {
  console.log("Capitaine, une nouvelle pointeuse se pointe !");
  clockMachine.emit("requestProclamation");

  socket.on('proclamation', machine => {
    machine['socketId'] = socket.id;
    machine['createdTime'] = socket.handshake.time;
    machine['url'] = "http://"+socket.handshake.headers.host.split(":")[0]+":4200/teacher/login";
    clockMachines.push(machine);
    dashboard.emit("newClockMachine", machine);
  })

  //Théorique
  socket.on('update', machine => {
    allotStudent.emit("updateClockMachine", clockMachines);
    dashboard.emit("updateClockMachine", clockMachines);
  })

  socket.on('disconnect', user => {
    console.log("Pointeuse hors ligne");
    clockMachines = clockMachines.filter(item => item.socketId !== socket.id);
    dashboard.emit('clockMachineDisconnected', socket.id);
  });

});
