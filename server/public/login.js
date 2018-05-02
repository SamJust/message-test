function onSignIn(googleUser) {
  console.log('Loged in');
  var id_token = googleUser.getAuthResponse().id_token;

  let xml = new XMLHttpRequest();
  let body = `token=${encodeURIComponent(id_token)}`;

  xml.open('POST', '/google', true);
  xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xml.send(body);

  xml.onload = ()=>{
    if(xml.response === 'true') window.location.replace('/');
  }; // при получении id token'a его отправка на сервер путём XMLHttpRequest
};
