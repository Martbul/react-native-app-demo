const User = require("../models/User");

exports.getProfileData = async (email) => {
  const profileData = await User.findOne({ email: email });

  console.log(profileData);
  return profileData;
};



//! oshte malko imash za updatejt
exports.update = (
  currentEmail,
  username,
  firstName,
  lastName,
  phoneNumber,
  country,
  city,
  aboutMe
) => {
  console.log(currentEmail);
  console.log(firstName);

  return User.findOneAndUpdate(
    { email:currentEmail },
    {
      username: username,
      firstName: firstName,
      lastName: lastName,
      country: country,
      city: city,
      phoneNumber: phoneNumber,
      aboutMe: aboutMe,
    },
    { new: true }
  );
};
