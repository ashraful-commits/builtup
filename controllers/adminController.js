const QuoteRequest = require("../models/quoteModel");
const Blog = require("../models/blog");
const {validator} = require("../utility/validator");
const admindashbord = async(req, res)=>{
           
        try {
            const user = req?.session?.user;
            if (!user) {
                return validator("Please login first", "/auth/login", req, res);
            }
            const allQuotes = await QuoteRequest.find().sort({ createdAt: -1 });
           
            const allBlogs = await Blog.find().sort({ createdAt: -1 });
            
            res.render("admin", { allQuotes,allBlogs }); 
        } catch (error) {
            console.error("Error fetching quotes:", error);
            res.status(500).send("Internal Server Error");
        }
}


module.exports = {admindashbord}