import _ from "lodash";
import React, { Component } from "react";
import ReactDom from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./componets/search_bar";
import VideoList from "./componets/video_list";
import VideoDetail from "./componets/video_details";
const API_KEY = "AIzaSyBT3sfecDSkJ-hjOBqx6YKIeIe5pwu-ARM";

//New component

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [], selectedVideo: null };

    this.videoSearch("reactjs");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      //   this.setState({ videos });
      // Equivelent to this.setState({ videos: videos });
      this.setState({ videos: videos, selectedVideo: videos[0] });
    });
  }
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Render the app
ReactDom.render(<App />, document.querySelector(".container"));
