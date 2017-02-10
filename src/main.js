function music32FloatArray (floatList) {
  console.log("1");
  var audioContext = new AudioContext();
  var osc = audioContext.createOscillator();
  var real = new Float32Array(floatList);
  var imag = new Float32Array(real.length);
  console.log("2-0");
  var hornTable = audioContext.createPeriodicWave(real, imag);
  console.log("2-1");

  osc = audioContext.createOscillator();
  osc.setPeriodicWave(hornTable);
  osc.frequency.value = 80;
  osc.connect(audioContext.destination);
  osc.start(0);
  console.log("3");
}

function playData() {
  let data = $('#file-content').innerHTML;
    console.log(data);

    let tab = data.split('\n').map(line => line.split(','));
    tab.shift();

  //  console.log("Grid length " + tab[0])
    const grid2 = tab[0].map((col, i) => tab.map((row) => row[i]));
//    console.log("Grid 2" + grid2[0]);
    const floatTab = tab.map(line => line.map(cell => parseFloat(cell)));
    music32FloatArray(floatTab[1]);
}

$('#play-input').addEventListener("click", playData);