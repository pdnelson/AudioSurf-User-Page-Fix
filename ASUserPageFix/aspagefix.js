// AudioSurf user page (alternate file, for testing only)
// BetaMaster64, Yuvira (2019)

// Friend page number
var page = 1;

// Checks that it is a user page, then gets to business
if (window.location.href.includes(".com/mypage.php")) {

	
	// Create JavaScript elements
	var myPageScript = document.createElement('script');
	var jQueryScript = document.createElement('script');
	var jParralaxScript = document.createElement('script');
	var additionalScript = document.createElement('script');

	// Set JavaScript elements
	myPageScript.src = 'http://audio-surf.com/scripts/mypage.js';
	jQueryScript.src = 'http://audio-surf.com/scripts/jquery-1.3.2.min.js';
	jParralaxScript.src = 'http://audio-surf.com/scripts/jquery.jparallax.js';
	additionalScript.innerHTML = aScript();

	// Append JavaScript elements to HTML
	document.head.appendChild(myPageScript);
	document.head.appendChild(jQueryScript);
	document.head.appendChild(jParralaxScript);
	document.head.appendChild(additionalScript);
	
	// Execute main page loading functions
	var getf = document.createElement('script');
	getf.innerHTML = 'loadPage();';
	document.head.appendChild(getf);
	
	// Execute main page loading functions
	var gets = document.createElement('script');
	gets.innerHTML = 'loadShouts();';
	document.head.appendChild(gets);
	
}

function aScript() {
	return '' +
	
// Load initial page
'function loadPage() {                                                                                                                       ' +
'	w=getRequestObject();                                                                                                                      ' +
'   a = "http://audio-surf.com/ext/mypage.php?u=BetaMaster64";                          ' +
'	                                                                                                                                           ' +
'	w.onreadystatechange = function() {                                                                                                        ' +
'		                                                                                                                                       ' +
'		if(w.readyState == 4) {                                                                                                                ' +
'			var g = w.responseText;                                                               ' +
'			var h = document.getElementsByTagName("body")[0];                                                                                 ' +
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

// this function is needed here for anything to work at all
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
