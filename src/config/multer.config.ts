import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json') {
      cb(null, true); // Accept JSON files
    } else {
      cb(null, false); // Reject non-JSON files
    }
  },
  // limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1MB
});

export default upload;
