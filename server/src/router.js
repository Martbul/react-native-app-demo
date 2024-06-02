const router = require("express").Router();

const userController = require("./controllers/userController");
const videoController = require("./controllers/videoController");

router.use("/users", userController);
router.use("/videos", videoController);


module.exports = router;
