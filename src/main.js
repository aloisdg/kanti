
var audioContext = new AudioContext();
var osc = audioContext.createOscillator();
var varCounter = 0;
var varName = function(list){
     if(varCounter < list.length) {
        osc.frequency.value = list[varCounter];
        varCounter++;
     } else {
          clearInterval(varName);
          osc.stop();
          varCounter = 0;
     }
};

function music32FloatArray (floatList) {

  // Horn Sound.
  var real = new Float32Array([0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8]);
  var imag = new Float32Array(real.length);
  var hornTable = audioContext.createPeriodicWave(real, imag);

  osc = audioContext.createOscillator();
  osc.setPeriodicWave(hornTable);

  setInterval(() => varName(floatList), 500);


  osc.connect(audioContext.destination);
  osc.frequency.value = floatList[varCounter];
  osc.start(0);
}

function playData() {
  let data = $('#file-content').innerHTML;

    let tab = data.split('\n').map(line => line.split(','));
    tab.shift();

    let grid2 = tab[0].map((col, i) => tab.map((row) => row[i]));
    grid2.shift()
    const floatTab = grid2.map(line => line.map(cell => parseFloat(cell)));

    music32FloatArray(floatTab[1]);
}

$('#play-input').addEventListener("click", playData);