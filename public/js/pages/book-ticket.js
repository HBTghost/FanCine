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
}]; // HTML elements
// Ticket Food section

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
var comboIncBtnElements = document.querySelectorAll('#book-ticket-food-box .book-ticket-list .book-ticket-increase-btn'); // Seat seaction

var mandatorySeatsNumElement = document.querySelector('#book-ticket-mandatory-seats-num');
var seatItemElements = document.querySelectorAll('#book-ticket-seat-room-sec .book-ticket-seat-auditorium .book-ticket-seat-area .book-ticket-seat-row .book-ticket-seat-item'); // Info section

var infoTicketElement = document.querySelector('#book-ticket-info-box .book-ticket-showtime-info-ticket');
var infoComboElement = document.querySelector('#book-ticket-info-box .book-ticket-showtime-info-combo');
var infoSeatElement = document.querySelector('#book-ticket-info-box .book-ticket-showtime-info-seat');
var ticketfoodBoxElement = document.querySelector('#book-ticket-ticketfood-box');
var seatBoxElement = document.querySelector('#book-ticket-seat-box');
var checkoutBoxElement = document.querySelector('#book-ticket-checkout-box');
var infoBackBtnElement = document.querySelector('#book-ticket-info-box .book-ticket-info-btn-row .book-ticket-info-back-btn');
var infoContinueBtnElement = document.querySelector('#book-ticket-info-box .book-ticket-info-btn-row .book-ticket-info-continue-btn'); // Checkout section

var checkoutTimerElement = document.querySelector('#book-ticket-remaining-time-value');
var checkoutBackBthElement = document.querySelector('#book-ticket-checkout-back-btn');
var checkoutPayBthElement = document.querySelector('#book-ticket-checkout-pay-btn');
var checkoutTotalPriceFieldElement = document.querySelector('#book-ticket-checkout-total-price'); // Global variables

var myScreen = Object.freeze({
  TICKETFOOD: 0,
  SEAT: 1,
  CHECKOUT: 2
});
var curScreen = myScreen.TICKETFOOD;
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
var totalPrice = 0;
var mandatorySeatsNum = 0;
var selectedSeats = [];
var countdownID;
var countdownMinutes = 1;
var seatStateClassName = Object.freeze({
  SELECTED: 'book-ticket-seat-selected',
  SOLD: 'book-ticket-seat-sold',
  AVAILABLE: 'book-ticket-seat-available'
});
var btnCursorClassName = Object.freeze({
  POINTER: 'book-ticket-btn-pointer',
  DROP_ON: 'book-ticket-btn-drop-on'
}); // Functions

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

function getPrettierInfoStr(infoStr) {
  return infoStr.slice(0, infoStr.lastIndexOf(','));
}

function getTicketInfo() {
  var str = '';

  for (var i = 0; i < ticketRowNums.length; ++i) {
    if (ticketRowNums[i] > 0) {
      str += "".concat(ticketNames[i], " (").concat(ticketRowNums[i], "), ");
    }
  }

  return getPrettierInfoStr(str);
}

function getComboInfo() {
  var str = '';

  for (var i = 0; i < comboRowNums.length; ++i) {
    if (comboRowNums[i] > 0) {
      str += "".concat(comboNames[i], " (").concat(comboRowNums[i], "), ");
    }
  }

  return getPrettierInfoStr(str);
}

function getSeatInfo() {
  selectedSeats.sort();
  var str = '';

  for (var i = 0; i < selectedSeats.length; ++i) {
    str += "".concat(selectedSeats[i], ", ");
  }

  return getPrettierInfoStr(str);
}

function getNameOfSeatItemElement(e) {
  return e.firstElementChild.innerHTML + e.lastElementChild.innerHTML;
}

function getPrettierTime(seconds) {
  var mins = parseInt(seconds / 60, 10).toString();
  var secs = (seconds % 60).toString();

  if (mins.length === 1) {
    mins = "0".concat(mins);
  }

  if (secs.length === 1) {
    secs = "0".concat(secs);
  }

  return "".concat(mins, ":").concat(secs);
}

function countdown(minutes) {
  var timer = 60 * minutes;
  checkoutTimerElement.innerHTML = getPrettierTime(timer);
  countdownID = setInterval(function () {
    if (timer === 0) {
      clearInterval(countdownID);
      alert("Giao d\u1ECBch th\u1EA5t b\u1EA1i v\xEC \u0111\xE3 h\u1EBFt th\u1EDDi gian giao d\u1ECBch cho ph\xE9p (".concat(countdownMinutes, " ph\xFAt)!"));
      window.location = '/';
    } else {
      timer -= 1;
      checkoutTimerElement.innerHTML = getPrettierTime(timer);
    }
  }, 1000);
} // Events
// Ticket Food section


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
}); // Seat section

seatItemElements.forEach(function (e) {
  e.addEventListener('click', function () {
    if (e.classList.contains(seatStateClassName.AVAILABLE)) {
      if (mandatorySeatsNum > 0) {
        mandatorySeatsNum -= 1;
        e.classList.remove(seatStateClassName.AVAILABLE);
        e.classList.add(seatStateClassName.SELECTED);
        mandatorySeatsNumElement.innerHTML = mandatorySeatsNum;
        selectedSeats.push(getNameOfSeatItemElement(e));
        infoSeatElement.innerHTML = getSeatInfo();
      } else {
        alert('Đã hết số lượng vé!\nVui lòng quay lại để đặt thêm vé, hoặc tiếp tục để xác nhận thanh toán.');
      }
    } else if (e.classList.contains(seatStateClassName.SELECTED)) {
      mandatorySeatsNum += 1;
      e.classList.add(seatStateClassName.AVAILABLE);
      e.classList.remove(seatStateClassName.SELECTED);
      mandatorySeatsNumElement.innerHTML = mandatorySeatsNum;
      selectedSeats.splice(selectedSeats.indexOf(getNameOfSeatItemElement(e)), 1);
      infoSeatElement.innerHTML = getSeatInfo();
    }
  });
}); // Info section

infoContinueBtnElement.addEventListener('click', function () {
  switch (curScreen) {
    case myScreen.TICKETFOOD:
      mandatorySeatsNum = ticketRowNums.reduce(function (a, b) {
        return a + b;
      }, 0);

      if (mandatorySeatsNum > 0) {
        curScreen = myScreen.SEAT;
        ticketfoodBoxElement.style.display = 'none';
        seatBoxElement.style.display = 'block';
        infoBackBtnElement.style.display = 'block';
        mandatorySeatsNumElement.innerHTML = mandatorySeatsNum;
      } else {
        alert('Phải chọn số lượng vé để tiếp tục.');
      }

      break;

    case myScreen.SEAT:
      if (mandatorySeatsNum === 0) {
        countdown(countdownMinutes);
        curScreen = myScreen.CHECKOUT;
        seatBoxElement.style.display = 'none';
        checkoutBoxElement.style.display = 'block';
        infoBackBtnElement.style.display = 'none';
        infoContinueBtnElement.style.display = 'none';
        checkoutTotalPriceFieldElement.value = formatPriceVND(totalPrice);
      } else {
        alert("Ph\u1EA3i ch\u1ECDn \u0111\u1EE7 s\u1ED1 gh\u1EBF \u0111\xE3 \u0111\u1EB7t \u0111\u1EC3 ti\u1EBFp t\u1EE5c.\nVui l\xF2ng ch\u1ECDn th\xEAm ".concat(mandatorySeatsNum, " v\u1ECB tr\xED n\u1EEFa."));
      }

      break;

    default:
      document.body.innerHTML = "book-ticket.js - infoContinueBtnElement's click event";
  }
});
infoBackBtnElement.addEventListener('click', function () {
  if (curScreen === myScreen.SEAT) {
    curScreen = myScreen.TICKETFOOD;
    ticketfoodBoxElement.style.display = 'block';
    seatBoxElement.style.display = 'none';
    infoBackBtnElement.style.display = 'none'; // Reset the class name for all of seat items

    seatItemElements.forEach(function (e) {
      if (e.classList.contains(seatStateClassName.SELECTED)) {
        e.classList.remove(seatStateClassName.SELECTED);
        e.classList.add(seatStateClassName.AVAILABLE);
      }
    }); // Reset the selected seat info

    selectedSeats = [];
    infoSeatElement.innerHTML = '';
  }
}); // Checkout section

checkoutBackBthElement.addEventListener('click', function () {
  clearInterval(countdownID);
  curScreen = myScreen.SEAT;
  checkoutBoxElement.style.display = 'none';
  seatBoxElement.style.display = 'block';
  infoBackBtnElement.style.display = 'block';
  infoContinueBtnElement.style.display = 'block';
});
checkoutPayBthElement.addEventListener('click', function () {
  clearInterval(countdownID);
  fetch('/api/sessions/insertOne', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      _idShowtime: window.location.href.slice(window.location.href.lastIndexOf('/') + 1),
      ticketInfo: getTicketInfo(),
      comboInfo: getComboInfo(),
      seatInfo: getSeatInfo(),
      totalPrice: totalPrice,
      paymentMethod: document.querySelector('#book-ticket-checkout-payment-method').children[parseInt(document.querySelector('#book-ticket-checkout-payment-method').value, 10)].innerHTML
    })
  });
  alert('Thanh toán thành công!\nĐể xem lại thông tin chi tiết của giao dịch này, click OK, sau đó vui lòng truy cập vào phần "Lịch sử giao dịch".');
  forceLoginAndRedirect('/member/transaction-history');
});

function main() {
  init();
}

main();