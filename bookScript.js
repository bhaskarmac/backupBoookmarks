console.log('loading the bookScript');
chrome.bookmarks.getTree(function (results){
	console.log('getTree=>', results);

});