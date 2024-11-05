//const videoplayer = document.getElementById("assets")

//console.log(videoplayer)
window.addEventListener("click", () => { document.getElementById("video_assect").play(); })


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

////////////////////////////////////////// API INVOCKING //////////////////////////////////

function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    } else {
        return "others";
    }
}

console.log(getDeviceType())

window.addEventListener("load", function () {
    const deviceType = getDeviceType();

    // Data to send to the API
    const data = {
        id: "lhBHOn9", // replace this with a dynamic user or session ID if needed
        deviceName: deviceType
    };

    // Send the data to the API
    fetch('http://localhost:3000/api/collect-device-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Device info sent:", data))
    .catch(error => console.error("Error sending device info:", error));
});


/////////////////////////////////////////////////////////////// NOT IN THE SCOPE  ////////////////////////////////////////
// var videoLink = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

// // Create and configure the video element
// const videoAsset = document.createElement('video');
// videoAsset.id = 'dynamic-video';
// videoAsset.src = videoLink;
// videoAsset.autoplay = false; // Autoplay is set to false initially
// videoAsset.loop = true;
// videoAsset.setAttribute('webkit-playsinline', '');
// videoAsset.setAttribute('playsinline', '');

// $(videoplayer).append(videoAsset);

// $('#player').attr('src', "value");
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
