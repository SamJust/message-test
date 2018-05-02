import React from 'react';
import { Link } from 'react-router-dom';

class LoginMessage extends React.Component {
  render(){
    return (
      <div className = "authorize">
        <Link to="/login">google+</Link>
        <p>Для добавления и комментирования сообщений выполните вход</p>
      </div>
    );
  }
}

export { LoginMessage };
