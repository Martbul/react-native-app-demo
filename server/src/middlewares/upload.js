const multer = require('multer')
const path = require('path')

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  }
});
const upload = multer({ storage })
module.exports = upload

