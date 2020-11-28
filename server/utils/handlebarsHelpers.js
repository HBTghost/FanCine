const Helper = {
  slice(context, to) {
    return context.slice(0, to);
  },
  join(context, del) {
    return context.join(del);
  },
  clickMe(context) {
    return `console.log('${context}');`;
  },
};

export default Helper;
