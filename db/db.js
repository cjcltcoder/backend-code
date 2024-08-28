require('dotenv').config();
const mongoose = require('mongoose');


const dbConnect = async() => {
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);  
  });

};

module.exports = dbConnect;
