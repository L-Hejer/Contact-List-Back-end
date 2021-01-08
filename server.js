const express = require('express');
const connectDB = require('./config/connectDB')

// init Express
const app = express();

//MiddleWare
app.use(express.json());

//Connect DB
connectDB()

// Contact Routes
app.use('/api/contact', require("./routes/api/contact"));

// Listen to the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
