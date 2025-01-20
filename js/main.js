const outputArea = document.querySelector('.js-output-area');
let keyword = '';
let offset = 0;
let totalCount = 0;

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
    keyword = document.querySelector('.js-search-bar').value;
    return Promise.resolve('fulfilled');
}

// Translate Gif functions
function fetchGifByKeyword(keyword) {
    return fetch(`https://api.giphy.com/v1/gifs/translate?api_key=YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh&s=${keyword}`)
        .then(data => data.json());
}

function generateGifByKeyword() {
    getKeyword()
        .then(() => fetchGifByKeyword(keyword))
        .then(response => displayGifs([response.data]));
}

// Search Gif functions
function fetchAllGifsByKeyword(keyword, offset) {
    return fetch(`https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh&limit=10&offset=${offset}`)
        .then(data => data.json());
}

function generateAllGifsByKeyword() {
    offset = 0;
    getKeyword()
        .then(() => fetchAllGifsByKeyword(keyword, offset)) // offset = 0 for the first page
        .then(response => {
            totalCount = response.pagination.total_count;
            displayGifs(response.data);
        });
}

// Pagination functions
function checkForMoreGifs(direction) {
    if ((direction === 'next' && offset + 10 < totalCount)
    || (direction === 'prev' && offset - 10 >= 0)) {
        return Promise.resolve('');
    }
}

function nextPage() {
    checkForMoreGifs('next')
        .then(() => offset += 10)
        .then(() => fetchAllGifsByKeyword(keyword, offset))
        .then(response => displayGifs(response.data));
}

function prevPage() {
    checkForMoreGifs('prev')
        .then(() => offset -= 10)
        .then(() => fetchAllGifsByKeyword(keyword, offset))
        .then(response => displayGifs(response.data));
}