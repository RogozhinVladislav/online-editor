import React, { Component } from 'react';

import { Header, Input, Button } from 'semantic-ui-react'
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/monokai';

import socket from '../socket';

class App extends Component {

  state = {
    value: '',
    connected: false,
  }

  componentDidMount() {
    socket.on('CHANGE_SERVER', (value) => {
      this.setState({
        value
      })
      console.log('CHANGE_SERVER', value)
    })
  }

  connectRoom() {
    console.log('this.input', this.input.inputRef.current.value)
    socket.emit('JOIN_ROOM', this.input.inputRef.current.value)
    this.setState({
      connected: true
    })
  }

  handleChange(value) {
    socket.emit('CHANGE_CLIENT', 
    {
      room: this.input.inputRef.current.value,
      code: value
    })

    this.setState({
      value
    })
  }

  render() {
    const { value, connected } = this.state
    return (
      <div>
        <div className="header">
          <Header size='huge'>Online Editor</Header>
          <Input ref={ref => (this.input = ref)} />
          <Button disabled={connected} onClick={this.connectRoom.bind(this)}>Connect</Button>
        </div>
        <div className="editor">
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="editor"
            fontSize={18}
            showGutter={true}
            highlightActiveLine={true}
            editorProps={{
              $blockScrolling: true,
            }}
            value={value}
            onChange={this.handleChange.bind(this)}
          />
        </div>
      </div>
    );
  }
  
}

export default App;
