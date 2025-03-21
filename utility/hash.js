const  bcrypt =require('bcryptjs');

 const makeHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

module.exports = { makeHash };