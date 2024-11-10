//const videoplayer = document.getElementById("assets")

//console.log(videoplayer)
window.addEventListener("click", () => { document.getElementById("video_assect").play(); })
//window.addEventListener("click", () => { document.getElementById("video_assect_server").play(); })


const scanUI = document.querySelector("#scan-ui")
const baseUIL = 'https://178.128.116.81/cms/'

var fatchdataURL = baseUIL + 'api/uploads/'


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


// Create a URL object
const urlObj = new URL(window.location.href);

// Extract the parameters
const videoParam = urlObj.searchParams.get("video");
const patternParam = urlObj.searchParams.get("pattern");

console.log("Video:", videoParam)


var patternUrl = fatchdataURL + patternParam
var videoUrl = fatchdataURL + videoParam

const words = patternParam.split('/');
const id = words[0]
console.log("ID: "+id)

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
        id: id,                //"IbX3YGm", // replace this with a dynamic user or session ID if needed
        deviceName: deviceType
    };

    // Send the data to the API
    //new cms http://178.128.116.81/cms
    //new cms https://qrgen-tau.vercel.app/api/collect-device-info
    fetch("https://proxy-eqyn.vercel.app/api/proxy", {
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


////////////////////////////////////////////// adding dynamic /////////////////////////////////////////////

//console.log(getAllUrlParams(window.location.href))

//generate tag and pattern

const arScene = document.querySelector("#ARScene")
const assets = document.querySelector("#assets")

console.log(arScene)
console.log(assets)




console.log("Data:  " + words[0])

//console.log("Data:  " + sourceData)
console.log("baseurl:  " + fatchdataURL)

console.log("PatternURL:  " + patternUrl)
console.log("VideoURL:  " + videoUrl)

// Set your video source here

// Append the `a-marker` and `a-video` tags with dynamic URL and src
function rerenderScene() {
    const scene = document.querySelector('a-scene');

    if (scene && scene.hasLoaded) {
        // Trigger a reload on all components
        scene.emit('reloaded');
    }
}


// Define the URLs of the marker pattern and video file
const markerFileUrl = patternUrl;  // Replace with actual marker file URL
const videoFileUrl = videoUrl;     // Replace with actual video file URL



function dynamicMarker(){
    
        // Append the marker and video elements to the A-Frame scene
        $(assets).append(`
            <video id="dynamic_video_assect" src="${videoFileUrl}" autoplay="" loop="true"></video>
          `);

        $(arScene).append(`
            <a-marker id="dynamic_marker" type="pattern" url="${markerFileUrl}" preset="custom" emitevents="true"
              smooth="true" smoothCount="2" smoothTolerance="0.01" smoothThreshold="2">
              <a-video id="player" src="#dynamic_video_assect" width="1.5" height="1.5" position="0 0 0" rotation="-90 0 0"></a-video>
            </a-marker>
          `);
        const marker_Dynamic = document.querySelector("#dynamic_marker");
        marker_Dynamic.addEventListener("markerFound", () => {
            $(scanUI).hide();
            document.getElementById("dynamic_video_assect").play();
        });
        marker_Dynamic.addEventListener("markerLost", () => {
            $(scanUI).show();
            document.getElementById("dynamic_video_assect").pause();
        });
}

dynamicMarker()






// Fetch and store both files as Blobs
async function loadFiles() {
    try {
        // Download marker file as Blob
        const markerResponse = await fetch(markerFileUrl);
        const markerBlob = await markerResponse.blob();
        const markerBlobUrl = URL.createObjectURL(markerBlob);

        // Download video file as Blob
        const videoResponse = await fetch(videoFileUrl);
        const videoBlob = await videoResponse.blob();
        const videoBlobUrl = URL.createObjectURL(videoBlob);

        // Append the marker and video elements to the A-Frame scene
        $(assets).append(`
            <video id="dynamic_video_assect" src="${videoBlobUrl}" autoplay="" loop="true"></video>
          `);

        $(arScene).append(`
            <a-marker id="dynamic_marker" type="pattern" url="${markerBlobUrl}" preset="custom" emitevents="true"
              smooth="true" smoothCount="2" smoothTolerance="0.01" smoothThreshold="2">
              <a-video id="player" src="#dynamic_video_assect" width="1.5" height="1.5" position="0 0 0" rotation="-90 0 0"></a-video>
            </a-marker>
          `);
        const marker_Dynamic = document.querySelector("#dynamic_marker");
        marker_Dynamic.addEventListener("markerFound", () => {
            $(scanUI).hide();
            document.getElementById("dynamic_video_assect").play();
        });
        marker_Dynamic.addEventListener("markerLost", () => {
            $(scanUI).show();
            document.getElementById("dynamic_video_assect").pause();
        });

    } catch (error) {
        console.error("Error loading files:", error);
    }
}
