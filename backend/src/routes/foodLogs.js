const express = require('express');
const router = express.Router();
const foodLogController = require('../controllers/foodLogController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

router.post('/', foodLogController.create);
router.get('/', foodLogController.getByDate);
router.put('/:id', foodLogController.update);
router.delete('/:id', foodLogController.delete);

module.exports = router;
