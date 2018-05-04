import React from 'react';
import '../css/login.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      redirect:false
    };
  }

  googleLogin(){
    let auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn({
      scope: 'profile email'
    }).then((gUser)=>{
      let id_token = gUser.getAuthResponse().id_token;

      axios.post('/google', {token:id_token}).then((res)=>{
        if(res.data.result){
          this.setState({redirect:true});
        }
      });
    });
  }

  render(){
    let redirect = (this.state.redirect) ? <Redirect to="/" /> : undefined;
    return(
      <div className = 'googleSigninButton'>
        {redirect}
        <p onClick = {this.googleLogin.bind(this)}>Google+</p>
      </div>
    );
  }
}

export { Login };
