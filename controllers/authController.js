
// get resister page
const registerPage =(req, res)=>{
    res.render('register')
}

// preate post resister
const createRegisteForm =(req, res)=>{}




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>for login >>>>>>>>>>>>>>>>>
// get  login page
const loginPage =(req, res)=>{
    res.render('login')
}


// create post resister
const createLoginForm =(req, res)=>{}


// get user
const userdashbordRoute =(req, res)=>{
    res.render('user-dashbord')
}

// module export
module.exports = {registerPage, createRegisteForm, loginPage, createLoginForm, userdashbordRoute }