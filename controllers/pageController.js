const { validator } = require("../utility/validator");
const swal = require("sweetalert");
const  User  = require("../models/user");
const { checkEmail } = require("../utility/emailCheck");
const { makeHash } = require("../utility/hash");
const { makeToken } = require("../utility/token");
const { sendAMail } = require("../utility/email");
const { verifyToken } = require("../utility/verifyToken");
const { passCompare } = require("../utility/passCompare");
const fs = require("fs");
const { send } = require("process");
const { now } = require("mongoose");

//================================= home page
const homePage = (req, res) => {
  res.render("index")
};
//================================= profile page
const profilePage = (req, res) => {
  const user = req.session.user;

  res.render("profile", {
    user,
  });
};
//================================= home page
const editPage = (req, res) => {
  res.render("edit");
};
//================================= password page
const passwordPage = (req, res) => {
  res.render("password");
};
//================================= gallery page
const galleryPage = (req, res) => {
  const user = req.session.user;
  res.render("gallery", {
    user,
  });
};
//================================= friends page
const friendsPage = async (req, res) => {
  const allFriends = await User
    .find()
    .where({ email: { $ne: req.session.user.email } });
  res.render("friends", {
    friends: allFriends,
  });
};
//================================= signup page
const signupPage = (req, res) => {
  res.render("register");
};
//================================= login page
const loginPage = (req, res) => {
  res.render("login");
};
//================================= profile photo page
const pofilePhotoPage = (req, res) => {
  const user = req.session.user;
  res.render("photo", {
    user,
  });
};

///////////////////////////======== action start =======================///////////////

const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return validator("All fields are required", "/auth/register", req, res);
    }

    const check = await checkEmail(email);
    if (check) {
      return validator("Email already exists!", "/auth/register", req, res);
    }

    const allUsers = await User.find();
    let user;

    if (allUsers.length === 0) {
      // First user should be an admin
      user = await User.create({
        name,
        role: "admin",
        email,
        password: await makeHash(password),
        isActive: false,
      });
    } else {
      user = await User.create({
        name,
        email,
        password: await makeHash(password),
        isActive: false,
      });
    }



    // Generate token for email verification
    const token = makeToken({ id: user._id }, "3d");
  

    const link = `${process.env.APP_LINK}/auth/active/${token}`;
    
    // Send verification email
    await sendAMail(email, {
      name,
      link,
      status: "Active",
    });

    return validator("Check your emial to active your account", "/auth/login", req, res);
  } catch (error) {
    console.error("Error during signup:", error);
    return validator(error.message, "/auth/register", req, res);
  }
};

//==================================================active User
const activeUser = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) {
      return validator("User is Not valid", "/auth/login", req, res);
    } else {
      const checkToken = verifyToken(token);
   
      if (checkToken) {
        await User.findByIdAndUpdate(
          { _id: checkToken.id },
          {
            isActive: true,
          }
        );
        return validator("Account Actived Successfully!", "/auth/login", req, res);
      } else {
        return validator("User not Valid !", "/auth/login", req, res);
      }
    }
  } catch {
    return validator(error.message, "/auth/login", req, res);
  }
};
//==========================================================> login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return validator("All fields are required !", "/auth/login", req, res);
    } else {
      const findUser = await checkEmail(email);
      if (!findUser) {
        return validator("Please Signup!", "/auth/login", req, res);
      } else {
        if (findUser.isActive) {
          const passComp = passCompare(password, findUser.password);

          if (passComp) {
            req.session.user = findUser;
        
            const token = makeToken({ id: findUser._id }, "4d");
         
            res.cookie("authToken", token);
            return validator("",`/auth/${req.session.user.role}`, req, res);
          } else {
            return validator("Password not Match", "/auth/login", req, res);
          }
        } else {
          return validator("Please Active Account!", "/auth/login", req, res);
        }
      }
    }
  } catch (error) {
   
    return validator(error.message, "/auth/login", req, res);
  }
};

//======================================logout
const userLogout = (req, res) => {
  delete req.session.user;
  res.clearCookie("authToken");
  return validator("Logout Successfully done!", "/auth/login", req, res);
};

//======================================== profile photo upload
const profilePhoto = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.session.user._id, {
      photo: req.file.filename,
    });
    req.session.user.photo = req.file.filename;
    return validator("Photo uploaded !", "/photo", req, res);
  } catch (error) {
    return validator(error.message, "/photo", req, res);
  }
};

//================================= update profile
const UpdateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email ) {
      return validator("All fields are required", "/edit", req, res);
    } else {
      const updateProfile = await User.findByIdAndUpdate(
        req.session.user._id,
        {
          name,
          email,
          location,
        }
      );
      req.session.user = updateProfile;
      return validator("profile updated", "/auth/login", req, res);
    }
  } catch (error) {
    return validator(error.message, "/edit", req, res);
  }
};

//======================================change password

const passwordChange = async (req, res) => {
  try {
    const { oldpassword, newpassword, confirmpassword } = req.body;
    if (!oldpassword || !newpassword || !confirmpassword) {
      return validator("All fields are required", "/password", req, res);
    } else {
      const userId = await User.findById(req.session.user._id);
      const checkPass = passCompare(oldpassword, userId.password);
      if (!checkPass) {
        return validator("Password not match", "/change-password", req, res);
      } else {
        await User.findByIdAndUpdate(req.session.user._id, {
          password: await makeHash(newpassword),
        });
        return validator("Password Updated!", "/auth/login", req, res);
      }
    }
  } catch (error) {
    return validator(error.message, "/change-password", req, res);
  }
};

//============================== gallery photo upload
const galleryPhotoUpload = async (req, res) => {
  try {
    const gall = [];

    req.files.forEach((element) => {
      gall.push(element.filename);
      req.session.user.gallery.push(element.filename);
    });

    const updateWithGallary = await User.findByIdAndUpdate(
      req.session.user._id,
      {
        $push: { gallery: { $each: gall } },
      }
    );
    
    return validator("Gallery Uploaded", "/gallery", req, res);
  } catch (error) {
    return validator(error.message, "/gallery", req, res);
  }
};

//==========================================// image delete

const galleryPhotoDelet = async (req, res) => {
  //   const { path } = req.params;
  //   const imgpath = `../public/images/${path}`;

  //   fs.unlinkSync(imgpath);
  //   return validator('File deleted!', '/gallery', req, res);
};

const forgetPage = (req, res) => {
  res.render("forget-password");
};

//============================= send reset mail
const passResetMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return validator("Please give a email !");
    } else {
      const userEmail = await User.findOne().where("email").equals(email);
      if (!userEmail) {
        return validator("Email not Valid!", "/forget-password", req, res);
      } else {
        const token = makeToken({ id: userEmail._id }, "5d");
        const link = `${process.env.APP_LINK}/resetpass/${token}`;
        
        await sendAMail(email, {
          name: userEmail.name,
          link: link,
          status: "Reset",
        });
        return validator("Check your mail to reset password", "/forget-password", req, res);
      }
    }
  } catch (error) {
    return validator(error.message, "/forget-password", req, res);
  }
};

//=========================== reset password

const resetPage = (req, res) => {
  const { token } = req.params;
  res.render("resetpassword", { token: token });
};

const resetpassword = async (req, res) => {
  const { token } = req.params;
  try {
    const checkTokenTwo = verifyToken(token);
    
    if (!checkTokenTwo) {
      return validator("/Token not Valid", `/resetpass/${token}`, req, res);
    } else {
      const { newpassword, confirmpassword } = req.body;
      if (!newpassword || !confirmpassword) {
        return validator("All fields are required!", `/resetpass/${token}`, req, res);
      } else if (newpassword != confirmpassword) {
        return validator("Password not Match", `/resetpass/${token}`, req, res);
      } else {
        await User.findByIdAndUpdate(checkTokenTwo.id, {
          password: await makeHash(newpassword),
        });
   
        return validator("Password reseted Successfully!", "/auth/login", req, res);
      }
    }
  } catch (error) {
    return validator(error.message, `/resetpass/${token}`, req, res);
  }
};

module.exports = {
  homePage,
  userSignUp,
  loginUser,
  activeUser,
  passwordChange,
  profilePhoto,
  galleryPhotoUpload,
  galleryPhotoDelet,
  forgetPage,
  passResetMail,
  resetPage,
  resetpassword,
  userLogout,
  profilePage,
  editPage,
  passwordPage,
  galleryPage,
  friendsPage,
  signupPage,
  loginPage,
  pofilePhotoPage,
  UpdateProfile,
};
