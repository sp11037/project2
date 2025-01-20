const outputArea = document.querySelector('.js-output-area');

// Load Gif functions
function renderGif(gif) {
    return `
        <img src='${gif.images.original.url}' alt'${gif.title}' />
    `;
}

function displayGifs(gifList) { // input gifList must be an array for the map function
    outputArea.innerHTML = gifList
        .map(gif => renderGif(gif))
        .join('');
}

// Random Gif functions
function fetchRandomGif() {
    return fetch('https://api.giphy.com/v1/gifs/random?api_key=YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh')
        .then(data => data.json());
}

function generateRandomGif() {
    fetchRandomGif()
        .then(response => displayGifs([response.data]));
}

// User input function
function getKeyword() {
    return Promise.resolve(document.querySelector('.search-bar').value);
}

// Translate Gif functions
function fetchGifByKeyword(keyword) {
    return fetch(`https://api.giphy.com/v1/gifs/translate?api_key=YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh&s=${keyword}`)
        .then(data => data.json());
}

function generateGifByKeyword() {
    getKeyword()
        .then(keyword => fetchGifByKeyword(keyword))
        .then(response => displayGifs([response.data]));
}

// Search Gif functions
function fetchAllGifsByKeyword(keyword, offset) {
    return fetch(`https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh&limit=10&offset=${offset}`)
        .then(data => data.json());
}

function generateAllGifsByKeyword() {
    getKeyword()
        .then(keyword => fetchAllGifsByKeyword(keyword, 0)) // offset = 0 for the first page
        .then(response => displayGifs(response.data));
}