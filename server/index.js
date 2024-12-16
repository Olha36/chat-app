const express = require('express');
const cors = require('cors'); // allows to communicate with frontend
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

app.use(express.json()); // allows to receive and send json data
app.use(cors());

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`Server is running on  port ${port}`);
});

mongoose
  .connect(uri)
  .then(() => console.log('MongoDb connection established'))
  .catch((error) => console.log('MongoDB connection failed:', error));
