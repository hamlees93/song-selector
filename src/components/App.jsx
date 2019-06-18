import React, { Component } from "react";
import youtube from './../apis/youtube'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  state = {
    videos: [],
    selectedVideo: null
  }

  handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get('/search', {
        params: {
            q: termFromSearchBar
        }
    })
    this.setState({
        videos: response.data.items
    })
  };
  
  handleVideoSelect = (video) => {
      this.setState({selectedVideo: video})
  }

  render(){
    return(
      <div>Welcome</div>
    )
  }
}




export default App;
