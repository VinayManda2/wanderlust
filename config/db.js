const mongoose = require("mongoose");
const colors = require("colors");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL environment variable is not set.");
    }

    await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To MongoDB Database ${mongoose.connection.host}`.bgBlue.white
    );
  } catch (error) {
    console.log(`MongoDB Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
