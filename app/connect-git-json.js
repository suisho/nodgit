var Git = require('gift')
var url = require("url")
var qs = require("querystring")
var getGit = function(query){
  var git = new Git("./"); //TODO:opt
  if(query){
    var queries = qs.parse(query);
    if(queries.repo){
      git = new Git(queries.repo);
    }
  }
  return git
}
var defaultOptions = function(command){
  switch(command){
    case "diff":
      return ["HEAD", "HEAD~"]
  }
  return [];
}

exports = module.exports = function(options){
  var routerPrefix = "git"
  
  return function gitJson(req, res, next) {
    var matcher = new RegExp(routerPrefix+"/(.*)")
    var parsedUrl = url.parse(req.url);
    if(!matcher.test(parsedUrl.pathname)){
      next()
      return;
    }
    var git = getGit(parsedUrl.query);
    
    
    var matches = parsedUrl.pathname.match(matcher)[1].split("/");
    var gitFuncName = matches.shift();
    var gitFunc = git[gitFuncName]
    var opts = matches
    
    if(typeof gitFunc  != "function"){
      next()
      return;
    }
    var args = [];
    var callback = function(err, result){
      var json = JSON.stringify(result)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(json);
      res.end()
    }
    // detect default opts
    // diffとか色々デフォルトのオプションしこまなきゃいかん
    if(opts.length > 0){
      opts = defaultOptions(gitFunc)
    }
    // setup args
    if(opts.length > 0){
      args.push(opts)
    }
    args.push(callback)
    
    gitFunc.apply(git, args)
    
  }
}
