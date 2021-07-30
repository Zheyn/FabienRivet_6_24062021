const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ 
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const maxFileSize = 1024 * 1024 * 1; // 1MB - Limite la taille des images envoyées pour ne pas surcharger la base de données

module.exports = multer({storage: storage, limits: {fileSize: maxFileSize} }).single('image');