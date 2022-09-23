const div_main = document.querySelector('.ok')
const audio = document.querySelector('audio')
const play = document.querySelector('#play')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const navigation = document.querySelector('.navigation')
const progress = document.querySelector('.progress')
const cover = document.querySelector('.frame')
const progress_cont = document.querySelector('.progress-container')
const volcont = document.querySelector('.volume-container')
const volprogress = document.querySelector('.volprogress')
const volIcon = document.querySelector('i.vv')





const songs = ['1. Electric Light Orchestra - Mr. Blue Sky',
'3. Norman Greenbaum - Spirit In The Sky',
'5. Elvin Bishop - Fooled Around and Fell in Love',
'Avengers Endgame opening song - Dear Mr. Fantasy',
"Bee Gees - Stayin' Alive (Official Music Video)",
"Can't Believe My Luck",
'DJ Snake - Taki Taki ft. Selena Gomez, Ozuna, Cardi B (Official Music Video)',
'Eurythmics, Annie Lennox, Dave Stewart - Sweet Dreams (Are Made Of This) (Official Video)',
'Fooled Around and Fell in Love',
'Foster The People',
'George Michael - Careless Whisper',
"Get Up Let's Go",
'Hislerim(PaglaSongs)',
'Imagination',
'In My Room (Mono)',
"It's All Gonna Be Okay",
'Keep It Up',
'keepDreamingbuddy',
'Listen Up',
"Make 'Em Hear Us",
'My Heart, My Head',
"Nothing's Gonna Stop You Now",
'OneRepublic - Counting Stars (Official Music Video)',
'quietkid',
'Reaching for the Stars',
'Redbone - Come and Get Your Love (Single Edit - Audio)',
'Selena Gomez - De Una Vez',
'The Battle of Evermore (Remaster)',
'The Knocks - All About You (feat. Foster the People) [Official Music Video]',
'The Verve - Bitter Sweet Symphony (Official Music Video)',
"There's No Stopping Us",
'When the Night Calls My Name']

images = ['45402.jpg',
'adrian-swancar-pIr-PH5IXF8-unsplash.jpg',
'aldebaran-s-uXchDIKs4qI-unsplash.jpg',
'andy-holmes-LUpDjlJv4_c-unsplash.jpg',
'benjamin-davies-__U6tHlaapI-unsplash.jpg',
'casey-horner-weTLZTLeqeI-unsplash.jpg',
'chris-henry-0KJXVbj0cU4-unsplash.jpg',
'chris-henry-1-Mq2LbM1NQ-unsplash.jpg',
'chris-henry-4xCkltZSijw-unsplash.jpg',
'greg-rakozy-oMpAz-DN-9I-unsplash.jpg',
'joel-filipe-QwoNAhbmLLo-unsplash (1).jpg',
'NeowiseStonehenge_Deval_960.jpg',
'neven-krcmarek-9dTg44Qhx1Q-unsplash.jpg',
'OrionMountains_Tabbush_2048.jpg',
'potw2027a.jpg',
'sgra_swarm_lg.jpg',
'stsci-h-p2031d-f-1764x1249.png',
'ThorsHelmet.jpg']

const max_vol = 1
    // console.log(duration)
var volumewidth  = (audio.volume /max_vol) * 100
volprogress.style.width = `${volumewidth}%`

for(var i=0;i < songs.length -1;i++){
    const y = document.createElement('div')
    y.id = 'lay'
    y.classList.add('mamu')
    y.innerText =  `${songs[i]}`
    div_main.appendChild(y)
}
// let prevIndex = 5
let songIndex = 12
//functions

function loadSong(song){
    audio.src = `music/${song}.mp3`
    var title = document.querySelector('#title')
    title.innerText = song
    h = images[Math.round(Math.random() * 17)]
    console.log(`images/${h}`)
    cover.style.backgroundImage = `url(images/${h})`
    playSong()
}

function playlistSong(e){
    // console.log(e.target.parentElement,"hi")
    var song  = e.target.innerText
    console.log(e.target)
    // prevIndex = songIndex
    songIndex = songs.indexOf(song)
    loadSong(song)
}

function playSong(){
    play.classList.add('play')
    var main = play.querySelector('i.fas')
    main.classList.remove('fa-pause')
    main.classList.add('fa-play')
    colorIndex()
    audio.play()
}

function pauseSong(){
    play.classList.remove('play')
    var main = play.querySelector('i.fas')
    main.classList.remove('fa-play')
    main.classList.add('fa-pause')
    audio.pause()
}

function prevSong(){
    // prevIndex = songIndex
    songIndex--
    if (songIndex < 0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    // prevIndex = songIndex
    songIndex++
    if (songIndex > songs.length-1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

// function colorIndex(){
//     audio_btn[prevIndex].classList.remove('currentSong')
//     audio_btn[songIndex].classList.add('currentSong')
// }
function updateProgress(e){
    const {duration,currentTime} = e.srcElement
    // console.log(duration)
    const progressPercent  = (currentTime /duration) * 100
    progress.style.width = `${progressPercent}%`
}

function colorIndex(){
    audio_btn.forEach((step,index) => {
        step.classList.toggle('currentSong',index === songIndex )
        // console.log(step.getRootNode('div.mamu'))
    })
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

function updateVolume(e){
    var volu = e
    console.log(audio.volume)
    // console.log(e)
    const width = this.clientWidth
    console.log('client :' + this.clientWidth)
    const clickX = e.offsetX
    console.log('e ofX :' + e.offsetX)
    const volume = audio.volume

    audio.volume = (clickX / width) * volume
    volprogress.style.width = `${volumewidth}%`
}

function setVolume(e){
    audio.volume = e.offsetX / this.clientWidth
    volumewidth = (audio.volume) * 100
    volprogress.style.width = `${volumewidth}%`
    volLevel()
}

function volLevel(){
    if (audio.volume > 0.5) {
        volIcon.classList.remove('fa-volume-low')
        volIcon.classList.remove('fa-volume-mute')
        volIcon.classList.add('fa-volume-high')
    }
    else if (audio.volume < 0.5 && audio.volume > 0) {
        volIcon.classList.remove('fa-volume-high')
        volIcon.classList.remove('fa-volume-mute')
        volIcon.classList.add('fa-volume-low')
    }
    else if (audio.volume === 0) {
        volIcon.classList.remove('fa-volume-high')
        volIcon.classList.remove('fa-volume-low')
        volIcon.classList.add('fa-volume-mute')
    }
    
}

//eventlistner

var audio_btn = document.querySelectorAll('div.mamu')

for(i = 0;i < audio_btn.length;i ++){
    // audio_btn[i].classList.add('currentSong')
    audio_btn[i].addEventListener('click',playlistSong)
    // showCurrentSong()
}
// audio_btn.addEventListener('click',() => {
//     console.log("hi")
// })

// audio_btn.addEventListener('click',loadSong)


play.addEventListener('click',() => {
    const isplaying = play.classList.contains('play')
    if (isplaying){
        pauseSong()
    }
    else{
        playSong()
    }
})
console.log(audio_btn)
// function showCurrentSong() {

//     audio_btn.forEach((step,index) => {
//         step.classList.toggle("active",index === songIndex )
//     })

// }

prev.addEventListener('click',prevSong)
next.addEventListener('click',nextSong)

progress_cont.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)
audio.addEventListener('timeupdate',updateProgress)

volcont.addEventListener('click',setVolume)
audio.onvolumechange = () => {
    volLevel()
}

// volcont.addEventListener('volumechange',currentVolume)



