const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware'); // เพิ่ม middleware นี้

// TaskForm route
router.post('/tasks/new', authMiddleware, async (req, res) => {
    const { title, description, status } = req.body;
    
    // เพิ่ม userId จาก req.user
    const newTask = new Task({
        title,
        description,
        status,
        userId: req.user._id // เพิ่ม userId
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
