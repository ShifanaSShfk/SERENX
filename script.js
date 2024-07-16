console.log("Welcome to SERENX");

// Initialize the variables
let songindex = 0;
let audioelement = new Audio('songs/Jai Ho.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let currentsong = document.getElementById('currentsong');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let next = document.getElementById('next');
let previous = document.getElementById('previous');

// let songWindow = null;
// let gif = document.getElementById('gif');


let songs = [
    {songname: "Puthu Vellai Mazhai", filepath: "songs/Puthu Vellay.mp3", coverpath: "covers/roja.jpg"},
    {songname: "Jiya Jale", filepath: "songs/Jiya Jale.mp3", coverpath: "covers/dilse.jpg"},
    {songname: "Jai Ho", filepath: "songs/Jai Ho.mp3", coverpath: "covers/slumdogmillionare.jpg"},
];

songitems.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;

});
// audioelement.play();

// Handle play/pause click
masterplay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.textContent = 'pause';
        currentsong.innerText = songs[songindex].songname;
        // gif.style.opacity = 1;
    }else{
        audioelement.pause();
        masterplay.textContent = 'play_arrow';
        // gif.style.opacity = 0;
    }
});

//  Listen to events
audioelement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    //  Update seekbar
    progress = parseInt((audioelement.currentTime/audioelement.duration) * 100);
    // console.log(progress);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', ()=>{
    audioelement.currentTime = myprogressbar.value * audioelement.duration/100;
});

//  Play song when clicked on the cover
Array.from(document.getElementsByClassName('cover')).forEach((element, index)=>{
    element.addEventListener('click', () => {
        audioelement.src = songs[index].filepath;
        audioelement.load();
        audioelement.play().then(() => {
            masterplay.textContent = 'pause';
            songindex = index; // Update the song index
            currentsong.innerText = songs[songindex].songname; // Update current song name
        });
    });
});

// Handle next button click
next.addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length; // Loop back to the first song if at the end
    audioelement.src = songs[songindex].filepath;
    audioelement.load();
    audioelement.play().then(() => {
        masterplay.textContent = 'pause';
        currentsong.innerText = songs[songindex].songname; // Update current song name
    });
});

// Handle previous button click
previous.addEventListener('click', () => {
    songindex = (songindex - 1 + songs.length) % songs.length; // Loop back to the last song if at the beginning
    audioelement.src = songs[songindex].filepath;
    audioelement.load();
    audioelement.play().then(() => {
        masterplay.textContent = 'pause';
        currentsong.innerText = songs[songindex].songname; // Update current song name
    });
});

// Auto-play next song when the current one ends
audioelement.addEventListener('ended', () => {
    songindex = (songindex + 1) % songs.length; // Loop back to the first song if at the end
    audioelement.src = songs[songindex].filepath;
    audioelement.load();
    audioelement.play().then(() => {
        masterplay.textContent = 'pause';
        currentsong.innerText = songs[songindex].songname; // Update current song name
    }).catch((error) => {
        console.error("Error playing the audio file:", error);
        alert("Failed to load the audio file. Please check the file path and format.");
    });
});


function playSong() {
    audioelement.src = songs[songindex].filepath;
    audioelement.load();
    audioelement.play().then(() => {
        masterplay.textContent = 'pause';
        currentsong.innerText = songs[songindex].songname; // Update current song name
        if (songWindow) {
            songWindow.document.getElementById('songname').innerText = songs[songindex].songname;
            songWindow.document.getElementById('songcover').src = songs[songindex].coverpath;
        }
    }).catch((error) => {
        console.error("Error playing the audio file:", error);
        alert("Failed to load the audio file. Please check the file path and format.");
    });
}

