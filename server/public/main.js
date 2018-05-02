function signOut() {
  let auth2 = gapi.auth2.getAuthInstance(); // получение обэекта с функциями
  auth2.disconnect().then(function () {// и отключение разрешений пользователя от приложения
    console.log('User signed out.');
  });
};

function onInit(){
  gapi.load('auth2', ()=>{// при загрузке Google API загружается модуль auth2 и создаётся его инстанс с нужным client_id
      gapi.auth2.init({
        client_id: '826273774095-oc33g9cst9sp8fa8t5f38af1uuvm56dk.apps.googleusercontent.com'
      });
  })
}
