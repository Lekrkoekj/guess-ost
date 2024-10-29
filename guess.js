function AddGuess(songName, gameName, videoId) {
  let template = document.getElementById("guess-template");
  let guessResult = template.cloneNode(true);
  guessResult.style.display = "flex"
  guessResult.id = "";

  currentGuessAmount++;
  document.getElementById("guess-counter").innerText = `Guess ${currentGuessAmount} of ${maxGuesses}:`  

  let game = games.filter((game) => game.gameName == gameName)[0];

  // Song title
  guessResult.querySelector('[data-field="song-title"]').innerText = songName;
  if (songName != selectedSong.songName && gameName == selectedGame.gameName) {
    guessResult.querySelector('[data-field="song-title"]').classList.add("yellow-text")
  }

  // Game name
  guessResult.querySelector('[data-field="game-name-text"]').innerText = gameName;
  if (gameName == selectedGame.gameName) {
    guessResult.querySelector('[data-field="game-name-tile"]').classList.add("green-tile")
  }
  // Series
  guessResult.querySelector('[data-field="series-text"]').innerText = game.series;
  if (game.series == selectedGame.series) {
    guessResult.querySelector('[data-field="series-tile"]').classList.add("green-tile")
  }
  // Console
  guessResult.querySelector('[data-field="console-text"]').innerText = game.console;
  if (game.console == selectedGame.console) {
    guessResult.querySelector('[data-field="console-tile"]').classList.add("green-tile")
  }
  // Publisher
  guessResult.querySelector('[data-field="publisher-text"]').innerText = game.publisher;
  if (game.publisher == selectedGame.publisher) {
    guessResult.querySelector('[data-field="publisher-tile"]').classList.add("green-tile")
  }
  // Year
  guessResult.querySelector('[data-field="year-text"]').innerText = game.year;
  if (game.year == selectedGame.year) {
    guessResult.querySelector('[data-field="year-tile"]').classList.add("green-tile")
  }
  else if (Math.abs(game.year - selectedGame.year) <= 5) {
    guessResult.querySelector('[data-field="year-tile"]').classList.add("yellow-tile")
  }
  if (game.year < selectedGame.year) {
    guessResult.querySelector('#year-relative').classList.add("year-higher")
  }
  if (game.year > selectedGame.year) {
    guessResult.querySelector('#year-relative').classList.add("year-lower")
  }
  if (game.year == selectedGame.year) {
    guessResult.querySelector('#year-relative').classList.add("year-correct")
  }

  // Image
  guessResult.querySelector('[data-field="game-img"]').src = game.img;

  document.getElementById("guess-list").prepend(guessResult);

  // Game Over / Win
  if(selectedSong.songName == songName && selectedSong.gameName == gameName) {
    GameOver(true)
  }
  else {
    if (currentGuessAmount > maxGuesses) {
      GameOver(false);
    }
  }
}

searchBar.addEventListener("focus", (event) => {
  document.getElementById("search-results").style.display = "block";
})

searchBar.addEventListener("blur", (event) => {
  document.getElementById("search-results").style.display = "none";
})