const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path');

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
    try {
        res.json({ filePath: `/uploads/${req.file.filename}` });
    } catch (error) {
        console.error('Failed to upload file:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
