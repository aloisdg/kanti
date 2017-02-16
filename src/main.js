
var varCounter = 0;
var varName = function(osc, list){
     if(varCounter < list.length) {
        osc.frequency.value = list[varCounter];
        varCounter++;
     } else {
          clearInterval(varName);
          osc.stop();
          varCounter = 0;
     }
};

var Selection =  {
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
    console.log(floatTab[Selection.axis_y]);
    music32FloatArray(floatTab[Selection.axis_y]);
  },

  setNewIndexY: function(button) {
    Selection.axis_y = button.target.getAttribute('index') - 1;
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
  var audioContext = new AudioContext();
  var osc = audioContext.createOscillator();
  var hornTable = audioContext.createPeriodicWave(real, imag);

  osc.setPeriodicWave(hornTable);

  setInterval(() => varName(osc, floatList), 500);

  osc.connect(audioContext.destination);
  osc.frequency.value = floatList[varCounter];
  osc.start(0);
  //}) ;
}

function playData() {
  Selection.playData();
}

$('#play-input').addEventListener("click", playData);