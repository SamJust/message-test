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
      newComment: undefined,
      latestAddedComment: undefined
    };
  }

  componentDidMount () {
    axios.get('/messages').then((res)=>{
      let newState = {
        logged: res.data.logged,
        messages: res.data.data,
        username: res.data.name
      };
      this.setState(newState);
    });
  }

  refresh(id){
    axios.get('/messages').then((res)=>{
      let newState = {
        logged: res.data.logged,
        messages: res.data.data,
        username: res.data.name,
        latestAddedComment: id
      };
      this.setState(newState);
    });
  }

  createMessageDiv(item, id){
    let editButton = (this.state.username === item.authorName)?<div className="editButton button" onClick={this.setEditMessage.bind(this)}>edit</div>:false;
    let commentState = (this.state.logged) ? (this.state.newComment === item._id)?<div>
      <textarea ref="comment" placeholder="Enter new comment"></textarea>
      <div className="button" onClick={this.postComment.bind(this)}>send</div>
      <div className="button" onClick={this.cancelComment.bind(this)}>cancel</div>
    </div>:<div className="button" onClick={this.newComment.bind(this)}>comment</div> : false;
    let inlineStyles = (id==="-1" || item._id === this.state.latestAddedComment)? {} : { display: 'none' };

    return((item.parentId === id) ? (this.state.editingMessage === item._id)? <div style={inlineStyles} key={item._id} id={item._id} className = 'message'>
        <textarea ref='edit' defaultValue={item.message}></textarea>
        <div className="submitButton button" onClick={this.editMessage.bind(this)}>confirm</div>
        <div className="submitButton button" onClick={this.cancelEdit.bind(this)}>cancel</div>
        <span className="glyphicon glyphicon-triangle-left arrow"></span> {this.displayComments(item._id)}
     </div> : <div style={inlineStyles} key={item._id} id={item._id} className = 'message'>
      <p>{item.authorName} : {item.message}</p>
      {commentState}
      {editButton}
      <span onClick={this.showComment.bind(this)} className="glyphicon glyphicon-triangle-right arrow"></span>{this.displayComments(item._id)}
    </div> : false)
  }

  displayComments(id){
    return this.state.messages.map((item)=>{
      return (
        this.createMessageDiv(item, id)
      );
    });
  }

  editMessage(event){
    this.setState({
      editingMessage:undefined
    });
    if(this.refs.edit.value.length === 0) return;
    axios.post('/edit', {
      id:this.state.editingMessage,
      newText: this.refs.edit.value
    }).then(()=>{
      this.refresh();
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
    this.setState({
      newComment:undefined
    });
    if(this.refs.comment.value.length === 0) return;
    axios.post('/comment',{
      parentId:event.target.parentNode.parentNode.id,
      message:this.refs.comment.value
    }).then((res)=>{
      this.refresh(res.data.newId);
    })
  }

  showComment(event){
    let children = event.target.parentNode.children;
    let newStyle = (event.target.classList.contains('glyphicon-triangle-right')) ? 'block' : 'none';
    event.target.classList.toggle('glyphicon-triangle-right');
    event.target.classList.toggle('glyphicon-triangle-bottom');
    if(children.length === 0 ) return;
    for(let i = 0; i < children.length; i++){
      if(children[i].classList.contains('message')){
        children[i].style.display = newStyle;
      }
    }
  }

  render(){
    return(
      <div>
        <header>
          {(this.state.logged)?
            <SendMessageComponent refresh={this.refresh.bind(this)} />
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
