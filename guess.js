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
  guessResult.querySelector('[data-field="song-title"]').title = "This is not the correct song. ❌";
  if (songName != selectedSong.songName && gameName == selectedGame.gameName) {
    guessResult.querySelector('[data-field="song-title"]').classList.add("yellow-text")
    guessResult.querySelector('[data-field="song-title"]').title = "You guessed the game correctly, but this is not the right song. ❌";
  }

  // Game name
  guessResult.querySelector('[data-field="game-name-text"]').innerText = gameName;
  guessResult.querySelector('[data-field="game-name-tile"]').title = "The song you're trying to guess IS NOT from this game. ❌";
  if (gameName == selectedGame.gameName) {
    guessResult.querySelector('[data-field="game-name-tile"]').classList.add("green-tile");
    guessResult.querySelector('[data-field="game-name-tile"]').title = "The song you're trying to guess IS from this game. ✅"
  }
  // Series
  guessResult.querySelector('[data-field="series-text"]').innerText = game.series;
  guessResult.querySelector('[data-field="series-tile"]').title = "The game of the song you're trying to guess IS NOT part of this series. ❌";
  if (game.series == selectedGame.series) {
    guessResult.querySelector('[data-field="series-tile"]').classList.add("green-tile");
    guessResult.querySelector('[data-field="series-tile"]').title = "The game of the song you're trying to guess IS part of this series. ✅";
  }
  // Console
  guessResult.querySelector('[data-field="console-text"]').innerText = game.console;
  guessResult.querySelector('[data-field="console-tile"]').title = "The game of the song you're trying to guess WAS NOT released on this console/platform. ❌";
  if (game.console == selectedGame.console) {
    guessResult.querySelector('[data-field="console-tile"]').classList.add("green-tile");
    guessResult.querySelector('[data-field="console-tile"]').title = "The game of the song you're trying to guess WAS released on this console/platform. ✅";
  }
  // Publisher
  guessResult.querySelector('[data-field="publisher-text"]').innerText = game.publisher;
  if (game.publisher == selectedGame.publisher) {
    guessResult.querySelector('[data-field="publisher-tile"]').classList.add("green-tile");
  }
  // Year
  guessResult.querySelector('[data-field="year-text"]').innerText = game.year;
  guessResult.querySelector('[data-field="year-tile"]').title = "The game of the song you're trying to guess WAS NOT released in this year. ❌";
  if (game.year == selectedGame.year) {
    guessResult.querySelector('[data-field="year-tile"]').classList.add("green-tile")
    guessResult.querySelector('[data-field="year-tile"]').title = "The game of the song you're trying to guess WAS released in this year. ✅";
  }
  else if (Math.abs(game.year - selectedGame.year) <= 5) {
    guessResult.querySelector('[data-field="year-tile"]').classList.add("yellow-tile");
    guessResult.querySelector('[data-field="year-tile"]').title = "The game of the song you're trying to guess WAS NOT released in this exact year, but WAS released within 5 years from this. ❌";
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