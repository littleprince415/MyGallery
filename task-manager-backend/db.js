const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/taskmanager'; // URI ของ MongoDB

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
