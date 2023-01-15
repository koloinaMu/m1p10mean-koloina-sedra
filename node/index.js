var express=require("express");
var app=express();
var url=require("url");
var cors=require('cors');
var Utilisateur=require('./objets/Utilisateur');
app.use(cors());
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var url = "mongodb://127.0.0.1:27017/";
var md5=require("md5");

 
// create application/json parser
var jsonParser = bodyParser.json();
var MongoClient=mongo.MongoClient;
 
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
	//var reponse=Utilisateur.insert(utilisateur);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mongomean");
	  utilisateur.mdp=md5(utilisateur.mdp);
	  dbo.collection("SuperAdmin").insertOne(utilisateur, function(err, ress) {
	    if (err) throw err;
	    //console.log(ress);
	    var o_id = new mongo.ObjectId(ress.insertedId.toString());
	    	//console.log(ress.insertedId.toString());
	    	//console.log(JSON.stringify(ress.insertedId.id));
	    var query={mail:  utilisateur.mail,mdp:utilisateur.mdp};
	    dbo.collection("SuperAdmin").findOne(query,function (err,resFind) {	    	
		    if (err){
		    	res.send(null);
		    } 
		    console.log(query);
	    	console.log(resFind);
	    	res.send(JSON.stringify(resFind));
	    });	  
	    db.close();
	    //console.log("1 document inserted");
	    reponse=utilisateur;
	    //res.send("okey");
	  });
	}); 
	//res.send(reponse);
});

app.post('/connexion',jsonParser, function (req,res) {
//	var utilisateur=new Utilisateur("kolo","kolo");
	var utilisateur=req.body;
	//var reponse= await Utilisateur.connect(utilisateur);
	//console.log(reponse);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mongomean");
	  //console.log(utilisateur);
	  var query={mail:utilisateur.mail,mdp:md5(utilisateur.mdp)};
	  reponse= dbo.collection("SuperAdmin").findOne(query,  function(err, ress) {
	    if (err){
	    	res.send(null);
	    	//return null;
	    	//throw err;
	    } 
	    db.close();
	    res.send(JSON.stringify(ress));
	    //res.send((ress));
	    //return JSON.stringify(ress);
	  });
	}); 
	//res.send(reponse);
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
