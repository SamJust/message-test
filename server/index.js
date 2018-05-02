const express = require('express')
    , PORT = process.env.PORT || 3001
    , mongoose = require('mongoose')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser');

mongoose.connect('mongodb://admin:admin@ds159509.mlab.com:59509/message-test');

require('./models');

const sessions = require('./modules/session');

let app = express();

app.use('/public', express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessions);

require('./controllers')(app);

app.get('*', (req, res)=>{
  res.sendStatus(404);
});

app.listen(PORT, ()=>{
  console.log(`Listening to port ${PORT}`);
});
