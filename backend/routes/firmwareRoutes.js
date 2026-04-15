const Firmware = require("../models/Firmware");
const router = require("express").Router();
const {
  createFirmware,
  getFirmware,
  updateFirmware,
  deleteFirmware
} = require("../controllers/firmwareController");

router.post("/", createFirmware);
router.get("/", getFirmware);
router.put("/:id", updateFirmware);
router.delete("/:id", deleteFirmware);

router.put("/download/:id", async (req, res) => {
  try {
    
    const firmware = await Firmware.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } }, // increase by 1
      { new: true }
    );

    res.json(firmware);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


