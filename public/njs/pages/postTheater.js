function updateMap() {
  let result;
  result = `https://www.google.com/maps/embed?pb=${document.getElementById('mapEmbedID').value}`;
  document.getElementById('Map').src = result;
}
