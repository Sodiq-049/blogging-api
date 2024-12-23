const mongoose = require('mongoose');

const connectDB = async () => {
  const dbURI = process.env.NODE_ENV === 'test' ? process.env.DB_URI_TEST : process.env.DB_URI;

  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
