var express=require("express");
var app=express();
var url=require("url");
var cors=require('cors');
app.use(cors());

app.get('/',function (req,res) {
	console.log("let's see");
	res.send("Hello angular it node");
});
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
app.listen(3000,function () {
	console.log("start app");
});
