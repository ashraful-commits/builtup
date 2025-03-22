const express = require("express");
const colors = require("colors");
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const mongoDBconnection = require("./config/db");
const publicRoute = require("./routes/public");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const quoteRoute = require("./routes/quote");
const blogRoute = require("./routes/blog");
const pageRouter = require("./routes/pageRouter"); // Remove if no longer needed
const { localVarFunc } = require('./middlewares/localVarFunc');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
dotenv.config();


// Init express
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'Nothing',
    saveUninitialized: true,
    resave: false,
  })
);
//========================= use local variable
app.use(localVarFunc);
app.use(cookieParser());
// EJS setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Static folder setup
app.use(express.static("public"));



// Router initialization
app.use('/', publicRoute);
app.use('/auth', pageRouter);
app.use('/auth/user', userRoute);
app.use('/auth/admin', adminRoute);
app.use('/auth/quote', quoteRoute);
app.use('/auth/admin/blog', blogRoute);

// Start Server
server.listen(port, async () => {
  await mongoDBconnection();
  console.log(`Server is running on port ${port}`.bgGreen.black);
});
