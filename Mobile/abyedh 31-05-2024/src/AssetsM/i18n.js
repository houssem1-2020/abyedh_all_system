import i18n from 'i18next';

import { initReactI18next } from 'react-i18next'; // Correct import

 
import TunisieTrans from "./Translations/tunisieTrans"
import HindiTrans from './Translations/hindiTrans';
import ChinaTrans from './Translations/chinaTrans';
import USTrans from './Translations/englishTrans';
import UKTrans from './Translations/unitedKindomTrans';
import SATrans from './Translations/saudiArabiaTrans';
import RussiaTrans from './Translations/russiaTrans';
import QatarTrans from './Translations/qatarTrans';
import MarrocTrans from './Translations/marrocTrans';
import JapanTrans from './Translations/japanTrans';
import ItaliaTrans from './Translations/italiaTrans';
import GermanyTrans from './Translations/germanyTrans';
import FrancaisTrans from './Translations/francaisTrans';
import EATrans from './Translations/emaratesTrans';
import EgyptTrans from './Translations/egyptTrans';
import CanadaTrans from './Translations/canadaTrans';

i18n
  .use(initReactI18next) // Use initReactI18next instead of reactI18nextModule
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'ar_TN',
    //debug: true,
    saveMissing : true, 
    
    resources : {
       ar : TunisieTrans,
      'ar_TN' : TunisieTrans ,
      'ar_MA' : MarrocTrans ,
      'ar_EG' : EgyptTrans ,
      'ar_QA' : QatarTrans ,
      'ar_SA' : SATrans ,
      'ar_AE' : EATrans ,
      'en_US' : USTrans ,
      'en_CA' : CanadaTrans ,
      'en_GB' : UKTrans ,
      'fr_FR' : FrancaisTrans ,
      'it_IT' : ItaliaTrans ,
      'de_DE' : GermanyTrans ,
      ru : RussiaTrans ,
      ja : JapanTrans ,
      hi : HindiTrans ,
      'zh_CN' : ChinaTrans ,

      // ar : TunisieTrans,
      // 'ar_TN' : TunisieTrans ,
      // 'ar_MA' : TunisieTrans, //MarrocTrans ,
      // 'ar_EG' : TunisieTrans, //EgyptTrans ,
      // 'ar_QA' : TunisieTrans, //QatarTrans ,
      // 'ar_SA' : TunisieTrans, //SATrans ,
      // 'ar_AE' : TunisieTrans, //EATrans ,
      // 'en_US' : FrancaisTrans, //USTrans ,
      // 'en_CA' : FrancaisTrans, //CanadaTrans ,
      // 'en_GB' : FrancaisTrans, //UKTrans ,
      // 'fr_FR' : FrancaisTrans ,
      // 'it_IT' : FrancaisTrans, //ItaliaTrans ,
      // 'de_DE' : FrancaisTrans, //GermanyTrans ,
      // ru : FrancaisTrans, //RussiaTrans ,
      // ja : FrancaisTrans, //JapanTrans ,
      // hi : FrancaisTrans, //HindiTrans ,
      // 'zh_CN' : FrancaisTrans, //ChinaTrans ,
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
