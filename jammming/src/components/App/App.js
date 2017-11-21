import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      playlistName: 'Test Playlist',
      playlistTracks: [],
      searchResults: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.updatePlaylistTracks = this.updatePlaylistTracks.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  /*
      Methods to update state
  */
  updatePlaylistName (name) {
    this.setState({
      playlistName: name
    });
  }

  updatePlaylistTracks (type, track) {
    if (type === 'add') {
      // push track onto playlistTracks (ES6)
      // see https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      });
    }
    if (type === 'remove') {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
      });
    }
  }

  updateSearchResults (tracks) {
    this.setState({
      searchResults: tracks
    });
  }

  /*
      Track logic
  */
  addTrack (track) {
    // Only add to playlist if there are no duplicates.
    if (!this.findTrack(track)) {
      this.updatePlaylistTracks('add', track);
    }
  }

  removeTrack (track) {
    this.updatePlaylistTracks('remove', track);
  }

  findTrack (track) {
    return this.state.playlistTracks.some(playlistTrack => playlistTrack.id === track.id);
  }

  /*
      Playlist logic
  */
  savePlaylist () {
    if (this.state.playlistName.length > 0) {
      /*
        Generates an array of uri values called trackURIs from the playlistTracks property.
        In a later step, you will pass the trackURIs array and playlistName to a method that will save the user's playlist to their account.
      */
      let trackURIs = this.state.playlistTracks.map(track => track.uri);

      Spotify.savePlaylist(this.state.playlistName, trackURIs)
        .then(snapshot => {
          this.updatePlaylistName('New Playlist');
          this.updateSearchResults([]);
        });
    }
  }

  search (term) {
    Spotify.search(term)
      .then(tracks => {
        this.updateSearchResults(tracks);
      });
  }

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              name={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
              tracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
