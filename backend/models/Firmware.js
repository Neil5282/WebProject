const mongoose = require("mongoose");

const firmwareSchema = new mongoose.Schema({
  title: String,
  brand: String,
  description: String,
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Firmware", firmwareSchema);