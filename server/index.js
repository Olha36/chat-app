const express = require('express');
const cors = require("cors"); // allows to communicate with frontend

const app = express();

app.use(express.json()); // allows to receive and send json data
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log(`Server is running on  port ${port}`);
    
})