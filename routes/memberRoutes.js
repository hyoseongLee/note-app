const express = require('express');
const router = express.Router();
router.use(express.json());

const { registerValidator, loginValidator } = require('../validators/memberValidator');
const validate = require('../middlewares/validate');

const { registerMember, loginMember } = require('../controllers/memberController');

// 회원 API
router
  .post('/register', registerValidator, validate, registerMember)
  .post('/login', loginValidator, validate, loginMember);

module.exports = router;