const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'event-app-67384', 
  keyFilename: '../serviceAccountKey.json',
});

const bucket = storage.bucket('gs://event-app-67384.appspot.com'); 
const multerStorage = multer.memoryStorage();

// Initialize multer with the multer storage engine
const upload = multer({
  storage: multer.memoryStorage(),
});

module.exports = upload;
