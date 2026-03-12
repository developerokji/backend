const express = require('express');
const subCategoryController = require('../controllers/sub-category.controller');
const { validate } = require('../middlewares/validation.middleware');
const { createUploader } = require('../middlewares/upload.middleware');
const { createSubCategorySchema, updateSubCategorySchema } = require('../validators/sub-category.validator');

const router = express.Router();
const upload = createUploader('sub-categories');

router.get('/',      subCategoryController.getAllSubCategories);  // optional ?categoryId=1
router.get('/:id',   subCategoryController.getSubCategoryById);
router.post('/',     upload.single('image'), validate(createSubCategorySchema), subCategoryController.createSubCategory);
router.patch('/:id', upload.single('image'), validate(updateSubCategorySchema), subCategoryController.updateSubCategory);
router.delete('/:id',subCategoryController.deleteSubCategory);

module.exports = router;
