var cn = require('node-chrome');
var path = require("path")
var async = require("async")

var clientDir = "./client"


// Create server
var port = 8030
var app = require("./app/index.js");
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


var chrome = require("chromety")(opts)

// process　と　chrome　はｽﾞｯ友だょ

var exit = function(msg){
  try{
    chrome.kill();
  }catch(e){
    console.log(e);
  }
  process.exit()
}
chrome.on('exit', function (code) {
  console.log("Chrome is exit");
  process.exit()
});

// 悲しみのwin32
// しかも動かないよ。
if(process.platform === "win32"){
  var keypress = require("keypress");
  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setRawMode(true);
  process.stdin.setEncoding("utf8");
  process.stdin.on("keypress", function(char, key) {
    if (key && key.ctrl && key.name == "c") {
      // Behave like a SIGUSR2
      process.emit("SIGUSR2");
    }
  });
}
process.on('SIGINT', function (msg) { exit(msg) })
process.on('SIGHUP', function () { exit() })
process.on('CTRL_C_EVENT', function (msg) { exit(msg) })
process.on('exit', function(msg){exit(msg) })
process.on('SIGUSR2', function(msg){exit(msg) })


