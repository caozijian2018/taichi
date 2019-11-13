import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      'en':require('~/locales/en.json'),
      'ar':require('~/locales/ar.json'),
      'es':require('~/locales/es.json'),
      'nl':require('~/locales/nl.json'),
      'pt':require('~/locales/pt.json'),
      'at':require('~/locales/de.json'),
      'ch':require('~/locales/de.json'),
      'de':require('~/locales/de.json'),
      'bl':require('~/locales/bl.json'),
      'bn':require('~/locales/bn.json'),
      'fr':require('~/locales/fr.json'),
      'it':require('~/locales/it.json'),
      'zh-tw':require('~/locales/tw.json')
    }
  })
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }
}