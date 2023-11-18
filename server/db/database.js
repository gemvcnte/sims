const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;
