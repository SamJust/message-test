import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import {Login as LoginComponent} from './components/loginComponent.js';
import {Main as MainComponent} from './components/mainComponent.js';
import {Logof as LogofComponent} from './components/logofComponent.js';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      logged: false
    }
  }

  componentDidMount(){
    this.loadGAPI();
  }

  loadGAPI() {

    let script = document.createElement("script");
    script.src = `/public/main.js`;

    script.onload = ()=>{
      let googleScript = document.createElement("script");
      googleScript.src = `https://apis.google.com/js/client.js?onload=onInit`;

      document.body.appendChild(googleScript);
    };
    document.body.appendChild(script);
  }

  googleLogout(){
    let auth2 = window.gapi.auth2.getAuthInstance();
    auth2.disconnect().then(function () {
      console.log('User signed out.');
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={MainComponent} />
          <Route path='/login' component={LoginComponent} />
          <Route path='/logof' component={LogofComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
