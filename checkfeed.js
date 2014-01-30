google.load("feeds", "1");
var badgedisplay = localStorage.badgedisplay;

function beginupdate() {
	if (localStorage.latesttitle == "") {begincheck();}
    setInterval(function(){begincheck()}, 600000);
}

function begincheck() {
var checkfeed = new google.feeds.Feed("http://feeds.ishafoundation.org/IshaBlog");
      checkfeed.setNumEntries(1);
      checkfeed.load(function(result) {
        if (!result.error) {

		    if (localStorage.latesttitle != result.feed.entries[0].title) {
				localStorage.latesttitle = result.feed.entries[0].title;
				var latestlink = result.feed.entries[0].link;
				badgedisplay = "new";
				localStorage.badgedisplay = badgedisplay;
				 if (JSON.parse(localStorage.blogupdates)) {blogalert();}				
			}
		  chrome.browserAction.setBadgeText({text:String(badgedisplay)});
		  chrome.browserAction.setBadgeBackgroundColor({color: "#F36F21"});

		  }
		 }); 
	     }

google.setOnLoadCallback(beginupdate);

function blogalert() {
	var blogalert = window.webkitNotifications.createNotification(
	'images/48.png',                      // The image.
	'New Post at Isha Blog', // The title.
	localStorage.latesttitle     // The body.
	);
	blogalert.show();
	setTimeout(function(){blogalert.cancel();},10000);
	blogalert.onclick = function () {window.open("http://blog.ishafoundation.org");};
}

function resetbadge() { 
    badgedisplay = "";
	localStorage.badgedisplay = badgedisplay;
	chrome.browserAction.setBadgeText({text:String(badgedisplay)});
	chrome.browserAction.setBadgeBackgroundColor({color: "#F36F21"});
    };
