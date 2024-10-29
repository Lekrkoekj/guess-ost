let selectedSong;
let selectedGame;

let songs = {};
let games = {};

let currentGuessAmount = 1;
let maxGuesses = 10;

const searchBar = document.getElementById("title-input");

function fetchSongs() {
    document.getElementById("play-button").style.display = "none";
    document.getElementById("loading-text").style.display = "flex";
    fetch('./songs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            songs = data;
            fetchGames();
        })
        .catch(error => {
            console.error('song fetching error:', error);
        });
}

function fetchGames() {
    fetch('./games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            games = data;
            SetupSearch();
            SetRandomGame();
            LaunchVideo();
        })
        .catch(error => {
            console.error('game fetching error:', error);
        });
}

function SetRandomGame() {
    let randomIndex = Math.floor(Math.random() * songs.length);
    selectedSong = songs[randomIndex]
    selectedGame = games.filter((game) => game.gameName == songs[randomIndex].gameName)[0];
}

function GameOver(won) {
    let gameOverContainer = document.getElementById("game-over");
    gameOverContainer.querySelector("#game-over-img").src = selectedGame.img;
    gameOverContainer.querySelector("[data-field='songGameName']").innerText = `${selectedSong.songName} - ${selectedSong.gameName}`
    gameOverContainer.querySelector("[data-field='yearConsole']").innerText = `Release in ${selectedGame.year} for the ${selectedGame.console}.`
    if(won) {
        gameOverContainer.querySelector("#game-over-header").innerText = "You got it!"
        gameOverContainer.querySelector("[data-field='guessAmount']").innerText = `You guessed the song correctly in ${currentGuessAmount} attempts.`
    }
    else {
        gameOverContainer.querySelector("#game-over-header").innerText = "Game Over!"
        gameOverContainer.querySelector("[data-field='guessAmount']").innerText = `You did not manage to guess the song correctly in ${currentGuessAmount - 1} attempts. Better luck next time!`
    }
    document.getElementById("game-view").style.display = "none";
    document.getElementById("game-over").style.display = "block";
}

function CloseGameOver() {
    document.getElementById("game-view").style.display = "block";
    document.getElementById("game-over").style.display = "none";
}

function ViewGuesses() {
    CloseGameOver();
    document.getElementById("title-input").style.display = "none";
    document.getElementById("guess-counter").style.display = "none";
}

function RestartGame() {
    document.getElementById("title-input").style.display = "block";
    document.getElementById("guess-counter").style.display = "block";
    document.getElementById("game-view").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("before-game").style.display = "block";
    currentGuessAmount = 1;
    document.getElementById("guess-counter").innerText = `Guess ${currentGuessAmount} of ${maxGuesses}:`;
    for(let i = 0; i < document.getElementById("guess-list").childNodes.length - 1; i++) {
        if (document.getElementById("guess-list").childNodes[i].nodeType !== Node.TEXT_NODE) {
            document.getElementById("guess-list").childNodes[i].style.display = "none";
            console.log("removed" + i)
        }
    }
    fetchSongs();
}