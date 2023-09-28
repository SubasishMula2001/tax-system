
const mongoose = require("mongoose");
require('dotenv').config({});

 const uri = "mongodb+srv://tax-app:tax-app@tax-app.fyjwfl9.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: false
    });

    console.log(
      `MongoDB Connected `
    );
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = connectDB;
