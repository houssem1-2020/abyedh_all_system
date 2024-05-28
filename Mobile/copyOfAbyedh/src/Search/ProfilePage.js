import React, { useEffect, useRef, useState , Suspense, lazy } from 'react';
import { View, Platform, ScrollView, Text, TouchableOpacity, ActivityIndicator, Image, Animated,  FlatList , Button, Modal, StyleSheet , Dimensions, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
import GConf from '../AssetsM/generalConf';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
//import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import { format, addDays, startOfWeek } from 'date-fns';
import MapView, { Marker, Callout, PROVIDER_DEFAULT, UrlTile  } from 'react-native-maps';
 
import { Rating } from 'react-native-ratings';
import { SvgUri } from 'react-native-svg';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
 
import RBSheet from 'react-native-raw-bottom-sheet';


//Spesific List  
const DocteurSpecific = lazy(() => import('./Profile/Spesific/docteur'));
const CliniqueSpecific = lazy(() => import('./Profile/Spesific/docteur'));
const PharmacieSpecific = lazy(() => import('./Profile/Spesific/docteur'));
const InfirmierSpecific = lazy(() => import('./Profile/Spesific/docteur'));
const PublicationProfilePage = lazy(() => import('./Profile/publicationProfilePage'));
 
 



const AddComment = ({ rateValue, setRateValue, SaveRating }) => {
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  return (
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Rating
              type='star'
              ratingCount={5}
              imageSize={40}
              startingValue={0}
              onFinishRating={(rating) => setRateValue({ ...rateValue, rating: rating })}
              style={{ marginBottom: 10 }}
          />
          <TextInput
              placeholder={t('profilePage.generalData.inputCommentPlaceholderText')}
              style={{ minHeight: 60, width: '85%', borderColor: 'gray', borderWidth: 1 }}
              value={rateValue.comment}
              onChangeText={(text) => setRateValue({ ...rateValue, comment: text })}
              multiline={true}
          />
          <Button
              title={t('profilePage.generalData.saveCommentBtnText')}
              onPress={() => SaveRating()}
              style={{ width: '85%' }}
          />
      </View>
  );
}
const CommentsCard = ({ Tag, profileData, rateValue, setRateValue, SaveRating }) => {
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  const [commeningIsActive, setCommeningIsActive] = useState(false);

  const CommentPlaceholder = () => {
      return (
          <View style={{ width: '85%' }}>
              <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 9 }}>
                      <View style={{ width: '100%' }}>
                          <View style={{ width: '70%', height: 20, marginBottom: 10 }} />
                          <View style={{ width: '100%', height: 20 }} />
                      </View>
                  </View>
                  <View style={{ flex: 3, alignItems: 'center' }}>
                      <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
                          <SvgUri
                            width="80"
                            height="80"
                            uri="https://cdn.abyedh.tn/images/Search/comments.svg"
                          />
                          
                      </View>
                  </View>
              </View>
          </View>
      );
  }

  const CommentsCardI = ({ data }) => {
      return (
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                  <Image source={{ uri: `https://cdn.abyedh.tn/images/p_pic/${data.PictureId}.gif` }} style={{ width: 40, height: 40, borderRadius: 20 }} />
              </View>
              <View style={{ flex: 4, marginLeft: 10 }}>
                  <Text>{data.Name}</Text>
                  <Text style={{ color: 'grey', fontSize: 12 }}>{new Date(data.R_Date).toLocaleDateString()}</Text>
                  <Text>{data.Comment}</Text>
              </View>
          </View>
      );
  }

  const NotLoggedIn = () => {
      return (
          <View style={{ flex:1,  alignItems:'center', justifyContent:'center' }}>
              <Text style={{fontFamily:'Droid', textAlign:'center'}} >قم بالتسجيل لتتمكن من تقييم العميل</Text>
          </View>
      );
  }

  const NoDataCard = () => {
      return (
          <View style={{flex:1,  alignItems: 'center', justifyContent: 'center' }}>
            <SvgUri
              width="80"
              height="80"
              uri="https://cdn.abyedh.tn/images/Search/comments.svg"
            />

               
              <Text style={{fontFamily:'Droid'}} >لا توجد تعليقات</Text>
          </View>
      );
  }

  return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff',  borderWidth  : 1,  borderColor : '#ebebeb',  marginBottom: 10 }}>
            <View style={{ flexDirection:  isRTL ? 'row' : 'row-reverse',  marginBottom: 10 }}>
                <TouchableOpacity style={{ flex: 5 }} onPress={() => setCommeningIsActive(!commeningIsActive)}>
                  <Text style={{ padding: 3,   borderRadius: 5,   textAlign: 'left' }}>
                      {commeningIsActive ?   
                          <Text style={{ fontFamily:'Droid'  }}><Icon name='comment-eye-outline'  size={16} color={GConf.ADIL[Tag].themeColor} /> {t('profilePage.generalData.voirCommentText')}   </Text> 
                          : 
                          <Text style={{ fontFamily:'Droid' }}><Icon name='comment-edit-outline'  size={16} color={GConf.ADIL[Tag].themeColor} /> {t('profilePage.generalData.addCommentText')}</Text>
                      }
                    </Text>
                </TouchableOpacity>
                <View style={{ flex: 7 }}>
                    <Text style={{ fontFamily: 'Droid', fontSize: 16, textAlign: isRTL ? 'right' : 'left', color: GConf.ADIL[Tag].themeColor , fontSize: 16,   }}>{t('profilePage.generalData.commentText')}</Text>
                </View>
            </View>

            <ScrollView   style={{ maxHeight: 230 , height:120   }}>
                {commeningIsActive ? 
                    <>
                        {GConf.UserData.Logged ? 
                            <AddComment rateValue={rateValue} setRateValue={setRateValue} SaveRating={SaveRating} />
                            : 
                            <NotLoggedIn />
                        }
                    </>
                    :
                    <>
                        {profileData.rating.length !== 0 ?
                            <View>
                                {profileData.rating.map((data, index) => (
                                    <CommentsCardI key={index} data={data} />
                                ))}
                            </View>
                            :
                            <View style={{alignItems: 'center', justifyContent: 'center'}} ><NoDataCard /></View>
                        }
                    </>
                }    
            </ScrollView>
        </View>
    );
}
const ProfilePage = () => {
  /* ############################[Variable ]################################ */
  const route = useRoute();
  const { Tag, PID } = route.params;
  //let Tag = 'restaurant'
  //let PID =  434960665 
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  const navigation = useNavigation();
  let [rateValue,setRateValue] =useState({comment:'', rating:0})
  let [isOnTop , setIsOnTop] = useState(false)
  let [isOnTopModal , setIsOnTopModal] = useState(false)
  let [loading , setLoading] = useState(true)
  let [profileData, setProfileData] = useState({photoes:[]})
  let [isFavorite,setIsFavorite] =useState(false)
  const [selectedTab, setSelectedTab] = useState(0);
  const headerSectionHeight = 200;
  const scrollY = new Animated.Value(0)
  const refRBSheet = useRef();
  const renderTab = () => {
    switch (selectedTab) {
      case 0:
        return <MainDataCard />;
      case 1:
        return <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}><SpesificCard status={Tag}  /></Suspense>;
      case 2:
        return <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}><ActionCard status={Tag} /></Suspense>;
      case 3:
        return <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}><SuivieCard status={Tag} /></Suspense>;
      case 4:
        return <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}><PublicationProfilePage pidData={profileData} /></Suspense>;
      default:
        return <GeneralDataCard />;
    }
  };

  /* ############################[UseEffect]################################ */
  useEffect(() => {
        axios.post(`${GConf.ApiLink}/profile`, {
          tag: Tag,
          PID:PID,
        })
        .then(function (response) {
          
          setProfileData(response.data)
          setLoading(false)
          if (response.data.Activated == 'true') {
              setClientActivated(true)
          }
      })
  
      if (GConf.UserData.Logged) {
          axios.post(`${GConf.ApiProfileLink}/favorite/check-favorite`, {
              tag: Tag,
              PID:PID,
              UID: 49248498,
            })
            .then(function (response) {
              if (response.data != 0 ) {setIsFavorite(true)}
          })
      }

  },[])

  /* ############################[Functions]################################ */
  const SaveFunction = () => {

  }
  const hexToRgbA = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
  
    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  };
  const ConverColorToHsl = (color) =>{
    //"hsl(166, 87%, 24%, 0.4)"
// Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (color.length == 4) {
        r = "0x" + color[1] + color[1];
        g = "0x" + color[2] + color[2];
        b = "0x" + color[3] + color[3];
    } else if (color.length == 7) {
        r = "0x" + color[1] + color[2];
        g = "0x" + color[3] + color[4];
        b = "0x" + color[5] + color[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "% " + ", 0.6 )";

  }
  
  const stickyTop = scrollY.interpolate({
    outputRange: [-150, 0],
    inputRange: [headerSectionHeight, headerSectionHeight + 150],
    extrapolate: 'clamp'
  })
  const stickyOpacity = scrollY.interpolate({
    outputRange: [0, 1],
    inputRange: [headerSectionHeight, headerSectionHeight + 10],
    extrapolate: 'clamp'
  })

  const AddToFarite = () =>{
      if (GConf.UserData.Logged && !isFavorite ) {      
          axios.post(`${GConf.ApiProfileLink}/favorite/ajouter`, {
              PID: PID,
              UID: GConf.UserData.UData.UID,
              tag: tag,
              Name: profileData.genrale[0].Name,
          })
          .then(function (response) {
              setIsFavorite(!isFavorite)
          }).catch((error) => {
              if(error.request) {
              toast.error(<><div><h5>مشل في الإتصال </h5> </div></>, GConf.TostInternetGonf) 
              }
          });

      } 
      else if (GConf.UserData.Logged && isFavorite ) {
          axios.post(`${GConf.ApiProfileLink}/favorite/remove`, {
              PID: PID,
              UID: GConf.UserData.UData.UID,
              tag: tag,
          })
          .then(function (response) {
              setIsFavorite(!isFavorite)
          }).catch((error) => {
              if(error.request) {
              toast.error(<><div><h5>مشل في الإتصال </h5> </div></>, GConf.TostInternetGonf) 
              }
          });
      }
      else{
          toast.error(<><div><h5> قم بتسجيل الدخول  </h5> </div></>, GConf.TostInternetGonf)
      }
  }
  const SaveRating = () =>{
      if (!rateValue.rating || rateValue.rating == 0 ) { toast.error("قم بتحديد التقييم", GConf.TostErrorGonf)} 
      else if (!rateValue.comment) { toast.error("أدخل التعليق  ", GConf.TostErrorGonf)}
      else {
          console.log(rateValue)
          axios.post(`${GConf.ApiLink}/Search/add-comment`, {
              PID:PID,
              UID: GConf.UserData.UData.UID,
              rateValue: rateValue,
          })
          .then(function (response) {
              toast.success(<><div><h5>  تم   </h5> </div></>, GConf.TostInternetGonf)
          }).catch((error) => {
              if(error.request) {
              toast.error(<><div><h5>مشل في الإتصال </h5> </div></>, GConf.TostInternetGonf) 
              }
          });
      }
  }


  /* ############################[Card     ]################################ */

  /* Top */
  const ProfInfoCard = () => {
    return(<>
      <View style={{paddingHorizontal : 20, flexDirection:'row',  height : 'auto', marginBottom: 45, }}>
         
         <View style={{flex:2 , alignItems : 'center', justifyContent:'center'}} >
              <View style={{backgroundColor : 'white', width : '100%', height: 100,  borderRadius : 20, padding : 10, margin : 10, elevation : 5  }} >
                <Image 
                  source={{uri : `https://cdn.abyedh.tn/Images/Search/CIcons/${Tag}.gif`}}
                  style={{width:'100%', height:'100%'}}
                />
              </View> 
          </View>
          <View style={{flex:4 , alignItems : 'start', paddingLeft: 15,  justifyContent:'center'}} >
              <Text style={{color : 'white', fontFamily:'Droid', fontSize : 22}} numberOfLines={2} > 
                  {profileData.genrale[0].Name} 
                  <View style={{ flex: 1 , marginHorizontal : 15 }}>
                          {(profileData.genrale[0].Activated != 'true' || profileData.genrale[0].Activated === 'autoSaved') && (
                            <Icon name="check-decagram" size={20} color='white' />
                          )}
                        </View>

              </Text>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }} >
                    <View style={{ flexDirection:'row',  alignItems:'flex-start' , paddingHorizontal: 10, width:'auto', borderRadius:50, borderColor:'white',  flexGrow: 0, flexShrink: 1,  borderWidth:1}} >
                        <Text style={{color : 'white', fontFamily:'Droid', borderRightWidth :1, borderRightColor : 'white', paddingRight : 10 }} numberOfLines={1}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize : 11,  fontWeight: 'bold', marginRight: 5 }}>{profileData.genrale[0].Views_Num}</Text>
                            <Ionicons name="eye" size={11} color="white" />
                          </View>
                        </Text> 
                        <Text style={{color : 'white', fontFamily:'Droid', borderRightWidth :1, borderRightColor : 'white', paddingRight : 10,  paddingLeft : 10  }} numberOfLines={1}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize : 11,  fontWeight: 'bold', marginRight: 5 }}>{profileData.genrale[0].Likes_Num}</Text>
                            <Ionicons name="thumbs-up" size={11} color="white" />
                          </View>
                        </Text> 
                        <Text style={{color : 'white', fontFamily:'Droid',    paddingLeft : 10  }} numberOfLines={1}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize : 11,  fontWeight: 'bold', marginRight: 5 }}>3.5</Text>
                            <Ionicons name="star-half" size={11} color="white" />
                          </View>
                        </Text> 
                    </View>
                    <View style={{flex : 2, alignItems:'flex-end' }} >
                        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: isFavorite ?   'white' : 'transparent' , borderColor: 'white', borderWidth : 1,  width: 35, height: 35 ,  borderRadius: 35 / 2, overflow: 'hidden',  }}  onPress={() => setIsFavorite(!isFavorite)}  >
                            <Ionicons name={isFavorite ?   'heart' : 'heart-outline'} size={17} color={isFavorite ?   GConf.ADIL[Tag].themeColor : 'white'} />
                        </TouchableOpacity >
                    </View>
              </View> 
          </View> 
      </View> 
    </>)
  }
  const TabsList = (props) => {
    const TabsList =  [
      {id:1, iconName:'grid', indexNum : 0 },
      {id:1, iconName:'briefcase', indexNum : 1 },
      {id:1, iconName:'color-wand', indexNum : 2 },
      {id:1, iconName:'git-compare', indexNum : 3 },
      {id:1, iconName:'reader', indexNum : 4 },
    ]
    const TabsCard = (props) => {
      return(
        <TouchableOpacity
          style={{ padding: 10 , flex : 1, alignItems:'center', justifyContent:'center',}}
          onPress={() => setSelectedTab(props.data.indexNum)}
        >
          <Text
             
          >
            <Ionicons name={props.data.indexNum == selectedTab ? props.data.iconName : `${props.data.iconName}-outline`} size={25} color={props.data.indexNum == selectedTab ? GConf.ADIL[Tag].themeColor: 'grey'} />
          </Text>
        </TouchableOpacity>
      )
    }
    return(<>
      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' , alignItems:'center', justifyContent:'center', borderRadius : props.top ? 0 : 15,   marginBottom: props.top ? 10 : 30 , paddingTop: props.top ? 0 : 10,  backgroundColor :'white'  }}>
        {TabsList.map((data, index) => <TabsCard data={data} key={index} />)}
      </View> 
    </>)
  }

  /* 1  */
  const GeneralDataCard = ( ) => {
     const RenredItemData = (props) => {
      return(
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', paddingVertical: 10, }} >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                <Icon name={props.icon}  size={20} color={GConf.ADIL[Tag].themeColor} />
              </View>
              
              <Text style={{ flex: 6, fontSize: 16, textAlign: isRTL ? 'right' : 'left', color: '#888', }} >
                {profileData.genrale[0][props.dataTag] ? 
                <Text style={{fontFamily:'Droid',}} numberOfLines={1} > 
                    {profileData.genrale[0][props.dataTag]}
                    {props.forName ?
                        <View style={{ flex: 1 }}>
                          {(profileData.genrale[0].Activated != 'true' || profileData.genrale[0].Activated === 'autoSaved') && (
                            <Icon name="check-decagram" size={20} color="#1d9bf0" />
                          )}
                        </View>
                    :
                      null
                    }
                </Text> 
                : 
                 
                  <Text style={{fontFamily:'Droid', color: '#888', fontSize: 12 }}>
                    معلومة غير متوفرة حاليا
                  </Text>
                }
              </Text>
              
            </View>
      )
     }
  
    return (
      <View style={{  padding: 15,  backgroundColor: '#fff',  borderRadius: 10,  marginBottom: 10,  borderWidth  : 1,  borderColor : '#ebebeb' }} >
        <View style={{ flexDirection: isRTL ? 'row' : 'row-reverse', marginBottom: 10, }} >
          <View style={{ flex: 1 }}>
            {(profileData.genrale[0].Activated != 'true' || profileData.genrale[0].Activated === 'autoSaved') && (
              <Icon name="check-decagram" size={20} color="#1d9bf0" />
            )}
          </View>
          <View style={{ flex: 11 }}>
            <Text style={{ fontSize: 16, color: GConf.ADIL[Tag].themeColor, textAlign: isRTL ? 'right' : 'left', fontFamily: 'Droid' }} >
              {t('profilePage.generalData.generalDataText')}
            </Text>
          </View>
        </View>
            <RenredItemData dataTag='Name' icon='account-circle-outline' forName /> 
            <RenredItemData dataTag='Genre' icon='card-account-details-star-outline' /> 
            <RenredItemData dataTag='phone' icon='phone-plus' /> 
            <RenredItemData dataTag='Gouv' icon='map-marker-radius-outline' /> 
            <RenredItemData dataTag='Deleg' icon='map-marker-account-outline' /> 
            <RenredItemData dataTag='Adress' icon='map-legend' /> 
 
      </View>
    );
  };
  const CalendarCard = () => {
    const { t } = useTranslation();
    const [calendarActive, setCalendarActive] = useState(false);
  
    const defaultEvents = [];
  
    const GeneratedTime = () => {
      const curr = new Date();
      const first = startOfWeek(curr, { weekStartsOn: 0 });
      
      const TargertDateIs = (dayIndex) => {
        return format(addDays(first, dayIndex), 'yyyy-MM-dd');
      };
  
      const reternedListe = [];
      JSON.parse(profileData.horaire[0].WorkingTime).map((getData, index) =>
        reternedListe.push(
          { title: 'S1', start: `${TargertDateIs(index)}T${getData.matin.start}`, end: `${TargertDateIs(index)}T${getData.matin.end}`, display: 'background', backgroundColor: '#f5a442' },
          { title: 'S2', start: `${TargertDateIs(index)}T${getData.soir.start}`, end: `${TargertDateIs(index)}T${getData.soir.end}`, display: 'background', backgroundColor: '#001942' },
        )
      );
      return reternedListe;
    };
  
    const CheckToday = (date) => {
      return new Date().toLocaleDateString('en-US', { weekday: 'short' }) === date;
    };
  
    const CalendarSuggested = () => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayLabels = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
      
      return (
        <View>
          {days.map((day, index) => (
            <View
              key={day}
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: CheckToday(day) ?  GConf.ADIL[Tag].themeColor : '',
                
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <Text style={{fontFamily:'Droid', color: CheckToday(day) ? 'white' : GConf.ADIL[Tag].themeColor,}} >{t(`profilePage.generalData.weekDayes.${dayLabels[index]}`)}</Text>
              <Text style={{fontFamily:'Droid', color: CheckToday(day) ? 'white' : 'grey'}}>08:00 - 12:00</Text>
              <Text style={{fontFamily:'Droid', color: CheckToday(day) ? 'white' : 'grey'}} >14:00 - 18:00</Text>
            </View>
          ))}
        </View>
      );
    };
  
    return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff',  borderWidth  : 1,  borderColor : '#ebebeb' , marginBottom: 10 }}>
        <View style={{ flexDirection: isRTL ?  'row-reverse' : 'row' , marginBottom: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
            <Text style={{ color: GConf.ADIL[Tag].themeColor , fontSize: 16, fontFamily:'Droid'}}>{t('profilePage.generalData.horaireText')}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setCalendarActive(!calendarActive)}>
              <Icon name="calendar-clock-outline" size={20} color={calendarActive ? 'orange' : 'grey'} />
              {/* <Text style={{ color: calendarActive ? 'orange' : 'grey', fontSize: 20 }}>📅</Text> */}
            </TouchableOpacity>
          </View>
        </View>
        {calendarActive ? 
          <Calendar
            // markedDates={GeneratedTime().reduce((acc, event) => {
            //   acc[event.start.split('T')[0]] = { marked: true, dotColor: event.backgroundColor };
            //   return acc;
            // }, {})}
            theme={{
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
         :  
         <CalendarSuggested />
         }
      </View>
    );
  };
  const MapCard = () => {
    const { t } = useTranslation();
  
    const GetPosition = () => {
      if (loading) {
        return { latitude: 36.726, longitude: 9.965 };
      } else if (profileData.position && profileData.position[0] !== 0) {
        return { latitude: profileData.position[0], longitude: profileData.position[1] };
      } else if (profileData.genrale) {
        let selectedGouv = GConf.abyedhMap.GouvData.filter(gouvr => gouvr.value === profileData.genrale[0].Gouv);
        if (selectedGouv[0]) {
          return { latitude: selectedGouv[0].lan, longitude: selectedGouv[0].lng };
        } else {
          return { latitude: 36.80027, longitude: 10.18602 };
        }
      } else {
        return { latitude: 36.80027, longitude: 10.18602 };
      }
    };
  
    const position = {latitude :36.7881, longitude :10.1315} // GetPosition();
  
    return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff',  borderWidth  : 1,  borderColor : '#ebebeb' , marginBottom: 10 }}>
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', marginBottom: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
            <Text style={{ fontFamily:'Droid', fontSize: 16,  color: GConf.ADIL[Tag].themeColor }}>{t('profilePage.generalData.mapText')}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { /* handle map link */ }}>
              <Icon name="google-maps" size={20} color= '#eb2121' />
            </TouchableOpacity>
          </View>
        </View>
         <MapView
         provider={PROVIDER_DEFAULT}
          style={{ height: 250, zIndex: 50 , borderRadius: 10 }}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* <Marker coordinate={position}>
          <Callout>
            <View>
              <Text>{profileData.genrale ? profileData.genrale[0].Name : '...'}</Text>
              <Button title="تسجيل طلب" onPress={() => setActiveIndex(2)} />
            </View>
          </Callout>
        </Marker> */}
        <UrlTile
          urlTemplate="https://www.openstreetmap.org/#map=8/36.448/9.366"
          maximumZ={19}
        />
        </MapView> 
      </View>
    );
  }
  const ImagesCard = () => {
    const { t } = useTranslation();
    const [openImageModal, setOIM] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const width = Dimensions.get('window').width;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    const DefaultImages = [
      { src: 'https://cdn.abyedh.tn/images/required/profile-img1.gif' },
      { src: 'https://cdn.abyedh.tn/images/required/profile-img2.gif' },
      { src: 'https://cdn.abyedh.tn/images/required/profile-img3.gif' },
      { src: 'https://cdn.abyedh.tn/images/required/profile-img4.gif' },
      { src: 'https://cdn.abyedh.tn/images/required/profile-img5.gif' },
    ];
  
    const OpenModalToShowImage = (image) => {
      setSelectedImage(image);
      setOIM(true);
      refRBSheet.current.open()
    };
  
    return (
      <>
        <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff',   borderWidth  : 1,  borderColor : '#ebebeb' , marginBottom: 10 }}>
          <Text style={{fontFamily:'Droid', fontSize:16,  textAlign: isRTL ? 'right' : 'left', color: GConf.ADIL[Tag].themeColor }}>{t('profilePage.generalData.photoesText')}</Text>
          
          {profileData.photoes.length === 0 ?
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={DefaultImages}
                scrollAnimationDuration={4000}
                //onSnapToItem={(data) => console.log('current data:', data)}
                renderItem={({ item, index }) => (
    
                    <TouchableWithoutFeedback style={{width: '90%', maxHeight: 350,  backgroundColor:'red'}} onPress={() => refRBSheet.current.open()}>
                        <Image source={{uri : item.src}} style={{ width: '100%' , height: 200}} />
                    </TouchableWithoutFeedback>
                )}
            />
            :
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={profileData.photoes}
                scrollAnimationDuration={2500}
                //onSnapToItem={(data) => console.log('current data:', data)}
                renderItem={({ item, index }) => (
                       
                    <TouchableWithoutFeedback style={{width: '90%', maxHeight: 350,  backgroundColor:'red'}} onPress={() => OpenModalToShowImage(item.ImageLink)}>
                        <Image
                          source={{ uri: `https://cdn.abyedh.tn/images/Directory/${item.ImageLink}` }}
                          style={{ width: '100%', height: 250 }}
                        />
                    </TouchableWithoutFeedback>
                )}
            />

              
          }
        </View>
 
        <RBSheet 
            height = '500'
            ref={refRBSheet} 
            draggable 
            //dragOnContent  
            customStyles={{ 
              draggableIcon: {
                  backgroundColor: GConf.ADIL[Tag].themeColor,
              },
              container : {
                borderTopRightRadius : 15,
                borderTopLeftRadius : 15 , 
                padding : 7,
              }
            }} 
          style={{borderTopStartRadius : 13, borderTopRightRadius : 13}}
          >
              <Image source={{uri : 'https://cdn.abyedh.tn/images/required/profile-img1.gif'}} style={{ width: '100%' , height: 300 }} /> 
          
        </RBSheet>
      </>
    );
  };
  const ActionForSmallCard = () => {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const SettingItemCard = (props) => {
        return (
            <TouchableOpacity onPress={() => setSelectedTab(1)} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf', borderBottomWidth : props.lastIndex ? 0 : 1 }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={props.data.icon} type='font-awesome' color={GConf.ADIL[Tag].themeColor} />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: GConf.ADIL[Tag].themeColor,  fontFamily:'Droid' }}>
                        {t(`resultPage.actionTextName.${Tag}.${props.data.link}`)}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left-thin' : 'arrow-rigth-thin'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{  borderRadius :10, marginBottom: 20,  borderWidth:1, borderColor:'#dfdfdf' }}>
            {GConf.ADIL[Tag].profileBtns.slice(0, GConf.ADIL[Tag].profileBtns.length - 1).map((data, index) => (
                <SettingItemCard key={index} lastIndex={GConf.ADIL[Tag].profileBtns.length - 2 == index} data={data} />
            ))}
        </View>
    );
  }
  function MainDataCard() {
    
    return (
      <View style={{ flex: 1, height: 'auto',    }}>
         
        <GeneralDataCard />
        <CalendarCard />
        <MapCard />
        <ImagesCard />
        <CommentsCard   Tag={Tag} profileData={profileData}  rateValue={rateValue} setRateValue={setRateValue} SaveRating={SaveRating} />
        { GConf.ADIL[Tag].systemActive ?  <ActionForSmallCard /> : <></> }
        
      </View>

    );
  }

  /* 2  */
  function SpesificCard({ status }) {
      const StateCard = (props) => {
          return <Text style={{ backgroundColor: props.color }}> {props.text} </Text>;
      }
      const LoadingCard = () => (<ActivityIndicator size="large" color="#0000ff" />)
      const statusCard = React.useCallback(() => {
          switch (status) {
              case 'docteur': return <DocteurSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} /> ;
              case 'infirmier': return <InfirmierSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
              case 'pharmacie': return <PharmacieSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
              case 'clinique': return <CliniqueSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
              // Other cases...
              default:
                  return <IndefinieCard />;
          }
      }, [status]);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height : 'auto' }}>
         <Text>{statusCard()}</Text>
      </View>
    );
  }

  /* 3  */
  function ActionCard({status}) {
    const StateCard = (props) => {
        return <Text style={{ backgroundColor: props.color }}> {props.text} </Text>;
    }

    const statusCard = React.useCallback(() => {
        switch (status) {
          case 'docteur': return <DocteurSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} /> ;
          case 'infirmier': return <InfirmierSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
          case 'pharmacie': return <PharmacieSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
          case 'clinique': return <CliniqueSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            // Other cases...
            default:
                return <IndefinieCard />;
        }
    }, [status]);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height : 'auto' }}>
        <Text>{statusCard()}</Text>
      </View>
    );
  }

  /* 4  */
  function SuivieCard({status}) {
    const StateCard = (props) => {
        return <Text style={{ backgroundColor: props.color }}> {props.text} </Text>;
    }

    const statusCard = React.useCallback(() => {
        switch (status) {
          case 'docteur': return  <DocteurSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />  ;
          case 'infirmier': return <InfirmierSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
          case 'pharmacie': return <PharmacieSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
          case 'clinique': return <CliniqueSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            // Other cases...
            default:
                return <IndefinieCard />;
        }
    }, [status]);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height : 'auto' }}>
        <Text>{statusCard()}</Text>
      </View>
    );
  }
   
  return (
      <View style={{ flex: 1 , backgroundColor : hexToRgbA(GConf.ADIL[Tag].themeColor, 0.6)}}>
            <View style={{flexDirection:'row', backgroundColor: isOnTop ? GConf.ADIL[Tag].themeColor: 'transparent', padding: 20,  position: 'absolute', zIndex : 500}} >
                 <View style={{flex : 1, flexDirection:'row' ,  alignItems:'flex-start'}}>
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',  width: 28, height: 28 ,  borderRadius: 28 / 2, overflow: 'hidden',  }}  onPress={() => navigation.navigate('MainPage')}  >
                        <Ionicons name='arrow-back-outline' size={20} color="grey" />
                    </TouchableOpacity >
                    <View style={{alignItems: 'center', paddingTop: 3}}>
                        <Text numberOfLines={1} style={{marginLeft : 15, fontFamily:'Droid', fontSize:16, color:  GConf.ADIL[Tag].themeColor  }}> {loading ? null : profileData.genrale[0].Name } </Text>
                    </View>
                    
                 </View> 
                 
                 <View style={{flex : 1 , alignItems:'flex-end'}}>
                    <TouchableOpacity style={{alignItems: 'center',   marginLeft: 15,   borderRadius: 28 / 2, overflow: 'hidden',  }}  onPress={() => navigation.navigate('UserPage')}  >
                        <Image
                            source={{uri:`https://cdn.abyedh.tn/images/p_pic/05.gif`}} 
                            style={{ width: 28, height: 28 ,  borderRadius : 50 }}
                        />
                  </TouchableOpacity >
                </View> 
            </View>
             
            <Animated.View style={[styles.animatedView,{ top: stickyTop, opacity: stickyOpacity , zIndex: 400 }]}>
                <TabsList top />
            </Animated.View>

            <ScrollView   
              scrollEventThrottle={16} 
              onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}],{ useNativeDriver: false })}
               
            >
            
                <View style={{padding: 30,}} ></View>
                {loading ? <ActivityIndicator style={{height: 110}} color='white' />  : <ProfInfoCard /> }
                
                 <View style={{  paddingHorizontal : 10, paddingTop : 25, borderTopLeftRadius : 30, borderTopEndRadius : 30,    height : 'auto',   backgroundColor :'white' , }}>
 
                      <View style={{position : isOnTopModal ? 'absolute': 'fixed',}}></View><TabsList />

                      {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height : 400 }}><Text> <ActivityIndicator color={GConf.ADIL[Tag].themeColor} /> </Text></View> : renderTab() }

                      <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
                </View>

                
            </ScrollView>
            
      </View>
  );
};

 

export default ProfilePage;


const styles = StyleSheet.create({
  animatedView: {
    height: 110,
    // paddingBottom: 16,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: -150, // -150 -> 0
    left: 0,
    right: 0,
    opacity: 1,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 16,
        shadowOffset: {
          width: 4,
          height: 3,
        },
      },
    }),
  },
});