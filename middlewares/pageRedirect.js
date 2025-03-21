
const User  =require('../models/user');
const jwt =require('jsonwebtoken');
const {validator} = require('../utility/validator');
 const pageRedirect = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      const tokenCheck = await jwt.verify(
        token,
        process.env.JWT_SECRECT
      );

      if (tokenCheck) {
        const validData = await User.findById({
          _id: tokenCheck.id,
        });
        if (validData) {
          next();
        } else {
          delete req.session.user;
          res.clearCookie('authToken');
          validator('Registration Please!', '/auth/login', req, res);
        }
      }
    } else {
      delete req.session.user;
      res.clearCookie('authToken');
      validator('Please login !', '/auth/login', req, res);
    }
  } catch (error) {
    delete req?.session?.user;
    res.clearCookie('authToken');
    validator('Invalid token', '/auth/login', req, res);
  }
};

module.exports = { pageRedirect };