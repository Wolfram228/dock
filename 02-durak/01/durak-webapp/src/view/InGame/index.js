import * as React from 'react';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

class InGame extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      message:""
    }
  }

  componentDidMount(){
    if ("WebSocket" in window) {
      
      // Let us open a web socket
      var ws = new WebSocket("ws://localhost:8080/queue");
      ws.onopen = ()=> {
        this.setState({message:"Waiting for other players..."})
      };

      ws.onmessage = (evt)=> { 
        console.log(evt)
        this.setState({message:evt.data})
      };

      ws.onclose = () =>{ 
        this.setState({message:"leaving queue"})
      };
   } else {
     
      // The browser doesn't support WebSocket
      alert("WebSocket NOT supported by your Browser!");
   }
  }

  render() {
    return (
      <div>
        {this.state.message}
      </div>
    );
  }
}

export default InGame;
