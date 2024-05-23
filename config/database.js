const mongoose = require('mongoose');

require ('dotenv').config();
const uri = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));
 // client.close();
module.exports = mongoose.connection;
