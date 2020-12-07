// -- SignIn - Modal initial --
const modal = document.getElementById('modal');
const parser = new DOMParser();
let redirectURL = '';
let forceLogin = false;

// Disable sign in modal
function popdownModal() {
  modal.style.display = 'none';
  fetch('/isLogin').then((res) => {
    res.text().then((val) => {
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
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function windowClickOff(event) {
  if (event.target === modal) {
    popdownModal();
  }
};
// -- End modal --

function renderUsernameToggle() {
  fetch('/render/header').then((partial) => {
    partial.text().then((html) => {
      const headerData = parser.parseFromString(html, 'text/html');
      const header = document.querySelector('#usernameToggle');
      header.innerHTML = headerData.querySelector('#usernameToggle').innerHTML;
    });
  });
}

function login(event) {
  event.preventDefault();
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': document.querySelector('#emailLogin').value,
      'password': document.querySelector('#passwordLogin').value,
    }),
  }).then((res) => {
    res.json().then((data) => {
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
  fetch('/logout').then(() => {
    renderUsernameToggle();
    fetch('#').then((partial) => {
      partial.text().then((text) => {
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
  fetch('/isLogin').then((res) => {
    res.text().then((val) => {
      if (val === 'false') {
        popupModal();
      } else {
        window.location = url;
      }
    });
  });
}
