const express = require('express'); // Importation du framework Express
const bodyParser = require('body-parser')
const app = express(); 
const mongoose = require('mongoose'); // Importation du plugin Mongoose pour se connecter à la base de données
const mongoSanitize = require('express-mongo-sanitize'); // Importation du plugin Express-Mongo-Sanitize pour la gestion des données
// Importations des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
const path = require('path'); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier


require('dotenv').config();
// Connexion à la base de données mongoDB et utilisation de process.env pour récupérer les informations de connexion caché dans le fichier .env (variable d'environnement)
// Installation du package dotenv - npm install dotenv
mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(mongoSanitize()); // Utilisation du plugin Express-Mongo-Sanitize pour la gestion des données


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

app.use('/images', express.static(path.join(__dirname, 'images'))); // Midleware qui permet de charger les fichiers qui sont dans le repertoire images

app.use('/api/auth', userRoutes);

app.use('/api/sauces', sauceRoutes);

module.exports = app; // Export de l'application