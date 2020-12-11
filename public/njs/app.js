// -- SignIn - Modal initial --
const modal = document.getElementById('modal');
const parser = new DOMParser();
let redirectURL = '';
let forceLogin = false;

// Disable sign in modal
function popdownModal() {
  fetch('/isLogin').then((res) => {
    res.text().then((val) => {
      if (forceLogin && val === 'true') {
        window.location.reload();
      } else if (forceLogin) {
        window.location = '/';
      }
    });
  });
  modal.style.display = 'none';
}
function popupModal() {
  modal.style.display = 'block';
}
function popupLogin() {
  popupModal();
  $('#modal a[href="#nav-sign-in"]').tab('show');
}
function popupRegister() {
  popupModal();
  $('#modal a[href="#nav-sign-up"]').tab('show');
}
function popupForgot() {
  document.querySelector('#nav-forgot-tab').style.display = 'block';
  popupModal();
  $('#modal a[href="#nav-forgot"]').tab('show');
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
        renderUsernameToggle();
        popdownModal();
      }
    });
  });
}

function showVerify() {
  document.querySelector('#nav-verify-tab').style.display = 'block';
  $('#modal a[href="#nav-verify"]').tab('show');
}

function register(event) {
  event.preventDefault();
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'name': document.querySelector('#name').value,
      'email': document.querySelector('#regEmail').value,
      'password': document.querySelector('#regPassword').value,
      'password2': document.querySelector('#regPassword2').value,
      'phone': document.querySelector('#regPhone').value,
      'DoB': document.querySelector('#regBirthday').value,
      'sex': document.querySelector('#regGender').value,
      'address': document.querySelector('#regAddress').value,
      'city': document.querySelector('#regCity').value,
      'town': document.querySelector('#regTown').value,
    }),
  }).then((res) => {
    res.json().then((data) => {
      if (data.success_msg) {
        alert(data.success_msg);
        showVerify();
      } else {
        alert(data.msg);
      }
    });
  });
}

function logout(event) {
  event.preventDefault();
  fetch('/logout').then((res) => {
    res.json().then((data) => {
      renderUsernameToggle();
      fetch(`${data.curTab}/checkAuth`).then((partial) => {
        partial.text().then((text) => {
          if (text === 'notAuth') {
            popupModal();
            forceLogin = true;
          }
        });
      });
    });
  });
}

function showForgot(event) {
  event.preventDefault();
  document.querySelector('#nav-forgot-tab').style.display = 'block';
  $('#modal a[href="#nav-forgot"]').tab('show');
}

function showReset() {
  document.querySelector('#nav-reset-tab').style.display = 'block';
  $('#modal a[href="#nav-reset"]').tab('show');
}

function hideUnused() {
  document.querySelector('#nav-verify-tab').style.display = 'none';
  document.querySelector('#nav-forgot-tab').style.display = 'none';
  document.querySelector('#nav-reset-tab').style.display = 'none';
}

function forgot(event) {
  event.preventDefault();
  fetch('/forgot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': document.querySelector('#forgotEmail').value,
    }),
  }).then((res) => {
    res.json().then((data) => {
      if (data.success_msg) {
        alert(data.success_msg);
        showReset();
      } else {
        alert(data.msg);
      }
    });
  });
}

function resetPasswordForm(event) {
  event.preventDefault();
  const token = document.querySelector('#resetToken').value;
  fetch(`/forgot/${token}`).then((res) => {
    res.json().then((data) => {
      if (data.msg) {
        alert(data.msg);
      } else {
        fetch(`/reset/${data.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'password': document.querySelector('#resetPassword').value,
            'password2': document.querySelector('#resetPassword2').value,
          }),
        }).then((res2) => {
          res2.json().then((data2) => {
            if (data2.success_msg) {
              alert(data2.success_msg);
              $('#modal a[href="#nav-sign-in"]').tab('show');
              hideUnused();
            } else {
              alert(data2.msg);
            }
          });
        });
      }
    });
  });
}

function verify(event) {
  event.preventDefault();
  const token = document.querySelector('#verifyToken').value;
  fetch(`/activate/${token}`).then((res) => {
    res.json().then((data) => {
      if (data.msg) {
        alert(data.msg);
      } else {
        alert(data.success_msg);
        $('#modal a[href="#nav-sign-in"]').tab('show');
        hideUnused();
      }
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
