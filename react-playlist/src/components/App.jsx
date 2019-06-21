/*
Stretch:
  1) Add in authorisation, so we can see who is uploading
  2) Save the current video to local storage in case of refresh
  3) Pull image from pexel and rotate every 2 mins
  4) Come up with a different alert if the channel was not correct
  5) Prevent the same video
  6) Save songs to database using channel, so you can re-create playlists
  7) Only make them enter channel once - like Kahoot
*/

import React, { Component } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import socketIOClient from "socket.io-client";
import randomString from "random-string";

// Import Styles
import appStyle from "./../styles/appStyle";
import listStyle from "./../styles/listStyle";
import paddedText from "./../styles/paddedText";
import reactPlayerStyle from "./../styles/reactPlayerStyle";

class App extends Component {
  state = {
    // home
    endpoint: process.env.REACT_APP_HOME_PORT,
    // coder
    // endpoint: process.env.REACT_APP_CODER_PORT,
    videos: [],
    url: null,
    titles: [],
    channelName: randomString()
  };

  componentDidMount = () => {
    const { endpoint, videos, titles, channelName } = this.state;

    const socket = socketIOClient(endpoint);

    socket.emit("channel-join", channelName);

    socket.on("new url", async response => {
      console.log(response);
      let tempVids = videos;
      tempVids.push(response);
      let videoTitle = titles;
      const newUrl = await this.getTitle(response);
      videoTitle.push(newUrl);
      this.setState({ videos: tempVids, title: videoTitle });
      if (!this.state.url) this.setState({ url: videos[0] });
    });
  };

  endOfVideo = () => {
    const { videos, titles } = this.state;
    let tempArr = videos;
    let tempTitles = titles;

    tempArr.shift();
    tempTitles.shift();

    this.setState({
      videos: tempArr,
      url: tempArr[0],
      titles: tempTitles
    });
  };

  getTitle = async url => {
    const ytAPI = process.env.REACT_APP_YOUTUBE_API;
    let entireURL = url;
    let vidID = entireURL.replace("https://www.youtube.com/watch?v=", "");

    try {
      const response = await axios.get(
        // `https://www.googleapis.com/youtube/v3/search?part=snipper&q=disco&type=video&key=${ytAPI}`
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vidID}&key=${ytAPI}`
      );
      console.log(response.data);
      return response.data.items[0].snippet.localized.title;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { titles, url, channelName } = this.state;

    return (
      <div style={appStyle} id="main-div">
        <div>
          <div style={paddedText}>
            <div>Channel Name: {channelName}</div>
            {titles.length > 0 ? (
              <div>
                <h4>Up Next..</h4>
                <ul>
                  {titles.map(title => (
                    <li key={title} style={listStyle}>
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h4>No songs yet :( Add one?</h4>
              </div>
            )}
          </div>
          <div>
            {url && (
              <ReactPlayer
                url={url}
                controls
                playing
                onEnded={() => this.endOfVideo()}
                style={reactPlayerStyle}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
