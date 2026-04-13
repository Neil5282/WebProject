const Firmware = require("../models/Firmware");

// CREATE
exports.createFirmware = async (req, res) => {
  try {
    const firmware = await Firmware.create(req.body);
    res.json(firmware);
  } catch (err) {
    res.status(500).json(err);
  }
};

// READ
exports.getFirmware = async (req, res) => {
  const data = await Firmware.find();
  res.json(data);
};

// UPDATE
exports.updateFirmware = async (req, res) => {
  const updated = await Firmware.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE
exports.deleteFirmware = async (req, res) => {
  await Firmware.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};