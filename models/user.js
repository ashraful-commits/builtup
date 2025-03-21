const  mongoose =require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    role:{
       type: String,
       default: 'user'
    },
    email: {
      type: String,
      trim: true,
    },
    
    password: {
      type: String,
      trim: true,
    },
    user:{
     type:String,
     
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

//===========================export model

module.exports = mongoose.model("User", userSchema);