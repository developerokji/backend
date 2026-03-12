const { db } = require('../config/db');

class BannerModel {
  async getAllBanners(skip, take) {
    const limit = Number(take);
    const offset = Number(skip);

    const [banners] = await db.query(
      `SELECT id, banner_title, banner_desc, banner_img, banner_img_path,
              category_id, sub_category_id, service_id, status, show, created_at
       FROM banners
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countResult] = await db.query(`SELECT COUNT(*) as total FROM banners`);
    const total = countResult[0].total;

    return { banners, total };
  }

  async findBannerById(id) {
    const [rows] = await db.query(
      `SELECT id, banner_title, banner_desc, banner_img, banner_img_path,
              category_id, sub_category_id, service_id, status, show, created_at
       FROM banners WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async createBanner(data) {
    const { banner_title, banner_desc, banner_img, banner_img_path, category_id, sub_category_id, service_id, status, show } = data;
    const [result] = await db.query(
      `INSERT INTO banners (banner_title, banner_desc, banner_img, banner_img_path, category_id, sub_category_id, service_id, status, show)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [banner_title, banner_desc, banner_img, banner_img_path, category_id, sub_category_id, service_id, status, show]
    );
    return result;
  }

  async updateBanner(id, data) {
    const { banner_title, banner_desc, banner_img, banner_img_path, category_id, sub_category_id, service_id, status, show } = data;
    const [result] = await db.query(
      `UPDATE banners
       SET banner_title = ?, banner_desc = ?, banner_img = ?, banner_img_path = ?,
           category_id = ?, sub_category_id = ?, service_id = ?, status = ?, show = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [banner_title, banner_desc, banner_img, banner_img_path, category_id, sub_category_id, service_id, status, show, id]
    );
    return result;
  }

  async deleteBanner(id) {
    const [result] = await db.query(`DELETE FROM banners WHERE id = ?`, [id]);
    return result;
  }
}

module.exports = new BannerModel();
