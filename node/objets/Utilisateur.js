var mongo = require('mongodb');
var url = "mongodb://127.0.0.1:27017/";
/*
class Utilisateur{
	constructor(nom, prenom) {
	    this.nom = nom;
	    this.prenom = prenom;
	}	

}*/
var MongoClient=mongo.MongoClient;
function insert(utilisateur) {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mongomean");
	  dbo.collection("Utilisateur").insertOne(utilisateur, function(err, res) {
	    if (err) throw err;
	    //console.log(utilisateur);
	    //console.log("1 document inserted");
	    db.close();
	  });
	}); 
}	


//module.exports=Utilisateur
exports.insert=insert;