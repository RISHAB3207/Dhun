let audioElement=new Audio('1.mp3');
let songIndex=0;
let masterplay=document.getElementById("masterplay");
let progressbar=document.getElementById("progressbar");
let gif=document.getElementById('gif');
let songname=document.getElementById('songname');
let songs=[
    
    {
        songName:"Aur Pyaar Karna Hai",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"bepanah Ishq",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"Chura Liya",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"Is Qadar",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"OH SANAM",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"Pal Pal Dil Ke Paas",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"Suna Hai",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"Thoda thoda pyaar",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },
    {
        songName:"Tumse Bhi Zyada",filepath:"song/1.mp3",coverpath:"cover/1.jpg"
    },


]

masterplay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;



    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');

        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })


        gif.style.opacity=0;

    }
})

audioElement.addEventListener('timeupdate',()=>{

    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
    // console.log(progress);

})

progressbar.addEventListener('change',()=>{

    audioElement.currentTime=progressbar.value*audioElement.duration/100;


})



const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        songname.innerText = songs[songIndex].songName;

        
        audioElement.src= `song/${songIndex+1}.mp3`;
        gif.style.opacity = 1;
        audioElement.currentTime=0;
        
        audioElement.play();

    })
})



document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    songname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    songname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})
