// ===== HTML Elements =====
const infoBtnElement = document.querySelector('#mem-info-btn');
const historyBtnElement = document.querySelector('#mem-history-btn');

const infoTabElement = document.querySelector('#mem-info-tab');
const historyTabElement = document.querySelector('#mem-history-tab');

const sessionsGridElement = document.querySelector('.mem-history-section');
const sessionItemElements = document.querySelectorAll('.mem-history-item');

// ===== Events handling =====
infoBtnElement.addEventListener('click', () => {
  infoBtnElement.classList.add('mem-nav-btn-selected');
  historyBtnElement.classList.remove('mem-nav-btn-selected');

  infoTabElement.style.display = 'block';
  historyTabElement.style.display = 'none';
});

historyBtnElement.addEventListener('click', () => {
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

sessionItemElements.forEach((e) => {
  e.addEventListener('mouseenter', () => {
    e.classList.add('mem-history-item-hover');
  });

  e.addEventListener('mouseleave', () => {
    e.classList.remove('mem-history-item-hover');
  });

  e.addEventListener('click', () => {
    window.open(`session/${e.firstElementChild.innerHTML}`);
  });
});
