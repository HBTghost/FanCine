const Helper = {
  slice(context, to) {
    return context.slice(0, to);
  },
  join(context, del) {
    return context.join(del);
  },
  isZero(context) {
    return context === 0;
  },
  formatPrice(price) {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  },
};

export default Helper;
