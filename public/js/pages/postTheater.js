"use strict";

function updateMap() {
  var result;
  result = "https://www.google.com/maps/embed?pb=".concat(document.getElementById('mapEmbedID').value);
  document.getElementById('Map').src = result;
}