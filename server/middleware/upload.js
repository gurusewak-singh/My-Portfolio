import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// --- START: MANUAL DEBUGGING ---
// We will log the variables right before we use them to be 100% sure they are loaded.
console.log('--- DEBUG: Checking Environment Variables in upload.js ---');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Loaded' : 'MISSING');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Loaded' : 'MISSING');
console.log('---------------------------------------------------------');
// --- END: MANUAL DEBUGGING ---

// A_ REMOVED the global cloudinary.config() call from here.

// A_ Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  // A_ Pass the cloudinary instance with credentials DIRECTLY into the storage engine.
  // This is the most direct and explicit way to configure it.
  cloudinary: cloudinary,
  params: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    folder: 'portfolio_projects',
    allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const mimetype = allowed.test(file.mimetype);
  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, PNG and GIF are allowed."), false);
  }
};

export const upload = multer({ storage, fileFilter });