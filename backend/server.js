const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON

// MongoDB Connection (Updated without deprecated options)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.log('MongoDB connection error:', err));

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from Netflix Clone Backend!');
});

// Use Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});