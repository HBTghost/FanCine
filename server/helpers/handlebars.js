const HandlebarsHelper = {
  slice(context, to) {
    return context.slice(0, to);
  },
  join(context, del) {
    return context.join(del);
  },
  isZero(context) {
    return context === 0;
  },
};

export default HandlebarsHelper;
