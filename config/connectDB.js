const mongoose = require('mongoose');
const config = require('config');

// Connect to mongoDB
const connectDB = () => {
  mongoose
    .connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
