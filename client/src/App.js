import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import {Login as LoginComponent} from './components/loginComponent.js';
import {Main as MainComponent} from './components/mainComponent.js';
import {Logof as LogofComponent} from './components/logofComponent.js';

class App extends Component {
  
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
