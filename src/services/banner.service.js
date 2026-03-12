const bannerModel = require('../models/banner.model');
const ApiError = require('../utils/ApiError');

class BannerService {
  async getAllBanners(skip, take) {
    return bannerModel.getAllBanners(skip, take);
  }

  async getBannerById(id) {
    const banner = await bannerModel.findBannerById(id);
    if (!banner) throw new ApiError(404, 'Banner not found');
    return banner;
  }

  async createBanner(fields) {
    return bannerModel.createBanner({
      bannerTitle:    fields.bannerTitle,
      bannerDesc:     fields.bannerDesc,
      bannerImg:      fields.bannerImg,
      bannerImgPath: fields.bannerImgPath,
      categoryId:     fields.categoryId,
      subCategoryId: fields.subCategoryId,
      serviceId:      fields.serviceId,
      status:          fields.status,
      show:            fields.show,
    });
  }

  async updateBanner(id, fields) {
    const existing = await bannerModel.findBannerById(id);
    if (!existing) throw new ApiError(404, 'Banner not found');

    const merged = {
      bannerTitle:    fields.bannerTitle    ?? existing.banner_title,
      bannerDesc:     fields.bannerDesc     ?? existing.banner_desc,
      bannerImg:      fields.bannerImg      ?? existing.banner_img,
      bannerImgPath: fields.bannerImgPath  ?? existing.banner_img_path,
      categoryId:     fields.categoryId     ?? existing.category_id,
      subCategoryId: fields.subCategoryId  ?? existing.sub_category_id,
      serviceId:      fields.serviceId      ?? existing.service_id,
      status:          fields.status         ?? existing.status,
      show:            fields.show           ?? existing.show,
    };

    await bannerModel.updateBanner(id, merged);
    return bannerModel.findBannerById(id);
  }

  async deleteBanner(id) {
    const existing = await bannerModel.findBannerById(id);
    if (!existing) throw new ApiError(404, 'Banner not found');
    return bannerModel.deleteBanner(id);
  }
}

module.exports = new BannerService();
