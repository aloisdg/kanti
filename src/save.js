// http://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination

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

// var saveData = (function () {
//     return function (data, fileName) {
//         var json = JSON.stringify(data),
//             blob = new Blob([json], {type: "octet/stream"});
//             saveBlob(blob, fileName);
//     };
// }());

// var data = { x: 42, s: "hello, world", d: new Date() },
//     fileName = "my-download.json";
//saveData(data, fileName);