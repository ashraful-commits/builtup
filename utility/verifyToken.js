const  jwt =require('jsonwebtoken');

 const verifyToken = (token) => {
  const checkToken = jwt.verify(token, process.env.JWT_SECRECT);
  return checkToken;
};

module.exports = { verifyToken };