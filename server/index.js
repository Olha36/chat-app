const express = require('express');
const cors = require('cors'); // allows to communicate with frontend
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');

const app = express();
require('dotenv').config();

app.use(express.json()); // allows to receive and send json data
app.use(cors());
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
  res.send('Welcome to our chat app API');
});



const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`Server is running on  port ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connection established'))
  .catch((error) => console.log('MongoDB connection failed:', error.message));
