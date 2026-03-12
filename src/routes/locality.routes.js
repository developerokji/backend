const express = require('express');
const localityController = require('../controllers/locality.controller');
const { validate } = require('../middlewares/validation.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { createStorySchema } = require('../validators/story.validator');
const { createUploader } = require('../middlewares/upload.middleware');

const router = express.Router();

router.get('/', localityController.getLocality);
router.post('/', localityController.createLocality);
router.patch('/:id', localityController.updateLocality);
router.delete('/:id', localityController.deleteLocality);

module.exports = router;
