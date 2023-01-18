const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var reparationPrix=require('./objets/ReparationPrix')
const ReparationPrix= require('./objets/ReparationPrix')
const app = express()
var cors=require('cors');
app.use(cors({
  methods: ['GET', 'PUT', 'DELETE', 'POST']
}));

MongoClient.connect('mongodb://127.0.0.1:27017/mongomean', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('mongomean')
    const reparationCollection = db.collection('reparationPrix')

    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    
    
    
    
    // ========================
    // Routes reparation prix
    // ========================
    
    app.get('/select_reparation', cors(),function(req, res) {
      db.collection('reparationPrix').find().toArray()
        .then(quotes => {
          //res.render('listepost' ,{ quotes: quotes })
          console.log(quotes);
          res.send(quotes);
          return quotes;
          
        })
        .catch(/* ... */)
    })

    app.post('/insert_reparation_prix', (req, res) => {
        db.collection('reparationPrix').find({}).limit(1).sort({_id: -1}).toArray()
          .then(quotes => {
            //res.render('listepost' ,{ quotes: quotes })
            console.log(quotes[0]._id);
            var id_reparation=quotes[0]._id + 1;
            //return quotes[0]._id;
            reparation= new ReparationPrix(id_reparation,"diagnostic",700000);
            reparationPrix.insererReparationPrix(reparation);
            
          })
          .catch(/* ... */)
      })


    app.put('/quotes', (req, res) => {
      reparationCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/delete_reparation/:id', (req, res) => {
       reparationPrix.supprimer(req.params.id);
    })

    // ========================
    // Routes facture 
    // ========================
    
    app.get('/facture', (req, res) => {
      db.collection('facture').aggregate([
        { $lookup:
           {
             from: 'reparationPrix',
             localField: 'reparation._id',
             foreignField: '_id',
             as: 'detail_reparation'
           }
          
           
         }
        ]).toArray(function(err, resultat) {
        if (err) throw err;
        console.log(JSON.stringify(resultat));
        res.send(resultat);
      });
    });




























    // ========================
    // Listen
    // ========================
    const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })
  .catch(console.error)
