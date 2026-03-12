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
    return bannerModel.createBanner(fields);
  }

  async updateBanner(id, fields) {
    const existing = await bannerModel.findBannerById(id);
    if (!existing) throw new ApiError(404, 'Banner not found');

    const merged = {
      banner_title:    fields.bannerTitle    ?? existing.banner_title,
      banner_desc:     fields.bannerDesc     ?? existing.banner_desc,
      banner_img:      fields.bannerImg      ?? existing.banner_img,
      banner_img_path: fields.bannerImgPath  ?? existing.banner_img_path,
      category_id:     fields.categoryId     ?? existing.category_id,
      sub_category_id: fields.subCategoryId  ?? existing.sub_category_id,
      service_id:      fields.serviceId      ?? existing.service_id,
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
