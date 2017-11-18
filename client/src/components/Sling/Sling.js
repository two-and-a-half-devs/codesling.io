import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';
import { throttle } from 'lodash';
import $ from 'jquery'

import Button from '../globals/Button';
import StdOut from './StdOut';
import EditorHeader from './EditorHeader';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import jwtDecode from 'jwt-decode';
import './Sling.css';

class Sling extends Component {
  state = {
    text: '',
    stdout: '',
    username: jwtDecode(localStorage.token).username,
    messages: [],
    users: []
  }

  runCode = () => {
    this.socket.emit('client.run');
  }

  sendMessage = () => {
    let message = $('#msg').val();
    console.log('trying to send:', message);
    this.socket.emit('client.message', {
      message: message,
      username: this.state.username
    });
    $("#msg").val('');

  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId: this.props.slingId,
      }
    });

    this.socket.on('server.message', (incomingMessages) => {
      if (incomingMessages.message) {
        let sender = incomingMessages.username;
        if (incomingMessages.username === this.state.username) {
          sender = 'me';
        }
      let message = sender +": "+ incomingMessages.message;
      let updatedMessages = this.state.messages;

      updatedMessages.unshift(message);
      console.log(updatedMessages);
      this.setState({
        messages: updatedMessages
        })
      }
    });

    this.socket.on('server.message', (data) => {
      let user = data.username;
      let updatedUsers = this.state.users;
      if (!updatedUsers.includes(user)) {
        updatedUsers.push(user);
      }
      console.log(updatedUsers);
      this.setState({
        users: updatedUsers
        })
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
      this.socket.emit('client.message', {
        username: this.state.username
      });
    });

    this.socket.on('server.initialState', ({ id, text }) => {
      this.setState({ id, text });
    });

    this.socket.on('server.changed', ({ text }) => {
      this.setState({ text });
    });

    this.socket.on('server.run', ({ stdout }) => {
      this.setState({ stdout });
    });

    window.addEventListener('resize', this.setEditorSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setEditorSize);
  }

  handleChange = throttle((editor, metadata, value) => {
    this.socket.emit('client.update', { text: value });
  }, 250)

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  initializeEditor = (editor) => {
    // give the component a reference to the CodeMirror instance
    this.editor = editor;
    this.setEditorSize();
  }

  render() {
    return (
      <div className="sling-container">
        <EditorHeader />
        <div className="code-editor-container">
          <CodeMirror
            editorDidMount={this.initializeEditor}
            value={this.state.text}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: 'base16-dark',
            }}
            onChange={this.handleChange}
          />
        </div>
        <div className="stdout-container">
          <Button
            className="run-btn"
            text="Run Code"
            backgroundColor="red"
            color="white"
            onClick={this.runCode}
          />
          <StdOut
            text={this.state.stdout}
          />
        </div>
        <div className="chats-container">
          <input id="msg" placeholder="Enter message"></input>
            <br></br><br></br>
            <Button
              id="send-button"
              text="Send"
              backgroundColor="blue"
              color="white"
              onClick={this.sendMessage}
            />
          <div>
            <h6>Users Connected:{this.state.users.map((user) => " " + user + " ")}
            </h6>
          </div>
          <div className="messages">
            <ul id="messages">
              {this.state.messages.map((message) => <li>{message}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sling;
