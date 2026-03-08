const express = require('express');
const storyController = require('../controllers/story.controller');
const { validate } = require('../middlewares/validation.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { createStorySchema } = require('../validators/story.validator');
const { createUploader } = require('../middlewares/upload.middleware');

const router = express.Router();

router.get('/', storyController.getStories);
router.post('/', createUploader('stories').single('image'), validate(createStorySchema), storyController.createStory);
router.patch('/:id', createUploader('stories').single('image'), storyController.updateStory);
router.delete('/:id', storyController.deleteStory);


module.exports = router;
