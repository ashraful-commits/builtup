const { validator }=require('../utility/validator');

  const loginCheck = (req, res, next) => {
  const token = req.session.authToken;
  if (token) {
    validator('', '/', req, res);
  } else {
    next();
  }
};

module.exports = { loginCheck };