console.log('loading the bookScript');
chrome.bookmarks.getTree(function (results) {
	console.log('getTree=>', results);

});

var backupButton = document.querySelector('#link');
backupButton.addEventListener('click', function () {
	console.log('backupButton clicked=>');
	chrome.bookmarks.getTree(function (results) {
		console.log('getTree=>', results);
		// download('test.txt', 'Hello world!');
		// download('test.html', '<h1>hello</h1>');
		printBM(results);
	});

	function printBM(bmObject) {
		for (var key in bmObject) {
			if (typeof(bmObject[key]) == 'object') {
				printBM(bmObject[key]);
			} else {
				console.log(key + ": " + bmObject[key]);
			}
		}
	}

});

function download(filename, text) {
	var pom = document.createElement('a');
	// pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
	}
}