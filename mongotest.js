require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Simple schema and model (optional)
const MessageSchema = new mongoose.Schema({ text: String });
const Message = mongoose.model('Message', MessageSchema);

// Routes
app.get('/', async (req, res) => {
  const message = await Message.findOne() || { text: 'Hello, World!' };
  res.send(message.text);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
