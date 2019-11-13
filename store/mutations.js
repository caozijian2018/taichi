export default {
  increment(state) {
    state.counter++;
  },
  setLang(state, lang) {
    state.locale = lang;
  },
  setIndex(state, index) {
    state.index = index
  },
  catePage(state, page) {
    state.cate_page = page
  },
  search(state, word) {
    state.search_word = word;
  },
  setPage(state, page) {
    state.page = page;
  }
};
