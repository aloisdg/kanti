var audioContext = new AudioContext();
var clicked = false;
var chunks = [];
var osc = audioContext.createOscillator();
var dest = audioContext.createMediaStreamDestination();
var mediaRecorder = new MediaRecorder(dest.stream);
osc.connect(dest);

var varCounter = 0;
var varName = function (osc, list) {
     if (varCounter < list.length) {
        osc.frequency.value = list[varCounter];
        varCounter++;
     } else {
        clearInterval(varName);
        mediaRecorder.requestData();
        mediaRecorder.stop();
        osc.stop();
        varCounter = 0;
        osc = audioContext.createOscillator();
        dest = audioContext.createMediaStreamDestination();
        mediaRecorder = new MediaRecorder(dest.stream);
        osc.connect(dest);
mediaRecorder.ondataavailable = function(evt) {
  // push each chunk (blobs) in an array
  chunks.push(evt.data);
};

mediaRecorder.onstop = function(evt) {
  // Make blob out of our blobs, and open it.
  var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  saveBlob(blob, "test.ogg");

  //  var audioTag = document.createElement('audio');
  //  document.querySelector("audio").src = URL.createObjectURL(blob);
};
     }
};

var Selection = {
  axis_x:0, // valeur par default
  axis_y:0, // default value

  playData: function () {
  //  let data = $('#file-content').innerText;
  var data = Array.prototype.map.call(document.querySelectorAll("tr"), function (tr) {
    return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
      return td.innerHTML;
    });
  });
    data.shift();
    let tab = data // data.split('\n').map(line => line.split(','));

    let grid2 = tab[0].map((col, i) => tab.map((row) => row[i]));
    grid2.shift()
    const floatTab = grid2.map(line => line.map(cell => parseFloat(cell)));

    music32FloatArray(floatTab[Selection.axis_y]);
  },

  setNewIndexY: function(button) {
    Selection.axis_y = button.target.getAttribute('index');
  },
};

function music32FloatArray (floatList) {
  // Horn Sound.
  //venigi.getJson("horn.json").then(tables => {
  //  var real = new Float32Array(tables.real);
  //  var imag = new Float32Array(real.length);
  const tables = HornRealImg;
  var c = tables.real.length;
  var real = new Float32Array(c);
  var imag = new Float32Array(c);
  for (var i = 0; i < c; i++) {
    real[i] = tables.real[i];
    imag[i] = tables.imag[i];
  }

  var hornTable = audioContext.createPeriodicWave(real, imag);


  osc.setPeriodicWave(hornTable);

//  mediaRecorder = new MediaRecorder(audioContext.destination);
  osc.connect(audioContext.destination);
  osc.frequency.value = floatList[varCounter];
  mediaRecorder.start();
  osc.start(0);

  setInterval(() => varName(osc, floatList), 500);
  //}) ;
}

function playData(e) {
  if (!clicked) {
    Selection.playData();
    e.target.value = "Stop recording";
    clicked = true;
 } else {
 clicked = false;
       clearInterval(varName);
        mediaRecorder.requestData();
        mediaRecorder.stop();
        osc.stop();
        varCounter = 0;
        osc = audioContext.createOscillator();
        dest = audioContext.createMediaStreamDestination();
        mediaRecorder = new MediaRecorder(dest.stream);
        osc.connect(dest);
mediaRecorder.ondataavailable = function(evt) {
  // push each chunk (blobs) in an array
  chunks.push(evt.data);
};

mediaRecorder.onstop = function(evt) {
  // Make blob out of our blobs, and open it.
  var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  saveBlob(blob, "test.ogg");

  //  var audioTag = document.createElement('audio');
  //  document.querySelector("audio").src = URL.createObjectURL(blob);
};

       }
}

mediaRecorder.ondataavailable = function(evt) {
  // push each chunk (blobs) in an array
  chunks.push(evt.data);
};

mediaRecorder.onstop = function(evt) {
  // Make blob out of our blobs, and open it.
  var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  saveBlob(blob, "test.ogg");

  //  var audioTag = document.createElement('audio');
  //  document.querySelector("audio").src = URL.createObjectURL(blob);
};

$('#play-input').addEventListener("click", playData);