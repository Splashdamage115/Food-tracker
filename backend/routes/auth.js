const express = require('express');
const router = express.Router();
const { register, login, validate } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/validate', protect, validate);

module.exports = router;
