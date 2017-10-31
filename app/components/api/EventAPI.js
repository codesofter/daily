/*
	Sample from
	https://github.com/cjkoepke/currently-reading/blob/master/src/utils/BooksAPI.js
*/

const api = "https://bibs-frontend-live.herokuapp.com/bibs-server";
// const api = "http://localhost:8080/bibs-server/"

const headers = {
	'Content-Type': 'application/json'
};

export const get = (eventId) =>
  fetch(`${api}/eventitems/search?find=FullByEvent&event=${eventId}`, {headers})
    .then(res => res.json())
    .then(data => data.info)

/*
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
*/