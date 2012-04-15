// ==UserScript==
// @name          AB Manga Autofill
// @include       *animebyt.es/torrents.php?action=editgroup&groupid=*
// @include		  *animebyt.es/upload.php*
// ==/UserScript==

var ab_manga_autofill = {};
ab_manga_autofill.init = function() {
	var script = document.getElementById('ab_manga_autofill');
	if (script) {
		return;
	}
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "http://mangadump.com/js/manga_autofill.js";
	script.id = 'ab_manga_autofill';
	var foot = document.getElementById('footer');
	foot.appendChild(script);
};
ab_manga_autofill.checkLoaded = function () {
	if (document.readyState == "complete")
	  ab_manga_autofill.init();
	 else if (window.addEventListener)
	  window.addEventListener("load", ab_manga_autofill.init, false);
	else if (window.attachEvent)
	  window.attachEvent("onload", ab_manga_autofill.init);
	else
	  window.onload = ab_manga_autofill.init;
};
ab_manga_autofill.checkLoaded();
  