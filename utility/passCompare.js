const  bcrypt =require('bcryptjs');

 const passCompare = (password, compPass) => {
  const comPassWord = bcrypt.compareSync(password, compPass);
  return comPassWord;
};


module.exports = {passCompare};