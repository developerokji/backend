const express = require('express');
const categoryController = require('../controllers/category.controller');
const { validate } = require('../middlewares/validation.middleware');
const { createUploader } = require('../middlewares/upload.middleware');
const { createCategorySchema, updateCategorySchema } = require('../validators/category.validator');

const router = express.Router();
const upload = createUploader('categories');

router.get('/',      categoryController.getAllCategories);
router.get('/:id',   categoryController.getCategoryById);
router.post('/',     upload.single('image'), validate(createCategorySchema), categoryController.createCategory);
router.patch('/:id', upload.single('image'), validate(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);

module.exports = router;
