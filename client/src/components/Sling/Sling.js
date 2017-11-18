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
import './Sling.css';

class Sling extends Component {
  state = {
    text: '',
    stdout: '',
    username: '',
    messages: []
  }

  runCode = () => {
    this.socket.emit('client.run');
  }

  sendMessage = () => {
    let message = $('#msg').val();
    // let messageArray = []
    console.log('trying to send:', message);
    this.socket.emit('client.message', {
      message: message,
      username: 'me'
    });
    $("#msg").val('');

    this.socket.on('server.message', (incomingMessages) => {
      let message = incomingMessages.message;
      let updatedMessages = this.state.messages;
      updatedMessages.push(message);
      console.log(updatedMessages);
      this.setState({
        messages: updatedMessages
      })

    });
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId: this.props.slingId,
      }
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
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
          <input id="msg" placeholder="enter a chat"></input>
            <br></br><br></br>
            <Button
              id="send-button"
              text="Send"
              backgroundColor="blue"
              color="white"
              onClick={this.sendMessage}
            />
          <br></br>
          <div className="messages">
            <CodeMirror
              value={this.state.messages.map((message) => message).join('\n')}
              options={{
                mode: 'plaintext',
                lineNumbers: false,
                theme: 'base16-dark',
              }}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default Sling;
