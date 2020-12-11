"use strict";

// Database
var tickets = [{
  name: 'Phổ thông',
  description: 'Dành cho mọi đối tượng.',
  unitPrice: 80000
}, {
  name: 'Học sinh/Sinh viên',
  description: 'Chỉ dành cho học sinh và sinh viên.',
  unitPrice: 75000
}, {
  name: 'VIP',
  description: 'Chỉ dành cho thành viên VIP.',
  unitPrice: 70000
}];
var combos = [{
  image: 'https://www.galaxycine.vn/media/2020/5/19/combo-1_1589871759174.jpg',
  name: 'Combo 1 Large',
  description: '1 Bắp + 1 Nước ngọt 32 Oz',
  unitPrice: 72000
}, {
  image: 'https://www.galaxycine.vn/media/2020/5/19/combo-2_1589871763789.jpg',
  name: 'Combo 2 Small',
  description: '1 Bắp + 2 Nước ngọt 22 Oz',
  unitPrice: 81000
}]; // HTML Elements

var availableTicketsNumElement = document.getElementById('book-ticket-available-tickets-num');
var ticketRowNumElements = document.querySelectorAll('#book-ticket-ticket-box .book-ticket-list .book-ticket-data-row .book-ticket-quantity');
var ticketRowTotalPriceElements = document.querySelectorAll('#book-ticket-ticket-box .book-ticket-list .book-ticket-data-row .book-ticket-total-price-cell');
var ticketTotalPriceElement = document.querySelector('#book-ticket-ticket-box .book-ticket-list .book-ticket-total-row .book-ticket-total-price-cell');
var comboRowNumElements = document.querySelectorAll('#book-ticket-food-box .book-ticket-list .book-ticket-data-row .book-ticket-quantity');
var comboRowTotalPriceElements = document.querySelectorAll('#book-ticket-food-box .book-ticket-list .book-ticket-data-row .book-ticket-total-price-cell');
var comboTotalPriceElement = document.querySelector('#book-ticket-food-box .book-ticket-list .book-ticket-total-row .book-ticket-total-price-cell');
var totalPriceElement = document.querySelector('#book-ticket-info-box .book-ticket-total-price span');
var ticketDecBtnElements = document.querySelectorAll('#book-ticket-ticket-box .book-ticket-list .book-ticket-decrease-btn');
var ticketIncBtnElements = document.querySelectorAll('#book-ticket-ticket-box .book-ticket-list .book-ticket-increase-btn');
var comboDecBtnElements = document.querySelectorAll('#book-ticket-food-box .book-ticket-list .book-ticket-decrease-btn');
var comboIncBtnElements = document.querySelectorAll('#book-ticket-food-box .book-ticket-list .book-ticket-increase-btn');
var infoTicketElement = document.querySelector('#book-ticket-info-box .book-ticket-showtime-info-ticket');
var infoComboElement = document.querySelector('#book-ticket-info-box .book-ticket-showtime-info-combo');
var infoSeatElement = document.querySelector('#book-ticket-info-box .book-ticket-showtime-info-seat'); // Info

var ticketNames = tickets.map(function (ticket) {
  return ticket.name;
});
var comboNames = combos.map(function (combo) {
  return combo.name;
});
var ticketUnitPrices = tickets.map(function (ticket) {
  return ticket.unitPrice;
});
var comboUnitPrices = combos.map(function (combo) {
  return combo.unitPrice;
});
var ticketRowNums = Array(tickets.length).fill(0);
var ticketRowTotalPrices = Array(tickets.length).fill(0);
var ticketTotalPrice = 0;
var comboRowNums = Array(combos.length).fill(0);
var comboRowTotalPrices = Array(combos.length).fill(0);
var comboTotalPrice = 0;
var availableTicketsNum = availableTicketsNumElement.innerHTML;
var totalPrice = 0; // Functions

function formatPriceVND(priceInt) {
  return priceInt.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND'
  });
}

function init() {
  ticketRowNumElements.forEach(function (e) {
    e.innerHTML = 0;
  });
  ticketRowTotalPriceElements.forEach(function (e) {
    e.innerHTML = formatPriceVND(0);
  });
  ticketTotalPriceElement.innerHTML = formatPriceVND(0);
  comboRowNumElements.forEach(function (e) {
    e.innerHTML = 0;
  });
  comboRowTotalPriceElements.forEach(function (e) {
    e.innerHTML = formatPriceVND(0);
  });
  comboTotalPriceElement.innerHTML = formatPriceVND(0);
  totalPriceElement.innerHTML = formatPriceVND(0);
}

function getTicketInfo() {
  var str = '';

  for (var i = 0; i < ticketRowNums.length; ++i) {
    if (ticketRowNums[i] > 0) {
      str += "".concat(ticketNames[i], " (").concat(ticketRowNums[i], "), ");
    }
  }

  return str;
}

function getComboInfo() {
  var str = '';

  for (var i = 0; i < comboRowNums.length; ++i) {
    if (comboRowNums[i] > 0) {
      str += "".concat(comboNames[i], " (").concat(comboRowNums[i], "), ");
    }
  }

  return str;
} // Events


ticketIncBtnElements.forEach(function (e, i) {
  e.addEventListener('click', function () {
    if (availableTicketsNum > 0) {
      availableTicketsNum -= 1;
      ticketRowNums[i] += 1;
      ticketRowTotalPrices[i] += ticketUnitPrices[i];
      ticketTotalPrice += ticketUnitPrices[i];
      totalPrice += ticketUnitPrices[i];
      ticketRowNumElements[i].innerHTML = ticketRowNums[i];
      ticketRowTotalPriceElements[i].innerHTML = formatPriceVND(ticketRowTotalPrices[i]);
      ticketTotalPriceElement.innerHTML = formatPriceVND(ticketTotalPrice);
      totalPriceElement.innerHTML = formatPriceVND(totalPrice);
      availableTicketsNumElement.innerHTML = availableTicketsNum;
      infoTicketElement.innerHTML = getTicketInfo();
    }
  });
});
comboIncBtnElements.forEach(function (e, i) {
  e.addEventListener('click', function () {
    comboRowNums[i] += 1;
    comboRowTotalPrices[i] += comboUnitPrices[i];
    comboTotalPrice += comboUnitPrices[i];
    totalPrice += comboUnitPrices[i];
    comboRowNumElements[i].innerHTML = comboRowNums[i];
    comboRowTotalPriceElements[i].innerHTML = formatPriceVND(comboRowTotalPrices[i]);
    comboTotalPriceElement.innerHTML = formatPriceVND(comboTotalPrice);
    totalPriceElement.innerHTML = formatPriceVND(totalPrice);
    infoComboElement.innerHTML = getComboInfo();
  });
});
ticketDecBtnElements.forEach(function (e, i) {
  e.addEventListener('click', function () {
    if (ticketRowNums[i] > 0) {
      availableTicketsNum += 1;
      ticketRowNums[i] -= 1;
      ticketRowTotalPrices[i] -= ticketUnitPrices[i];
      ticketTotalPrice -= ticketUnitPrices[i];
      totalPrice -= ticketUnitPrices[i];
      ticketRowNumElements[i].innerHTML = ticketRowNums[i];
      ticketRowTotalPriceElements[i].innerHTML = formatPriceVND(ticketRowTotalPrices[i]);
      ticketTotalPriceElement.innerHTML = formatPriceVND(ticketTotalPrice);
      totalPriceElement.innerHTML = formatPriceVND(totalPrice);
      availableTicketsNumElement.innerHTML = availableTicketsNum;
      infoTicketElement.innerHTML = getTicketInfo();
    }
  });
});
comboDecBtnElements.forEach(function (e, i) {
  e.addEventListener('click', function () {
    if (comboRowNums[i] > 0) {
      comboRowNums[i] -= 1;
      comboRowTotalPrices[i] -= comboUnitPrices[i];
      comboTotalPrice -= comboUnitPrices[i];
      totalPrice -= comboUnitPrices[i];
      comboRowNumElements[i].innerHTML = comboRowNums[i];
      comboRowTotalPriceElements[i].innerHTML = formatPriceVND(comboRowTotalPrices[i]);
      comboTotalPriceElement.innerHTML = formatPriceVND(comboTotalPrice);
      totalPriceElement.innerHTML = formatPriceVND(totalPrice);
      infoComboElement.innerHTML = getComboInfo();
    }
  });
});

(function main() {
  init();
})();