import React, { Component } from "react";
import App from "./App";

class LandingPage extends Component {
  state = { input: "", channel: "" };

  handleSubmit = () => this.setState({ channel: this.state.input });

  handleInputChange = event => this.setState({ input: event.target.value });

  render() {
    const { channel, input } = this.state;

    return (
      <div>
        {channel ? (
          <App channel={channel} />
        ) : (
          <div style={{ textAlign: "center" }}>
            <form onSubmit={this.handleSubmit}>
              <label>Enter Channel</label>
              <input
                type="text"
                value={input}
                onChange={this.handleInputChange}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default LandingPage;
