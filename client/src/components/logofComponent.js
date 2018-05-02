import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Logof extends React.Component {

  componentDidMount(){
    let auth2 = window.gapi.auth2.getAuthInstance();
    auth2.disconnect().then(function () {
      console.log('User signed out.');
    });

    axios.get('/logof');
  }

  render(){
    return (<Redirect to="/" />);
  }
}

export {Logof};
