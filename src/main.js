
function music32FloatArray (real) {
  var audioContext = new AudioContext();
  var osc = audioContext.createOscillator();
  var imag = new Float32Array(real.length);
  var hornTable = audioContext.createPeriodicWave(real, imag);

  osc = audioContext.createOscillator();
  osc.setPeriodicWave(hornTable);
  osc.frequency.value = 80;
  osc.connect(audioContext.destination);
  osc.start(0);
}
