import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, AppState } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation, Trans } from 'react-i18next';
import StackBarCard from '../src/AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../src/AssetsM/Cards/BottomCard/usedButtomCard';
import { useNavigation } from '@react-navigation/native';


const CountryPage = () => {
  /* ############################[Variable ]################################ */
  let [xxxxxxx, setxxxxxxx] = useState()
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  /* ############################[UseEffect]################################ */
  useEffect(() => {

  },[])

  /* ############################[Functions]################################ */
  const SelectCountry = (lan, country) => {
    i18n.changeLanguage(lan)
    navigation.navigate('MainPage')
  }

  /* ############################[Card     ]################################ */
  const FirstAndSecondText = () => {
    return(<>
      <View style={{padding : 1, height : 'auto', marginTop: 50,  marginBottom: 10, }}>
        <Text style={{fontSize:30, color:'grey' ,fontFamily:'Droid', textAlign:'center'}}>
            Abyedh IS the First Super-app in the Globe
        </Text>
        <Text style={{fontSize:20, fontWeight: 800, marginTop: 10,  color:'grey' ,fontFamily:'Droid', textAlign:'center'}}>
            it's amazing to do all your daily activities with one app !
        </Text>
      </View> 
    </>)
  }

  const AutoSelectdCountry = () => {
    return(<>
      <View style={{padding : 1, height : 150, marginBottom: 10,  backgroundColor :'blue' , }}>
      </View> 
    </>)
  }

  const SelectCountryCard = () => {
    return(<>
      {/* Africa */}
      <Text style={{ fontSize: 20, color: '#275e40', marginLeft: 16 }}>Africa</Text>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ar_TN', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/tn.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>تونس</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ar_TN', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/ma.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>المغرب</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ar_TN', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/eg.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid', marginTop: 2 }}>مصر</Text>
        </TouchableOpacity>
        {/* Add more TouchableOpacity components for other countries */}
      </View>

      {/* Europe */}
      <Text style={{ fontSize: 20, color: '#0a8a44', marginLeft: 16 }}>Europe</Text>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('fr_FR', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/fr.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>France</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('it_IT', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/it.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>Italia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('de_DE', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/de.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>Deutschland</Text>
        </TouchableOpacity>
         
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
         
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('en_GB', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/gb.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>U K</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ru', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/ru.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>россия</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }} ></View>
      </View>

      {/* America */}
      <Text style={{ fontSize: 20, color: '#158a4a', marginLeft: 16 }}>America</Text>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('en_CA', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/ca.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>Canada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('en_US', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/us.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>United State</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }} ></View>
      </View>

      {/* Asia */}
      <Text style={{ fontSize: 20, color: '#6a8a15', marginLeft: 16 }}>Asia</Text>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ar_SA', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/sa.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>السعودية</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ar_QA', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/qa.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>قطر</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ar_AE', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/ae.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>الإمارات المتحدة العربية</Text>
        </TouchableOpacity>
         
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
         
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('ja', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/jp.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>日本</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('hi', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/in.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>भारत</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => SelectCountry('zh_CN', 'TN')}>
          <Image source={{ uri: 'https://flagpedia.net/data/flags/w580/cn.webp' }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'Droid',  marginTop: 2 }}>中国</Text>
        </TouchableOpacity>
      </View> 
    </>)
  }

  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
            <ScrollView style={{ marginHorizontal:0, paddingHorizontal : 10  }}>
                
                <FirstAndSecondText />
      
                <AutoSelectdCountry />
      
                <SelectCountryCard />
                 
                <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
            </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default CountryPage;
