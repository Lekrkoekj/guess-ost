document.getElementById("volumeControl").value = localStorage.getItem("volume");

// Youtube Functions
function LaunchVideo() {
    document.getElementById("video-container").remove();
    let newDiv = document.createElement("div");
    newDiv.classList.add("video-container");
    newDiv.id = "video-container";
    document.body.append(newDiv);

    player = new YT.Player('video-container', {
        videoId: selectedSong.videoId, // Replace with your video ID
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onError
        }
    });

    player.g.style.display = "none";
}

let player;
function onPlayerReady(event) {
    event.target.playVideo(); // Autoplay when ready
    player.setVolume(document.getElementById("volumeControl").value);
    event.target.setLoop(true)
    document.getElementById("loading-text").style.display = "none";
    document.getElementById("game-view").style.display = "block";
    document.getElementById("before-game").style.display = "none";

    if (player.getVideoData().isPlayable == false) {
        console.log("video unavailible, selecting new song")
        SetRandomGame();
        LaunchVideo();
    }
}
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo(); // Replay video to create loop effect
    }
}
function onError(event) {
    if (event.data == 100) {
        console.log("video unavailible, selecting new song")
        SetRandomGame();
        LaunchVideo();
    }
}

function ChangeVolume(volume) {
    player.setVolume(volume);
}
function SaveVolume(volume) {
    localStorage.setItem("volume", volume)
}

function TogglePlayback() {
    let playButton = document.getElementById("play-icon");
    let pauseButton = document.getElementById("pause-icon")
    if (player.getPlayerState() == 2) {
        player.playVideo();
        playButton.style.display = "none";
        pauseButton.style.display = "block";
    }
    else if (player.getPlayerState() == 1) {
        player.pauseVideo();
        playButton.style.display = "block";
        pauseButton.style.display = "none";
    }
}