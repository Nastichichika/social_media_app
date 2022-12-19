import express from "express";
import verifyToken from "../middleware/app";

const routers = express.Router();

// read
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//update 
router.patch('/:id/:friendID', verifyToken, addRemoveFriend);

export default routers;