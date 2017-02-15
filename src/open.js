function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        displayContents(contents);
        $('#play-input').disabled = false;
    };
    reader.readAsText(file);
}

function TestCall(event, other) {
    console.log(event);
    console.log(other);
}

function displayContents(contents) {
    var lines = contents.split("\n"),
        output = [],
        i;
    output.push("<thead><tr><th scope=\"col\"><button>" +
        lines[0].slice(0, -1).split(",").join("</button></th><th scope=\"col\"><button>") +
        "</button></th></tr></thead>");
    for (i = 1; i < lines.length; i++)
        output.push("<tr><td>" +
            lines[i].slice(0, -1).split(",").join("</td><td>") +
            "</td></tr>");
    output = "<table>" + output.join("") + "</table>";
    var div = document.getElementById('file-content');
    div.innerHTML = output;
    var ths = document.getElementsByTagName("th");
    console.log("ths " + ths);
    for (var i = 0; i < ths.length; i++) {
        ths[i].onclick = TestCall
    }
    // var element = $('#content');
    // element.innerHTML = contents;
}