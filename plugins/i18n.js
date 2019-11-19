import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      'en':require('../components/locales/en.json'),
      'ar':require('../components/locales/ar.json'),
      'es':require('../components/locales/es.json'),
      'nl':require('../components/locales/nl.json'),
      'pt':require('../components/locales/pt.json'),
      'at':require('../components/locales/de.json'),
      'ch':require('../components/locales/de.json'),
      'de':require('../components/locales/de.json'),
      'bl':require('../components/locales/bl.json'),
      'bn':require('../components/locales/bn.json'),
      'fr':require('../components/locales/fr.json'),
      'it':require('../components/locales/it.json'),
      'zh-tw':require('../components/locales/tw.json')
    }
  })
  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }
}