"use strict";

// -- SignIn - Modal initial --
var loginW = null;
var registerW = null;
var activateW = null;
var forgotW = null;
var resetW = null;
var modal = document.getElementById('modal');
var parser = new DOMParser();
var redirectURL = '';
var forceLogin = false; // Spinner

var spinnerModal = document.getElementsByClassName('spinner-modal')[0];

function enableSpinner() {
  spinnerModal.style.display = 'block';
}

function disableSpinner() {
  spinnerModal.style.display = 'none';
} // Disable sign in modal


function popdownModal() {
  fetch('/isLogin').then(function (res) {
    res.text().then(function (val) {
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
  enableSpinner();
  event.preventDefault();
  $('#loginBtn').attr('disabled', 'disabled');
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': document.querySelector('#emailLogin').value,
      'password': document.querySelector('#passwordLogin').value,
      'g-recaptcha-response': grecaptcha.getResponse(loginW)
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

        renderUsernameToggle();
        popdownModal();
      }
    });
  }).finally(function () {
    grecaptcha.reset(loginW);
    $('#loginBtn').removeAttr('disabled');
    disableSpinner();
  });
}

function showVerify() {
  document.querySelector('#nav-verify-tab').style.display = 'block';
  $('#modal a[href="#nav-verify"]').tab('show');
}

function register(event) {
  enableSpinner();
  event.preventDefault();
  $('#registerBtn').attr('disabled', 'disabled');
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
      'g-recaptcha-response': grecaptcha.getResponse(registerW)
    })
  }).then(function (res) {
    res.json().then(function (data) {
      if (data.success_msg) {
        alert(data.success_msg);
        showVerify();
      } else {
        alert(data.message);
      }
    });
  }).finally(function () {
    grecaptcha.reset(registerW);
    $('#registerBtn').removeAttr('disabled');
    disableSpinner();
  });
}

function logout(event) {
  enableSpinner();
  event.preventDefault();
  fetch('/logout').then(function (res) {
    res.json().then(function (data) {
      renderUsernameToggle();
      fetch("".concat(data.curTab, "/checkAuth")).then(function (partial) {
        partial.text().then(function (text) {
          if (text === 'notAuth') {
            popupModal();
            forceLogin = true;
          }
        });
      });
    });
  }).finally(function () {
    disableSpinner();
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
  enableSpinner();
  event.preventDefault();
  $('#forgotBtn').attr('disabled', 'disabled');
  fetch('/forgot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': document.querySelector('#forgotEmail').value,
      'g-recaptcha-response': grecaptcha.getResponse(forgotW)
    })
  }).then(function (res) {
    res.json().then(function (data) {
      if (data.success_msg) {
        alert(data.success_msg);
        showReset();
      } else {
        alert(data.message);
      }
    });
  }).finally(function () {
    grecaptcha.reset(forgotW);
    $('#forgotBtn').removeAttr('disabled');
    disableSpinner();
  });
}

function resetPasswordForm(event) {
  enableSpinner();
  event.preventDefault();
  $('#resetBtn').attr('disabled', 'disabled');
  var token = document.querySelector('#resetToken').value;
  fetch("/forgot/".concat(token), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'g-recaptcha-response': grecaptcha.getResponse(resetW)
    })
  }).then(function (res) {
    res.json().then(function (data) {
      if (data.message) {
        alert(data.message);
        grecaptcha.reset(resetW);
        $('#resetBtn').removeAttr('disabled');
      } else {
        fetch("/reset/".concat(data.id), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'password': document.querySelector('#resetPassword').value,
            'password2': document.querySelector('#resetPassword2').value
          })
        }).then(function (res2) {
          res2.json().then(function (data2) {
            if (data2.success_msg) {
              alert(data2.success_msg);
              $('#modal a[href="#nav-sign-in"]').tab('show');
              hideUnused();
            } else {
              alert(data2.message);
            }
          });
        });
      }
    });
  }).finally(function () {
    grecaptcha.reset(resetW);
    $('#resetBtn').removeAttr('disabled');
    disableSpinner();
  });
}

function verify(event) {
  enableSpinner();
  event.preventDefault();
  $('#activateBtn').attr('disabled', 'disabled');
  var token = document.querySelector('#verifyToken').value;
  fetch("/activate/".concat(token), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'g-recaptcha-response': grecaptcha.getResponse(activateW)
    })
  }).then(function (res) {
    res.json().then(function (data) {
      if (data.message) {
        alert(data.message);
      } else {
        alert(data.success_msg);
        $('#modal a[href="#nav-sign-in"]').tab('show');
        hideUnused();
      }
    });
  }).finally(function () {
    grecaptcha.reset(activateW);
    $('#activateBtn').removeAttr('disabled');
    disableSpinner();
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
} // --- Client side provinces Handler --


function districtLoad() {
  var provincesHTML = document.getElementById('regCity');
  var districtHTML = document.getElementById('regTown');
  districtHTML.innerHTML = '';
  arr[provincesHTML.value].forEach(function (district, index) {
    var pID = index;
    var pName = district;
    var innerDistrict = "<option value=\"".concat(pID, "\">").concat(pName, "</option>"); // const provinceElement = document.createElement(innerProvince);

    districtHTML.insertAdjacentHTML('beforeend', innerDistrict);
  });
  districtHTML.disabled = false;
}

function districtLoadProfile() {
  var provincesHTML = document.getElementById('mem-info-province');
  var districtHTML = document.getElementById('mem-info-district');
  var currentUserDistrict = document.querySelector('#mem-info-district option:first-child').value;
  districtHTML.innerHTML = '';
  arr[provincesHTML.value].forEach(function (district, index) {
    var pID = index;
    var pName = district;
    var innerDistrict = "<option value=\"".concat(pID, "\">").concat(pName, "</option>"); // const provinceElement = document.createElement(innerProvince);

    districtHTML.insertAdjacentHTML('beforeend', innerDistrict);
  });
  var selectUserCurrent = document.querySelector("#mem-info-district option[value=\"".concat(currentUserDistrict, "\"]"));

  if (selectUserCurrent) {
    selectUserCurrent.selected = true;
  }

  districtHTML.disabled = false;
}

function provincesDisplay() {
  var provincesHTML = document.getElementById('regCity');
  var districtHTML = document.getElementById('regTown');
  var provincesProfileHTML = document.getElementById('mem-info-province');
  var districtProfileHTML = document.getElementById('mem-info-district');
  fetch('/isLogin').then(function (islogRes) {
    return islogRes.json();
  }).then(function (islogin) {
    if (!islogin) {
      if (provincesHTML) {
        districtHTML.disabled = true;
        c.forEach(function (provin, ID) {
          var pID = ID;
          var pName = provin;
          var innerProvince = "<option value=\"".concat(pID, "\">").concat(pName, "</option>"); // const provinceElement = document.createElement(innerProvince);

          provincesHTML.insertAdjacentHTML('beforeend', innerProvince);
        });
      }
    }
  });

  if (provincesProfileHTML) {
    districtProfileHTML.disabled = false;
    c.forEach(function (provin, ID) {
      if ("".concat(ID) === document.querySelector('#mem-info-province option:first-child').value) {
        document.querySelector('#mem-info-province option:first-child').label = provin;
        districtLoadProfile();
        return;
      }

      var pID = ID;
      var pName = provin;
      var innerProvince = "<option value=\"".concat(pID, "\">").concat(pName, "</option>"); // const provinceElement = document.createElement(innerProvince);

      provincesProfileHTML.insertAdjacentHTML('beforeend', innerProvince);
    });
  }
}

function CaptchaCallback() {
  var siteKey = '6LcxngkaAAAAAO-aKP2yGehcIFJ8bIXHiJ6awbZB';
  loginW = grecaptcha.render('loginCaptcha', {
    'sitekey': siteKey
  });
  registerW = grecaptcha.render('registerCaptcha', {
    'sitekey': siteKey
  });
  activateW = grecaptcha.render('activateCaptcha', {
    'sitekey': siteKey
  });
  forgotW = grecaptcha.render('forgotCaptcha', {
    'sitekey': siteKey
  });
  resetW = grecaptcha.render('resetCaptcha', {
    'sitekey': siteKey
  });
}