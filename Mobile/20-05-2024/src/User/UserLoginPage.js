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

const App = () => {
  /*#########################[Const]##################################*/
  const [loginD, setLoginD] = useState([])
  const [loaderState, setLS] = useState(false)
  const [pwdSeenState, setPWDSeenState] = useState(true)
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  const navigation = useNavigation();
  
  /*#########################[UseEffect]##################################*/
  useEffect(() => {
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
      {loaderState && <View style={{ position : 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', width: Dimensions.get('window').width, height: Dimensions.get('window').height, zIndex:99, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size="large" color="white" /></View>}
        <StackBarCard backColor='' leftCom=''    backLink='MainPage'  clickOption=''  />
        <ScrollView contentContainerStyle={{backgroundColor:'white',   flexGrow: 1,   justifyContent: 'center', }}  >
        
        <View style={{ paddingVertical: 30, alignItems:'center',  paddingHorizontal :15,    borderRadius : 14, borderWidth : 1, borderColor:'#dfdfdf', marginHorizontal:15}} >
          
          <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,   }} > {t('loginPage.inputIdentifiantText')}</Text>
          <View style={{...styles.inputContainer, flexDirection : isRTL ? 'row-reverse' :'row'}}>
            <Icon name="account-arrow-left" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={{...styles.textInput, paddingHorizontal : 7,  textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
              placeholder={t('loginPage.inputIdentifiantText')}
              cursorColor ='#888'
              onChangeText={(text) => setLoginD({...loginD, Log: text })}
            />
          </View>

          <Text style={{alignSelf: isRTL ? 'flex-end' : 'flex-start', marginTop: 15, fontFamily:'Droid', paddingLeft : isRTL ? 0 : 10, paddingRight : isRTL ? 10 : 0,}} > {t('loginPage.inputPasswordText')} </Text>
          <View style={{...styles.inputContainer, flexDirection : isRTL ? 'row-reverse' :'row'}}>
            <View><Icon name="key-variant" size={20} color="#888" style={styles.icon} /></View>
            <TextInput
              style={{...styles.textInput, paddingHorizontal : 7, textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
              placeholder={t('loginPage.inputPasswordText')}
              cursorColor ='#888'
              secureTextEntry={pwdSeenState}
              onChangeText={(text) => setLoginD({...loginD, Pwd: text })}
            />
            <View><Icon name="eye-off" size={20} color="#888" style={styles.icon} onPress={() => setPWDSeenState(!pwdSeenState)} /></View>
          </View>

           <TouchableOpacity style={{width: '100%',  height: 40, justifyContent:'center', backgroundColor:'#dc3545', marginTop: 30,  paddingHorizontal: 10, borderRadius: 50}} onPress={() => logInSystem()} >
                  <Text style={{alignSelf: 'center', fontFamily:'Droid', color:'white' }} >{t('loginPage.btnLogInText')} </Text>
           </TouchableOpacity> 

           <Text style={{fontFamily:'Droid', marginTop:14, fontSize: 14, alignSelf: isRTL ? 'flex-end' : 'flex-start',}} >{t('loginPage.inscrireLinkText')}</Text> 

           <TouchableOpacity style={{height:'auto', width:'100%' , marginBottom: 20,  marginTop : 15, borderWidth :1, borderColor:"#dfdfdf" , padding: 10, borderRadius:50 }} onPress = {() => navigation.navigate('UserSignUpPage')} >
              <Text style={{alignSelf: 'center',fontFamily:'Droid', color:'#dc3545'}} >{t('loginPage.inscrireLinkText')} </Text>
           </TouchableOpacity>

           <Text style={{fontFamily:'Droid', fontSize: 14, alignSelf: isRTL ? 'flex-end' : 'flex-start',}} >{t('loginPage.pleaseInscrireOneText')}</Text> 
           <Text style={{fontFamily:'Droid', fontSize: 14, alignSelf: isRTL ? 'flex-end' : 'flex-start',}} >{t('loginPage.pleaseInscrireTwoText')}</Text> 

        </View>
        </ScrollView>
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
