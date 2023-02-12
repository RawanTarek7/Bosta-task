import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationEn from './en/en.json'
import translationAr from './ar/ar.json'
import Backend from "i18next-http-backend";
import format from "../services/i18n-format";


const resources = {
    en: {
        translation: translationEn
    },
    ar: {
        translation: translationAr
    }
};
i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        lng: "en",
        fallbackLng: "en",
        debug: false,
        resources,
        defaultNS: "translation",
        interpolation: {
            escapeValue: false,
            format,

        },
    })
;

export default i18n;