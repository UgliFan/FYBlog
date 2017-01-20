exports.pageUtils = {
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = 0;
    next();
  }
};
