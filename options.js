// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function ghost(isDeactivated) {
  options.frequency.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.autodismiss.checked = JSON.parse(localStorage.autodismiss);
										// Autodismiss reminder.
  options.blogupdates.checked = JSON.parse(localStorage.blogupdates);
									   // Blog Updates.
  options.frequency.value = localStorage.frequency;
                                         // The display frequency, in minutes.

  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and frequency.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };
  

  options.autodismiss.onchange = function() {
    localStorage.autodismiss = options.autodismiss.checked;
  };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
  
  options.blogupdates.onchange = function() {
    localStorage.blogupdates = options.blogupdates.checked;
  };
  
});
