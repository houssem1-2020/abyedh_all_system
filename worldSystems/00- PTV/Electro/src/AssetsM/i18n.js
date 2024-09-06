import i18n from 'i18next';
import Backend from 'i18next-locize-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next'; // Correct import


import HindiTrans from './Translations/hindiTrans';
import ChinaTrans from './Translations/chinaTrans';
import USTrans from './Translations/unitesStateTrans';
import RussiaTrans from './Translations/russiaTrans';
import JapanTrans from './Translations/japanTrans';
import ItaliaTrans from './Translations/italiaTrans';
import GermanyTrans from './Translations/germanyTrans';
import FrancaisTrans from './Translations/francaisTrans';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // Use initReactI18next instead of reactI18nextModule
  .init({
    fallbackLng: 'en_US',
    //debug: true,
    saveMissing : true, 
    
    resources : {
      //ar : TunisieTrans,
      //'ar_TN' : TunisieTrans ,
      //'ar_MA' : MarrocTrans ,
      //'ar_EG' : EgyptTrans ,
      //'ar_QA' : QatarTrans ,
      //'ar_SA' : SATrans ,
      //'ar_AE' : EATrans ,
      'en_US' : USTrans ,
      //'en_CA' : CanadaTrans ,
      //'en_GB' : UKTrans ,
      'fr_FR' : FrancaisTrans ,
      'it_IT' : ItaliaTrans ,
      'de_DE' : GermanyTrans ,
      ru : RussiaTrans ,
      ja : JapanTrans ,
      hi : HindiTrans ,
      'zh_CN' : ChinaTrans ,
    },

    // backend : {
    //     projectId : 'f35317e0-7929-4900-b24b-c9e44c5d33b1',
    //     apiKey : '62258421-2dd8-4162-b2a7-622393522123',
    //     ns: ['translation'],
    //     defaultNS: 'translation',
    // },

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true,
    },
  });

export default i18n;
