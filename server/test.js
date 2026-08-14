const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
  return mongoose.connection.db.collection('users').findOne();
})
.then(user => {
  console.log("Found user:", user);
  mongoose.disconnect();
})
.catch(err => console.log("Error:", err));