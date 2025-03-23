// Toggle Chat Window
const chatIcon = document.getElementById('chat-icon');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');

chatIcon.addEventListener('click', () => {
    chatWindow.style.display = 'block';
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

// Socket.IO Logic
const socket = io();

// Join room (use user ID or admin ID)
const userId = 'user123'; // Replace with dynamic user ID
socket.emit('joinRoom', userId);

// Send message
document.getElementById('sendButton').addEventListener('click', () => {
    const message = document.getElementById('messageInput').value;
    if (message) {
        const data = {
            sender: userId,
            receiver: 'admin', // Always send to admin
            message,
        };
        socket.emit('sendMessage', data);
        document.getElementById('messageInput').value = '';
    }
});

// Receive message
socket.on('receiveMessage', (message) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.sender}: ${message.message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the latest message
});