const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const imagesPath = path.join(__dirname, "../public/images");
const pdfsPath = path.join(__dirname, "../public/pdfs");

// Create directories if they don't exist
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, { recursive: true });
}
if (!fs.existsSync(pdfsPath)) {
  fs.mkdirSync(pdfsPath, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = imagesPath; // Default upload path

    // Separate storage for PDFs
    if (file.mimetype === "application/pdf") {
      uploadPath = pdfsPath;
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// **Multer Upload Configurations**
const photoMulter = multer({ storage }).single("photo"); // Single image upload

const galleryMulter = multer({ storage }).array("gallery", 20); // Multiple images

const pdfMulter = multer({ storage }).single("attachment"); // Single PDF upload

module.exports = { photoMulter, galleryMulter, pdfMulter };
