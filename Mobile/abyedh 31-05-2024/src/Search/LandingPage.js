import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Modal, ToastAndroid, Alert, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
import Swiper from 'react-native-swiper'
import GConf from '../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { SvgUri } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import WorldMap from '../AssetsM/worldMap';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = () => {
  /* ############################[Variable ]################################ */
  const route = useRoute();
  const { Tag } = route.params;
  //let Tag = 'magazin'
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  const [delegList ,setDelegList] = useState([])
  const [gouvList ,setGouvListe] = useState([])
  const [firstLetters, setFirstLetters] = useState([]);
  const [firstLettersDeleg, setFirstLettersDeleg] = useState([]);
  const [open, setOpen] = useState(false)
  const [openD, setOpenD] = useState(false)
  const [gouv ,setGouv] = useState('')
  const [deleg ,setDeleg] = useState('')
  const [selectedLetter ,setSelectedLetter] = useState(0)
  const [suggestionListe , setSuggestionListe] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const navigation = useNavigation();
  const [isSelected, setisSelected] = useState(1);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [userData, setUserData] = useState([]);

  /* ############################[UseEffect]################################ */
    useEffect(() => {
      axios.post(`${GConf.ApiLink}/Search/suggestion`, {
          tag: Tag,
          UID: isUserConnected ? userData.UID : false,
      })
      .then(function (response) {
          setSuggestionListe(response.data)
          setPageLoading(false)
      })
      setGouvListe(WorldMap.states.filter(state => state.country === GConf.Country))

      function getFirstLetters(data) {
        const uniqueLetters = data
          .filter(item => item.country === GConf.Country) // Filter data based on country === 'AF'
          .reduce((letters, item) => {
            const firstLetter = item.name.charAt(0);
            if (!letters.some(obj => obj.letter === firstLetter)) {
              letters.push({ letter: firstLetter });
            }
            return letters;
          }, []);
        return uniqueLetters;
      }
      setFirstLetters(getFirstLetters(WorldMap.states)); 
    },[])
    useEffect(() => {
      const checkIfUserConnected = async () => {
        try {
          const value = await AsyncStorage.getItem('UserData');
          setIsUserConnected(!!value); // Set true if value exists, otherwise false
          setUserData(JSON.parse(value))
        } catch (error) {
          console.error('Error checking user connection:', error);
        } finally {
          setLoading(false); // Set loading to false after checking
        }
      };

      checkIfUserConnected();
    }, []);
  /* ############################[Functions]################################ */
 
      function getFirstLettersDeleg(data, selectedGouv) {
        const uniqueLetters = data
        .filter(item => item.Gouv === selectedGouv) // Filter data based on country === 'AF'
        .reduce((letters, item) => {
            const firstLetter = item.name.charAt(0);
            if (!letters.some(obj => obj.letter === firstLetter)) {
            letters.push({ letter: firstLetter });
            }
            return letters;
        }, []);
        return uniqueLetters;
      }

      const GetDelegList = (value) =>{
        setGouv(value)
        const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
        setDelegList(found)
        setFirstLettersDeleg(getFirstLettersDeleg(WorldMap[GConf.Country], value));
        
        setOpenD(false)

      }
      const GetSelectedGouvList = (letter, value) =>{
        setSelectedLetter(value)
        setGouvListe(WorldMap.states.filter(state => state.country === GConf.Country && state.name.startsWith(letter)));

      }
      const GetSelectedDelegList = (letter, value) =>{
        setSelectedLetter(value)
        setDelegList(WorldMap[GConf.Country].filter(element => element.Gouv === gouv && element.name.startsWith(letter)))
      }
      const RenderAsHtml = (text) => {
        return (
          <span
            dangerouslySetInnerHTML={{__html: text}}
          />
        );
      }

      const GoToResult = () =>{
        if (!gouv) { ToastAndroid.show('Selectioner un region !', ToastAndroid.LONG)} 
        else if (!deleg) { Alert.alert('Delegation')}
        else {
          navigation.navigate('ResultPage' , { Tag: Tag, subTag : GConf.ADIL[Tag].subCateg[isSelected].value, gouv : gouv , deleg:deleg })
            
        }
          
      }

  /* ############################[Card     ]################################ */
  const SelectGenreCard = () => {
    const RenderItem = (props) => (
      
      <TouchableOpacity style={{width : '49%', marginBottom : 5,  borderColor:'#ededed', borderWidth : 1, borderRadius : 12 }} onPress={() => navigation.navigate('LandingPage')}>
        <View style={{ padding: 5 , marginBottom: 8, backgroundColor:'#ffffff', margin: 5,   borderRadius: 8,     }}>
          <View style={{ flexDirection: 'row', alignContent:'center' }}>
            <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{ uri: `https://cdn.abyedh.tn/images/Search/Land_icons/${props.item.imgSrc}.gif` }}
                style={{width: 35, height: 35,}}
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 14,  fontFamily: 'Droid', textAlign: 'center',  color: GConf.ADIL[Tag].themeColor, marginBottom: 2 }}>{t(`landingPage.itemsToSelect.${Tag}.${props.item.imgSrc}`)} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    
    );

    return(<>
      <View  style={{padding : 1, height : GConf.ADIL[Tag].subCatagSmall[0].length >= 4 ? 180 : 110, marginBottom: 6,   }}>
      <Swiper  style={{ backgroundColor:''}}  >
          {
            GConf.ADIL[Tag].subCatagSmall.map((slides, index) => (
              <View style={{flexDirection: isRTL ? 'row-reverse' : 'row'  , flexGrow: 1, flexWrap: 'wrap', justifyContent: 'space-between',}}>
                  {slides.map((item, index) => (
                    <RenderItem key={index} item={item} />
                  ))}
              </View>  
            ))
        }
      </Swiper>
      </View> 
    </>)
  }

  const GouvListeToSelet = () => {
    return (
      <View>
        {gouvList.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: data.name === gouv ? '#f2f2f2' : 'white',
              borderRadius : 15, 
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => GetDelegList(data.name)}
          >
            <Text style={{ marginRight: 10 }}>
                <Ionicons name={data.name === gouv ? 'map' : 'map-outline' } size={20} color={data.name === gouv ? GConf.ADIL[Tag].themeColor : "grey" } />
            </Text>
            <Text style={{ fontFamily:'Droid' , color: data.name === gouv ? GConf.ADIL[Tag].themeColor : "grey" }}>{data.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  
  const DelegListeToSelet = () => {
    return (
      <View>
        {delegList.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: 10,
              marginBottom: 10,
              borderRadius : 15, 
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: data.name === deleg ? '#f2f2f2' : 'white',
            }}
            onPress={() => {
              setDeleg(data.name);
              setOpen
              (false);
            }}
          >
            <Text style={{ marginRight: 10 }}>
                <Ionicons name={data.name === deleg ? 'location' : 'location-outline' } size={20} color={data.name === deleg ? GConf.ADIL[Tag].themeColor : "grey" } />
            </Text>
            <Text style={{ fontFamily:'Droid' , color: data.name === deleg ? GConf.ADIL[Tag].themeColor : "grey" }}>{data.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const SystemLinkCard = () => {
    return (
        <View style={{ padding: 10, marginBottom: 10,  borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2, borderColor: '#ddd', borderWidth: 1 }}>
            <Text style={{ textAlign: isRTL ? 'right' : 'left', color: '#555', fontFamily: 'Droid',  marginBottom: 5 }}>
                {t('landingPage.titleSystemAds1')} {t(`landingPage.systemOwnersNames.${Tag}`)} {t('landingPage.titleSystemAds2')}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 0, paddingTop: 0 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                <SvgUri
                    width="100"
                    height="90"
                    uri={`https://cdn.abyedh.tn/images/ads/${Tag}.svg`}
                  />
                     
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Text style={{fontFamily:'Droid',}} >{t('landingPage.textSystemAds1')} {t(`landingPage.systemNames.${Tag}`)} {t('landingPage.textSystemAds2')}</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SystemSignUp', {Tag:Tag})} style={{ flex: 1,  marginRight: 5 }}>
                    <Text style={{ textAlign: 'center', fontFamily:'Droid', padding: 10, backgroundColor: '#f0f0f0', borderRadius : 25,   color: GConf.ADIL[Tag]?.themeColor }}>
                        {t('landingPage.SubscribeBtnText')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AppPage', {})} style={{ flex: 1, marginLeft: 5 }}>
                    <Text style={{ textAlign: 'center', padding: 10, fontFamily:'Droid', borderRadius : 25,  backgroundColor: GConf.ADIL[Tag]?.themeColor, color: '#fff' }}>
                        {t('landingPage.goToSystemBtnText')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }

  const AdminSoon = () => {
      return (
          <View style={{ padding: 10, marginBottom: 10, borderRadius: 15,  shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2, borderColor: '#ddd', borderWidth: 1 }}>
              <Text style={{ textAlign: 'right', color: '#555', marginBottom: 5, fontFamily:'Droid', }}>
                  مِنَصّةْ الِإدَارَة الرَقْمِيَّة
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 0, paddingTop: 0 }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                  <SvgUri
                    width="100"
                    height="90"
                    uri={`https://cdn.abyedh.tn/images/ads/${Tag}.svg`}
                  />
                       
                  </View>
                  <View style={{ flex: 2, alignItems: 'center' }}>
                      <Text style={{ marginBottom: 5 , fontFamily:'Droid',}}>مِنَصّةْ الإِدَارَة الرَقْمِيَّة تَهْدِفُ لتبسيط العمليات الإدارية</Text>
                      <Text style={{ marginTop: 0 , fontFamily:'Droid',}}>سَتَكُونْ مُتَوَفِّرَة قَرِيبًأ</Text>
                  </View>
              </View>
          </View>
      );
  }

  const ChooseLocationCard = () => {
      const SelectGouv = () => {
          return (
              <TouchableOpacity style={{ padding: 10, width : '100%',  marginBottom: 10, borderRadius: 50, borderColor: '#ddd',  borderWidth: 1 }} onPress={() => setOpenD(true)}>
                    <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row',  alignItems: 'center' , justifyContent:'center',}}>
                        <Ionicons name='map' size={20} color={GConf.ADIL[Tag]?.themeColor} style={{ width: 20, height: 20, marginHorizontal: isRTL ? 10 : 0 }} />
                        <Text style={{color: '#555',  fontFamily:'Droid', textAlign: 'center',   marginLeft: 5 }}>  {gouv ? gouv : t('landingPage.selectGouvText')} </Text>
                      </View>
              </TouchableOpacity>
          );
      }

      const SelectDeleg = () => {
          return (
              <TouchableOpacity style={{ padding: 10, marginBottom: 10, borderRadius: 50, borderColor: '#ddd', borderWidth : 1 }} onPress={() => setOpen(true)}>
                      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row',  alignItems: 'center' , justifyContent:'center',}}>
                        <Ionicons name='location-outline' size={20} color={GConf.ADIL[Tag]?.themeColor} style={{ width: 20, height: 20, marginHorizontal: isRTL ? 10 : 0 }} />
                        <Text style={{color: '#555',  fontFamily:'Droid', textAlign: 'center',   marginLeft: 5 }}>  {deleg ? deleg : t('landingPage.selectDelegText')} </Text>
                      </View>
              </TouchableOpacity>
          );
      }

      const FastSearch = (props) => {
          return (
              <TouchableOpacity onPress={() => navigation.navigate('ResultPage' , { Tag: Tag, subTag : GConf.ADIL[Tag].subCateg[isSelected].value, gouv : gouv , deleg:deleg })}>
                  <View style={{ borderWidth :1, borderColor:'#ddd' , borderRadius: 20,  padding: 10, marginBottom: 10,   alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <View style={{width: 28, height: 28 ,  borderRadius: 28 / 2, overflow: 'hidden',}} >
                    <Image source={{ uri: `https://cdn.abyedh.tn/images/p_pic/${userData.PictureId}.gif` }} style={{width: 28, height: 28 ,  borderRadius: 14}} />
                     </View> 
                      <Text style={{ fontFamily:'Droid',  flex: 1, textAlign: 'center',  }} numberOfLines={1}>
                          {t('landingPage.fastSearchText')} {props.gouv}, {props.deleg}
                      </Text>
                      <Ionicons name='arrow-back-outline' size={10} color="grey"   />
                  </View>
              </TouchableOpacity>
          );
      }

      return (
          <View style={{ padding: 10, paddingVertical: 18,  marginBottom: 10, borderRadius : 15,  backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 1 }}>
              {/* <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                      {!isUserConnected ? <FastSearch gouv={'GConf.UserData.UData.BirthGouv'} deleg={'GConf.UserData.UData.BirthDeleg'} /> : null}
                  </View>
                  
              </View> */}
              <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 , }}>
                      <View style={{ flex: 1 }}>
                          {isUserConnected ? <FastSearch gouv={userData.BirthGouv} deleg={userData.BirthDeleg} /> : null}
                      </View>
                      <SelectGouv />
                  </View>
                  
              </View>
              <View style={{ flex: 1, display: gouv ? 'flex' : 'none' }}>
                      <SelectDeleg />
                </View>
              <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => GoToResult()} style={{ backgroundColor: GConf.ADIL[Tag]?.themeColor, borderRadius: 50 }}>
                      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' , justifyContent:'center', padding : 15}}>
                        <Ionicons name="search-outline" size={20} color="white" />
                        <Text style={{ color: 'white', fontFamily:'Droid', textAlign: 'center',   marginLeft: 5 }}> {t('landingPage.rechercheBtnText')} </Text>
                      </View>
                  </TouchableOpacity>
              </View>

          </View>
      );
  }

  const FavoriteOrSuggestionCard = () => {
 

    const ItemCard = (props) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProfilePage',  {Tag: Tag, PID:  props.data.PID }) } style={{ paddingHorizontal: 10, borderWidth: 1, borderColor:'#ededed',  marginHorizontal : 5,  marginBottom: 25, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 1 }, shadowRadius: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 4, justifyContent: 'center'  }}>
                        <Image source={{ uri: `https://cdn.abyedh.tn/Images/Search/CIcons/${Tag}.gif` }} style={{ width: 50, height: 50 }} />
                    </View>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <Text numberOfLines={1} style={{ maxWidth: 115, fontFamily:'Droid', color: '#6c757d' }}>{props.data.Name}</Text>
                        <Text numberOfLines={1} style={{ maxWidth: 115, fontFamily:'Droid', color: '#6c757d' }}>
                            {props.data.UID ? <Text style={{fontFamily:'Droid',}}> المفظلة <Text style={{ color: '#ffc107' }}>★</Text></Text> : `${props.data.Gouv}, ${props.data.Deleg}`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
      <>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', marginEnd: 12, marginTop:15 , marginBottom: 8 }}>
            <Ionicons name="star-half" size={20} color={GConf.ADIL[Tag].themeColor} />
            <Text style={{ fontFamily:'Droid',  textAlign: isRTL ? 'right' : 'left', color: GConf.ADIL[Tag].themeColor, direction: isRTL ? 'rtl' : 'ltr' }}>
              {t('landingPage.suggestionAndFavText')}
            </Text>
          </View>

      
        { pageLoading ? <ActivityIndicator size="large" color="#185fc9" style={{marginVertical : 25}} /> :
            <FlatList
                horizontal
                data={suggestionListe}
                renderItem={({ item, index }) => (
                    <View key={index} style={{ width: 200 }}>
                        <ItemCard data={item} index={index} />
                    </View>
                )}
                inverted={isRTL}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          }
        </>    
    );
    
  }


  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor={GConf.ADIL[Tag].themeColor} leftCom=''  backLinkColor='white'   backLink='MainPage' rigthImage='05.gif' clickOption=''  />

            <ScrollView style={{ paddingHorizontal: 10,  paddingTop : 10 }}>
                <Text style={{fontFamily:'Droid',  fontSize: 16,  marginTop: 15,  marginBottom: 8,  marginRight: 12,  textAlign: isRTL ? 'right' : 'left',  color: '#6c757d', }}>
                  {t(`landingPage.selectText.${Tag}`)}
                </Text>

                <SelectGenreCard />

                <ChooseLocationCard />

                {GConf.ADIL[Tag].systemActive ? <SystemLinkCard /> : <AdminSoon /> }  
                
                <FavoriteOrSuggestionCard />

                <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
            </ScrollView>
            <Modal
              visible={openD}
              animationType="slide"
              transparent={true}
              statusBarTranslucent={true}
              onRequestClose={() => setOpenD(false)}
            >
              <SafeAreaProvider>
              <SafeAreaView style={{backgroundColor:'white', flex: 1, }}>
                    <View style={{padding:10, paddingBottom : 40,}} >
                          <View style={{ flexDirection: 'row', marginBottom: 15, marginTop: 15 }}>
                            <View style={{ flex: 11 }}>
                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {firstLetters.map((data, index) => (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      paddingVertical: 5,
                                      paddingHorizontal: 10,
                                      marginRight: 5,
                                      backgroundColor: selectedLetter == index ? 'lightgray' : 'white',
                                      borderRadius: 20,
                                    }}
                                    onPress={() => GetSelectedGouvList(data.letter, index)}
                                  >
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{data.letter}</Text>
                                  </TouchableOpacity>
                                ))}
                              </ScrollView>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'center', paddingLeft: 8 }}>
                              <TouchableOpacity onPress={() => setOpenD(false)}>
                                <Text style={{ color: 'red',   }}><Ionicons name='close-circle-outline' size={20} /></Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <ScrollView style={{marginVertical : 20 , paddingBottom : 15}} >
                              <GouvListeToSelet />
                          </ScrollView>
                    </View>
              </SafeAreaView>
              </SafeAreaProvider>
            </Modal>
            <Modal
                visible={open}
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                onRequestClose={() => setOpen(false)}
            >
              <SafeAreaProvider>
              <SafeAreaView style={{backgroundColor:'white', flex: 1, }}>
                    <View style={{padding:10, paddingBottom : 40}}  >
                          <View style={{ flexDirection: 'row',  marginBottom: 15, marginTop: 15 }}>
                                <View style={{ flex: 11 }}>
                                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {firstLettersDeleg.map((data, index) => (
                                      <TouchableOpacity
                                        key={index}
                                        style={{
                                          paddingVertical: 5,
                                          paddingHorizontal: 10,
                                          marginRight: 5,
                                          backgroundColor: selectedLetter == index ? 'lightgray' : 'white',
                                          borderRadius: 20,
                                        }}
                                        onPress={() => GetSelectedDelegList(data.letter, index)}
                                      >
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{data.letter}</Text>
                                      </TouchableOpacity>
                                    ))}
                                  </ScrollView>
                                </View>
                                <View style={{ flex: 1, alignSelf: 'center', paddingLeft: 8  }}>
                                  <TouchableOpacity onPress={() => setOpen(false)}>
                                    <Text style={{ color: 'red' }}><Ionicons name='close-circle-outline' size={20} /></Text>
                                  </TouchableOpacity>
                                </View>
                          </View>
                          <ScrollView style={{marginVertical : 20 ,   paddingBottom : 15}} >
                            <DelegListeToSelet />
                          </ScrollView>
                        
                    </View>
              </SafeAreaView>
              </SafeAreaProvider>
            </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default LandingPage;
