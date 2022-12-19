import e from "express";
import Post from "../models/Post";

// TODO add post location
export const createPost = async(req, res) => {
  try {
    const { userID, description, picturePath } = req.body;
    const newPost = new Post({userID, description, picturePath, likes: {}, comment: []});
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getFeedPosts = async(req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getUserPosts = async(req, res) => {
  try {
    const { userID } = req.params;
    const post = await Post.find({userID});
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const likePost = async(req, res) => {
  try {
    const { id, userID } = req.params;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userID);
    if (isLiked) {
      post.likes.delete(userID)
    } else {
      post.likes.set(userID, true)
    }
    const updatedPost = await Post.findbyIdAndUpdate(
      id, 
      { likes: post.likes },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
