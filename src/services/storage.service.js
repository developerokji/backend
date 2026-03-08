// A central Storage Service class to abstract away file storage logic
// Currently configured for Local Filesystem (Multer Disk Storage)
// To migrate to S3: 
// 1. Install AWS SDK
// 2. Change the saveFilePath method below to upload to S3 instead of just returning the local relative path
const fs = require('fs');
class StorageService {
  /**
   * Processes the uploaded physical file from Multer and returns the public accessibility URL or Path.
   * @param {Object} multerFile - The file object injected by Multer middleware
   * @param {string} folder - The relative folder name (e.g., 'stories')
   * @returns {Promise<string>} - The final path/URL to save in the Database
   */
  async processUpload(multerFile, folder) {
    if (!multerFile) {
      return null;
    }

    // --- FUTURE S3 IMPLEMENTATION ---
    // const fileBuffer = require('fs').readFileSync(multerFile.path);
    // const s3Result = await s3Client.upload({ Bucket: 'YOUR_BUCKET', Key: `${folder}/${multerFile.filename}`, Body: fileBuffer }).promise();
    // return s3Result.Location;

    // --- CURRENT LOCAL FILESYSTEM IMPLEMENTATION ---
    // if the upload folder does not exist, create it
    if (!fs.existsSync(`uploads/${folder}`)) {
      fs.mkdirSync(`uploads/${folder}`);
    }
    return `/uploads/${folder}/${multerFile.filename}`;
  }
}

module.exports = new StorageService();
