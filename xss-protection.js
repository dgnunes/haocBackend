var xss = require('node-xss').clean;

exports.filter = function (req,res,next){
  console.log("FILTER");
  req.body =  xss(req.body);
  req.params =  xss(req.params);
  next();
}
