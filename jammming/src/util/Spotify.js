import { clientId, secret } from './Secret';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
const redirectURI = encodeURIComponent('https://localhost:3000/');

// Spotify API
const v1_authorize = 'https://accounts.spotify.com/authorize';
const v1_search = 'https://api.spotify.com/v1/search';

let accessToken = false;

const Spotify = {
  getAccessToken () {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    } else {
        console.log(window.location.href);

    }

    return fetch(`${corsAnywhere}${v1_authorize}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}`).then(response => {
        if (response.ok) {
          return response.json();
        }
      }).then(jsonResponse => {
        // console.log('access token received:', jsonResponse);
        accessToken = jsonResponse.access_token;
      });
  },
  search (term) {
    return Spotify.getAccessToken().then(() => {
      return fetch(`${corsAnywhere}${v1_search}?type=track&q=${term}`, { headers: { Authorization: `Bearer ${accessToken}` }}).then(response => {
        if (response.ok) {
          console.log('response ok', response);
          return response.json();
        }
      }).then(jsonResponse => {
        console.log('jsonresp', jsonResponse);
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          });
        }
      });
    });
  }
};

export default Spotify;