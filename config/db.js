const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://kaunghtetpaing:kaunghtet199@cluster0-shard-00-00.hbnks.mongodb.net:27017,cluster0-shard-00-01.hbnks.mongodb.net:27017,cluster0-shard-00-02.hbnks.mongodb.net:27017/storybook?ssl=true&replicaSet=atlas-11n5u4-shard-0&authSource=admin&retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
