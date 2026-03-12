const express = require('express');
const bannerController = require('../controllers/banner.controller');
const { validate } = require('../middlewares/validation.middleware');
const { createUploader } = require('../middlewares/upload.middleware');
const { createBannerSchema, updateBannerSchema } = require('../validators/banner.validator');

const router = express.Router();
const upload = createUploader('banners');

router.get('/',     bannerController.getAllBanners);
router.get('/:id',  bannerController.getBannerById);
router.post('/',    upload.single('bannerImage'), validate(createBannerSchema), bannerController.createBanner);
router.patch('/:id',upload.single('bannerImage'), validate(updateBannerSchema), bannerController.updateBanner);
router.delete('/:id',bannerController.deleteBanner);

module.exports = router;
