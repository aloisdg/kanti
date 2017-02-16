let csv = (() => {
  let buildHeader = function (line) {
    return "<thead><tr><th scope=\"col\">"
      + line.slice(0, -1).split(",").join("</button></th><th scope=\"col\"><button class=\"axis_y\">")
      + "</button></th></tr></thead>"
  };
	let buildAsHtml = function (lines) {
      let output = [buildHeader(lines[0])];
      for (let i = 1; i < lines.length; i++)
        output.push("<tr><td>"
          + lines[i].slice(0, -1).split(",").join("</td><td>")
          + "</td></tr>");
      return "<table>" + output.join("") + "</table>";
	};

	return {
    buildAsHtml: buildAsHtml
  };
})();

function displayContents(contents) {
    var div = document.getElementById('file-content');
    div.innerHTML = csv.buildAsHtml(contents.split("\n"));
    var ths = $$(".axis_y");
    for (var i = 0; i < ths.length; i++) {
        ths[i].setAttribute('index', i);
        ths[i].addEventListener('click', Selection.setNewIndexY);
    }
    // var element = $('#content');
    // element.innerHTML = contents;
}

function readSingleFile(e) {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        displayContents(e.target.result);
        $('#play-input').disabled = false;
    };
    reader.readAsText(file);
}

function TestCall(event, other) {
    console.log(event);
    console.log(other);
}