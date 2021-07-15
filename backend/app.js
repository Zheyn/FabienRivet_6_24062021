const express = require('express'); // Importation du framework Express
const bodyParser = require('body-parser')
const mongoose = require('mongoose'); // Importation du plugin Mongoose pour se connecter à la base de données

// Importations des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path'); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier

// Connexion à la base de données mongoDB
mongoose.connect('mongodb+srv://Zheyn:projet6@cluster0.ljrmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

// Middleware pour transformer le corps de la requête en JSON en objet JS.
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Middleware qui permet de faire communiquer le serveur front et back ensemble
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images'))); //// Midleware qui permet de charger les fichiers qui sont dans le repertoire images

app.use('/api/auth', userRoutes);

app.use('/api/sauces', sauceRoutes);

module.exports = app;