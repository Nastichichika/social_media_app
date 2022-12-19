import User from "../models/User";
import { getFormattedFriends } from "../utils/util";

export const getUser = async(req, res) => {
  try {
    const id = req.params;
    const user = await User.findByID(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getUserFriends = async(req, res) => {
  try {
    const id = req.params;
    const user = await User.findByID(id);
    const formattedFriends = await getFormattedFriends(user.friends);
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const addRemoveFriend = async(req, res) => {
  try {
    const { id, friendID }= req.params;
    const user = await User.findByID(id);
    const friend = await User.findByID(friendID);
    if (user.friends.includes(friendID)) {
      user.friends = user.friends.filter(friend => friend !== friendID);
      friend.friends = user.friends.filter(friend => friend !== id);
    } else {
      user.friends.push(friendID);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
    const formattedFriends = await getFormattedFriends(user.friends);
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

