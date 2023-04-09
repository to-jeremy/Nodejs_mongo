const express = require("express");
const router = express.Router();
const administrationControllers = require("../controllers/administrationControllers");

router.get("/", administrationControllers.getAll);
router.post("/", administrationControllers.add);
router.put("/:id", administrationControllers.update);
router.delete("/:id", administrationControllers.delete);

module.exports = router;