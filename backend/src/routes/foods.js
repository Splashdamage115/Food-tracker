const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

router.get('/search', foodController.search);
router.get('/:id', foodController.getById);
router.post('/', foodController.create);

module.exports = router;
