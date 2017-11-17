import { clientId } from './Secret';

const corsAnywhere = '';
const redirectURI = 'http://localhost:3000/';

// Spotify API
const v1_authorize = 'https://accounts.spotify.com/authorize';
const v1_search = 'https://api.spotify.com/v1/search';

let accessToken = null;
let expiration = 35000;

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

    return fetch(`${corsAnywhere}${v1_search}?type=track&q=${term}`, {headers: headers})
      .then(response => {
        console.log(response);
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
          }
      })).catch(error => console.log(error.message));
  },
  hasValidURLParameters() {
    const parameters = {};

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
    window.location.href = `${corsAnywhere}${v1_authorize}?client_id=${clientId}&response_type=token&redirect_uri=${redirectURI}`;
  },
  redirectHome() {
    window.location.href = `${redirectURI}`;
  }
};

export default Spotify;