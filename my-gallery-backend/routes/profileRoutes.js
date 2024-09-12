const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/', authMiddleware, upload.single('profilePicture'), async (req, res) => {
    const { email, birthdate, username, bio } = req.body;
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // อัปเดตข้อมูลที่ได้รับมา
      if (email) user.email = email;
      if (birthdate) user.birthdate = birthdate;
      if (username) user.username = username;
      if (bio) user.bio = bio;
      
      // อัปเดทรูปภาพโปรไฟล์หากมีการอัปโหลดใหม่
      if (req.file) {
        const filePath = `/uploads/${req.file.filename}`;
        user.profilePicture = filePath;
        console.log('Profile picture updated to:', filePath); // ตรวจสอบ path ของรูปใหม่
      }
  
      await user.save();
  
      console.log('Updated user:', user); // ตรวจสอบข้อมูลผู้ใช้หลังจากอัปเดท
      res.json(user);
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).send('Server Error');
    }
  });
  

// Upload profile picture
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
