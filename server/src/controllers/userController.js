const router = require("express").Router();
const userService = require("../services/userService");

const jwtDecode = require("jwt-decode");
const { extractErrorMsgs } = require("../utils/errorHandler");
//const isStrongPassword = require("validator/lib/isStrongPassword");
//const isEmail = require("validator/lib/isEmail");



router.post('/signup', async (req, res) => {

  const { username, email, password } = req.body;

  try {
    const decodedToken = await userService.singup({ username, email, password });


    res.json(decodedToken)
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log('err  ' + errorMessages);
    return errorMessages
  }
})


router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  try {
    const decodedToken = await userService.login(email, password);

    res.json(decodedToken)

  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    return Error
  }
});






module.exports = router;
