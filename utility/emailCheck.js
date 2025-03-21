const User =require('../models/user');

 const checkEmail = async (email) => {
  const check = await User
    .findOne()
    .where('email')
    .equals(email);
  return check;
};

module.exports = { checkEmail };