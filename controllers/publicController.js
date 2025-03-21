const Blog = require('../models/blog');
const homePage = (req, res) => {
    res.render('index')
};
const aboutPage = (req, res) => {
    res.render('about');
};
const servicePage = (req, res) => {
    res.render('service');
};
const blogPage =async (req, res) => {
    const allBlogs = await Blog.find().sort({ createdAt: -1 });
   
    res.render('blog',{allBlogs});
};
const blogopenPage =async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blogopen',{blog});
}
const contactPage = (req, res) => {
    res.render('contact');
};
const additionPage = (req, res) => {
    res.render('addition-service');
};
const basementPage = (req, res) => {
    res.render('basement');
};
const renovancePage = (req, res) => {
    res.render('renovation');
};
const rooflingPage = (req, res) => {
    res.render('roofing');
};
const sidingPage = (req, res) => {
    res.render('siding');
};
const chagngePassword = (req, res) => {
    const user = req?.session?.user;
    res.render('password-change',{user});
};

const forgetPassword = (req, res) => {
    res.render('forget-password');
};
const resetPassword = (req, res) => {
    const token = req.params.token;
    res.render('reset-password',{token});
};

module.exports = {
    homePage,
    aboutPage,
    servicePage,
    blogPage,
    blogopenPage,
    contactPage,
    additionPage,
    basementPage,
    renovancePage,
    rooflingPage,
    sidingPage,
    chagngePassword,
forgetPassword,resetPassword
};