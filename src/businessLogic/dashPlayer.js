import shaka from 'shaka-player'
// var manifestUri =
// "https://preprod-cdn.cloud.altbalaji.com/content/2016-02/290-56c43f146a4e8/manifest.mpd";
var manifestUri = "https://cdn.cloud.altbalaji.com/content/2018-08/4779-5b6312848ae36/manifest.mpd";
//"https://cdn.cloud.altbalaji.com/content/2018-08/4779-5b6312848ae36/manifest.mpd";

    // 'https://preprod-cdn.cloud.altbalaji.com/content/2016-06/509-576c10ecd6cf7/manifest.mpd';
    // 'https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd';
    var licenseServer = "https://uwkc9hqxld.execute-api.us-east-1.amazonaws.com/production/logthis";
    // 'https://cwip-shaka-proxy.appspot.com/header_auth';
    // var licenseServer =
    // 'https://cwip-shaka-proxy.appspot.com/wrapped_request_and_response';
    var authTokenServer = 'https://cwip-shaka-proxy.appspot.com/get_auth_token';
    var authToken = null;


function initApp() {
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer() {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);


  player.configure('preferredAudioLanguage', 'fr-CA');
// NOTE: language preferences affect the next call to load()

// set text language preference to Greek and buffering goal to 2 minutes:
player.configure({
  streaming: {
    bufferingGoal: 120,
    rebufferingGoal: 15,
    bufferBehind:30
  }
});
player.configure({
  manifest: {
    retryParameters: {
      timeout: 0,       // timeout in ms, after which we abort; 0 means never
      maxAttempts: 2,   // the maximum number of requests before we fail
      baseDelay: 1000,  // the base delay in ms between retries
      backoffFactor: 2, // the multiplicative backoff factor between retries
      fuzzFactor: 0.5,  // the fuzz factor to apply to each retry delay
    }
  }
});
player.configure({
  drm: {
    servers: {
       'com.widevine.alpha': 'https://foo.bar/drm/widevine'
      // 'com.microsoft.playready': 'https://foo.bar/drm/playready'
    }
  }
});
player.configure({
  drm: {
    clearKeys: {
      'deadbeefdeadbeefdeadbeefdeadbeef': '18675309186753091867530918675309'
      // '02030507011013017019023029031037': '03050701302303204201080425098033'
    }
  }
});
player.configure({
  drm: {
    servers: { 'com.widevine.alpha': licenseServer },
    advanced: {
      'com.widevine.alpha': {
        'videoRobustness': 'HW_SECURE_ALL',
        'audioRobustness': 'HW_SECURE_ALL'
      }
    }
  }
});
player.getNetworkingEngine().registerRequestFilter(function(type, request) {
  // Only add headers to license requests:
  if (type != shaka.net.NetworkingEngine.RequestType.LICENSE) return;

//   // If we already know the token, attach it right away:
  if (authToken) {
    console.log('Have auth token, attaching to license request.');
    request.headers['CWIP-Auth-Header'] = authToken;
    return;
  }

  console.log('Need auth token.');
  // Start an asynchronous request, and return a Promise chain based on that.
  var authRequest = {
    uris: [authTokenServer],
    method: 'POST',
  };
  var requestType = shaka.net.NetworkingEngine.RequestType.APP;
  return player.getNetworkingEngine().request(requestType, authRequest)
      .promise.then(function(response) {
        // This endpoint responds with the value we should use in the header.
        authToken = shaka.util.StringUtils.fromUTF8(response.data);
        console.log('Received auth token', authToken);
        request.headers['CWIP-Auth-Header'] = authToken;
        console.log('License request can now continue.');
      });
  });

  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}
function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);

export { initPlayer, initApp }