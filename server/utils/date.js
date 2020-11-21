function toDateString(date) {
  let dateString = date.toISOString().slice(0, 10);
  let props = dateString.split('-').reverse();
  return props.join('-');
}

export {
  toDateString
}