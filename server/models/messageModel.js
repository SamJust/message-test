const mongoose = require('mongoose');

let messagesModel = new mongoose.Schema({
  date: Number,
  message: String,
  author: String,
  authorName: String,
  parentId: String
});

mongoose.model('messages', messagesModel);

// ORM для сообщений
