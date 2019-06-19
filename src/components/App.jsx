/*
Stretch:
  1) Add in authorisation, so we can see who is uploading
  2) Save the current video to local storage in case of refresh

  3) Get title:
      document.getElementsByClassName('ytp-title-link yt-uix-sessionlink')[0].innerText
*/

import React, { Component } from "react";
import ReactPlayer from 'react-player';

class App extends Component {
  state = {
    videos: [],
    url: null,
    value: "",
    title: ""
  }

  // At the moment, we are just going to enter the youtube URL itself
  // In the future, we will let people do a search
  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.url) this.setState({url: this.state.value})
    let tempArr = this.state.videos;
    tempArr.push(this.state.value);
    this.state.value = "";
    this.setState({
      videos: tempArr
    });  
  };

  handleChange = (event) => this.setState({value: event.target.value});

  endOfVideo = () => {
    let tempArr = this.state.videos;
    tempArr.shift();
    this.setState({
      videos: tempArr,
      url: tempArr[0],
      title: document.getElementsByClassName('ytp-title-link yt-uix-sessionlink')[0].innerText
    });
  };


  render(){
    console.log(this.state.title)
    return(
      <div>
        <div>
          <div>
            {this.state.videos.length > 0 ?  
            <div>
              <h4>Up Next..</h4>
              <ul>
                {this.state.videos.map((video) => (
                  <li key={video}>{video}</li>
                ))}
              </ul>
            </div> : <div><h4>No songs yet :( Add one?</h4></div>
            }
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <input type="submit" value="Add Video"/>
            </form>
          </div>
          <div>
            {this.state.url && 
              <ReactPlayer 
                url={this.state.url}  
                controls
                playing
                onEnded={() => this.endOfVideo()}/>}
          </div>
        </div>
      </div>
    )
  }
}

export default App;