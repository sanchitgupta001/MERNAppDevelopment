// write a function to retrieve a blob of JSON
// make an AJAX request! Use 'fetch' function


// fetch api
function fetchAlbums() { // Async Request returns a promise
  fetch('http://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}

async function fetchAlbumsAsyncAwait() { // Async Await ES 2017 format
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();
  console.log(json);
}

const fetchAlbumsAsyncAwaitArrowFuncVersion = async () => { // Async Await ES 2017 format with arrow function
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();
  console.log(json);
};
