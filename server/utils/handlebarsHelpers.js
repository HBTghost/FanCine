const Helper = {
  slice(context, to) {
    return context.slice(0, to);
  },
  join(context, del) {
    return context.join(del);
  },
};

export default Helper;
