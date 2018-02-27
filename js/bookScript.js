console.log('loading the bookScript');
var bmMarkup = '';
var backupButton = document.querySelector('#btnBackup');

//Adding event listener for the backup button
backupButton.addEventListener('click', function () {
	console.log('backupButton clicked=>');
	bmMarkup = '';
	//API call to get the all bookmarks
	chrome.bookmarks.getTree(function (results) {
		traverseBookmarks(results);
		// console.log('bmMarkup=>', bmMarkup);
		download('test.html', bmMarkup);
	});
});

/**
 * Method to traverse through bookmarks Object array returned from API
 * @param {JSON Object Array} bookmarkTreeNodes 
 */
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
			// console.log('%cfolder>' + title, 'color:green');
		} else {
			bmMarkup += '<li><a href="' + url + '" target="_blank">' + title + '</a></li>';
			// console.log('		title>' + title + '->(' + url + ')');
		}
		if (bookmarkTreeNodes[i].children) {
			traverseBookmarks(bookmarkTreeNodes[i].children);
		}
	}
}

/**
 * Method to download the file with bookmarks
 * @param {string} filename 
 * @param {string} text 
 */
function download(filename, text) {
	var downloadLinkNode = document.createElement('a');
	downloadLinkNode.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
	downloadLinkNode.setAttribute('download', filename);
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		downloadLinkNode.dispatchEvent(event);
	} else {
		downloadLinkNode.click();
	}
}