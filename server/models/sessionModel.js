const mongoose = require('mongoose');

let modelSchema = new mongoose.Schema({
  sessions: Object
});

mongoose.model('sessions', modelSchema);

// ORM для сессий
