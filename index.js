// const videoplayer = document.getElementById("video_assect")
// $(videoplayer).src = videoLink;

window.addEventListener("click", () => { document.getElementById("video_assect").play(); })
var videoLink = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

const scanUI = document.querySelector("#scan-ui")

const marker = document.querySelector("#marker");
marker.addEventListener("markerFound", () => {    
    $(scanUI).hide();
    document.getElementById("video_assect").play();
});
marker.addEventListener("markerLost", () => {    
    $(scanUI).show();
    document.getElementById("video_assect").pause();
});

// marker.addEventListener('markerFound', () => {
//     scanUI.style.opacity = '0'; // Fade out scan UI
//     videoAsset.play();
//   });

//   marker.addEventListener('markerLost', () => {
//     videoAsset.pause();
//   });
//download marker
// download video 
// need marker to be loded
// need video to be loaded
// need identify deveice 
// Invok API
