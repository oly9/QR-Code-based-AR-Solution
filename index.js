//const videoplayer = document.getElementById("assets")

//console.log(videoplayer)
//window.addEventListener("click", () => { document.getElementById("video_assect").play(); })
//window.addEventListener("click", () => { document.getElementById("video_assect_server").play(); })




// const marker = document.querySelector("#marker");
// if(marker != null)
//     {
//         marker.addEventListener("markerFound", () => {
//             $(scanUI).hide();
//             document.getElementById("video_assect").play();
//         });
//         marker.addEventListener("markerLost", () => {
//             $(scanUI).show();
//             document.getElementById("video_assect").pause();
//         });

//     }


////////////////////////////////////////// API INVOCKING //////////////////////////////////


// const scanUI = document.querySelector("#scan-ui");
const baseUIL = 'https://178.128.116.81/cms/';

var fatchdataURL = baseUIL + 'api/uploads/';

// Create a URL object
const urlObj = new URL(window.location.href);

// Extract the parameters
const videoParam = urlObj.searchParams.get("video");
const patternParam = urlObj.searchParams.get("pattern");

//https://178.128.116.81/cms/api/uploads/IbX3YGm/marker.patt
//https://178.128.116.81/cms/api/uploads/IbX3YGm/video.mp4

console.log("Video:", videoParam)


var patternUrl = fatchdataURL + "IbX3YGm/marker.patt";
var videoUrl = fatchdataURL + "IbX3YGm/video.mp4";
var id = "IbX3YGm";

if (patternParam != null) {

    console.log("PatternChaned")

    patternUrl = fatchdataURL + patternParam;
    videoUrl = fatchdataURL + videoParam;
    const words = patternParam.split('/');
    id = words[0]
    console.log("ID: " + id)
}

console.log("baseurl:  " + fatchdataURL)

console.log("PatternURL:  " + patternUrl)
console.log("VideoURL:  " + videoUrl)

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





////////////////////////////////////////////// adding dynamic /////////////////////////////////////////////

//console.log(getAllUrlParams(window.location.href))

//generate tag and pattern

// const arScene = document.querySelector("#ARScene")
// const assets = document.querySelector("#assets")

// console.log(arScene)
// console.log(assets)





//console.log("Data:  " + sourceData)

// Set your video source here

// Append the `a-marker` and `a-video` tags with dynamic URL and src



// Define the URLs of the marker pattern and video file
const markerFileUrl = patternUrl;  // Replace with actual marker file URL
const videoFileUrl = videoUrl;     // Replace with actual video file URL



function dynamicMarker() {
    $("body").append(`<a-scene id="ARScene" embedded arjs='sourceType: webcam; debugUIEnabled: false' vr-mode-ui='enabled: false'>

        <a-assets id = "assets" timeout="30000">
          <video id="dynamic_marker" src="${videoFileUrl}" autoplay="" loop="true" crossorigin="anonymous"></video>
        </a-assets>

        <!--a-marker preset="hiro" emitevents="true" id="marker"-->
        <a-marker id="marker" type ='pattern' url = '${markerFileUrl}' preset='custom' emitevents="true"
                  smooth="true" smoothCount="2" smoothTolerance="0.01" smoothThreshold="2">
          <a-video  id="player" src="#dynamic_marker" width="1.5" heiight="1.5" position="0 0 0" rotation="-90 0 0">  </a-video>
        </a-marker>   
        <!-- add a simple camera -->
        <a-entity camera></a-entity>
      </a-scene>`)

    const marker_Dynamic = document.querySelector("#dynamic_marker");
    marker_Dynamic.addEventListener("markerFound", () => {
        $("#scan-ui").hide();
        document.getElementById("dynamic_video_assect").play();
    });
    marker_Dynamic.addEventListener("markerLost", () => {
        $("#scan-ui").show();
        document.getElementById("dynamic_video_assect").pause();
    });

    window.addEventListener("click", () => { document.getElementById("dynamic_marker").play(); })



    
}

dynamicMarker()

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




// Fetch and store both files as Blobs
async function loadFiles() {
    try {
        // Download marker file as Blob
        // const markerResponse = await fetch(markerFileUrl);
        // const markerBlob = await markerResponse.blob();
        // const markerBlobUrl = URL.createObjectURL(markerBlob);

        // Download video file as Blob
        const videoResponse = await fetch(videoFileUrl);
        const videoBlob = await videoResponse.blob();
        const videoBlobUrl = URL.createObjectURL(videoBlob);

        // Append the marker and video elements to the A-Frame scene
        $("body").append(`<a-scene id="ARScene" embedded arjs='sourceType: webcam; debugUIEnabled: false' vr-mode-ui='enabled: false'>

            <a-assets id = "assets" timeout="30000">
              <video id="dynamic_marker" src="${videoBlobUrl}" autoplay="" loop="true" crossorigin="anonymous"></video>
            </a-assets>
    
            <!--a-marker preset="hiro" emitevents="true" id="marker"-->
            <a-marker id="marker" type ='pattern' url = '${markerFileUrl}' preset='custom' emitevents="true"
                      smooth="true" smoothCount="2" smoothTolerance="0.01" smoothThreshold="2">
              <a-video  id="player" src="#dynamic_marker" width="1.5" heiight="1.5" position="0 0 0" rotation="-90 0 0">  </a-video>
            </a-marker>   
            <!-- add a simple camera -->
            <a-entity camera></a-entity>
          </a-scene>`)

        const marker_Dynamic = document.querySelector("#dynamic_marker");
        marker_Dynamic.addEventListener("markerFound", () => {
            $(scanUI).hide();
            document.getElementById("dynamic_video_assect").play();
        });
        marker_Dynamic.addEventListener("markerLost", () => {
            $(scanUI).show();
            document.getElementById("dynamic_video_assect").pause();
        });

        window.addEventListener("click", () => { document.getElementById("dynamic_video_assect").play(); })

    } catch (error) {
        console.error("Error loading files:", error);
    }
}
//loadFiles()