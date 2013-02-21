module.exports.createServer = function(){
  var http = require('http')
  var connect = require('connect');
  connect.router = require('connect_router');
  var app = connect()
         .use(connect.favicon())
         .use(connect.logger('dev'))
         .use(connect.static('public'))
         .use(connect.directory('public'))
         .use(connect.cookieParser())
         .use(connect.session({ secret: 'my secret here' }))
  
  server = http.createServer(app)
  socket(server)
  return server
}
var socket = function(server) {
  // TODO: wsかsocket.ioかは悩むところ。
  var WebSocketServer = require('ws').Server;
  var websocket = new WebSocketServer({ server: server });
  websocket.on('message', function(message) {
    console.log(message);
  });
};
