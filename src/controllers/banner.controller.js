const bannerService = require('../services/banner.service');
const storageService = require('../services/storage.service');
const { sendSuccess } = require('../utils/responseFormatter');
const ApiError = require('../utils/ApiError');
const { getPaginationOptions, formatPaginatedResponse } = require('../utils/pagination');

class BannerController {
  async getAllBanners(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { skip, take, page: pageNum, limit: limitNum } = getPaginationOptions(page, limit);

      const { banners, total } = await bannerService.getAllBanners(skip, take);
      const paginatedData = formatPaginatedResponse(banners, total, pageNum, limitNum);

      sendSuccess(res, 200, 'Banners fetched successfully', paginatedData);
    } catch (error) {
      next(error);
    }
  }

  async getBannerById(req, res, next) {
    try {
      const { id } = req.params;
      const banner = await bannerService.getBannerById(id);
      sendSuccess(res, 200, 'Banner fetched successfully', banner);
    } catch (error) {
      next(error);
    }
  }

  async createBanner(req, res, next) {
    try {
      if (!req.file) throw new ApiError(400, 'Banner image is required');

      const { bannerTitle, bannerDesc, categoryId, subCategoryId, serviceId, status, show } = req.body;
      const bannerImgPath = await storageService.processUpload(req.file, 'banners');

      const banner = await bannerService.createBanner({
        banner_title:    bannerTitle,
        banner_desc:     bannerDesc,
        banner_img:      req.file.filename,
        banner_img_path: bannerImgPath,
        category_id:     categoryId || null,
        sub_category_id: subCategoryId || null,
        service_id:      serviceId || null,
        status,
        show,
      });

      sendSuccess(res, 201, 'Banner created successfully', banner);
    } catch (error) {
      next(error);
    }
  }

  async updateBanner(req, res, next) {
    try {
      const { id } = req.params;
      const { bannerTitle, bannerDesc, categoryId, subCategoryId, serviceId, status, show } = req.body;

      // If a new image was uploaded, resolve the path; otherwise pass null to keep existing
      const bannerImgPath = req.file
        ? await storageService.processUpload(req.file, 'banners')
        : null;

      const banner = await bannerService.updateBanner(id, {
        bannerTitle,
        bannerDesc,
        bannerImg:     req.file ? req.file.filename : null,
        bannerImgPath,
        categoryId,
        subCategoryId,
        serviceId,
        status,
        show,
      });

      sendSuccess(res, 200, 'Banner updated successfully', banner);
    } catch (error) {
      next(error);
    }
  }

  async deleteBanner(req, res, next) {
    try {
      const { id } = req.params;
      await bannerService.deleteBanner(id);
      sendSuccess(res, 200, 'Banner deleted successfully', null);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BannerController();
