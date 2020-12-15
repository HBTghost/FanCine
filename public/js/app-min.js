"use strict";var modal=document.getElementById("modal"),parser=new DOMParser,redirectURL="",forceLogin=!1;function popdownModal(){fetch("/isLogin").then(function(e){e.text().then(function(e){forceLogin&&"true"===e?window.location.reload():forceLogin&&(window.location="/")})}),modal.style.display="none"}function popupModal(){modal.style.display="block"}function popupLogin(){popupModal(),$('#modal a[href="#nav-sign-in"]').tab("show")}function popupRegister(){popupModal(),$('#modal a[href="#nav-sign-up"]').tab("show")}function popupForgot(){document.querySelector("#nav-forgot-tab").style.display="block",popupModal(),$('#modal a[href="#nav-forgot"]').tab("show")}function renderUsernameToggle(){fetch("/render/header").then(function(e){e.text().then(function(e){var t=parser.parseFromString(e,"text/html");document.querySelector("#usernameToggle").innerHTML=t.querySelector("#usernameToggle").innerHTML})})}function login(e){e.preventDefault(),fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:document.querySelector("#emailLogin").value,password:document.querySelector("#passwordLogin").value})}).then(function(e){e.json().then(function(e){e.message?alert(e.message):(redirectURL.length>0&&(window.location=redirectURL,redirectURL=""),renderUsernameToggle(),popdownModal())})})}function showVerify(){document.querySelector("#nav-verify-tab").style.display="block",$('#modal a[href="#nav-verify"]').tab("show")}function register(e){e.preventDefault(),fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:document.querySelector("#name").value,email:document.querySelector("#regEmail").value,password:document.querySelector("#regPassword").value,password2:document.querySelector("#regPassword2").value,phone:document.querySelector("#regPhone").value,DoB:document.querySelector("#regBirthday").value,sex:document.querySelector("#regGender").value,address:document.querySelector("#regAddress").value,city:document.querySelector("#regCity").value,town:document.querySelector("#regTown").value})}).then(function(e){e.json().then(function(e){e.success_msg?(alert(e.success_msg),showVerify()):alert(e.msg)})})}function logout(e){e.preventDefault(),fetch("/logout").then(function(e){e.json().then(function(e){renderUsernameToggle(),fetch("".concat(e.curTab,"/checkAuth")).then(function(e){e.text().then(function(e){"notAuth"===e&&(popupModal(),forceLogin=!0)})})})})}function showForgot(e){e.preventDefault(),document.querySelector("#nav-forgot-tab").style.display="block",$('#modal a[href="#nav-forgot"]').tab("show")}function showReset(){document.querySelector("#nav-reset-tab").style.display="block",$('#modal a[href="#nav-reset"]').tab("show")}function hideUnused(){document.querySelector("#nav-verify-tab").style.display="none",document.querySelector("#nav-forgot-tab").style.display="none",document.querySelector("#nav-reset-tab").style.display="none"}function forgot(e){e.preventDefault(),fetch("/forgot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:document.querySelector("#forgotEmail").value})}).then(function(e){e.json().then(function(e){e.success_msg?(alert(e.success_msg),showReset()):alert(e.msg)})})}function resetPasswordForm(e){e.preventDefault();var t=document.querySelector("#resetToken").value;fetch("/forgot/".concat(t)).then(function(e){e.json().then(function(e){e.msg?alert(e.msg):fetch("/reset/".concat(e.id),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:document.querySelector("#resetPassword").value,password2:document.querySelector("#resetPassword2").value})}).then(function(e){e.json().then(function(e){e.success_msg?(alert(e.success_msg),$('#modal a[href="#nav-sign-in"]').tab("show"),hideUnused()):alert(e.msg)})})})})}function verify(e){e.preventDefault();var t=document.querySelector("#verifyToken").value;fetch("/activate/".concat(t)).then(function(e){e.json().then(function(e){e.msg?alert(e.msg):(alert(e.success_msg),$('#modal a[href="#nav-sign-in"]').tab("show"),hideUnused())})})}function forceLoginAndRedirect(e){redirectURL=e,fetch("/isLogin").then(function(t){t.text().then(function(t){"false"===t?popupModal():window.location=e})})}function districtLoad(){var e=document.getElementById("regCity"),t=document.getElementById("regTown");fetch("getProvince/".concat(e.value,"/District"),{method:"POST"}).then(function(e){return e.json()}).then(function(e){t.innerHTML="",e.forEach(function(e){var n=e.ID,o=e.Title,r='<option value="'.concat(n,'">').concat(o,"</option>");t.insertAdjacentHTML("beforeend",r)}),t.disabled=!1})}function districtLoadProfile(){var e=document.getElementById("mem-info-province"),t=document.getElementById("mem-info-district");fetch("getProvince/".concat(e.value,"/District"),{method:"POST"}).then(function(e){return e.json()}).then(function(e){t.innerHTML="",e.forEach(function(e){var n=e.ID,o=e.Title,r='<option value="'.concat(n,'">').concat(o,"</option>");t.insertAdjacentHTML("beforeend",r)}),t.disabled=!1})}function provincesDisplay(){var e=document.getElementById("regCity"),t=document.getElementById("regTown"),n=document.getElementById("mem-info-province"),o=document.getElementById("mem-info-district");fetch("getProvinces",{method:"POST"}).then(function(e){return e.json()}).then(function(r){fetch("isLogin").then(function(e){return e.json()}).then(function(n){n||e&&(t.disabled=!0,r.forEach(function(t){var n=t.ID,o=t.Title,r='<option value="'.concat(n,'">').concat(o,"</option>");e.insertAdjacentHTML("beforeend",r)}))}),n&&(o.disabled=!1,r.forEach(function(e){if("".concat(e.ID)===document.querySelector("#mem-info-province option:first-child").value)return document.querySelector("#mem-info-province option:first-child").label=e.Title,void districtLoadProfile();var t=e.ID,o=e.Title,r='<option value="'.concat(t,'">').concat(o,"</option>");n.insertAdjacentHTML("beforeend",r)}))})}window.onclick=function(e){e.target===modal&&popdownModal()};