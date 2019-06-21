import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import searchYoutube from "youtube-api-v3-search";
import listStyle from "./../styles/listStyle";

class App extends Component {
  state = {
    // home
    endpoint: process.env.REACT_APP_HOME_PORT,
    // coder
    // endpoint: process.env.REACT_APP_CODER_PORT,
    channel: this.props.channel,
    searchTerm: "",
    searchResults: []
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { searchTerm } = this.state;

    const options = {
      q: searchTerm,
      part: "snippet",
      type: "video",
      maxResults: 10
    };

    const response = await searchYoutube(
      process.env.REACT_APP_YOUTUBE_API,
      options
    );

    this.setState({
      searchResults: response.items
    });
  };

  handleSearchTermChange = event =>
    this.setState({ searchTerm: event.target.value });

  componentDidMount = () => {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on("send url", response => {
      if (response) {
        alert("Song successfully added to list!");
        this.setState({ searchTerm: "" });
      }
    });
  };

  selectVideo = vidID => {
    const { endpoint, channel } = this.state;
    const url = `https://www.youtube.com/watch?v=${vidID}`;
    this.setState({
      searchResults: []
    });
    const socket = socketIOClient(endpoint);
    socket.emit("send url", url, channel);
  };

  render() {
    const { searchResults, searchTerm } = this.state;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={this.handleSubmit}>
            <label>Enter Search Term</label>
            <input
              type="text"
              value={searchTerm}
              onChange={this.handleSearchTermChange}
            />
            <input type="submit" value="Search" />
          </form>
        </div>
        <div>
          {searchResults.length > 0 ? (
            <div>
              <h4>Please select one of the following</h4>

              {/* Eventualy have as ant D table */}
              <ul>
                {searchResults.map(result => (
                  <li key={result.snippet.title} style={listStyle}>
                    <img
                      alt={`thumbnail of ${result.snippet.title}`}
                      src={result.snippet.thumbnails.default.url}
                    />
                    <button onClick={() => this.selectVideo(result.id.videoId)}>
                      {result.snippet.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default App;
