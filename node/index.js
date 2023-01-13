var express=require("express");
var app=express();
var url=require("url");
var cors=require('cors');
var Utilisateur=require('./objets/Utilisateur');
app.use(cors());
var bodyParser = require('body-parser');

 
// create application/json parser
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',function (req,res) {
	console.log("let's see");
	//var utilisateur=new Utilisateur("kolo","kolo");
	res.send("let's see");
});

app.post('/inscription',jsonParser,function (req,res) {
//	var utilisateur=new Utilisateur("kolo","kolo");
	var utilisateur=req.body;
	Utilisateur.insert(utilisateur);
	res.send("envoyee");
})

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
