const login = require('./login')
    , message = require('./message')

module.exports = (app)=>{
  login(app);
  message(app);

  // создание раутинга
};
