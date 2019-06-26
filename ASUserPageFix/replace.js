// AudioSurf user page fix
// BetaMaster64, Yuvira (2019)

// URL offset
var URL;

// userid (for friends list)
var userid;

// Friend page number
var page = 1;

// Figure out URL variation, adjust offset accordingly
if(window.location.href.includes("www.audio-surf")) URL = window.location.href.substring(0,25);
else if(window.location.href.includes("www.audiosurfthegame.com")) URL = window.location.href.substring(0,31);
else if(window.location.href.includes("audio-surf")) URL = window.location.href.substring(0,21);
else if(window.location.href.includes("audiosurfthegame")) URL = window.location.href.substring(0,27);

// If the URL is not recognized, log error
else console.log("Didn't detect the URL: '" + window.location.href + "'! E-mail BetaMaster with this error message!");

// If it is a user page, redirects to the /ext/* directory
if (!window.location.href.includes("/ext/") && window.location.href.includes("mypage")) {
	window.location.replace(URL + "/ext/" + window.location.href.substring((URL.length + 1),window.location.href.length));
}

// Modify user page
if (window.location.href.includes("/ext/mypage")) {
	

	
	// Replace all 'link' tags
	var links = document.getElementsByTagName('link');
	for (var i = 0, l = links.length; i < l; i++) {
	  links[i].href = URL + links[i].href.substring((URL.length + 4), links[i].href.length);
	}

	// Replace all 'img' tags
	var imgs = document.getElementsByTagName('img');
	for (var i = 0, l = imgs.length; i < l; i++) {
	  imgs[i].src = URL + imgs[i].src.substring((URL.length + 4), imgs[i].src.length);
	  if (imgs[i].src.includes("get_avatar")) userid = imgs[i].src.substring(imgs[i].src.length-7, imgs[i].src.length); //Get userid from profile photo
	}
	
	// Replace all 'a' tags as long as they link to some variation of 'mypage'
	var as = document.getElementsByTagName('a');
	for (var i = 0, l = as.length; i < l; i++) {
		if (!as[i].href.includes("mypage")) as[i].href = URL + as[i].href.substring((URL.length + 4),as[i].href.length);
	}
	
	// Inject friend navigation
	var nav = document.createElement('div');
	nav.id = 'friends_paging';
	nav.innerHTML = '<span><a href="javascript:next_friends(\'prev\')"><img src="http://audio-surf.com/images/mypage/arrow_l.png" alt="Previous"></a> <span id="pagenum">'+page+'</span> <a href="javascript:next_friends(\'next\')"><img src="http://audio-surf.com/images/mypage/arrow.png" alt="Next"></a></span>';
	document.getElementById('friends_container').appendChild(nav);

	// Create JavaScript elements
	var myPageScript = document.createElement('script');
	var jQueryScript = document.createElement('script');
	var jParralaxScript = document.createElement('script');
	
	// Load 'myPage' JavaScript file
	var myPage;
	loadMyPage();

	// Set JavaScript elements
	myPageScript.innerHTML = myPage;
	jQueryScript.src = 'http://audio-surf.com/scripts/jquery-1.3.2.min.js';
	jParralaxScript.src = 'http://audio-surf.com/scripts/jquery.jparallax.js';

	// Append JavaScript elements to HTML
	document.head.appendChild(myPageScript);
	document.head.appendChild(jQueryScript);
	document.head.appendChild(jParralaxScript);
	
 	// Refresh friends and shouts
	var getf = document.createElement('script');
	getf.innerHTML = 'next_friends(1);loadShouts();';
	document.head.appendChild(getf);
	
	// Add header and footer
	document.getElementById('main_container').innerHTML = '<center><div id="header" style="width:850px;"><a href="http://audio-surf.com/index.php"><img src="http://audio-surf.com/images/logo_main.png" alt="Audiosurf"></a><div id="personal_bar"><img src="http://audio-surf.com/images/personal_bar_left.png" alt=""><span id="personal_bar_text">[ Welcome back! <a href="#">My Page</a> <a href="http://audio-surf.com/friends.php">Friends</a> <a href="http://audio-surf.com/account.php">Account</a> <a href="http://audio-surf.com/logout.php">Log Out</a> ]</span><span id="personal_bar_spacer"></span></div><ul id="nav_bar"><li><a href="http://store.steampowered.com/app/12910/"><img src="http://audio-surf.com/images/demo_tab.png" alt="Buy"></a></li><li><a href="http://store.steampowered.com/app/12900"><img src="http://audio-surf.com/images/buy_tab.png" alt="Demo"></a></li><li><a href="http://audio-surf.com/"><img src="http://audio-surf.com/images/home_tab.png" alt="Home"></a></li><li><a href="http://audio-surf.com/song.php?t=popular"><img src="http://audio-surf.com/images/songs_tab.png" alt="Songs"></a></li><li><a href="http://audio-surf.com/forum"><img src="http://audio-surf.com/images/forums_tab.png" alt="Forum"></a></li><li><a href="http://audio-surf.com/news.php"><img src="http://audio-surf.com/images/news_tab.png" alt="News"></a></li></ul></div></center>' +
	document.getElementById('main_container').innerHTML +
	'<center><div id="footer" style="width:812px"><span id="copyright">© 2010 Audiosurf, LLC | website design by <a href="http://www.funkisockmunki.com/">tabitha</a> </span><span id="footer_nav"><a href="mailto:dylan@audio-surf.com">Contact Us</a></span></div></center>';
	
}

// Modify non-user pages so that user page links work
else {
	
	var as = document.getElementsByTagName('a');
	for (var i = 0, l = as.length; i < l; i++) {
		
		// Change 'a' tags relating to user pages
		if (as[i].href.includes("mypage")) as[i].href = URL + "/ext/" + as[i].href.substring((URL.length + 1),as[i].href.length);
	}
}

function loadMyPage() {
	myPage = '' + 

'function next_friends(a) {                                                                                                                    ' +
'	                                                                                                                                           ' +
'	b=getRequestObject(), c = "http://audio-surf.com/ext/friend_refresh.php?u='+userid+'&p=";                                                  ' +
'	                                                                                                                                           ' +
'	switch(a) {                                                                                                                                ' +
'		case "next": page += 1;                                                                                                                ' +
'		break;                                                                                                                                 ' +
'	                                                                                                                                           ' +
'		case "prev": if(page>1) page -= 1; else page = 1;                                                                                      ' +
'		break;                                                                                                                                 ' +
'		                                                                                                                                       ' +
'		default:page=a;                                                                                                                        ' +
'		break;                                                                                                                                 ' +
'	}                                                                                                                                          ' +
'	                                                                                                                                           ' +
'	a=c+page;                                                                                                                                  ' +
'	b.onreadystatechange = function() {                                                                                                        ' +
'		                                                                                                                                       ' +
'		if(b.readyState == 4) {                                                                                                                ' +
'			var f = b.responseText.replace(/ext/g, "http://audio-surf.com/ext");                                                               ' +
'			var e = document.getElementById("friends");                                                                                        ' +
'			                                                                                                                                   ' +
'			if (f != "" && f != " " && f != null) e.innerHTML = f;                                                                             ' +
'			else page--;                                                                                                                       ' +
'			                                                                                                                                   ' +
'			document.getElementById("pagenum").innerHTML=page;                                                                                 ' +
'		}                                                                                                                                      ' +
'	};                                                                                                                                         ' +
'	                                                                                                                                           ' +
'	try {                                                                                                                                      ' +
'		b.open("GET", a, true);                                                                                                                ' +
'		b.send(null);                                                                                                                          ' +
'	}                                                                                                                                          ' +
'	catch(d) {                                                                                                                                 ' +
'		page = 1;                                                                                                                              ' +
'		a = c + page;                                                                                                                          ' +
'	}                                                                                                                                          ' +
'}                                                                                                                                             ' +
'                                                                                                                                              ' +
'function show_tab(a) {                                                                                                                        ' +
'	for(var b=0;b<document.getElementById("favorites_nav").childNodes.length;b++) {                                                            ' +
'		var c=document.getElementById("favorites_nav").childNodes[b];                                                                          ' +
'		if (c.id==a)                                                                                                                           ' +
'			switch (a) {                                                                                                                       ' +
'				case "favorites_thrones_tab":c.firstChild.src="http://audio-surf.com/images/mypage/thrones_tab_left.png";                      ' +
'				document.getElementById("thrones_held_panel").style.display="inline";                                                          ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_songs_tab":c.firstChild.src="http://audio-surf.com/images/mypage/songs_tab.png";                               ' +
'				document.getElementById("most_played_songs_panel").style.display="inline";                                                     ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_ppm_tab":c.firstChild.src="http://audio-surf.com/images/mypage/ppm_tab.png";                                   ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_artists_tab":c.firstChild.src="http://audio-surf.com/images/mypage/artists_tab.png";                           ' +
'				document.getElementById("favorite_artists_panel").style.display="inline";                                                      ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_characters_tab":c.firstChild.src="http://audio-surf.com/images/mypage/characters_tab.png";                     ' +
'				document.getElementById("favorite_characters_panel").style.display="inline";                                                   ' +
'				break;                                                                                                                         ' +
'			}                                                                                                                                  ' +
'		else                                                                                                                                   ' +
'			switch (c.id) {                                                                                                                    ' +
'				case "favorites_thrones_tab":c.firstChild.src="http://audio-surf.com/images/mypage/thrones_tab_left_des.png";                  ' +
'				document.getElementById("thrones_held_panel").style.display="none";                                                            ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_songs_tab":c.firstChild.src="http://audio-surf.com/images/mypage/songs_tab_des.png";                           ' +
'				document.getElementById("most_played_songs_panel").style.display="none";                                                       ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_ppm_tab":c.firstChild.src="http://audio-surf.com/images/mypage/ppm_tab_des.png";                               ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_artists_tab":c.firstChild.src="http://audio-surf.com/images/mypage/artists_tab_des.png";                       ' +
'				document.getElementById("favorite_artists_panel").style.display="none";                                                        ' +
'				break;                                                                                                                         ' +
'				                                                                                                                               ' +
'				case "favorites_characters_tab":c.firstChild.src="http://audio-surf.com/images/mypage/characters_tab_des.png";                 ' +
'				document.getElementById("favorite_characters_panel").style.display="none";                                                     ' +
'				break;                                                                                                                         ' +
'			}                                                                                                                                  ' +
'	}                                                                                                                                          ' +
'}                                                                                                                                             ' +
'                                                                                                                                              ' +
'function doRequest(a) {                                                                                                                       ' +
'	var b=getRequestObject();                                                                                                                  ' +
'	                                                                                                                                           ' +
'	a="http://audio-surf.com/ext/friend_friendlyFunctions.php?a="+a;                                                                           ' +
'	b.onreadystatechange = function() {                                                                                                        ' +
'		if (b.readyState==4) {                                                                                                                 ' +
'			var d=document.getElementById("personal_add");                                                                                     ' +
'			d.innerHTML="";                                                                                                                    ' +
'		}                                                                                                                                      ' +
'	};                                                                                                                                         ' +
'	                                                                                                                                           ' +
'	try {                                                                                                                                      ' +
'		b.open("GET",a,true);                                                                                                                  ' +
'		b.send(null);                                                                                                                          ' +
'	}                                                                                                                                          ' +
'	catch(c) {}                                                                                                                                ' +
'}                                                                                                                                             ' +
'                                                                                                                                              ' +
'function fsbClick() {                                                                                                                         ' +
'	var a=document.getElementById("fsb");                                                                                                      ' +
'	if(a.value=="Search players")a.value=""                                                                                                    ' +
'}                                                                                                                                             ' +
'                                                                                                                                              ' +
'function fssClick(){                                                                                                                          ' +
'	var a=document.getElementById("fss");                                                                                                      ' +
'	if(a.value=="Search songs or artists")a.value=""                                                                                           ' +
'}                                                                                                                                             ' +
'                                                                                                                                              ' +
'function removeShout(a) {                                                                                                                     ' +
'	var b=getRequestObject();                                                                                                                  ' +
'	a="http://audio-surf.com/ext/mypage_shouts_refresh.php?a=r&id="+a;                                                                         ' +
'	b.onreadystatechange=function() {                                                                                                          ' +
'		if(b.readyState==4)document.getElementById("shouts_content").innerHTML=b.responseText                                                  ' +
'	};                                                                                                                                         ' +
'	                                                                                                                                           ' +
'	try{                                                                                                                                       ' +
'		b.open("GET",a,true);                                                                                                                  ' +
'		b.send(null)                                                                                                                           ' +
'	}                                                                                                                                          ' +
'	catch(c){}                                                                                                                                 ' +
'}                                                                                                                                             ' +

'                                                                                                                                              ' +
'function shoutClick() {                                                                                                                       ' +
'	var a=document.getElementById("sBox");                                                                                                     ' +
'	if(a.text=="Leave a shout"||a.innerHTML=="Leave a shout")a.innerHTML=""                                                                    ' +
'};                                                                                                                                            ' +

// START LOAD SHOUTS FUNCTION
	'function loadShouts() {                                                                                                                       ' +
	'	w=getRequestObject();                                                                                                                      ' +
	'   a = "http://audio-surf.com/ext/mypage_shouts_refresh.php?&u=" +                                                                        ' +
	'       document.getElementsByTagName("img")[0].src.substring(43,document.getElementsByTagName("img")[0].src.length);                          ' +
	'	                                                                                                                                           ' +
	'	w.onreadystatechange = function() {                                                                                                        ' +
	'		                                                                                                                                       ' +
	'		if(w.readyState == 4) {                                                                                                                ' +
	'			var g = w.responseText.replace(/ext/g, "http://audio-surf.com/ext");                                                               ' +
	'			var h = document.getElementById("shouts_content");                                                                                 ' +
	'			                                                                                                                                   ' +
	'			h.innerHTML = g;                                                                                                                   ' +
	'		}                                                                                                                                      ' +
	'	};                                                                                                                                         ' +
	'	                                                                                                                                           ' +
	'	try {                                                                                                                                      ' +
	'		w.open("GET", a, true);                                                                                                                ' +
	'		w.send(null);                                                                                                                          ' +
	'	}                                                                                                                                          ' +
	'	catch(d) {}                                                                                                                                ' +
	'}                                                                                                                                             ' +
// END LOAD SHOUTS FUNCTION

'function getRequestObject() {                                                                                                                 ' +
'	var a;                                                                                                                                     ' +
'	try {                                                                                                                                      ' +
'		a=new XMLHttpRequest                                                                                                                   ' +
'	}                                                                                                                                          ' +
'	catch(b){                                                                                                                                  ' +
'		try{                                                                                                                                   ' +
'			a=new ActiveXObject("Msxml2.XMLHTTP")                                                                                              ' +
'		}                                                                                                                                      ' +
'		catch(c){                                                                                                                              ' +
'			try{                                                                                                                               ' +
'				a=new ActiveXObject("Microsoft.XMLHTTP")                                                                                       ' +
'			}                                                                                                                                  ' +
'			catch(d){                                                                                                                          ' +
'				return                                                                                                                         ' +
'			}                                                                                                                                  ' +
'		}                                                                                                                                      ' +
'	}                                                                                                                                          ' +
'	                                                                                                                                           ' +
'	return a                                                                                                                                   ' +
'}                                                                                                                                             ';
}
