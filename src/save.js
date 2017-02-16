// http://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination

    //  var b = document.querySelector("button");
    //  var clicked = false;
    //  var chunks = [];
    //  var ac = new AudioContext();
    //  var osc = ac.createOscillator();
    //  var dest = ac.createMediaStreamDestination();
    //  var mediaRecorder = new MediaRecorder(dest.stream);
    //  osc.connect(dest);

    //  b.addEventListener("click", function(e) {
    //    if (!clicked) {
    //        mediaRecorder.start();
    //        osc.start(0);
    //        e.target.innerHTML = "Stop recording";
    //        clicked = true;
    //      } else {
    //        mediaRecorder.requestData();
    //        mediaRecorder.stop();
    //        osc.stop(0);
    //        e.target.disabled = true;
    //      }
    //  });

    //  mediaRecorder.ondataavailable = function(evt) {
    //    // push each chunk (blobs) in an array
    //    chunks.push(evt.data);
    //  };

    //  mediaRecorder.onstop = function(evt) {
    //    // Make blob out of our blobs, and open it.
    //    var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
       

    //    saveBlob(blob, "test.ogg");
       
    //    var audioTag = document.createElement('audio');
    //    document.querySelector("audio").src = URL.createObjectURL(blob);
    //  };
     
var saveBlob = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
	a.style = "display: none";
	return function (blob, fileName) {
		var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
	};
}());

var saveData = (function () {
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"});
            saveBlob(blob, fileName);
    };
}());

// var data = { x: 42, s: "hello, world", d: new Date() },
//     fileName = "my-download.json";
//saveData(data, fileName);