import store from "../store"
export default (lang_) => {
  if (process.browser) {
    var lang;
    if (lang_) {
      localStorage.lang = lang_;
      lang = lang_;
    } else {
      lang = localStorage.lang;
    }
    store().commit('setLang', lang);
    // alert(store().state.locale)
    // alert(store().getters.getLang+"getlangggg");

  }
}
