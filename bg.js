
 // Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php)

var isTurnedOn = true;//manipulated only by popup.js, tells if player is turned on

var conskey = "f657b5b61a6b1f13503a134eb88f5933";//api-key
var audio = null; //to use globally as javascript audio
var playing;//current play state
var thisTrack; //current track's title and info
var thisIndex; //points to currently playing track within myList
var lastIndex; //points to total number of tracks in the list
var myList = new Array(); //array containing current playlist


SC.initialize({
         client_id: conskey
});

function initRequest(){
                        hideControls(true);
                        try{
							audio.pause();
                        }catch(exception){}
                        audio = null;
                        
                        //values demanded by API
                        
                        //END values demanded by API
                        SC.get("/playlists/19824320/tracks", {limit: 70}, function(tracks) {
                        myList = tracks;
                        lastIndex = myList.length - 1;
                        //array has been successfully populated at this point
                        thisIndex = 0; //stream first url from array
                        changeTrack();
                });
}


function changeTrack(){
        audio = null;
        audio = new Audio(myList[thisIndex]['stream_url']+"?consumer_key="+conskey);
                audio.addEventListener("ended", function() {
                        next();
                });
        
        if(playing)
        audio.play();
        
        updatePopup();
        hideControls(false);
}


function play(){
        if(audio == null){
        initRequest()
        return null; //no audio loaded
        }
        
        if(playing)
                audio.pause();
        else
                audio.play();
        playing = !playing;//flip the playing variable
        return playing;
}

function next(){
    try{
                audio.pause();
        }catch(exception){}
        audio = null;
        if(thisIndex >= lastIndex)
                initRequest();
        else
        {
                thisIndex++;
                changeTrack();
        }
        return true;
}

function prev(){
        if(thisIndex > 0){
            try{
                audio.pause();
                }catch(exception){}
            audio = null;
                
                thisIndex--;
                changeTrack();
                return true;
        }
        else
        return false;
}
function getTotal() {
                        try{
                          return audio.duration;
                        }catch(exception){
                          return "N/A";
                        }
       }
           
function updatePopup(){
        var popups = chrome.extension.getViews({type: "popup"});
        if (popups.length != 0) {
          var popup = popups[0];
          //methods on popup

                        try{
                          popup.document.getElementById('status').innerText = myList[thisIndex]['title'];
                          popup.document.getElementById('playlist').innerText = (thisIndex+1) + "/" + (lastIndex+1);
                          //popup.document.getElementById('duration').innerText = getTotal();
                          }catch(exception){}



  }
}

function hideControls(hide){
var popups = chrome.extension.getViews({type: "popup"});
        if (popups.length != 0) {
          var popup = popups[0];
                if(hide){
                        popup.document.getElementById('status').innerText = "Loading..."
                        popup.document.getElementById('iconmenu').style.display = "none";
                }
                else{
                        popup.document.getElementById('iconmenu').style.display = "block";
                }
          }
}


function getPercentProg() {//NOT IN use
   var endBuf = audio.buffered.end(0);
   var soFar = parseInt(((endBuf / audio.duration) * 100));
   return soFar + '%';
}

function killAudio(){

 try{
	audio.src = "";
 }catch(exception){}
 audio = null;

}