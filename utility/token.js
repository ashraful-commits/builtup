const  jwt =require('jsonwebtoken');

 const makeToken = (payload, exp = '3d') => {
  const token = jwt.sign(payload, process.env.JWT_SECRECT, {
    expiresIn: exp,
  });
  return token;
};

module.exports = { makeToken };