"use strict";

// -- SignIn - Modal initial --
var modalBtn = document.getElementById('signIn');
var modal = document.getElementById('modal');
var closeModal = document.getElementById('close-Modal');
var redirectURL = ''; // Disable sign in modal

function popdownModal() {
  modal.style.display = 'none';
}

function popupModal() {
  modal.style.display = 'block';
} // When the user clicks the signIn, open the modal


modalBtn.onclick = function signInClick() {
  popupModal();
}; // When the user clicks on <span> (x), close the modal


closeModal.onclick = function closeModalClick() {
  popdownModal();
}; // When the user clicks anywhere outside of the modal, close it


window.onclick = function windowClickOff(event) {
  if (event.target === modal) {
    popdownModal();
  }
}; // -- End modal --


var parser = new DOMParser();

function renderHeader() {
  fetch('/render/header').then(function (partial) {
    partial.text().then(function (html) {
      var headerData = parser.parseFromString(html, 'text/html');
      var header = document.querySelector('.sticky-top');
      header.innerHTML = headerData.querySelector('.sticky-top').innerHTML;
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
  }).then(function () {
    if (redirectURL.length > 0) {
      window.location = redirectURL;
      redirectURL = '';
    }

    popdownModal();
    renderHeader();
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