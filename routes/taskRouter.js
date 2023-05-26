const taskController = require("../controllers/taskController");
const router = require("express").Router();

router.post("/addTask", taskController.addTask);
router.get("/getTasks", taskController.getAllTask);
router.get("/:id", taskController.getOneTask);
router.delete("/:id", taskController.deleteOneTask);
router.patch("/:id", taskController.updateTask);

module.exports = router