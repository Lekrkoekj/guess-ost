let debounceTimer;
searchBar.addEventListener("input", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        Search();
    }, 500);
});

/** 
 * Normalize strings to the following:
 * Convert to lowercase
 * Remove accents
 * Collapse extra spaces
 */
function normalizeString(str) {
    return str
    .toLowerCase()
    .normalize("NFD")                 // separate accent from letter
    .replace(/[\u0300-\u036f]/g, "")  // remove accents
    .replace(/[^a-z0-9\s]/g, "")      // remove special characters
    .replace(/\s+/g, " ")             // remove extra spaces
    .trim();
}

function Search() {
    ClearSearchResults();

    // Don't display any results if the search query is empty
    if(searchBar.value == "") return;

    let template = document.getElementById("search-result-template");
    // Load in every song
    for (let i = 0; i < songs.length; i++) {
        
        const songGameString = songs[i].songName + " - " + songs[i].gameName

        // normalize the song/game name and query
        const nSong = normalizeString(songGameString); 
        const nQuery = normalizeString(searchBar.value);

        // check query per word, so not full titles have to be given (e.g. "mario wonder" instead of "Super Mario Bros. Wonder")
        const queryWords = nQuery.split(" ");
        const matches = queryWords.every(word => 
            nSong.includes(word)
        );

        // Process search query - only create list items for any songs that match the query
        if (matches) { 
            let searchResult = template.cloneNode(true);

            let game = games.filter((game) => game.gameName == songs[i].gameName)[0];
    
            if (game.img) searchResult.querySelector('[data-field="img"]').src = game.img;
            else searchResult.querySelector('[data-field="img"]').remove();
            searchResult.querySelector('[data-field="song-name"]').innerText = songs[i].songName;
            searchResult.querySelector('[data-field="game-name"]').innerText = songs[i].gameName;
            searchResult.style.display = "flex";
            searchResult.id = "";
    
            searchResult.addEventListener("mousedown", (event) => {
                SelectSong(searchResult)
            })
            document.getElementById("search-results").append(searchResult);
        }
    }
}

function ClearSearchResults() {
    let container = document.getElementById("search-results");

    // Remove everything EXCEPT the template (it's always the first child)
    while(container.children.length > 1) {
        container.lastElementChild.remove();
    }
}

function SetupGameList() {
    let template = document.getElementById("game-template");
    // For each game, create a button/result with it's image and title.
    for (let i = 0; i < games.length; i++) {
        let gameResult = template.cloneNode(true);
        let game = games[i]

        if (game.img) gameResult.querySelector('[data-field="img"]').src = game.img;
        else gameResult.querySelector('[data-field="img"]').remove();
        gameResult.querySelector('[data-field="game-name"]').innerText = game.gameName;
        gameResult.style.display = "flex";
        gameResult.id = "";

        // Result click event
        gameResult.addEventListener("mousedown", (event) => {
            SelectGame(game.gameName)
        })
        document.getElementById("game-list").append(gameResult);
    }
    document.getElementById("game-template").remove();

    document.getElementById("filter-by-game-button").addEventListener("click", (event) => { ToggleGameList(); })
    document.getElementById("filter-by-game-button").addEventListener("focusout", (event) => { CloseGameList(); })
}

let gameListOpen = false;

function ToggleGameList() {
    if(gameListOpen) {
        CloseGameList();
    }
    else {
        OpenGameList();
    }
}

function OpenGameList() {
    document.getElementById("game-list").style.display = "block";
    document.getElementById("game-dropdown-icon").style.transform = "rotate(180deg)";
    gameListOpen = true;
}
function CloseGameList() {
    document.getElementById("game-list").style.display = "none";
    document.getElementById("game-dropdown-icon").style.transform = "rotate(0deg)";
    gameListOpen = false;
    
}

function SelectGame(gameName) {
    const searchBox = document.getElementById("title-input");
    searchBox.value = gameName;
    setTimeout(() => {
        searchBar.focus();
    }, 0);
    Search();
}

function SelectSong(resultElement) {
    AddGuess(resultElement.querySelector('[data-field="song-name"]').innerText, resultElement.querySelector('[data-field="game-name"]').innerText)
}