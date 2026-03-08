const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/ApiError');

// Allowed image MIME types
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

// File filter — shared across all upload instances
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type! Only JPEG, PNG, GIF, WEBP, and SVG are allowed.'), false);
  }
};

/**
 * Creates a Multer upload instance for a specific resource folder.
 * @param {string} folder - Subfolder inside /uploads (e.g., 'stories', 'collections', 'users')
 * @returns {import('multer').Multer} - Configured Multer instance
 *
 * @example
 *   const { createUploader } = require('../middlewares/upload.middleware');
 *   router.post('/', createUploader('stories').single('image'), ...);
 *   router.post('/', createUploader('collections').single('image'), ...);
 */
const createUploader = (folder) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Resolve absolute path and create directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'uploads', folder);
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${folder}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
  });
};

module.exports = {
  createUploader,
};
