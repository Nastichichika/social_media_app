import express from "express";
import { verifyToken } from "../middleware/app";

const routers = express.Router();

routers.get("/", verifyToken, getFeedPosts);
routers.get("/:userId", verifyToken, getUserPosts);

routers.patch("/:id/like", verifyToken, likePost);

export default routers;