import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput , ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { useNavigation } from '@react-navigation/native';
import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import axios from 'axios';
import GConf from '../AssetsM/generalConf';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';



const App = () => {
  /*#########################[Const]##################################*/
  const [loginD, setLoginD] = useState([])
  const [loaderState, setLS] = useState(false)
  const [pwdSeenState, setPWDSeenState] = useState(true)
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  const navigation = useNavigation();
  const [signUpD, setSignUp] = useState({Name:'', BirthDay: new Date().toISOString().split('T')[0], Phone:'', Gender:'' })
  const [isSelected, setisSelected] = useState('00');
  const [password ,setPassword] = useState([{Pvalue:'', repeated:''}])
  const [gouv ,setGouv] = useState('')
  const [deleg ,setDeleg] = useState('')
  const [delegList ,setDelegList] = useState([])
  const [myPosition, setMyPosition] = useState([36.17720,9.12337])
     

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    GetPositionNow();
    // const UIDisSet = localStorage.getItem('UID');
    // if (UIDisSet) {window.location.href = "/Profile/L";}
    
});
  /*#########################[Functions]##################################*/

    const storeData = async (key, value) => {
      await AsyncStorage.setItem(key, value);
    };

    const logInSystem = () =>{
      if (!loginD.Log) {Alert.alert(t('loginPage.toastText.enterLog')) }
      else if (!loginD.Pwd) {Alert.alert(t('loginPage.toastText.saved'))}
      else{
          setLS(true)
          axios.post(`${GConf.ApiProfileLink}/LogIn`, {
              tag : 'Houssem',
              LoginData : loginD,
          }).then(function (response) {
              if(response.data.Exist == true) {
                      storeData('UserData',JSON.stringify(response.data.UserD))
                      storeData('UID', response.data.UserD.UID)
                      setLS(false)
                      navigation.navigate('MainPage')
              }
              else{
                  Alert.alert(t('loginPage.toastText.notSaved'))
                  setLS(false)
              }
          })
      } 
    }
    const OnKeyPressFunc = (e) => {
      if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
          e.preventDefault();
      }   
    }
    const GetDelegList = (value) =>{
      setGouv(value)
      const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
      let lastList1 = []
      found.map((data,index) => {
          lastList1.push({id:index, value:data.name , text:data.name})
      })
      setDelegList(lastList1)
    }
    const GetPositionNow = () =>{
      //get position 
      // navigator.geolocation.getCurrentPosition(
      //     function(position) {
      //         if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
      //         else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
      //         else{
      //             setMyPosition([position.coords.latitude, position.coords.longitude])
      //         }
      //     },
      //     function(error) {
      //         // toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
      //     }
      // );
    }

    const checkPhoneExistance = () =>{
      axios.post(`${GConf.ApiProfileLink}/SignUp/checkExistance`, {
          phone : signUpD.Phone,
      }).then(function (response) {
          if(response.data.length  != 0) {
              toast.error(" هذا الرقم موجود !", GConf.TostSuucessGonf)
              setSignUp({...signUpD, Phone: '' })
          }
      }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5> مشكل في الاتصال بالانترنت</h5> </div></>, GConf.TostInternetGonf)   
          
          }
        });
    }

    const CheckPasswordFunc = () =>{
      return true
    }

    const SaveFunction = () =>{
          
          if (!signUpD.Name) {toast.error("أدخل  الاسم و اللقب   !", GConf.TostErrorGonf)}
          else if (!signUpD.BirthDay) {toast.error("أدخل تاريخ الميلاد   !", GConf.TostErrorGonf)}
          else if (!signUpD.Phone) {toast.error("أدخل  رقم الهاتف   !", GConf.TostErrorGonf)}
          else if (!signUpD.Gender) {toast.error("أدخل  الجنس   !", GConf.TostErrorGonf)}
          else if (!gouv) {toast.error("أدخل  الولاية   !", GConf.TostErrorGonf)}
          else if (!deleg) {toast.error("أدخل  المنطقة   !", GConf.TostErrorGonf)}
          else if (!isSelected) {toast.error("إختر صورة     !", GConf.TostErrorGonf)}
          else if (!password.Pvalue || !CheckPasswordFunc()) {toast.error("إختر كلمة مرور مقبولة      !", GConf.TostErrorGonf)}
          else{
              setLS(true)
              axios.post(`${GConf.ApiProfileLink}/SignUp/Save`, {
                  signUpD : signUpD,
                  gouv:gouv,
                  deleg:deleg,
                  isSelected:isSelected,
                  password: password.Pvalue

              }).then(function (response) {
                  if(response.data.Saved == true) {
                          toast.success("تم التسجيل بنجاح !", GConf.TostSuucessGonf)
                          setLS(false)
                          localStorage.setItem('UserData', JSON.stringify(response.data.UserD));
                          localStorage.setItem('UID', response.data.UID);
                          //window.location.href = "/Profile";
                  }
                  else{
                      toast.error(' لم نتمكن من التسجيل حاول مرة اخري ', GConf.TostSuucessGonf)
                      setLS(false)
                  }
              }).catch((error) => {
                  if(error.request) {
                    toast.error(<><div><h5>مشل في الإتصال </h5> </div></>, GConf.TostInternetGonf) 
                    setLS(false)
                    }
                });

          }
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        {loaderState && <View style={{ position : 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', width: Dimensions.get('window').width, height: Dimensions.get('window').height, zIndex:99, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size="large" color="white" /></View>}
        
        <StackBarCard backColor='' leftCom=''    backLink='MainPage'  clickOption=''  />
        
        <View style={{flex: 1, backgroundColor:'white',}}>
            <ProgressSteps
              borderWidth={2}
               
            >
                <ProgressStep label=" " nextBtnTextStyle={{fontFamily:'Droid', color:'grey'}} nextBtnText={t('signUpPage.nextBtnText')}>
                    <View style={{  alignItems:'center',  paddingHorizontal :15, paddingBottom: 30,   marginBottom : 30 }}>
                        <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('signUpPage.infoGenerale.nomEtPrenomText')}</Text>
                        <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                          <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
                          <TextInput
                            style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                            placeholder={t('signUpPage.infoGenerale.nomEtPrenomText')}
                            cursorColor ='#888'
                            onChangeText={(text) => setLoginD({...loginD, Log: text })}
                          />
                        </View>

                        <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('signUpPage.infoGenerale.naissanceText')}</Text>
                        <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                          <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
                          <TextInput
                            style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                            placeholder={t('signUpPage.infoGenerale.naissanceText')}
                            cursorColor ='#888'
                            onChangeText={(text) => setLoginD({...loginD, Log: text })}
                          />
                        </View>

                        <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('signUpPage.infoGenerale.selectGenreText')}</Text>
                        <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                          <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
                          <TextInput
                            style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                            placeholder={t('signUpPage.infoGenerale.selectGenreText')}
                            cursorColor ='#888'
                            onChangeText={(text) => setLoginD({...loginD, Log: text })}
                          />
                        </View>

                        <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('signUpPage.infoGenerale.phoneText')}</Text>
                        <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                          <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
                          <TextInput
                            style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                            placeholder={t('signUpPage.infoGenerale.phoneTextPlaceholder')}
                            cursorColor ='#888'
                            onChangeText={(text) => setLoginD({...loginD, Log: text })}
                          />
                        </View>
                    </View>
                </ProgressStep>

                <ProgressStep label=" " previousBtnText={<Icon name='arrow-left-circle' size={30} color="grey" />} nextBtnTextStyle={{fontFamily:'Droid', color:'grey'}} nextBtnText={t('signUpPage.nextBtnText')}>
                    <View style={{  alignItems:'center',  paddingHorizontal :15, paddingBottom: 30,   marginBottom : 30 }}>
                        <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('signUpPage.locationGeo.selectGouvText')}</Text>
                        <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                          <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
                          <TextInput
                            style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                            placeholder={t('signUpPage.locationGeo.selectGouvText')}
                            cursorColor ='#888'
                            onChangeText={(text) => setLoginD({...loginD, Log: text })}
                          />
                        </View>
                        <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('signUpPage.locationGeo.selectDelegText')}</Text>
                        <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                          <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
                          <TextInput
                            style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                            placeholder={t('signUpPage.locationGeo.selectDelegText')}
                            cursorColor ='#888'
                            onChangeText={(text) => setLoginD({...loginD, Log: text })}
                          />
                        </View>
                    </View>
                </ProgressStep>

                <ProgressStep label=" " previousBtnText={<Icon name='arrow-left-circle' size={30} color="grey" />} nextBtnTextStyle={{fontFamily:'Droid', color:'grey'}} nextBtnText={t('signUpPage.nextBtnText')}>
                    <View style={{  alignItems:'center',  paddingHorizontal :15, paddingBottom: 30,   marginBottom : 30 }}>
                        <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('signUpPage.selectPhotoTitle')}</Text>
                        <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                          <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
                          <TextInput
                            style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                            placeholder={t('signUpPage.selectPhotoTitle')}
                            cursorColor ='#888'
                            onChangeText={(text) => setLoginD({...loginD, Log: text })}
                          />
                        </View>
                    </View>
                </ProgressStep>

                <ProgressStep label=" " previousBtnText={<Icon name='arrow-left-circle' size={30} color="grey" />} nextBtnTextStyle={{fontFamily:'Droid', color:'grey'}} finishBtnText={t('signUpPage.finishBtnText')} onSubmit={() => Alert.alert('Houusem')}>
                    <View style={{ alignItems:'center',  paddingHorizontal :15, paddingBottom: 30,   marginBottom : 30 }}>
                          <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', marginTop: 15, fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,}} > {t('signUpPage.inputPasssword.inputPassswordText')} </Text>
                          <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                            <View><Icon name="key-variant" size={20} color="#888" style={styles.icon} /></View>
                            <TextInput
                              style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                              placeholder={t('signUpPage.inputPasssword.inputPassswordText')}
                              cursorColor ='#888'
                              secureTextEntry={pwdSeenState}
                              onChangeText={(text) => setLoginD({...loginD, Pwd: text })}
                            />
                            <View><Icon name="eye-off" size={20} color="#888" style={styles.icon} onPress={() => setPWDSeenState(!pwdSeenState)} /></View>
                          </View>
                          <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', marginTop: 15, fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,}} > {t('signUpPage.inputPasssword.repeatPWDText')} </Text>
                          <View style={{...styles.inputContainer,  flexDirection : isRTL ? 'row-reverse' :'row'}}>
                            <View><Icon name="key-variant" size={20} color="#888" style={styles.icon} /></View>
                            <TextInput
                              style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                              placeholder={t('signUpPage.inputPasssword.repeatPWDText')}
                              cursorColor ='#888'
                              secureTextEntry={pwdSeenState}
                              onChangeText={(text) => setLoginD({...loginD, Pwd: text })}
                            />
                            <View><Icon name="eye-off" size={20} color="#888" style={styles.icon} onPress={() => setPWDSeenState(!pwdSeenState)} /></View>
                          </View>
                          <TouchableOpacity style={{width: '100%',  height: 40, justifyContent:'center', backgroundColor:'#dc3545', marginTop: 30,  paddingHorizontal: 10, borderRadius: 50}} onPress={() => logInSystem()} >
                                  <Text style={{alignSelf: 'center', fontFamily:'Droid', color:'white' }} >{t('signUpPage.finishBtnText')} </Text>
                          </TouchableOpacity>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>

        {/* <ScrollView contentContainerStyle={{backgroundColor:'white',   flexGrow: 1,   justifyContent: 'center', }}  >
            <View style={{   alignItems:'center',  paddingHorizontal :15, paddingBottom: 30,   marginBottom : 30}} >
              
              









              




              




              
               

            </View>
        </ScrollView>  */}
    </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default App;


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    borderRadius: 50,
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
  },
});
