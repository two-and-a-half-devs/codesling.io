import http from 'http';
import SocketIo from 'socket.io';
import { each } from 'lodash';

import Rooms from './rooms';
import clientEvents from './clientEvents';
import log from './lib/log';

const server = http.createServer();
const io = SocketIo(server);
const rooms = new Rooms(io);

io.on('connection', (client) => {
  log('client connected');
  const { roomId } = client.handshake.query;
  const room = rooms.findOrCreate(roomId || 'default');
  client.join(room.get('id'));

  each(clientEvents, (handler, event) => {
    client.on(event, handler.bind(null, { io, client, room }));
  });

});

const port = process.env.PORT || 4155;
server.listen(port, () => log(`socket server listening on port ${port}`));
