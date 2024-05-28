import AsyncStorage from "@react-native-async-storage/async-storage";

import AbyedhADIL from './ADIL'
import dirItem from './Item'
import AbyedhASIL from './ASIL';
import SeoTags from './seoTags';

const GetUID = async () =>{
    // const UserLoggedIn = (localStorage.getItem('UserData') !== null);
    // if (UserLoggedIn)  { 
    //     return {Logged:true, UData : JSON.parse(localStorage.getItem('UserData'))} } 
    // else { return {Logged:false, UData : {} }}
    const UserLoggedIn = await AsyncStorage.getItem('UserData');
  if (UserLoggedIn)  { return {Logged:true, UData :  JSON.parse(UserLoggedIn)} } 
  else { return {Logged:false, UData : {} }}

}

const GetCountry = () =>{
    // const CountrySelected = (localStorage.getItem('country') !== null);
    // if (CountrySelected)  { 
    //     return localStorage.getItem('country') } 
    // else { return  false}
    return 'FR'
}

const GConf = {
    // main variables
    ADIL:AbyedhADIL,
    ASIL:AbyedhASIL,
    Items : dirItem,
    SeoTags : SeoTags,
    //abyedhMap : TunMap,
    Country : GetCountry(),
    UserData : GetUID(),
    SoketLink : 'https://api.abyedh.com/api/application', //https://api.abyedh.com/api/application
    ApiLink : 'https://api.abyedh.com/api/application/Search', //https://api.abyedh.com/api/application
    ApiProfileLink : 'https://api.abyedh.com/api/application/Profile', //https://api.abyedh.com/api/application
    ApiToolsLink : 'https://api.abyedh.com/api/application/Tools', //https://api.abyedh.com/api/application

    themeColor : '#dc3545',
    TostErrorGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: "🚫"
    },
    TostSuucessGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    },
    TostInternetGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    },

    // LeafleftIcon : {
    //     iconUrl: require('leaflet/dist/images/position.gif'),
    //     iconRetinaUrl: require('leaflet/dist/images/position.gif'),
    //     iconSize: [10,10],
    //     shadowSize: [0,0],
    //     shadowUrl: '',
    //     shadowSize:   [0,0],
    //     iconAnchor:   [0,0],
    //     shadowAnchor: [0,0],
    //     popupAnchor:  [0,0]
    // },
    // LeafleftIconP : {
    //     iconUrl: require('leaflet/dist/images/position-personal.gif'),
    //     iconRetinaUrl: require('leaflet/dist/images/position-personal.gif'),
    //     iconSize: [10,10],
    //     shadowSize: [0,0],
    //     shadowUrl: '',
    //     shadowSize:   [0,0],
    //     iconAnchor:   [0,0],
    //     shadowAnchor: [0,0],
    //     popupAnchor:  [0,0]
    // },

    ProfileNavsData : [
        {id:1, name:"Acceuil", icon:"house", link:"ma"},
        {id:2, name:"Suivie", icon:"repeat", link:"sv"},
        {id:3, name:"Pannier", icon:"balloon-heart", link:"fv"},
        {id:4, name:"Documment", icon:"folder-symlink", link:"dc"},
        // {id:5, name:"Calendrier", icon:"calendar2-week", link:"cl"},
        {id:6, name:"Setting", icon:"gear", link:"st"},
    ] ,

    Tools:{
        blog:{themeColor:'#3b4882', imgAds:'' , textAds:'التطبيق هذا عبارة عن موسوعة شاملة لمختلف العلميات الأدراية التونسيسة و كيفاش تتم العمليات هاذي باش ترتح المواطنين من الحيرة اللي دور في ريوسهم و تعاونهم باش يجاوبو علي مختلف تساءلاتهم'},
        products:{themeColor:'#d91a33', imgAds:'' , textAds:'التطبيق هذا عبارة عن موسوعة شاملة لمختلف  المنتجات اللي تنجم تلقاهي في السوق التونسي سواء كانت متجات محلية و لا منتجات مستوردة . تلقي فيه المعلومات الكافية اللي تعاونك علي شراء منتج معين '},
        sport:{themeColor:'#8dd673', imgAds:'' , textAds:'التطبيق هذا هو تطبيق رياضي الهدف منو هو التعريف بالمجال الرياضي في تونس في مختلف أنواع الرياضات و متابعة الأدوار التونسية كدور كأس تونس لكرة القدم . كما تهدف لمتابعة الأحداث الرياضية العالمية التي يشارك فيها التونسيين  '},
        art:{themeColor:'#d469b9', imgAds:'' , textAds:'التطبيق هذا عبارة عن موسوعة فنية لمختلف الأعمال و الشخصيات الفنية التونسية , تنجم تلقي فيها فنانين , ممثلين , قاعدة بيانات المسلسلات و الأفلام التونسية '},
        Touristique:{themeColor:'#52cf00', imgAds:'' , textAds:'التطبيق هذا الهدف منو هو التعريف بالسياحة التونسية علي كامل تراب الجمهورية , التطبيق يتطرق لكل أنواع السياحة الداخلية و الساحلية و يقدم كذلك موسوعة لمختلف الأماكن اللي يمكن زيارتها في منطقة معينة  '},
        Jurdique:{themeColor:'#282e2e', imgAds:'' , textAds:' ديما نحسو أنو النصوص  و القضايا القانونية معقدة و متشعبة و لا يمكن فهمها و عدم معرفة الشخص لحقوقو يخليه يتعرض للظلم و يسكت , لذلك التطبيق هذا موجود باش ينحيلك اللبس هذا و يعاونك تفهم القانون في تونس '},

        taxi:{themeColor:'#c6bb0c', imgAds:'' , textAds:'تلوج في تاكسي ؟ تحب تاخو موعد مع تاكسي ؟ تحب تعرف سعر رحلة عبر تاكسي ؟ تحب تربح الوقت و ما تبقاش تستنا برشا ؟ انت في المكان المناسب : منصة ابيض للتاكسي'},
        Louage:{themeColor:'#5ab7d6', imgAds:'' , textAds:'التطبيق هذا هي وجهة محطات النقل البري علي الانترنت , تعطيك جميع المعلومات علي الرحلات المتوفرة و تمكنك من إنك تحجز مكانك في الرحلة باش ترتحك من برشا تعب و تضييع وقت و جهد ...'},
        public:{themeColor:'#04c6ce', imgAds:'' , textAds:'التطبيق هذا عبارة عن موسوعة شاملة لمختلف وسائل النقل العمومي التونسية , تحتوي أوقات جميع الوسائل من قطار و حافلة و مترو و طائرة ...بالإظافة إلي خريطة الرحلات و متتبع يعطيك مكان الوسيلة علي الخريطة'},
        Automobile:{themeColor:'#f73528', imgAds:'' , textAds:'التطبيق هذا يعلمك كيفاش تتعامل مع السيارات بداية من وقت شرائها حيث تلقي فيه كل أنواع السيارات , وتلقي كذلك سيارات مستعملة , و حتي بعد شرائها من خلال موسوعة نصائح للتعامل مع مختلف القطع و حالات العطب   '},

        Etude:{themeColor:'#6f92d9', imgAds:'' , textAds:'التطبيق هذا تلقي فيه أستاذ دروس خصوصية حسب الجهة اللي أنت فيها و حسب المادة اللي تحب تقوي روحك فيها , التطبيق يمكنك أنك تابع الحصص متاعك و تابع كذلك كل جديد أو تقدم في الدروس'},
        ProgramScolair:{themeColor:'#a30b4b', imgAds:'' , textAds:'التطبيق هذا يساعد الأستاذ أنو يجهز الدروس متاعو لأنو يحتوي علي البرامج السنوية الرسمية للجمهورية التونسية و ينجم يعاون التلميذ في تقييم مستواه في محور معين من خلال أسئلة تقييمية  '},
        LivreScolair:{themeColor:'#bab21c', imgAds:'' , textAds:'التطبيق هذا تلقي فيه جميع الكتب المدرسية الرسمية بصيغة PDF . الصيغة الرقمية تساعدك علي متابعة دروسك من أي مكان دون الحاجة للتقيد بالنسخة الورقية  '},
        Devoirat:{themeColor:'#a30b4b', imgAds:'' , textAds:'التطبيق هذا هو تطبيق إخباري و لكنو  لا ينتاول الأخبار بشكل تقليدي , التطبيق يتعامل فقط مع الأخبار المحلية المرتبطة بمنطقة معينة , بمعني تلقي فيه الأخبار المتعلقة بالجهة متاعك فقط '},

        Renting:{themeColor:'#6f92d9', imgAds:'' , textAds:'التطبيق هذا  عبارة عن وسيط عقاري يعاونك أنك تلقي المنزل و إلا المكتب و إلا أي عقار أخر تبحث عليه , في المقابل أصحاب العقارات ينجمو يعرفو بعقاراتهم من خلال تحميل المعلومات اللازمة عنها   ...'},
        
        Salaire:{themeColor:'#2c9da3', imgAds:'' , textAds:'التطبيق هذا هو منصة لمقارنة الأجور الشهرية في مختلف القطاعات المهنية حسب المهنة و الخبرة و عدد سنوات العمل مع المؤسسة , تمكنك المنصة من تخميين الأجر المناسب الذي تستحقه في ميدان عملك   ...'},
        Jobs:{themeColor:'#349925', imgAds:'' , textAds:'التطبيق هذا محرك بحث ذو إتجاهين : الإتجاه الأول نحو الموارد البشرية حيث يساعد الشركات للتعرف علي الموارد المناسبة و الإتجاه الثاني نحو الشركات اللي توفر مواطن شغل , حيث تستفيد منها الموارد البشرية'},
 
        news:{themeColor:'#a30b4b', imgAds:'' , textAds:'التطبيق هذا هو تطبيق إخباري و لكنو  لا ينتاول الأخبار بشكل تقليدي , التطبيق يتعامل فقط مع الأخبار المحلية المرتبطة بمنطقة معينة , بمعني تلقي فيه الأخبار المتعلقة بالجهة متاعك فقط '},
        Forum:{themeColor:'#2891c9', imgAds:'' , textAds:'التطبيق هذا هو تطبيق إخباري و لكنو  لا ينتاول الأخبار بشكل تقليدي , التطبيق يتعامل فقط مع الأخبار المحلية المرتبطة بمنطقة معينة , بمعني تلقي فيه الأخبار المتعلقة بالجهة متاعك فقط '},
        Data:{themeColor:'#007bff', imgAds:'' , textAds:'التطبيق هذا عبارة عن موسوعة شاملة لمختلف وسائل النقل العمومي التونسية , تحتوي أوقات جميع الوسائل من قطار و حافلة و مترو و طائرة ...بالإظافة إلي خريطة الرحلات و متتبع يعطيك مكان الوسيلة علي الخريطة'},
        Calendrier:{themeColor:'#04c6ce', imgAds:'' , textAds:'التطبيق هذا عبارة عن موسوعة شاملة لمختلف وسائل النقل العمومي التونسية , تحتوي أوقات جميع الوسائل من قطار و حافلة و مترو و طائرة ...بالإظافة إلي خريطة الرحلات و متتبع يعطيك مكان الوسيلة علي الخريطة'},
        AgritTools:{themeColor:'#265e61', imgAds:'' , textAds:'التطبيق هذا هي وجهة محطات النقل البري علي الانترنت , تعطيك جميع المعلومات علي الرحلات المتوفرة و تمكنك من إنك تحجز مكانك في الرحلة باش ترتحك من برشا تعب و تضييع وقت و جهد ...'},
        Camping:{themeColor:'#265e61', imgAds:'' , textAds:'التطبيق هذا هي وجهة محطات النقل البري علي الانترنت , تعطيك جميع المعلومات علي الرحلات المتوفرة و تمكنك من إنك تحجز مكانك في الرحلة باش ترتحك من برشا تعب و تضييع وقت و جهد ...'},
        Story:{themeColor:'#265e61', imgAds:'' , textAds:'التطبيق هذا هي وجهة محطات النقل البري علي الانترنت , تعطيك جميع المعلومات علي الرحلات المتوفرة و تمكنك من إنك تحجز مكانك في الرحلة باش ترتحك من برشا تعب و تضييع وقت و جهد ...'},
        Invitation:{themeColor:'#265e61', imgAds:'' , textAds:'التطبيق هذا هي وجهة محطات النقل البري علي الانترنت , تعطيك جميع المعلومات علي الرحلات المتوفرة و تمكنك من إنك تحجز مكانك في الرحلة باش ترتحك من برشا تعب و تضييع وقت و جهد ...'},
        ambassade:{themeColor:'#265e61', imgAds:'' , textAds:'التطبيق هذا يعاون مواطنينا بالخارج علي التواصل الفعال و المنظم للسفارات و القنصليات الموجوذة في تونس و كذلك السفارات التونسية حول العالم من أجل تسهيل عمليات السفر و العودة للوطن ...'},
    },
}
 
export default GConf 