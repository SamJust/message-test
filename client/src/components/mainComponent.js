import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import {LoginMessage as LoginMessageComponent} from './header/loginMessageComponent.js';
import {SendMessage as SendMessageComponent} from './header/sendMessageComponent.js';

import '../css/main.css';

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      logged: false,
      username: '',
      messages: [],
      editingMessage: undefined,
      newComment: undefined
    };
  }

  componentDidMount () {
    axios.get('/messages').then((res)=>{
      let modedMessages = this.addDisplayValue(res.data.data);
      let newState = {
        logged: res.data.logged,
        messages: modedMessages,
        username: res.data.name
      };
      this.setState(newState);
    });
  }

  addDisplayValue(arr){
    return arr.map((item)=>{
      if(item.parentId === '-1') item.display = 'block';
      else item.display = 'none';
      return item;
    });
  }

  createMessageDiv(item, id){
    if(item.parentId !== id) return;
    let editButton = (this.state.username === item.authorName)?<div className="editButton button" onClick={this.setEditMessage.bind(this)}>edit</div>:false;
    let commentState = (this.state.logged) ? (this.state.newComment === item._id)?<div>
      <textarea ref="comment" placeholder="Enter new comment"></textarea>
      <div className="button" onClick={this.postComment.bind(this)}>send</div>
      <div className="button" onClick={this.cancelComment.bind(this)}>cancel</div>
    </div>:<div className="button" onClick={this.newComment.bind(this)}>comment</div> : false;
    let inlineStyles = { display: item.display };
    let date = new Date(item.date).toGMTString();
    date = date.substring(0, date.length - 4);

    return((this.state.editingMessage === item._id)? <div style={inlineStyles} key={item._id} id={item._id} className = 'message'>
        <textarea ref='edit' defaultValue={item.message}></textarea>
        <div className="submitButton button" onClick={this.editMessage.bind(this)}>confirm</div>
        <div className="submitButton button" onClick={this.cancelEdit.bind(this)}>cancel</div>
        <span className="glyphicon glyphicon-triangle-left arrow"></span> {this.displayComments(item._id)}
     </div> : <div style={inlineStyles} key={item._id} id={item._id} className = 'message'>
      <p>{date} {item.authorName} : {item.message}</p>
      {commentState}
      {editButton}
      <span onClick={this.showComment.bind(this)} className="glyphicon glyphicon-triangle-right arrow"></span>{this.displayComments(item._id)}
    </div>)
  }

  displayComments(id){
    return this.state.messages.map((item)=>{
      return (
        this.createMessageDiv(item, id)
      );
    });
  }

  editMessage(event){
    if(this.refs.edit.value.length === 0) return;
    axios.post('/edit', {
      id:this.state.editingMessage,
      newText: this.refs.edit.value
    }).then(()=>{
      let index = 0;
      for(let i = 0; i < this.state.messages.length; i++){
        if(this.state.messages[i]._id === this.state.editingMessage){
          index = i;
          break;
        }
      }
      let modedMessages = this.state.messages.slice();
      modedMessages[index].message = this.refs.edit.value;
      this.setState({
        messages: modedMessages,
        editingMessage: undefined
      });
    });
  }

  newComment(event){
    this.setState({
      newComment:event.target.parentNode.id,
      editingMessage: undefined
    });
  }

  cancelComment(){
    this.setState({
      newComment:undefined
    });
  }

  setEditMessage(event){
    this.setState({
      newComment: undefined,
      editingMessage:event.target.parentNode.id
    });
  }

  cancelEdit(){
    this.setState({
      editingMessage: undefined
    });
  }

  postComment(event){
    if(this.refs.comment.value.length === 0) return;
    axios.post('/comment',{
      parentId:event.target.parentNode.parentNode.id,
      message:this.refs.comment.value
    }).then((res)=>{
      res.data.display = "block";
      this.setState({
        newComment:undefined,
        messages: [...this.state.messages, res.data]
      });
    })
  }

  showComment(event){
    let children = event.target.parentNode.children;
    let newStyle = (event.target.classList.contains('glyphicon-triangle-right')) ? 'block' : 'none';
    event.target.classList.toggle('glyphicon-triangle-right');
    event.target.classList.toggle('glyphicon-triangle-bottom');
    if(children.length === 0 ) return;
    let modedMessages = this.state.messages.map((item)=>{
      if(event.target.parentNode.id === item.parentId) item.display = newStyle;
      return item;
    });
    this.setState({
      messages: modedMessages
    });
  }

  addMessage(message){
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  render(){
    return(
      <div>
        <header>
          {(this.state.logged)?
            <SendMessageComponent addMessage={this.addMessage.bind(this)} />
            :
            <LoginMessageComponent />
          }
        </header>
        <main>
        {(this.state.messages.length > 0)?
          this.state.messages.map((item, index, arr)=>{
            return this.createMessageDiv(item, '-1');
          }):false}
        </main>
      </div>
    );
  }
}

export { Main };
