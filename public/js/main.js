const socket = io();
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const usersList = document.querySelector('#users')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  // bypass the leading question mark "?"
  ignoreQueryPrefix: true
})

// Emit joinRoom when user go to chat screen
// this main.js file is called from chat.html
socket.emit('joinRoom', { username, room })

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
})

socket.on('message', message => {
  outputMessage(message)

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const imputEl = e.target.elements.msg;

  const msg = imputEl.value;
  // Emit message to server
  socket.emit('chatMessage', msg)

  // Clear input
  imputEl.value = ''
  imputEl.focus()
})

// Out message to DOM
function outputMessage(msg) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>
  `
  chatMessages.appendChild(div)
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerHTML = room
}

// Add users to DOM
function outputUsers(users) {
  usersList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}