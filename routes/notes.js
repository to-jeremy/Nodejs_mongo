const express = require("express");
const router = express.Router();
const notesControllers = require("../controllers/notesControllers");

router.get("/", notesControllers.getAll);
router.post("/", notesControllers.add);
router.put("/:id", notesControllers.update);
router.delete("/:id", notesControllers.delete);

module.exports = router;