const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();

// Models
const Task = require('./models/Task');
const User = require('./models/User');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');

// Middleware
app.use(cors()); // ใช้ cors middleware โดยอนุญาตทุก origin
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Connect to MongoDB
const DB_URI = config.get('mongoURI');
mongoose.connect(DB_URI, {}).then(() => {
    console.log('เชื่อมต่อ MongoDB แล้ว');
}).catch(err => console.error('ข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // ตรวจสอบให้แน่ใจว่าพาธนี้มีอยู่
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


// Middleware to check token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.get('jwtSecret'), (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Auth routes
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to fetch user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Correctly access userId
        if (!user) return res.sendStatus(404);
        res.json(user);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Route to update user profile
app.put('/api/profile', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    try {
        const { email, birthdate, username, bio } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.sendStatus(404);

        user.email = email;
        user.birthdate = birthdate;
        user.username = username;
        user.bio = bio;

        if (req.file) {
            user.profilePicture = req.file.path; // บันทึกพาธของไฟล์ที่อัปโหลด
        }

        await user.save();
        res.sendStatus(200);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.sendStatus(500);
    }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
