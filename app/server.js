var path = require("path")
module.exports.createServer = function(){
  var http = require('http')
  var connect = require('connect');
  connect.router = require('connect_router');
  connect.gitJson = require("./connect-git-json.js")
  
  var app = connect()
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use(connect.static('./app/view'))
    .use(connect.directory('./app/view'))
    .use(connect.gitJson());
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
