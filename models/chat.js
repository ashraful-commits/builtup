// Chat Schema and Socket.io Logic
const chatSchema = new mongoose.Schema({
    sender: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  });
  const Chat = mongoose.model('Chat', chatSchema);

  
  module.exports = Chat