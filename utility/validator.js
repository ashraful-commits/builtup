 const validator = (msg, redirect, req, res) => {
   req.session.message = msg;
   console.log(req.session.message)
    res.redirect(redirect);
  };


module.exports = { validator };