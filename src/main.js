function music32FloatArray (real) {
  console.log("1");
  var audioContext = new AudioContext();
  var osc = audioContext.createOscillator();
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

$.get('/sun.csv')
  .done(function(data) {
    //console.log(data);

    let tab = data.split('\n').map(line => line.split(','));
    tab.shift();
    const floatTab = tab.map(line => line.map(cell => parseFloat(cell)));



    music32FloatArray(floatTab[0]);
  })
  .fail(function() {
    console.log('fail');
  });
