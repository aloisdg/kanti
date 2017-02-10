function music32FloatArray (floatList) {
  var audioContext = new AudioContext();
  var osc = audioContext.createOscillator();
  var real = new Float32Array(floatList);
  var imag = new Float32Array(real.length);
  var hornTable = audioContext.createPeriodicWave(real, imag);

  osc = audioContext.createOscillator();
  osc.setPeriodicWave(hornTable);
  osc.frequency.value = 80;
  osc.connect(audioContext.destination);
  osc.start(0);
}

function playData() {
  let data = $('#file-content').innerHTML;
    console.log(data);

    let tab = data.split('\n').map(line => line.split(','));
    tab.shift();

    let grid2 = tab[0].map((col, i) => tab.map((row) => row[i]));
    grid2.shift()
    const floatTab = grid2.map(line => line.map(cell => parseFloat(cell)));

    music32FloatArray(floatTab[1]);
}

$('#play-input').addEventListener("click", playData);