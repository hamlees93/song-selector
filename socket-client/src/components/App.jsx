import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  state = {
    // home
    endpoint: REACT_APP_HOME_PORT,
    // coder
    // endpoint: REACT_APP_CODER_PORT,
    url: "",
    channel: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { endpoint, url, channel } = this.state;

    const socket = socketIOClient(endpoint);
    socket.emit("send url", url, channel);
  };

  handleUrlChange = event => this.setState({ url: event.target.value });

  handleChannelChange = event => this.setState({ channel: event.target.value });

  componentDidMount = () => {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on("send url", response => {
      if (response) {
        alert("Song successfully added to list!");
        this.setState({ url: "" });
      }
    });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <label>Enter URL</label>
          <input
            type="text"
            value={this.state.url}
            onChange={this.handleUrlChange}
          />
          <label>Enter Channel</label>
          <input
            type="text"
            value={this.state.channel}
            onChange={this.handleChannelChange}
          />
          <input type="submit" value="Add Video" />
        </form>
      </div>
    );
  }
}

export default App;
