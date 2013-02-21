var path = require("path")
module.exports.createServer = function(){
  var http = require('http')
  var connect = require('connect');
  connect.router = require('connect_router');
  var app = connect()
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use(connect.static('./app/view'))
    .use(connect.directory('./app/view'))
    .use(connect.router(function(app){
      var baseDir = "./app/controller"
      var controllers = require("glob").sync(baseDir + "/**/*.js")
      controllers.forEach(function(ctrlr){
        var resolved = path.resolve(ctrlr);
        var func = require(resolved)
        // TODO:
        // func.setConfig
        //
        // func.method
        // func || func.callback
        // func.router
        var router = ctrlr.replace(baseDir,"").replace(/.js/,"");
        app.get(router,function(req, res){
          
          func.callbackJson(req,function(json){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(json))
            res.end()
          })
        });
      })
    }))
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
