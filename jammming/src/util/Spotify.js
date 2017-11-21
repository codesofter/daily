import { clientId } from './Secret';

let accessToken = null;
let expiration = 35000;
let user_id = '';
let playlist_id = '';

const corsAnywhere = '';
// const redirectURI = 'http://localhost:3000/';
const redirectURI = 'https://soft-jammming.surge.sh';

// Spotify API
const scopes = `playlist-modify-private`;
const v1_authorize = `https://accounts.spotify.com/authorize`;
const v1_search = `https://api.spotify.com/v1/search`;
const v1_get_user = `https://api.spotify.com/v1/me`;
const v1_users = `https://api.spotify.com/v1/users/`;
const limit = 10;

const Spotify = {
  getAccessToken () {
    if (!accessToken) {
      // Check URL to see if access token was just set.
      if (this.hasValidURLParameters()) {
        // Set the access token to expire at the value for expiration time
        window.setTimeout(() => accessToken = '', expiration * 1000);
        
        // Clear the parameters from the URL, so the app doesn't try grabbing the access token after it has expired
        window.history.pushState('Access Token', null, '/');
      } else {
        this.redirectPermissions();
      }
    }

    return accessToken;
  },
  search (term) {
    const headers = {Authorization: `Bearer ${this.getAccessToken()}`};

    return fetch(`${corsAnywhere}${v1_search}?type=artist,album,track&q=${term}&limit=${limit}`, {headers: headers})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        } else {
          return jsonResponse.tracks.items;
        }
      }).then(tracks => tracks.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
      })).catch(error => console.log(error.message));
  },
  savePlaylist (title, uris) {
    const headers = {
      'Authorization': `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application-json' 
    };

    return this.getUserInformation()
      .then(user => {
        user_id = user.id;
        this.postPlaylist(headers, title)
          .then(playlist => {
            playlist_id = playlist.id;
            this.postTracks(headers, title, uris);
          });
      });
  },
  getUserInformation () {
    const headers = {Authorization: `Bearer ${this.getAccessToken()}`};

    return fetch(`${corsAnywhere}${v1_get_user}`, {headers: headers})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(user => user)
      .catch(error => console.log(error.message));
  },
  postPlaylist (headers, title) {
    const body = JSON.stringify({
          'name': title,
          'public': false,
          'collaborative': false
        });

    return fetch(`${corsAnywhere}${v1_users}${user_id}/playlists`, {method: 'POST', headers: headers, body: body})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(playlist => playlist)
      .catch(error => console.log(error.message));
  },
  postTracks (headers, title, uris) {
    const body = JSON.stringify({
          uris: uris
        });

    return fetch(`${corsAnywhere}${v1_users}${user_id}/playlists/${playlist_id}/tracks`, {method: 'POST', headers: headers, body: body})
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(tracks => tracks)
      .catch(error => console.log(error.message));
  },
  hasValidURLParameters () {
    const href = window.location.href;

    const tempToken = href.match(/access_token=([^&]*)/);
    const tempExpir = href.match(/expires_in=([^&]*)/);

    if (href.match(/access_token=([^&]*)/) && href.match(/expires_in=([^&]*)/)) {
      accessToken = tempToken[1];
      expiration = tempExpir[1];
      return true;
    }
    
    return false;
  },
  redirectPermissions() {
    window.location.href = `${corsAnywhere}${v1_authorize}?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectURI}`;
  },
  redirectHome() {
    window.location.href = `${redirectURI}`;
  }
};

export default Spotify;