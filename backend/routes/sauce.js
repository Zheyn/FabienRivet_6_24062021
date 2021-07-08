const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, sauceCtrl.createSauce);
  
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
  
router.delete('/:id', auth, sauceCtrl.deleteSauce);
  
router.get('/:id', auth, sauceCtrl.getOneSauce);
  
router.get('/', auth, sauceCtrl.getAllSauce);

// Route qui permet de gérer les likes des sauces
// Définit le statut "j'aime" pour userID fourni. Si j'aime = 1,l'utilisateur aime la sauce. Si j'aime = 0,l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas. Si j'aime =-1, l'utilisateur n'aime pas la sauce.L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, engardant une trace de ses préférences et en l'empêchant d'aimer ou de ne pas aimer la même sauce plusieurs fois. Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime".
router.post('/:id/like', auth, sauceCtrl.like)

module.exports = router;