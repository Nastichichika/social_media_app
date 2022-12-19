export const getFormattedFriends = async(friendsList) => {
  const friends = await Promise.all(
    friendsList.map(friend => User.findByID(friend)),
  );
  const formattedFriends = friends.map(
    ({_id, firstName, lastName, icturePath, location, occupation}) => {
      return {_id, firstName, lastName, icturePath, location, occupation };
    },
  );
  return formattedFriends;
}