const outputArea = document.querySelector('.js-output-area');

// Load Gif functions
function renderGif(gif) {
    return `
        <img src='${gif.data.images.original.url}' alt'${gif.data.title}' />
    `;
}

function displayGifs(gifList) {
    outputArea.innerHTML = gifList
        .filter(gif => gif.meta.status === 200) // removes gifs that could not be retrieved
        .map(gif => renderGif(gif))
        .join('');
}

// Random Gif functions
function fetchRandomGif() {
    return fetch('https://api.giphy.com/v1/gifs/random?api_key=YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh');
}

function generateRandomGif() {
    fetchRandomGif()
        .then(data => data.json())
        .then(response => displayGifs([response])); // input for displayGifs must be an array to use the filter function
}

// User input function
function getKeyword() {
    return Promise.resolve(document.querySelector('.search-bar').value);
}

// Translate Gif functions
function fetchGifByKeyword(keyword) {
    return fetch(`https://api.giphy.com/v1/gifs/translate?api_key=YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh&s=${keyword}`)
}

function generateGifByKeyword() {
    getKeyword()
        .then(keyword => fetchGifByKeyword(keyword))
        .then(data => data.json())
        .then(response => displayGifs([response]));
}