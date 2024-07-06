const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const Task = require('./models/Task'); // Import Task model

const DB_URI = 'mongodb://localhost:27017/taskmanager'; // URI ของ MongoDB

mongoose.connect(DB_URI, {
  }).then(() => {
    console.log('เชื่อมต่อ MongoDB แล้ว');
  }).catch(err => console.error('ข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err));
  

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find(); 
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

router.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/tasks/:id', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  

router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use('/api', router);

const port = 5000; // กำหนด port ที่ Backend จะทำงาน

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
