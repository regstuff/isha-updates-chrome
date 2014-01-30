// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "webkitNotifications.requestPermission" beforehand).
*/

function show() {
    var notification = window.webkitNotifications.createNotification(
    'images/48.png',                      // The image.
    'Isha Kriya Reminder', // The title.
    'I am not the body, I am not even the mind.'      // The body.
  );
  notification.show();
 if (JSON.parse(localStorage.autodismiss)) {
 setTimeout(function(){
	notification.cancel();
},10000);
};
notification.onclick = function () {
      window.open("http://ishakriya.com");
    };
}


// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = false; 
  localStorage.autodismiss = false;  // The display activation.
  localStorage.blogupdates = true;  // Isha Blog updates.
  localStorage.frequency = 60;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
  localStorage.latesttitle = ""; // Initialize latest blogpost title.
  localStorage.badgedisplay = "new"; // Initialize badge text.
}

// Test for notification support.
if (window.webkitNotifications) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
      show();
      interval = 0;
    }
  }, 60000);
}


