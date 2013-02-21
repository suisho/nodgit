var Git = require('gift')
var git = new Git({
  "git-dir" : "./"
});
module.exports = function(app, config){
  git = new Git({
    "git-dir" : config.git_dir
  });
  
}

module.exports.callbackJson = function(res, callback){
  git.status( function(err, o){
    callback(o)
  })
}
