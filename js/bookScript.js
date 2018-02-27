console.log('loading the bookScript');
var bmMarkup = '';

chrome.bookmarks.getTree(function (results) {
	console.log('getTree=>', results);
});

var backupButton = document.querySelector('#link');
backupButton.addEventListener('click', function () {
	console.log('backupButton clicked=>');
	bmMarkup = '';
	chrome.bookmarks.getTree(function (results) {
		console.log('getTree=>', results);
		traverseBookmarks(results);
		// console.log('bmMarkup=>', bmMarkup);
		// download('test.html', bmMarkup);
	});
});

function traverseBookmarks(bookmarkTreeNodes) {
	for (var i = 0; i < bookmarkTreeNodes.length; i++) {
		var title, url, isFolder = false;
		if (bookmarkTreeNodes[i].url) {
			url = bookmarkTreeNodes[i].url;
			isFolder = false;
		} else {
			isFolder = true;
		}
		title = bookmarkTreeNodes[i].title;
		if (isFolder) {
			bmMarkup += '<h1>' + title + '</h1>';
			console.log('%cfolder>' + title, 'color:green');
		} else {
			bmMarkup += '<li><a href="' + url + '" target="_blank">' + title + '</a></li>';
			console.log('		title>' + title + '->(' + url + ')');
			// console.log('		url  >', url);
		}
		if (bookmarkTreeNodes[i].children) {
			traverseBookmarks(bookmarkTreeNodes[i].children);
		}
	}
}

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