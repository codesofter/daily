# daily


## Notes for user:

- Spotify authorization will make changes (create playlist/add tracks) to private playlists rather than public playlists. (Scopes were not specified in project directions.)
- To build and run, please first add a Secret.js file in src/util for the Spotify API credentials, then `cd jammming` to run `npm run build`.
- If you use `surge` to serve and use their randomly generated domain name, please edit Spotify.js for the correct redirect URI.

## FEATURES

#### Below is a list of the website's features:

- **Spotify Login** — the first time a user searches for a song, album, or artist, Spotify will ask them to log in or set up a new account. You will need to follow the steps in the Spotify Developer Guide to register your application.
- **Search by Song, Album, or Artist** — a user can type the name of a song, artist, or album into the search bar and click the SEARCH button. The app will request song data about the user's input from the Spotify library (find Spotify endpoints here).
- **Populate Results List** — Jammming displays the list of returned tracks from the user's query.
- **Add Song to a Custom Playlist** — users can add a track to their playlist by selecting a + sign on the right side of the track's display container.
- **Remove Song from Custom Playlist** — users can remove a track from their playlist by selecting a - sign on the right side of the track's display container.
- **Change Playlist Title** — users can change the title of their custom playlist.
- **Save Playlist to Account** — users can save their custom playlist by clicking a button called SAVE TO SPOTIFY.


## SELF NOTES

- What components does the application need?
- How will the application handle state?
- What methods does the application need?
- How does the application hook up to the Spotify API?
- How does the application save a playlist to a user's profile? As you complete the steps, you can compare the structure you devised to the one we use recommend in the project steps.