import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SendMessage extends React.Component {

  sendMessage(){
    if(this.refs.textarea.value.length === 0 )return;
    axios.post('/messages', {message: this.refs.textarea.value}).then((res)=>{
      this.refs.textarea.value = '';
      this.props.refresh();
    });;
  }

  render(){
    return (
      <div className="input">
        <textarea type="text" placeholder="Enter a message" ref="textarea"></textarea>
        <div className="buttonWrapper">
          <button type="button" onClick={this.sendMessage.bind(this)} name="button">send</button>
          <Link to="/logof">Sign out</Link>
        </div>
      </div>
    );
  }
}

export {SendMessage};
