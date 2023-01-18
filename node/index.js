var express=require("express");
var app=express();
var url=require("url");
var cors=require('cors');
var Utilisateur=require('./objets/Utilisateur');
var lpost=require('./objets/Post');
var reparationPrix=require('./objets/ReparationPrix');
app.use(cors());
var bodyParser = require('body-parser');
const { Console } = require("console");
const Post = require("./objets/Post");

 
// create application/json parser
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',function (req,res) {
	console.log("let's see");
	//var utilisateur=new Utilisateur("kolo","kolo");
	res.send("let's see");
});

// reparation prix CRUD

app.get('/reparation_id',function (req,res) {
	id_rep= reparationPrix.getLastId_reparationPrix();
	console.log(id_rep);
	res.send("liste reparation");
});





// post CRUD
app.get('/post',function (req,res) {
	Listpost= lpost.getAll();
	//liste=Object.keys(Listpost);
	console.log(Listpost);
	res.send("liste post");
});

app.delete('/:id', function (req,res) {
	console.log(req.params.id);
	post.supprimer(req.params.id);
	res.send("supprimer");
});

app.post('/create', function (req,res) {
	//console.log(req.params.id);
	var postinserer= new Post("post inserer","this is the first inserted post");
	post.insertPost(postinserer);
	res.send("ajouter-post");
});



app.post('/inscription',jsonParser,function (req,res) {
//	var utilisateur=new Utilisateur("kolo","kolo");
	var utilisateur=req.body;
	Utilisateur.insert(utilisateur);
	res.send("envoyee");
});



/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
app.listen(2000,function () {
	console.log("start app");
});
