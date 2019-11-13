import Vue from "vue"
Vue.filter("first10", (val) => {
  return val.length > 25 ? val.substring(0, 25) + '...' : val;
});
Vue.filter("last10", (val) => {
  if (process.browser) {
    return innerWidth > 400 ? val : val.substring(0, 7) + '...';
  }
});
