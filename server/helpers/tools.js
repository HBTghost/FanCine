function randomIntMinMax(min, max) {
  return parseInt(min + Math.random() * (max - min), 10);
}

function randomIntMax(max) {
  return randomIntMinMax(0, max);
}

export {
  randomIntMinMax,
  randomIntMax,
};
