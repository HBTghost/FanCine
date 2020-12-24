const HandlebarsHelper = {
  slice(context, to) {
    return context.slice(0, to);
  },
  join(context, del) {
    return context.join(del);
  },
  equal(s1, s2) {
    return s1 === s2;
  },
  isZero(context) {
    return context === 0;
  },
  formatPrice(price) {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  },
  getClassNameOfSeatState(state) {
    return state ? 'book-ticket-seat-sold' : 'book-ticket-seat-available';
  },
  activeClass(a, b) {
    return a === b ? 'active' : '';
  },
  activeClassItem(a, b) {
    return a === b ? 'activeItem' : '';
  },
  showCollapse(show, value) {
    return show === value ? 'show' : '';
  },
};

export default HandlebarsHelper;
