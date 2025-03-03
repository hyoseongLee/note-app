const express = require('express');
const router = express.Router();
router.use(express.json());

const { noteIdValidator } = require('../validators/noteValidator');
const validate = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/auth');

const { getFavorites, addFavorite, deleteFavorite } = require('../controllers/favoriteController');

router.use(verifyToken);
router.use('/id', noteIdValidator, validate);

// 즐겨찾기 API
router
  .get('/', getFavorites)
  .post('/add/:id', addFavorite)
  .delete('/delete/:id', deleteFavorite);

module.exports = router;
