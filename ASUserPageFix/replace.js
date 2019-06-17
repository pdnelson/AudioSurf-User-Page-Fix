// AudioSurf user page fix
// BetaMaster64, Yuvira (2019)
//
// Known bugs:
//
// Anything requiring JavaScript no longer functions at this time
//     - Includes shouts, tab switching (Thrones, Songs, Artists, Characters), and viewing friends

// URL offset variable
var URL;

// Figures out what URL you are using, and adjusts the offset variables accordingly
if(window.location.href.includes("www.audio-surf")) URL = window.location.href.substring(0,25);
else if(window.location.href.includes("www.audiosurfthegame.com")) URL = window.location.href.substring(0,31);
else if(window.location.href.includes("audio-surf")) URL = window.location.href.substring(0,21);
else if(window.location.href.includes("audiosurfthegame")) URL = window.location.href.substring(0,27);

// If the URL is not recognized, logs error
else console.log("Didn't detect the URL: '" + window.location.href + "'! E-mail BetaMaster with this error message!");

// If it is a user page, redirects to the /ext/* directory
if (!window.location.href.includes("/ext/") && window.location.href.includes("mypage")) {
	window.location.replace(URL + "/ext/" + window.location.href.substring((URL.length + 1),window.location.href.length));
}

// Modifies the user page
if (window.location.href.includes("/ext/mypage")) {
	
	// Replaces all 'link' tags
	var links = document.getElementsByTagName('link');
	for (var i = 0, l = links.length; i < l; i++) {
	  links[i].href = URL + links[i].href.substring((URL.length + 4), links[i].href.length);
	}

	// Replaces all 'img' tags
	var imgs = document.getElementsByTagName('img');
	for (var i = 0, l = imgs.length; i < l; i++) {
	  imgs[i].src = URL + imgs[i].src.substring((URL.length + 4), imgs[i].src.length);
	}
	
	// Replaces all 'a' tags as long as they link to some variation of 'mypage'
	var as = document.getElementsByTagName('a');
	for (var i = 0, l = as.length; i < l; i++) {
		if (!as[i].href.includes("mypage")) as[i].href = URL + as[i].href.substring((URL.length + 4),as[i].href.length);
	}
	
	// Replaces all 'script' tags...but they don't actually work :'(
	var scripts = document.getElementsByTagName('script');
	for (var i = 0, l = scripts.length; i < l; i++) {
	  scripts[i].src = URL + scripts[i].src.substring((URL.length + 4), scripts[i].src.length);
	}
	
	// Adds header and footer
	document.getElementById('main_container').innerHTML = '<center><div id="header" style="width:850px;"><a href="http://audio-surf.com/index.php"><img src="http://audio-surf.com/images/logo_main.png" alt="Audiosurf"></a><div id="personal_bar"><img src="http://audio-surf.com/images/personal_bar_left.png" alt=""><span id="personal_bar_text">[ Welcome back! <a href="#">My Page</a> <a href="http://audio-surf.com/friends.php">Friends</a> <a href="http://audio-surf.com/account.php">Account</a> <a href="http://audio-surf.com/logout.php">Log Out</a> ]</span><span id="personal_bar_spacer"></span></div><ul id="nav_bar"><li><a href="http://store.steampowered.com/app/12910/"><img src="http://audio-surf.com/images/demo_tab.png" alt="Buy"></a></li><li><a href="http://store.steampowered.com/app/12900"><img src="http://audio-surf.com/images/buy_tab.png" alt="Demo"></a></li><li><a href="http://audio-surf.com/"><img src="http://audio-surf.com/images/home_tab.png" alt="Home"></a></li><li><a href="http://audio-surf.com/song.php?t=popular"><img src="http://audio-surf.com/images/songs_tab.png" alt="Songs"></a></li><li><a href="http://audio-surf.com/forum"><img src="http://audio-surf.com/images/forums_tab.png" alt="Forum"></a></li><li><a href="http://audio-surf.com/news.php"><img src="http://audio-surf.com/images/news_tab.png" alt="News"></a></li></ul></div></center>' +
	document.getElementById('main_container').innerHTML +
	'<center><div id="footer" style="width:812px"><span id="copyright">© 2010 Audiosurf, LLC | website design by <a href="http://www.funkisockmunki.com/">tabitha</a> </span><span id="footer_nav"><a href="mailto:dylan@audio-surf.com">Contact Us</a></span></div></center>';
}

// Modifies non-user pages so that user page links work
else {
	
	var as = document.getElementsByTagName('a');
	for (var i = 0, l = as.length; i < l; i++) {
		
		// Only changes 'a' tags relating to user pages
		if (as[i].href.includes("mypage")) as[i].href = URL + "/ext/" + as[i].href.substring((URL.length + 1),as[i].href.length);
	}
}