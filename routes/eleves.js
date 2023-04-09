const express = require("express");
const router = express.Router();
const elevesControllers = require("../controllers/elevesControllers");

router.get("/", elevesControllers.getAll);
router.post("/", elevesControllers.add);
router.put("/:id", elevesControllers.update);
router.delete("/:id", elevesControllers.delete);

module.exports = router;