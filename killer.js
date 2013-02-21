module.exports = function(onKilling){
  var exit = function(msg){
    onKilling();
    process.exit()
  }
  // 悲しみのwin32
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
  process.on('CTRL_BREAK_EVENT', function (msg) { exit(msg) })
  process.on('CTRL_CLOSE_EVENT', function (msg) { exit(msg) })
  process.on('CTRL_SHUTDOWN_EVENT', function (msg) { exit(msg) })
  process.on('CTRL_LOGOFF_EVENT', function (msg) { exit(msg) })
  process.on('exit', function(msg){exit(msg) })
  process.on('SIGUSR2', function(msg){exit(msg) })
}