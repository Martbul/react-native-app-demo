const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "usernmae is required"],
    minLength: [3, "username is too short"],
    maxLength: [70, "usernmae is too long"],
   
  },

  email: {
    unique: [true, "email already exists"],
    type: String,
    required: [true, "email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "password is too short"],
  },

});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);


module.exports = User;
