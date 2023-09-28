
const mongoose = require("mongoose");
require('dotenv').config({});


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: false
    //   useNewUrlParser: "true",
    //  useUnifiedTopology: "true",
    });

    console.log(
      `MongoDB Connected: `
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
  }
};

module.exports = connectDB;
