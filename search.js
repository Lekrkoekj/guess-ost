let debounceTimer;
searchBar.addEventListener("input", (event) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        Search();
    }, 500);
});

function SetupSearch() {
    if(document.getElementById("search-results").childNodes.length > 3) return;
    let template = document.getElementById("search-result-template");
    for (let i = 0; i < songs.length; i++) {
        let searchResult = template.cloneNode(true);

        let game = games.filter((game) => game.gameName == songs[i].gameName)[0];

        if (game.img) searchResult.querySelector('[data-field="img"]').src = game.img;
        searchResult.querySelector('[data-field="song-name"]').innerText = songs[i].songName;
        searchResult.querySelector('[data-field="game-name"]').innerText = songs[i].gameName;
        searchResult.style.display = "none";
        searchResult.id = "";

        searchResult.addEventListener("mousedown", (event) => {
            SelectGame(searchResult)
        })
        document.getElementById("search-results").append(searchResult);
    }
    document.getElementById("search-result-template").remove();
}

function Search() {
    let searchResults = document.getElementById("search-results").childNodes;
    if (searchBar.value.length < 3) {
        for (let i = 0; i < searchResults.length; i++) {
            if (searchResults[i].nodeType === 1) {
                searchResults[i].style.display = "none";
            }
        }
        return;
    }
    let resultsAmount = 0;
    for (let i = 0; i < searchResults.length; i++) {
        if (searchResults[i].nodeType === 1) {
            if (searchResults[i].querySelector('#search-result-text').innerText.toLowerCase().includes(searchBar.value.toLowerCase())) {
                if (resultsAmount < 50) { // Display a maximum of 50 results
                    searchResults[i].style.display = "flex";
                    resultsAmount++;
                }
                else {
                    searchResults[i].style.display = "none";
                }
            }
            else {
                searchResults[i].style.display = "none";
            }
        }
    }
}

function SelectGame(resultElement) {
    AddGuess(resultElement.querySelector('[data-field="song-name"]').innerText, resultElement.querySelector('[data-field="game-name"]').innerText)
}