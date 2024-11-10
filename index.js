//const videoplayer = document.getElementById("assets")

//console.log(videoplayer)
window.addEventListener("click", () => { document.getElementById("video_assect").play(); })
window.addEventListener("click", () => { document.getElementById("video_assect_server").play(); })


const scanUI = document.querySelector("#scan-ui")
const baseUIL = 'https://178.128.116.81/cms/'


const marker = document.querySelector("#marker");
marker.addEventListener("markerFound", () => {
    $(scanUI).hide();
    document.getElementById("video_assect").play();
});
marker.addEventListener("markerLost", () => {
    $(scanUI).show();
    document.getElementById("video_assect").pause();
});



// const d_marker = document.querySelector("#d_marker");
// d_marker.addEventListener("markerFound", () => {
//     $(scanUI).hide();
//     document.getElementById("video_assect_server").play();
// });
// d_marker.addEventListener("markerLost", () => {
//     $(scanUI).show();
//     document.getElementById("video_assect_server").pause();
// });

////////////////////////////////////////// API INVOCKING //////////////////////////////////




function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // remove stuff after #, as it’s not part of the query string
        queryString = queryString.split('#')[0];

        // split the query string into component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // if the paramName ends with square brackets, e.g., colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array, e.g., colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the specified position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise, add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // handling string parameters
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if the property exists as a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise, add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

var sourceData = getAllUrlParams(window.location.href)

var patternUrl = fatchdataURL + sourceData.pattern
var videoUrl = fatchdataURL + sourceData.video

const words = videoUrl.split('/');
console.log("ID: "+words[0])

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
        id: "IbX3YGm", // replace this with a dynamic user or session ID if needed
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




console.log(getAllUrlParams(window.location.href))

//generate tag and pattern

const arScene = document.querySelector("#ARScene")
const assets = document.querySelector("#assets")

console.log(arScene)
console.log(assets)


var fatchdataURL = baseUIL + 'api/uploads/'


console.log("Data:  " + words[0])

console.log("Data:  " + sourceData)
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



        // const marker = document.querySelector('#marker');
        // marker.setAttribute('url', markerBlobUrl);

        // Change the source of the existing video
        // const video = document.querySelector('#video_assect');
        // video.setAttribute('src', videoBlobUrl);



        // Call the rerender function when needed
        //rerenderScene();

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

// Call the function to load and display the files
//loadFiles();







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
