const express = require("express");
const router = express.Router();
const classesControllers = require("../controllers/classesControllers");

router.get("/", classesControllers.getAll);
router.post("/", classesControllers.add);
router.put("/:id", classesControllers.update);
router.delete("/:id", classesControllers.delete);

module.exports = router;