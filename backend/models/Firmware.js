const mongoose = require("mongoose");

const firmwareSchema = new mongoose.Schema({
  title: String,
  brand: String,
  description: String,
  fileUrl: String,

 downloads: {
    type: Number,
    default: 0
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Firmware", firmwareSchema);




