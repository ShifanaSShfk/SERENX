console.log("Welcome to SERENX");

// Initialize the variables
let songindex = 0;
let audioelement = new Audio('songs/Jai Ho.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songname: "Puthu Vellai Mazhai", filepath: "songs/Puthu Vellay.mp3", coverpath: "covers/roja.jpg"},
    {songname: "Jiya Jale", filepath: "songs/Jiya Jale.mp3.mp3", coverpath: "covers/dilse.jpg"},
    {songname: "Jai Ho", filepath: "songs/Jai Ho.mp3", coverpath: "covers/slumdogmillionare.jpg"},
    // {songname: "puthu vellai mazhai", filepath: "4.mp3", coverpath: "roja.jpg"},
    // {songname: "puthu vellai mazhai", filepath: "5.mp3", coverpath: "roja.jpg"},
];

songitems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;

})
// audioelement.play();

// handle play/pause click
masterplay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.textContent = 'pause';
        gif.style.opacity = 1;
    }else{
        audioelement.pause();
        masterplay.textContent = 'play_arrow';
        gif.style.opacity = 0;
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
