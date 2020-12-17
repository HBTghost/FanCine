function toDateString(date) {
  const dateString = date.toISOString().slice(0, 10);
  const props = dateString.split('-').reverse();
  return props.join('-');
}
function toBirthDate(DoB) {
  return DoB.toISOString().slice(0, 10);
}

export { toDateString, toBirthDate };
