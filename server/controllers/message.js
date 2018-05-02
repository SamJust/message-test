const mongoose = require('mongoose');

const Message = mongoose.model('messages');

module.exports = (app)=>{
  app.get('/messages', (req, res)=>{
    Message.find({}, (err, data)=>{
      data.sort((a, b)=>{
        return a.date - b.date;
      });
      if(req.session.userid && req.session.username){
        res.json({
          logged:true,
          name:req.session.username,
          data
        });
      }
      else{
        res.json({
          logged:false,
          data,
          name:req.session.username
        });
      }
    });
  }); // поиск всех сообщений и их отправка

  app.post('/messages', (req, res)=>{
    Message.create({
      author:req.session.userid,
      authorName: req.session.username,
      message:req.body.message,
      date: Date.now(),
      parentId:"-1"
    },(err, data)=>{
      res.json(data);
    });
  }); // создане новго сообщения

  app.post('/edit', (req, res)=>{
    Message.findByIdAndUpdate(req.body.id, {
      $set:{
        message:req.body.newText
      }
    }, (err, data)=>{
      res.sendStatus(200);
    });
  }); //изменение существующего сообщения или комментария

  app.post('/comment', (req, res)=>{
    Message.create({
      author:req.session.userid,
      authorName: req.session.username,
      message:req.body.message,
      date: Date.now(),
      parentId:req.body.parentId
    },(err, data)=>{
      res.json(data);
    });
  }); //создание новго комментария
};
