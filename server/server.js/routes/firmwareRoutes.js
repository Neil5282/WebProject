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

module.exports = router;