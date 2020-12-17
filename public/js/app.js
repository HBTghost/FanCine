"use strict";

// -- SignIn - Modal initial --
var modal = document.getElementById('modal');
var parser = new DOMParser();
var redirectURL = '';
var forceLogin = false; // Disable sign in modal

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
      'town': document.querySelector('#regTown').value
    })
  }).then(function (res) {
    res.json().then(function (data) {
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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': document.querySelector('#forgotEmail').value
    })
  }).then(function (res) {
    res.json().then(function (data) {
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
  var token = document.querySelector('#resetToken').value;
  fetch("/forgot/".concat(token)).then(function (res) {
    res.json().then(function (data) {
      if (data.msg) {
        alert(data.msg);
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
  var token = document.querySelector('#verifyToken').value;
  fetch("/activate/".concat(token)).then(function (res) {
    res.json().then(function (data) {
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
} // --- Server side provinces Handler ---
// function districtLoad() {
//   const provincesHTML = document.getElementById('regCity');
//   const districtHTML = document.getElementById('regTown');
//   fetch(`getProvince/${provincesHTML.value}/District`, {
//     method: 'POST',
//   })
//     .then((resp) => resp.json())
//     .then(
//       (data) => {
//         districtHTML.innerHTML = '';
//         data.forEach((district) => {
//           const pID = district.ID;
//           const pName = district.Title;
//           const innerDistrict = `<option value="${pID}">${pName}</option>`;
//           // const provinceElement = document.createElement(innerProvince);
//           districtHTML.insertAdjacentHTML('beforeend', innerDistrict);
//         });
//         districtHTML.disabled = false;
//       },
//     );
// }
// function districtLoadProfile() {
//   const provincesHTML = document.getElementById('mem-info-province');
//   const districtHTML = document.getElementById('mem-info-district');
//   fetch(`getProvince/${provincesHTML.value}/District`, {
//     method: 'POST',
//   })
//     .then((resp) => resp.json())
//     .then(
//       (data) => {
//         const currentUserDistrict = document.querySelector('#mem-info-district option:first-child').value;
//         districtHTML.innerHTML = '';
//         data.forEach((district) => {
//           const pID = district.ID;
//           const pName = district.Title;
//           const innerDistrict = `<option value="${pID}">${pName}</option>`;
//           // const provinceElement = document.createElement(innerProvince);
//           districtHTML.insertAdjacentHTML('beforeend', innerDistrict);
//         });
//         const selectUserCurrent = document.querySelector(`#mem-info-district option[value="${currentUserDistrict}"]`);
//         if (selectUserCurrent) { selectUserCurrent.selected = true; }
//         districtHTML.disabled = false;
//       },
//     );
// }
// function provincesDisplay() {
//   const provincesHTML = document.getElementById('regCity');
//   const districtHTML = document.getElementById('regTown');
//   const provincesProfileHTML = document.getElementById('mem-info-province');
//   const districtProfileHTML = document.getElementById('mem-info-district');
//   fetch('getProvinces', {
//     method: 'POST',
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       fetch('isLogin')
//         .then((islogRes) => islogRes.json())
//         .then((islogin) => {
//           if (!islogin) {
//             if (provincesHTML) {
//               districtHTML.disabled = true;
//               data.forEach((provin) => {
//                 const pID = provin.ID;
//                 const pName = provin.Title;
//                 const innerProvince = `<option value="${pID}">${pName}</option>`;
//                 // const provinceElement = document.createElement(innerProvince);
//                 provincesHTML.insertAdjacentHTML('beforeend', innerProvince);
//               });
//             }
//           }
//         });
//       if (provincesProfileHTML) {
//         districtProfileHTML.disabled = false;
//         data.forEach((provin) => {
//           if (`${provin.ID}` === document.querySelector('#mem-info-province option:first-child').value) {
//             document.querySelector('#mem-info-province option:first-child').label = provin.Title;
//             districtLoadProfile();
//             return;
//           }
//           const pID = provin.ID;
//           const pName = provin.Title;
//           const innerProvince = `<option value="${pID}">${pName}</option>`;
//           // const provinceElement = document.createElement(innerProvince);
//           provincesProfileHTML.insertAdjacentHTML('beforeend', innerProvince);
//         });
//       }
//     });
// }