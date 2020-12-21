// ===== HTML Elements =====
const infoBtnElement = document.querySelector('#mem-info-btn');
const historyBtnElement = document.querySelector('#mem-history-btn');

const infoTabElement = document.querySelector('#mem-info-tab');
const historyTabElement = document.querySelector('#mem-history-tab');

const transactionsGridElement = document.querySelector('.mem-history-section');
const transactionItemElements = document.querySelectorAll('.mem-history-item');
const historyInfoTimeElements = document.querySelectorAll(
  '.mem-history-item .mem-history-item-info-time',
);

const historyStartDateElement = document.querySelector('#mem-history-head-item-start');
const historyEndDateElement = document.querySelector('#mem-history-head-item-end');
const historyOrderElement = document.querySelector('#mem-history-head-item-order');
const historySelectedOrderElement = document.querySelector('#mem-history-order-opt-index');
const historyTimezoneOffsetMiliElement = document.querySelector(
  '#mem-history-head-item-timezone-offset-mili',
);

// ===== Functions =====
function displayInfoTab() {
  infoBtnElement.classList.add('mem-nav-btn-selected');
  historyBtnElement.classList.remove('mem-nav-btn-selected');
  infoTabElement.style.display = 'block';
  historyTabElement.style.display = 'none';
}

function displayHistoryTab() {
  historyBtnElement.classList.add('mem-nav-btn-selected');
  infoBtnElement.classList.remove('mem-nav-btn-selected');
  historyTabElement.style.display = 'block';
  infoTabElement.style.display = 'none';

  if (transactionItemElements.length === 0) {
    document.querySelector('.mem-history-tab-empty').style.display = 'block';
    document.querySelector('.mem-history-tab-not-empty').style.display = 'none';
  } else {
    document.querySelector('.mem-history-tab-empty').style.display = 'none';
    document.querySelector('.mem-history-tab-not-empty').style.display = 'block';
  }
}

function initValuesForHistoryForm() {
  // Timezone offset
  historyTimezoneOffsetMiliElement.value = new Date().getTimezoneOffset() * 60 * 1000;

  // Default dates
  if (historyStartDateElement.value === '') {
    const d = new Date();
    historyStartDateElement.value = `${d.getFullYear()}-01-01`;
    historyEndDateElement.value = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    historyOrderElement.value = 0;
  }

  // Selected order type
  if (historySelectedOrderElement.innerHTML !== '') {
    const optionElements = document.querySelectorAll('.mem-history-head-item-order-opt');
    optionElements[
      historySelectedOrderElement.innerHTML.charCodeAt(0) - '0'.charCodeAt(0)
    ].setAttribute('selected', 'true');
  }
}

function turnOnAlertSave() {
  window.onbeforeunload = () => true;
}

function turnOffAlertSave() {
  window.onbeforeunload = () => null;
}

// ===== Events handling =====
infoBtnElement.addEventListener('click', () => {
  window.location = '/member/info';
});

historyBtnElement.addEventListener('click', () => {
  window.location = '/member/transaction-history';
});

transactionItemElements.forEach((e) => {
  e.addEventListener('mouseenter', () => {
    e.classList.add('mem-history-item-hover');
  });

  e.addEventListener('mouseleave', () => {
    e.classList.remove('mem-history-item-hover');
  });

  e.addEventListener('click', () => {
    window.open(`/member/transaction-history/${e.firstElementChild.innerHTML}`);
  });
});

historyInfoTimeElements.forEach((e) => {
  e.innerHTML = new Date(e.innerHTML).toLocaleString('en-GB');
});

// Main
switch (document.querySelector('#mem-nav-active-tab').innerHTML) {
  case '0':
    displayInfoTab();
    break;
  case '1':
    displayHistoryTab();
    initValuesForHistoryForm();
    break;
  default:
    displayInfoTab();
}
