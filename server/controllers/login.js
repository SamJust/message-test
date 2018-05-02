const cred = require('../credentials.json');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(cred.clientID);

module.exports = (app)=>{
  app.get('/logof', (req, res)=>{
    delete req.session['userid'];
    delete req.session['username'];
    res.sendStatus(200);
  }); // удаление информации из сессии

  app.post('/google', async (req, res)=>{
    let ticket
      , payload;
    try {
      ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: cred.clientID,
      });
      payload = ticket.getPayload();
      req.session.userid = payload.sub;
      req.session.username = payload.name;
    } catch (e) {
      console.log(e);
      res.send('invalidToken');
      return;
    }
    res.send({result:true});
  }); // при получении id_token'a его расшифровка и сохранение информации и пользователе в сессию,
  // в случае ошибки отправка ответа об это и вывод ошибки в консоль
};
