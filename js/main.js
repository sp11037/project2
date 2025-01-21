const API_KEY = 'YmjDpGYsDIWqYVvReohWVgkQPv2Bgmnh';
const LOAD_LIMIT = 10;

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
async function fetchRandomGif() {
    const gif = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`);
    return gif.json();
}

async function generateRandomGif() {
    const gif = await fetchRandomGif();
    displayGifs([gif.data]);
}

// User input function
function getKeyword() {
    keyword = document.querySelector('.js-search-bar').value;
    return Promise.resolve('fulfilled');
}

// Translate Gif functions
async function fetchGifByKeyword(keyword) {
    const gifs = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${keyword}`);
    return gifs.json();
}

async function generateGifByKeyword() {
    await getKeyword();
    const gif = await fetchGifByKeyword(keyword);
    displayGifs([gif.data]);
}

// Search Gif functions
async function fetchAllGifsByKeyword(keyword, offset) {
    const gifs = await fetch(`https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}&limit=${LOAD_LIMIT}&offset=${offset}`);
    return gifs.json();
}

async function generateAllGifsByKeyword() {
    offset = 0; // reset offset for first page
    await getKeyword();
    const gifs = await fetchAllGifsByKeyword(keyword, offset);
    totalCount = gifs.pagination.total_count;
    displayGifs(gifs.data);
}

// Pagination functions
function checkForMoreGifs(direction) {
    if ((direction === 'next' && offset + 10 < totalCount)
    || (direction === 'prev' && offset - 10 >= 0)) {
        return Promise.resolve('');
    } else {
        return Promise.reject('Reached page limit.');
    }
}

async function nextPage() {
    try {
        await checkForMoreGifs('next');
    } catch (err) {
        console.error(err);
        return;
    }

    offset += 10
    const gifs = await fetchAllGifsByKeyword(keyword, offset);
    displayGifs(gifs.data);
}

async function prevPage() {
    try {
        await checkForMoreGifs('prev');
    } catch (err) {
        console.error(err);
        return;
    }

    offset -= 10
    const gifs = await fetchAllGifsByKeyword(keyword, offset);
    displayGifs(gifs.data);
}