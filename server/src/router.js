const router = require("express").Router();

const appController = require("./controllers/appController");
const postAppController = require("./controllers/post-appController");
const userController = require("./controllers/userController");
const profileController = require("./controllers/profileController");

router.use("/app-finder", appController);
router.use("/create-app", postAppController);
router.use("/users", userController);

router.use("/profile", profileController);

module.exports = router;
