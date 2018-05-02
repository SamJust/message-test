const mongoose = require('mongoose');

let sessions = {};

let Session = mongoose.model('sessions');

new Promise((resolve, reject)=>{
  Session.findOne({}, (err, data)=>{
    if (err) {
      reject(err);
    } else {
      (data===null)? sessions = {} : sessions = data.sessions;
      resolve();
    }
  });
}).then(()=>{
  console.log('Sessions loaded');
}, (err)=>{
  console.log('Failed to load sessions');
  console.log(err);
});

// загрузка сессий из БД

module.exports = (req, res, next)=>{
  if(req.cookies.sessionId){
    req.session = sessions[req.cookies.sessionId]; // если куки с сессией существует то сохранить сссию в нужный объект
  }
  else {
    let sessionId = '_' + Math.random().toString(36).substr(2, 9) // если нет то сгенерировать новый id для сессии
    sessions[sessionId] = {};
    req.session = sessions[sessionId]; // присвоить ему значение пустого объекта
    res.cookie('sessionId', sessionId); // и сохранить id сессии в куки
    console.log('session created');
  }
  next();
};

setInterval(()=>{
  Session.update({}, {
    $set:{
      'sessions': sessions
    }
  }, (err, data)=>{
  });
}, 3000); // сохранение сессий в БД раз в 3 секунды
