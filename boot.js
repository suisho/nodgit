var cn = require('node-chrome');
var path = require("path")
var async = require("async")

var clientDir = "./client"


// Create server
var port = 8030
var app = require("./app/server.js");
var server = app.createServer(port);
server.listen(8030)

// exec chrome
var fs = require("fs")

var opts = {
  //runtime: "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
  runtime: process.env.LOCALAPPDATA+"\\Google\\Chrome\\Application\\chrome.exe",
  files: path.join(clientDir, "app/view"),
  port: port,
  index:  "/index.html",
};
var onlyServer = true
if(!onlyServer){
  var chrome = require("chromety")(opts)
  chrome.on('exit', function (code) {
    console.log("Chrome is exit");
    process.exit()
  });
  var killer = require("./killer");
  killer(function(){
    if(chrome){
      chrome.kill();
    }
  })
}
