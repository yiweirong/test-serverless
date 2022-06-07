import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import translationEN from './public/locales/en/translation.json'
import translationZH from './public/locales/zh/translation.json'

// the translations
const resources = {
  "en-US": {
    translation: translationEN
  },
  "zh-CN": {
    translation: translationZH
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en-US',
    fallbackLng: ["en-US", "zh-CN"],
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n