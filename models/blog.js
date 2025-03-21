const mongoose =require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    
    description: {
      type: String,
      trim: true,
    },
    
    image: {
      type: String,
      trim: true,
    },
    tags: {
      type: String,
      trim: true,
    },
    comments: {
      type: [String],
      trim: true,
      default:[]
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

module.exports = mongoose.model('Blog', blogSchema);