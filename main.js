let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");


let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track")
let prev_btn = document.querySelector(".prev-track");


let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Creating new audio element
let current_Track = document.createElement("audio");

let track_list = [
    {
        name : "Night Owl",
        artist : "Broke For Free",
        image : "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path : "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",

    },

    {
        name : "Enthusiast",
        artist : "Tours",
        image : "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path : "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",

    },

    {
        name : "shipping lanes",
        artist : "Chad crouch",
        image : "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path : "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",

    },
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();


    // loading a new track
    current_Track.src = track_list[track_index].path;
    current_Track.load();


    //updating the details of the track
    track_art.style.backgroundImage = 
      "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + ( track_index +  1) + "OF " + track_list.length;


    //set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);


    // move to the next track if the current finishes playing
    current_Track.addEventListener("ended", nextTrack);

    //applying a random background-color
    random_bg_color();

}

function random_bg_color() {
    //Get a random number between 64 to 256 for getting lighter colors
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    document.body.style.backgroundColor = bgColor;

}

   // function reseting values to their  default
function resetValues() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00"; 
    seek_slider.value = 0;
}

function playPauseTrack() {
    if (!isPlaying) {
        playTrack();
    }
    else {
        pauseTrack();
    }
}

function playTrack() {
    current_Track.play();
    isPlaying = true;  // overiding the global variable declared initially.

    //replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    current_Track.pause();
    isPlaying = false;

    //replace icon with play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    // go back to the first track if the current one is the last in the track index
    if (track_index < track_list.length -1 ) {
        track_index += 1;
    }else {
        track_index = 0;
    }

    // Load and play new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    // Go back to the last track if the current one is the first in the track list
    if (track_index > 0) {
        track_index -= 1;
    }else {
        track_index = track_list.length;
    }

    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the percentage of the seek slider
    // and get the relative duration to the track
    let seekto;
    seekto = current_Track.duration * (seek_slider.value / 100);

    //Setting the current track track position to te calculated seek position
    current_Track.currentTime = seekto;
}

function setVolume() {
    //Set te volume according to the percentage of the volume slider set
    current_Track.volume = volume_slider.value / 100 ;
}

function seekUpdate() {
    let seekPosition =  0;

    // check if the current track duration is a legible number 
    if (!isNaN(current_Track.duration)) {
        seekPosition = current_Track.currentTime * (100 / current_Track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(current_Track.currentTime / 60);
        let currentSeconds = Math.floor(current_Track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(current_Track.duration / 60);
        let durationSeconds = Math.floor(current_Track.duration - durationMinutes * 60);


        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds ;}
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds ;}
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes ;}
        if (durationMinutes < 0) { durationMinutes = "0" + durationMinutes ;}

        // Display the updated duration
        current_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }

}

// load the first track
loadTrack(track_index);







/*
now_playing.addEventListener("click", () => {
    console.log("You clicked the now playing text");
});
function playPauseTrack() {
    console.log("Highliting on the playpause icon");
}  
*/