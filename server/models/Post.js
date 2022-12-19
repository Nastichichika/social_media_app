import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    location: String,
    description: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    // comments: {
    //   type: Map,
    // } // TODO Make comments Map by <User, Comment> or just Comment
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
)

export default new mongoose.model('Post', PostSchema);