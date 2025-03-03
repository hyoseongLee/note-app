const express = require('express');
const router = express.Router();
router.use(express.json());

const { noteIdValidator, noteValidator } = require('../validators/noteValidator');
const validate = require('../middlewares/validate');

const { verifyToken } = require('../middlewares/auth');
const { getNotes, getNote, createNote, updateNote, deleteNote, deleteNotes } = require('../controllers/noteController');

router.use(verifyToken);
router.use('/:id', noteIdValidator, validate);

// '/notes'
router
  .route('/') 
  .get(getNotes)
  .post(noteValidator, validate, createNote)
  .delete(deleteNotes);

// '/notes/:id'
router
  .route('/:id')
  .get(getNote)
  .put(noteValidator, validate, updateNote)
  .delete(deleteNote);

module.exports = router;