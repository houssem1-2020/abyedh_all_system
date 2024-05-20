import React, { useEffect, useState } from 'react';
import { View, Platform, ScrollView, Text, TouchableOpacity, Image, Animated, FlatList , Button, Modal, StyleSheet , Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
import GConf from '../AssetsM/generalConf';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import { format, addDays, startOfWeek } from 'date-fns';
import MapView, { Marker, Callout } from 'react-native-maps';
import Slider from 'react-slick';
import { Rating } from 'react-native-ratings';
import { SvgUri } from 'react-native-svg';


import PublicationProfilePage from './Profile/publicationProfilePage'
//Spesific List 
const CliniqueSpecific = () => {return <Text>CliniqueSpecific</Text>}
const PharmacieSpecific = () => {return <Text>PharmacieSpecific</Text>}
const InfirmierSpecific = () => {return <Text>InfirmierSpecific</Text>}
const DocteurSpecific = () => {return <Text>DocteurSpecific</Text>}



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
          <View style={{ padding: 10 }}>
              <Text>قم بالتسجيل لتتمكن من تقييم العميل</Text>
          </View>
      );
  }

  const NoDataCard = () => {
      return (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SvgUri
              width="80"
              height="80"
              uri="https://cdn.abyedh.tn/images/Search/comments.svg"
            />

               
              <Text>لا توجد تعليقات</Text>
          </View>
      );
  }

  return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <TouchableOpacity style={{ flex: 5 }} onPress={() => setCommeningIsActive(!commeningIsActive)}>
                  <Text style={{ padding: 5, borderRadius: 5, borderWidth: 1, borderColor: '#000', textAlign: 'center' }}>
                      {commeningIsActive ? 
                          <Text>
                              <Text><Text style={{ fontSize: 20 }}>...</Text><Text style={{ fontWeight: 'bold' }}>{t('profilePage.generalData.voirCommentText')}</Text></Text>
                          </Text>
                          : 
                          <Text>
                              <Text><Text style={{ fontSize: 20 }}>...</Text><Text style={{ fontWeight: 'bold' }}>{t('profilePage.generalData.addCommentText')}</Text></Text>
                            </Text>
                        }
                    </Text>
                </TouchableOpacity>
                <View style={{ flex: 7 }}>
                    <Text style={{ textAlign: isRTL ? 'right' : 'left', color: '#000', fontSize: 16, fontWeight: 'bold' }}>{t('profilePage.generalData.commentText')}</Text>
                </View>
            </View>

            <ScrollView horizontal={true} style={{ height: 230 }}>
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
                            <NoDataCard />
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
  //let Tag = 'docteur'
  //let PID =  1369683967 
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  let [rateValue,setRateValue] =useState({comment:'', rating:0})
  let [isOnTop , setIsOnTop] = useState(false)
  let [isOnTopModal , setIsOnTopModal] = useState(false)
  let [loading , setLoading] = useState(true)
  let [profileData, setProfileData] = useState({photoes:[]})
  let [isFavorite,setIsFavorite] =useState(false)
  const [selectedTab, setSelectedTab] = useState(0);
  const headerSectionHeight = 200;
  const scrollY = new Animated.Value(0)
  
  const renderTab = () => {
    switch (selectedTab) {
      case 0:
        return <MainDataCard />;
      case 1:
        return <SpesificCard status={Tag}  />;
      case 2:
        return <ActionCard status={Tag} />;
      case 3:
        return <SuivieCard status={Tag} />;
      case 4:
        return <PublicationProfilePage pidData={profileData} />;
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
              <Text style={{color : 'white', fontFamily:'Droid', fontSize : 22}} numberOfLines={2} > {profileData.genrale[0].Name} </Text>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }} >
                    <View style={{flex : 10, flexDirection:'row',  alignItems:'flex-start' }} >
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
      <View style={{ flexDirection:'row' , alignItems:'center', justifyContent:'center', borderRadius : props.top ? 0 : 15,   marginBottom: props.top ? 10 : 30 , paddingTop: props.top ? 0 : 10,  backgroundColor :'white'  }}>
        {TabsList.map((data, index) => <TabsCard data={data} key={index} />)}
      </View> 
    </>)
  }

  /* 1  */
  const GeneralDataCard = ( ) => {
    const renderRow = ({ item, index }) => {
      const value = profileData.genrale[0][item.resultTag];
      return (
        <View
          key={index}
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            paddingVertical: 10,
          }}
        >
          {isRTL ? (
            <>
              <Text
                style={{
                  flex: 3,
                  fontSize: 16,
                  textAlign: 'right',
                  color: '#888',
                }}
              >
                {value ? (
                  <Text>{value}</Text>
                ) : (
                  <Text style={{ color: '#888', fontSize: 12 }}>
                    معلومة غير متوفرة حاليا
                  </Text>
                )}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name={item.icon} size={20} color={GConf.ADIL[Tag].themeColor} />
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name={item.icon} size={20} color={GConf.ADIL[Tag].themeColor} />
              </View>
              <Text
                style={{
                  flex: 3,
                  fontSize: 16,
                  textAlign: 'left',
                  color: '#888',
                }}
              >
                {value ? (
                  <Text>{value}</Text>
                ) : (
                  <Text style={{ color: '#888', fontSize: 12 }}>
                    معلومة غير متوفرة حاليا
                  </Text>
                )}
              </Text>
            </>
          )}
        </View>
      );
    };
  
    return (
      <View
        style={{
          padding: 15,
          backgroundColor: '#fff',
          borderRadius: 10,
          marginBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            {(profileData.genrale[0].Activated === 'true' || profileData.genrale[0].Activated === 'autoSaved') && (
              <Icon name="checkmark-circle" size={20} color="#1d9bf0" />
            )}
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontSize: 18,
                color: GConf.ADIL[Tag].themeColor,
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {t('profilePage.generalData.generalDataText')}
            </Text>
          </View>
        </View>
        {GConf.ADIL[Tag].cardProfile.map((item, index) => (
            <View key={index}>
              <Text>{renderRow({ item, index })}</Text>
            </View>
          ))}     
        {/* <FlatList
          data={GConf.ADIL[Tag].cardProfile}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
        /> */}
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: CheckToday(day) ? ConverColorToHsl(GConf.ADIL[Tag].themeColor) : '',
                color: CheckToday(day) ? 'white' : GConf.ADIL[Tag].themeColor,
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <Text>{t(`profilePage.generalData.weekDayes.${dayLabels[index]}`)}</Text>
              <Text>08:00 - 12:00</Text>
              <Text>14:00 - 18:00</Text>
            </View>
          ))}
        </View>
      );
    };
  
    return (
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
            <Text style={{ color: GConf.ADIL[Tag].themeColor }}>{t('profilePage.generalData.horaireText')}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setCalendarActive(!calendarActive)}>
              <Text style={{ color: calendarActive ? 'orange' : 'grey', fontSize: 20 }}>📅</Text>
            </TouchableOpacity>
          </View>
        </View>
        {calendarActive ? (
          <Calendar
            markedDates={GeneratedTime().reduce((acc, event) => {
              acc[event.start.split('T')[0]] = { marked: true, dotColor: event.backgroundColor };
              return acc;
            }, {})}
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
        ) : (
          <CalendarSuggested />
        )}
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
      <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
            <Text style={{ color: GConf.ADIL[Tag].themeColor }}>{t('profilePage.generalData.mapText')}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { /* handle map link */ }}>
              <Text style={{ fontSize: 20 }}>📍</Text>
            </TouchableOpacity>
          </View>
        </View>
         <MapView
          style={{ height: 250, zIndex: 50 }}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={position}>
          <Callout>
            <View>
              <Text>{profileData.genrale ? profileData.genrale[0].Name : '...'}</Text>
              <Button title="تسجيل طلب" onPress={() => setActiveIndex(2)} />
            </View>
          </Callout>
        </Marker>
        </MapView> 
      </View>
    );
  };
  const ImagesCard = () => {
    const { t } = useTranslation();
    const [openImageModal, setOIM] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
  
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
    };
  
    return (
      <>
        <View style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3, marginBottom: 10 }}>
          <Text style={{ textAlign: isRTL ? 'right' : 'left', color: GConf.ADIL[Tag].themeColor }}>{t('profilePage.generalData.photoesText')}</Text>
          {profileData.photoes.length === 0 ?
            // <Slider {...settings} >
            <ScrollView horizontal={true} >
              {DefaultImages.map((data, index) =>
                <View key={index} style={{ maxHeight: '100%' }}>
                   <Image source={{uri : data.src}} style={{ width: '100%' , height: 150 }} />
                </View>
              )}
            </ScrollView> // </Slider>
            :
            // <Slider {...settings} >
              <>
              {profileData.photoes.map((data, index) =>
                <View key={index} style={{ maxHeight: '100%' }} onClick={() => OpenModalToShowImage(data.ImageLink)}>
                  <Image
                      source={{ uri: `https://cdn.abyedh.tn/images/Directory/${data.ImageLink}` }}
                      style={{ width: '100%', height: 'auto' }}
                    />
                </View>
              )}
            </> // </Slider>
          }
        </View>
        {/* <Modal
          size='fullscreen'
          open={openImageModal}
          onClose={() => setOIM(false)}
          onOpen={() => setOIM(true)}
          style={{ fullscreenProfileModal: { backgroundColor: '#fff' } }}
        >
          <Modal.Content>
            <img src={`https://cdn.abyedh.tn/images/Directory/${selectedImage}`} style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 10, marginBottom: 20 }} />
          </Modal.Content>
          <Modal.Actions>
            <Button rounded onClick={() => setOIM(false)}>غلق</Button>
          </Modal.Actions>
        </Modal> */}
      </>
    );
  };
  const ActionForSmallCard = () => {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const SettingItemCard = (props) => {
        return (
            <TouchableOpacity onPress={() => setSelectedTab(1)} style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={props.data.icon} type='font-awesome' color={GConf.ADIL[Tag].themeColor} />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: GConf.ADIL[Tag].themeColor, fontWeight: 'bold' }}>
                        {t(`resultPage.actionTextName.${Tag}.${props.data.link}`)}
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left-short' : 'arrow-right-short'} type='font-awesome' size={24} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            {GConf.ADIL[Tag].profileBtns.slice(0, GConf.ADIL[Tag].profileBtns.length - 1).map((data, index) => (
                <SettingItemCard key={index} data={data} />
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
      
      const statusCard = React.useCallback(() => {
          switch (status) {
              case 'docteur':
                  return <DocteurSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
              case 'infirmier':
                  return <InfirmierSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
              case 'pharmacie':
                  return <PharmacieSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
              case 'clinique':
                  return <CliniqueSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
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
            case 'docteur':
                return <DocteurSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            case 'infirmier':
                return <InfirmierSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            case 'pharmacie':
                return <PharmacieSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            case 'clinique':
                return <CliniqueSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
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
            case 'docteur':
                return <DocteurSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            case 'infirmier':
                return <InfirmierSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            case 'pharmacie':
                return <PharmacieSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
            case 'clinique':
                return <CliniqueSpecific TAG={Tag} PID={PID} UID='250' PidData={profileData.genrale[0]} />;
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
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',  width: 28, height: 28 ,  borderRadius: 28 / 2, overflow: 'hidden',  }}  onPress={() => UserIconClicked('')}  >
                        <Ionicons name='arrow-back-outline' size={20} color="grey" />
                    </TouchableOpacity >
                    <View style={{alignItems: 'center', paddingTop: 3}}>
                    <Text style={{marginLeft : 15, fontFamily:'Droid', color:'white', display : 'none' }}>Housse</Text>
                    </View>
                    
                 </View> 
                 
                 <View style={{flex : 1 , alignItems:'flex-end'}}>
                    <TouchableOpacity style={{alignItems: 'center',   marginLeft: 15,   borderRadius: 28 / 2, overflow: 'hidden',  }}  onPress={() => UserIconClicked('')}  >
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
                {loading ? <ActivityIndicator style={{height: 110}} />  : <ProfInfoCard /> }
                
                 <View style={{  paddingHorizontal : 10, paddingTop : 25, borderTopLeftRadius : 30, borderTopEndRadius : 30,    height : 'auto',   backgroundColor :'white' , }}>
 
                      <View style={{position : isOnTopModal ? 'absolute': 'fixed',}}></View><TabsList />

                      {loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height : 400 }}><Text> <ActivityIndicator /> </Text></View> : renderTab() }

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