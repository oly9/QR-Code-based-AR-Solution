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
        id: "kX3Onnj", // replace this with a dynamic user or session ID if needed
        deviceName: deviceType
    };

    // Send the data to the API
    //new cms http://178.128.116.81/cms
    //new cms https://qrgen-tau.vercel.app/api/collect-device-info
    fetch('http://178.128.116.81/cms', {
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



function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
  }


console.log(getAllUrlParams(window.location.href))


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
