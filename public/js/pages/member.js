"use strict";

// ===== HTML Elements =====
var infoBtnElement = document.querySelector('#mem-info-btn');
var historyBtnElement = document.querySelector('#mem-history-btn');
var infoTabElement = document.querySelector('#mem-info-tab');
var historyTabElement = document.querySelector('#mem-history-tab');
var sessionsGridElement = document.querySelector('.mem-history-section');
var sessionItemElements = document.querySelectorAll('.mem-history-item'); // ===== Events handling =====

infoBtnElement.addEventListener('click', function () {
  infoBtnElement.classList.add('mem-nav-btn-selected');
  historyBtnElement.classList.remove('mem-nav-btn-selected');
  infoTabElement.style.display = 'block';
  historyTabElement.style.display = 'none';
});
historyBtnElement.addEventListener('click', function () {
  historyBtnElement.classList.add('mem-nav-btn-selected');
  infoBtnElement.classList.remove('mem-nav-btn-selected');
  historyTabElement.style.display = 'block';
  infoTabElement.style.display = 'none';
});

if (sessionItemElements.length === 0) {
  document.querySelector('.mem-history-tab-empty').style.display = 'block';
  document.querySelector('.mem-history-tab-not-empty').style.display = 'none';
} else {
  document.querySelector('.mem-history-tab-empty').style.display = 'none';
  document.querySelector('.mem-history-tab-not-empty').style.display = 'block';
}

sessionItemElements.forEach(function (e) {
  e.addEventListener('mouseenter', function () {
    e.classList.add('mem-history-item-hover');
  });
  e.addEventListener('mouseleave', function () {
    e.classList.remove('mem-history-item-hover');
  });
  e.addEventListener('click', function () {
    window.open("transaction/".concat(e.firstElementChild.innerHTML));
  });
});