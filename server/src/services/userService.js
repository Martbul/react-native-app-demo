const User = require("../models/User");



const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { jwtDecode } = require('jwt-decode')
const { SECRET } = require("../constants");
// const { body } = require('express-validator');

async function validatePassword(password, userPassword) {

  const isValid = await bcrypt.compare(password, userPassword);
  //console.log(isValid);

  if (!isValid) {
    throw new Error("invalid email or password");
  }
}

async function getToken(user) {
  const payload = { username: user.username, _id: user._id, email: user.email };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
}




exports.singup = async (userData) => {

  try {

    const user = await User.create(userData);
    const token = await getToken(user); //works
    const decodedToken = jwtDecode(token)

    return decodedToken;
  } catch (err) {
    console.log('err: ' + err);
  }

};



exports.login = async (email, password) => {
  
  const user = await User.findOne({email});


  if (!user) {
    return ("invalid username or password");
  }

  await validatePassword(password, user.password);

  const token = await getToken(user);
  const decodedToken = jwtDecode(token)

  return decodedToken;
};
