const express = require("express");
const router = express.Router();
const intervenantsControllers = require("../controllers/intervenantsControllers");

router.get("/", intervenantsControllers.getAll);
router.post("/", intervenantsControllers.add);
router.put("/:id", intervenantsControllers.update);
router.delete("/:id", intervenantsControllers.delete);

module.exports = router;