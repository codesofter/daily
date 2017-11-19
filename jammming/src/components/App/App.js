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
      playlistTracks: [{
          id: 1,
          name: 'rockstar (feat. 21 Savage)',
          artist: 'Post Malone',
          album: 'rockstar'
        },{
          id: 2,
          name: 'Ghostface Killers',
          artist: 'Without Warning',
          album: '21 Savage, Offset & Metro Boomin'
        },{
          id: 3,
          name: 'Havana (feat. Young Thug)',
          artist: 'Camila Cabello',
          album: 'Havana'
        }],
      searchResults: [{
          id: 3,
          name: 'Havana (feat. Young Thug)',
          artist: 'Camila Cabello',
          album: 'Havana'
        },{
          id: 4,
          name: 'Birds of a Feather',
          artist: 'Vulfpeck',
          album: 'Mr Finish Line'
        },{
          id: 5,
          name: 'Love Story (Feat. IU)',
          artist: 'Epik High',
          album: 'We\'ve Done Something Wonderful'
        },{
          id: 6,
          name: 'Talking to You',
          artist: 'Mt. Marcy',
          album: 'Tied Together'
        }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack (track) {
    if (!this.findTrack(track)) {
      // push track onto playlistTracks (ES6)
      // see https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] });
    }
  }

  removeTrack (track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName (name) {
    this.setState({
      playlistName: name
    });
  }

  findTrack (track) {
    return this.state.playlistTracks.some(playlistTrack => playlistTrack.id === track.id);
  }

  savePlaylist () {
    /*
      Generates an array of uri values called trackURIs from the playlistTracks property.
      In a later step, you will pass the trackURIs array and playlistName to a method that will save the user's playlist to their account.
    */
    let trackURIs = [];

  }

  search (term) {
    console.log("term:", term);
    Spotify.search(term)
      .then(tracks => {
        if (tracks && tracks.length > 0) {
          this.setState({
            searchResults: tracks
          });
        }
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
