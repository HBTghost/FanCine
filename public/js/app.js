"use strict";

// -- SignIn - Modal initial --
var modal = document.getElementById('modal');
var parser = new DOMParser();
var redirectURL = '';
var forceLogin = false; // Disable sign in modal

function popdownModal() {
  modal.style.display = 'none';
  fetch('/isLogin').then(function (res) {
    res.text().then(function (val) {
      if (forceLogin && val === 'true') {
        window.location.reload();
      } else if (forceLogin) {
        window.location = '/';
      }
    });
  });
}

function popupModal() {
  modal.style.display = 'block';
} // When the user clicks anywhere outside of the modal, close it


window.onclick = function windowClickOff(event) {
  if (event.target === modal) {
    popdownModal();
  }
}; // -- End modal --


function renderUsernameToggle() {
  fetch('/render/header').then(function (partial) {
    partial.text().then(function (html) {
      var headerData = parser.parseFromString(html, 'text/html');
      var header = document.querySelector('#usernameToggle');
      header.innerHTML = headerData.querySelector('#usernameToggle').innerHTML;
    });
  });
}

function login(event) {
  event.preventDefault();
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': document.querySelector('#emailLogin').value,
      'password': document.querySelector('#passwordLogin').value
    })
  }).then(function (res) {
    res.json().then(function (data) {
      if (data.message) {
        alert(data.message);
      } else {
        if (redirectURL.length > 0) {
          window.location = redirectURL;
          redirectURL = '';
        }

        popdownModal();
        renderUsernameToggle();
      }
    });
  });
}

function logout(event) {
  event.preventDefault();
  fetch('/logout').then(function () {
    renderUsernameToggle();
    fetch('#').then(function (partial) {
      partial.text().then(function (text) {
        if (text === 'notAuth') {
          popupModal();
          forceLogin = true;
        }
      });
    });
  });
}

function forceLoginAndRedirect(url) {
  redirectURL = url;
  fetch('/isLogin').then(function (res) {
    res.text().then(function (val) {
      if (val === 'false') {
        popupModal();
      } else {
        window.location = url;
      }
    });
  });
}