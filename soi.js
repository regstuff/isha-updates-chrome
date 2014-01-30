// Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php) 

var bgp = chrome.extension.getBackgroundPage();//all function calls to background page are done thru thsi variable
  
  document.addEventListener('DOMContentLoaded', function () {//wait till DOM loads before referencing any elements
  document.getElementById('play').addEventListener('click', playAction);//event listener for play button
  document.getElementById('next').addEventListener('click', nextAction);//event listener for next button
  document.getElementById('prev').addEventListener('click', prevAction);//event listener for prev button
   
  changeImage(bgp.playing);//to change image to playing/paused icon
  bgp.updatePopup();//fetches & updates different pieces of info to be displayed

});

function playAction(){
	bgp.play();
	changeImage(bgp.playing);
}
function nextAction(){
    bgp.next();
	changeImage(bgp.playing);
}
function prevAction(){
    bgp.prev();
	changeImage(bgp.playing);
}

function changeImage(isPlaying){
	if(isPlaying)
	document.getElementById('play').setAttribute("src", "pause.png");
	else
	document.getElementById('play').setAttribute("src", "play.png");
}

