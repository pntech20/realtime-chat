const users = [];

// User join chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// User leaves chat
function userLeave(id) {
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex !== -1) {
    // Remove the user from users array and then return the removed user
    return users.splice(userIndex, 1)[0]
  }
}

// Get users in a room
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id)
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers,
  getCurrentUser
}