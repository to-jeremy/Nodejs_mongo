const express = require("express");
const router = express.Router();
const matieresControllers = require("../controllers/matieresControllers");

router.get("/", matieresControllers.getAll);
router.post("/", matieresControllers.add);
router.put("/:id", matieresControllers.update);
router.delete("/:id", matieresControllers.delete);

module.exports = router;