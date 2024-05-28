import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity,  Button,  Switch,  TextInput, Textarea, Image,  ActivityIndicator, Dimensions, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
import GConf from '../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { useNavigation } from '@react-navigation/native';
import WorldMap from '../AssetsM/worldMap';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import { Checkbox } from 'react-native-paper';

const GeneralProfileData = ({ inscData, setInscData, PDL, Tag, GConf, GouvChanged, gouvList, setGouvListe, targetSystem, OnKeyPressFunc }) => {
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  const GenerateGenreListe = () => {
      return GConf.ADIL[Tag].subCateg.map(item => ({
          key: item.id.toString(),
          label: t(`landingPage.itemsToSelect.${Tag}.${item.imgSrc}`),
          value: t(`landingPage.itemsToSelect.${Tag}.${item.imgSrc}`),
      }));
  }

  useEffect(() => {
      GGLFunction();
  }, []);

  const GGLFunction = () => {
      let lastList = [];
      WorldMap.states.filter(state => state.country === GConf.Country).forEach((data, index) => {
          lastList.push({ id: index, value: data.name, text: data.name });
      });
      setGouvListe(lastList);
  }

  return (
      <View  >
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
              <Ionicons name='home-outline' size={20} color="#6c757d" />
              <Text style={{ textAlign: isRTL ? 'right' : 'left', color: '#6c757d', fontFamily :'Droid', fontSize: 18, marginBottom: 10 }} >   {t('subscribeToSystems.infoGeneraleText', { one: t(`landingPage.systemOwnersNames.${Tag}`) })} </Text>
          </View>
           
          <View style={{ marginBottom: 10 }}>
              <Text style={{fontFamily :'Droid',  color: '#6c757d' }}>
                  {t('subscribeToSystems.infoGeneraleData.nomEtPrenon', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#ebebeb', borderRadius: 50, width: '100%', height: 40, paddingHorizontal: 10, flexDirection : isRTL ? 'row-reverse' :'row'}}>
                <Icon name="account-arrow-left" size={20} color="#888"  />
                <TextInput
                  style={{flex: 1, paddingHorizontal: 5, height: '100%', textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                  placeholder={t(`landingPage.systemOwnersNames.${Tag}`)}
                  cursorColor ='#888'
                  value={inscData.name}
                  onChangeText={(text) => setInscData({ ...inscData, name: text })}
                  onKeyPress={event => OnKeyPressFunc(event)}
                />
              </View>
          </View>

          <View style={{ marginBottom: 10 }}>
                <Text style={{fontFamily :'Droid',  color: '#6c757d' }}>
                    {t('subscribeToSystems.infoGeneraleData.genreText', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
                </Text>
                <View
                style={{ alignItems: 'center', backgroundColor: '#ebebeb', borderRadius: 50,  height: 40, paddingHorizontal: 2, flexDirection : isRTL ? 'row-reverse' :'row'}}
                >
                <Picker
                  selectedValue={inscData.Genre}
                  onValueChange={(itemValue, itemIndex) => setInscData({ ...inscData, Genre: itemValue })}
                  style={{flex: 1 }}
                  pickerStyleType
                >
                  {GenerateGenreListe().map(item => (
                      <Picker.Item key={item.key} label={item.label} value={item.value} style={{fontFamily:'Droid'}} />
                  ))}
              </Picker>
              </View>
          </View>

          <View style={{ marginBottom: 10 }}>
              <Text style={{fontFamily :'Droid', color: '#6c757d' }}>
                  {t('subscribeToSystems.infoGeneraleData.PhoneText', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#ebebeb', borderRadius: 50, width: '100%', height: 40, paddingHorizontal: 10, flexDirection : isRTL ? 'row-reverse' :'row'}}>
                <Icon name="phone-plus" size={20} color="#888"  />
                <TextInput
                  style={{flex: 1, paddingHorizontal: 5, height: '100%', textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                  placeholder={t('subscribeToSystems.infoGeneraleData.PhoneTextPlaceholder', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
                  cursorColor ='#888'
                  value={inscData.name}
                  onChangeText={(text) => setInscData({ ...inscData, name: text })}
                  onKeyPress={event => OnKeyPressFunc(event)}
                />
              </View>
          </View>
          
          
          <View style={{ marginBottom: 10 }}>
                <Text style={{fontFamily :'Droid',  color: '#6c757d' }}>
                      {t('subscribeToSystems.infoGeneraleData.positionGeoText', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
                </Text>
                <View
                      style={{ alignItems: 'center', marginBottom : 8, backgroundColor: '#ebebeb', borderRadius: 50,  height: 40, paddingHorizontal: 2, flexDirection : isRTL ? 'row-reverse' :'row'}}
                  >
                      <Picker
                        selectedValue={inscData.gouv}
                        onValueChange={(itemValue, itemIndex) => GouvChanged('profile', itemValue)}
                        style={{flex: 1 }}
                        pickerStyleType
                      >
                        {gouvList.map(item => (
                            <Picker.Item key={item.id} label={item.text} value={item.value} />
                        ))}
                    </Picker>
                </View>
                <View
                      style={{ alignItems: 'center', backgroundColor: '#ebebeb', borderRadius: 50,  height: 40, paddingHorizontal: 2, flexDirection : isRTL ? 'row-reverse' :'row'}}
                  >
                      <Picker
                        selectedValue={inscData.deleg}
                        onValueChange={(itemValue, itemIndex) => setInscData({ ...inscData, deleg: itemValue })}
                        style={{flex: 1 }}
                        pickerStyleType
                      >
                      {PDL.map(item => (
                          <Picker.Item key={item.id} label={item.text} value={item.value} />
                      ))}
                    </Picker>
                </View>
          </View>
          
          <View style={{ marginBottom: 10 }}>
              <Text style={{fontFamily :'Droid',  color: '#6c757d' }}>
              {t('subscribeToSystems.infoGeneraleData.AdesssText', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
              </Text>
              <View style={{flexDirection: 'row', height: 'auto',  alignItems: 'center', backgroundColor: '#ebebeb', borderRadius: 15, width: '100%',   paddingHorizontal: 10, flexDirection : isRTL ? 'row-reverse' :'row'}}>
                <TextInput
                  onKeyPress={event => OnKeyPressFunc(event)}
                  placeholder={t('subscribeToSystems.infoGeneraleData.AdesssText', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
                  value={inscData.adresse}
                  onChangeText={(text) => setInscData({ ...inscData, adresse: text })}
                  cursorColor ='#888'
                  multiline={true}
                  numberOfLines={4}
                  style={{flex: 1, paddingHorizontal: 5, height: '100%', textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
                />
              </View>
          </View>
      </View>
  );
}

const Location = ({ Tag, position, handleLocationSelected, GetMyLocation }) => {
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  return (
    <View style={{ marginTop : 40  }}>
        <View style={{ flexDirection:  isRTL ? 'row-reverse' : 'row', }}>
            <View style={{ flex: 10,  flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Ionicons name='home-outline' size={20} color="#6c757d" />
                <Text style={{ textAlign: isRTL ? 'right' : 'left', color: '#6c757d', fontFamily :'Droid', fontSize: 18, marginBottom: 10 }} >   {t('subscribeToSystems.PositionGpsText')} </Text>
            </View>
            <View style={{ flex: 2, alignItems: isRTL ? 'flex-start' : 'flex-end' }}>
              <TouchableOpacity onPress={GetMyLocation} style={{ backgroundColor: '#dfdfdf', borderRadius: 50, padding: 10 }}>
                <Ionicons name='pin' />
              </TouchableOpacity>
            </View>
        </View>

        <Text style={{fontFamily :'Droid', marginBottom: 20, fontSize : 8 }} >
          {t('subscribeToSystems.PositionGpsClickHereText')}
        </Text>

        <MapView
          style={{ height: 200,   borderWidth: 1,   borderColor: '#ccc', borderRadius : 15 }}
          initialRegion={{
            latitude: position.Lat,
            longitude: position.Lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => handleLocationSelected(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={{ latitude: position.Lat, longitude: position.Lng }}>
            <View>
              <Text>📍</Text>
            </View>
          </Marker>
        </MapView>
    </View>
  );
}

const Horaire = ({ alwaysState, setAlwaysState, timming, setTimming, setPauseDay, SetTimmingData, UpdateTimmingData, setSelectedUpdateDay, selectedUpdateDay }) => {
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  const [addInput, setAddInput] = useState(false);
  const [dateDataToChange, setDateDataToChange] = useState({
    pauseDay: false,
    matinStart: '08:00',
    matinFinsh: '12:00',
    soirStart: '14:00',
    soirFinsh: '18:00'
  });

  const weekDays = [
    { key: 'af', value: 'Lun', text: t('subscribeToSystems.HoraireData.weekDayes.lundi') },
    { key: 'ax', value: 'Mar', text: t('subscribeToSystems.HoraireData.weekDayes.mardi') },
    { key: 'al', value: 'Mer', text: t('subscribeToSystems.HoraireData.weekDayes.mercredi') },
    { key: 'dz', value: 'Jeu', text: t('subscribeToSystems.HoraireData.weekDayes.jeudi') },
    { key: 'as', value: 'Vend', text: t('subscribeToSystems.HoraireData.weekDayes.vendredi') },
    { key: 'ad', value: 'Sam', text: t('subscribeToSystems.HoraireData.weekDayes.samedi') },
    { key: 'ao', value: 'Dim', text: t('subscribeToSystems.HoraireData.weekDayes.dimanche') },
  ];

  const ArabificationDate = (dateName) => {
    switch (dateName) {
      case 'Lun': return 'الإثــنين';
      case 'Mar': return 'الثلاثــاء';
      case 'Mer': return 'الإربــعاء';
      case 'Jeu': return 'الخميس';
      case 'Vend': return 'الجـمعة';
      case 'Sam': return 'الســبت';
      case 'Dim': return 'الأحـــد';
      default: return '';
    }
  };

  const DayHoraire = (props) => {
    return (
      <View style={{ flexDirection:  isRTL ? 'row-reverse' : 'row', marginBottom: 5, ...(props.data.dayOff ? { color: 'red' } : {}) }}>
        <View style={{ flex: 3 }}>
          <Text style={{ fontFamily :'Droid' }}>{weekDays.find(day => day.value === props.data.day)?.text}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text style={{fontFamily :'Droid', fontSize: 12}} >{props.data.matin.start} - {props.data.matin.end}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text style={{fontFamily :'Droid', fontSize: 12}} >{props.data.soir.start} - {props.data.soir.end}</Text>
        </View>
        <TouchableOpacity style={{ flex: 2 }} onPress={() => OpenEditTime(props.data.day)}>
          {/* <Text style={{fontFamily :'Droid', color: 'gray' }}>✏️</Text> */}
          <Ionicons name='hourglass-outline' size={20} color="#6c757d" />
        </TouchableOpacity>
      </View>
    );
  };

  const OpenEditTime = (value) => {
    setSelectedUpdateDay(value);
    setAddInput(true);
  };

  const UpdateTimingFunc = () => {
    const targetIndex = timming.findIndex(element => element.day === selectedUpdateDay);
    let copyOfHoraire = [...timming];
    copyOfHoraire[targetIndex] = {
      day: selectedUpdateDay,
      dayOff: dateDataToChange.pauseDay,
      matin: { start: dateDataToChange.matinStart, end: dateDataToChange.matinFinsh },
      soir: { start: dateDataToChange.soirStart, end: dateDataToChange.soirFinsh }
    };
    setTimming(copyOfHoraire);
    setAddInput(!addInput);
  };

  return (
    <View style={{ marginTop : 40 }}>
      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <Ionicons name='calendar-outline' size={20} color="#6c757d" />
          <Text style={{ textAlign: isRTL ? 'right' : 'left', color: '#6c757d', fontFamily :'Droid', fontSize: 18, marginBottom: 10 }} >  {t('subscribeToSystems.HoraireText')} </Text>
      </View>
      
      <View>
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Text style={{fontFamily :'Droid', color: 'green', fontSize: 15 }}>{t('subscribeToSystems.HoraireData.alwaysOpenOne')}</Text>
            <Text style={{fontFamily :'Droid', fontSize: 12}} >{t('subscribeToSystems.HoraireData.alwaysOpenTwo')}</Text>
          </View>
          <Switch value={alwaysState} onValueChange={() => setAlwaysState(!alwaysState)} />
        </View>

        {addInput ? 
            <View style={{ padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 10 }}>
               <TouchableOpacity onPress={() => setAddInput(!addInput)}>
                    <Text style={{fontFamily :'Droid', color: 'red', marginBottom: 10 }}>❌</Text>
              </TouchableOpacity>
              <Text style={{fontFamily :'Droid',  marginBottom: 10 }}>هل يوم {ArabificationDate(selectedUpdateDay)} يوم راحة؟</Text>
              <Picker
                selectedValue={dateDataToChange.pauseDay}
                onValueChange={(value) => setDateDataToChange({ ...dateDataToChange, pauseDay: value })}
                style={{ marginBottom: 10 }}>
                <Picker.Item label="لا" value={false} />
                <Picker.Item label="نعم" value={true} />
              </Picker>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <TextInput
                  style={{fontFamily :'Droid', flex: 1, marginRight: 5 }}
                  value={dateDataToChange.matinStart}
                  onChangeText={(value) => setDateDataToChange({ ...dateDataToChange, matinStart: value })}
                />
                <TextInput
                  style={{fontFamily :'Droid', flex: 1, marginLeft: 5 }}
                  value={dateDataToChange.matinFinsh}
                  onChangeText={(value) => setDateDataToChange({ ...dateDataToChange, matinFinsh: value })}
                />
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <TextInput
                  style={{ fontFamily :'Droid', flex: 1, marginRight: 5 }}
                  value={dateDataToChange.soirStart}
                  onChangeText={(value) => setDateDataToChange({ ...dateDataToChange, soirStart: value })}
                />
                <TextInput
                  style={{fontFamily :'Droid',  flex: 1, marginLeft: 5 }}
                  value={dateDataToChange.soirFinsh}
                  onChangeText={(value) => setDateDataToChange({ ...dateDataToChange, soirFinsh: value })}
                />
              </View>
              <Button title={`تعديل وقت يوم ${ArabificationDate(selectedUpdateDay)}`} onPress={UpdateTimingFunc} /> 
            </View>
            : 
            <View>
              <View style={{ justifyContent:'space-between',  flexDirection:  isRTL ? 'row-reverse' : 'row', marginBottom: 10 }}>
                <Text style={{ flex: 1, fontFamily :'Droid', }}>{t('subscribeToSystems.HoraireData.dayText')}</Text>
                <Text style={{ flex: 1, fontFamily :'Droid', }}>{t('subscribeToSystems.HoraireData.matinText')}</Text>
                <Text style={{ flex: 1 , fontFamily :'Droid',}}>{t('subscribeToSystems.HoraireData.soirText')}</Text>
              </View>
              {timming.map((data, index) => (
                <DayHoraire key={index} data={data} />
              ))}
            </View>
        }
      </View>

    </View>
  );
}



const FastSearch = () => {
  /* ############################[Variable ]################################ */
  const route = useRoute();
  const { Tag } = route.params;
  let UID =  94298498428984; //GConf.UserData.UData.UID
  let [clientActivated, setClientActivated] = useState(false)
  
  let {system} = Tag
  const Today = new Date()
  const targetSystem = GConf.ADIL[Tag]
  let [okayForCondition , setOkayForCondition] = useState(false)
  let [test , setTest] = useState(10)

  let [userData, setUserData] = useState({name :'', phone:'', birthday:Today.toISOString().split('T')[0] , gouv:'',deleg:''})
  let [inscData, setInscData] = useState({name :'', phone:'', adresse:'' , gouv:'', deleg:''})

  
  let [UDL ,setUDL] = useState([])
  let [PDL ,setPDL] = useState([])

  let [selectedUpdateDay , setSelectedUpdateDay] = useState('Lun')
  let [alwaysState , setAlwaysState] = useState(false)
  let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}}])
  
  let [loaderState, setLS] = useState(false)
  let [saveBtnState, setSaveBtnState] = useState(false)
  
  let [gouvList ,setGouvListe] = useState([])
  const defPosition = WorldMap.worldCountries.filter(state => state.value === GConf.Country)
  let [position, setPosition] = useState({Lat: defPosition[0].lat, Lng: defPosition[0].lng})
  let [openModal,setOpenMoadal] = useState(false)

  const navigation = useNavigation();

  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);


  /* ############################[UseEffect]################################ */
    useEffect(() => {
        if (GConf.UserData.Logged) {
            setUserData({name :GConf.UserData.UData.Name , phone:GConf.UserData.UData.PhoneNum , Sex :GConf.UserData.UData.Sex , birthday: GConf.UserData.UData.BirthDay , gouv: GConf.UserData.UData.BirthGouv ,deleg: GConf.UserData.UData.BirthDeleg}) 
        }
        const defPosition = WorldMap.worldCountries.filter(state => state.value === GConf.Country)
        
        setPosition({Lat: defPosition[0].lat, Lng: defPosition[0].lng})
    },[])

  /* ############################[Functions]################################ */
      const OnKeyPressFunc = (e) => {
          const charCode = e.charCode || e.keyCode;
          if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || charCode === 42 || charCode === 32 || charCode === 47 || (charCode >= 0x0600 && charCode <= 0x06FF))) {
              e.preventDefault();
          }
      }

      const GouvChanged = (genre,value) =>{
          if (genre == 'user') {
              setUserData({...userData, gouv: value })
              //const found = GConf.abyedhMap.Deleg.filter(element => element.key === value)
              const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
              let lastList1 = []
              found.map((data,index) => {
                  lastList1.push({id:index, value:data.name , text:data.name})
              })
              setUDL(lastList1)

            
          } else {
              setInscData({...inscData, gouv: value })
              //const found = GConf.abyedhMap.Deleg.filter(element => element.Tag === value)
              const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
              let lastList1 = []
              found.map((data,index) => {
                  lastList1.push({id:index, value:data.name , text:data.name})
              })
              setPDL(lastList1)
              const gouvCord = WorldMap.states.filter(state => state.country === GConf.Country).filter(element => element.name === value)
              
              setPosition({Lat: gouvCord[0].lat, Lng: gouvCord[0].lng})
          }
      }
      const SetTimmingData = (day,time,genre,value) => {
          const targetIndex = timming.findIndex(element => element.day === day)
          let copyOfHoraire = timming

          if (time == 'matin') {
              if (genre == 'start') {
                  copyOfHoraire[targetIndex].matin.start = value
                  setTimming(copyOfHoraire)
              } else {
                  copyOfHoraire[targetIndex].matin.end = value
                  setTimming(copyOfHoraire)
              }
          } else {
              if (genre == 'start') {
                  copyOfHoraire[targetIndex].soir.start = value
                  setTimming(copyOfHoraire)
              } else {
                  copyOfHoraire[targetIndex].soir.end = value
                  setTimming(copyOfHoraire)
              }
          }

      }
      const UpdateTimmingData = (day,time,genre,value) => {
          //setTimming(...timming)
          setTest(Math.random())
          toast.success("", GConf.TostAddedToTimming)

      }  
      const setPauseDay = (day,state) =>{
          const targetIndex = timming.findIndex(element => element.day === day)
          let copyOfHoraire = timming
          copyOfHoraire[targetIndex].dayOff = !state
          setTimming(copyOfHoraire)
          setTest(Math.random())
      }
      const  handleClick = (targetSystem) => {
          ReactGA.event({
            category: targetSystem,
            action: 'SystemGenre',
            label: targetSystem
          });
      }

      const Inscription = () =>{
              handleClick(Tag)
              if (!userData.name || userData.name == '') {toast.error("أدخل إسم و لقب المستخدم !", GConf.TostErrorGonf)}
              else if (!userData.phone || userData.phone == '' ) {toast.error("أدخل هاتف المستخدم !", GConf.TostErrorGonf)}
              else if (!userData.birthday || userData.birthday == '' ) {toast.error("أدخل تاريخ ميلاد المستخدم !", GConf.TostErrorGonf)}
              //else if (!userData.Sex || userData.Sex == '' ) {toast.error("أدخل جنس المستخدم !", GConf.TostErrorGonf)}
              //else if (!userData.gouv || userData.gouv == '' ) {toast.error("أدخل  ولاية المستخدم !", GConf.TostErrorGonf)}
              //else if (!userData.deleg || userData.deleg == '' ) {toast.error("أدخل  مدينة المستخدم !", GConf.TostErrorGonf)}
              else if (!inscData.name || inscData.name == '' ) {toast.error("أدخل  إسم العمل ", GConf.TostErrorGonf)}
              else if (!inscData.phone || inscData.phone == '' ) {toast.error("أدخل  هاتف العمل ", GConf.TostErrorGonf)}
              else if (!inscData.adresse || inscData.adresse == '' ) {toast.error("أدخل  عنوان العمل ", GConf.TostErrorGonf)}
              else if (!inscData.gouv || inscData.gouv == '' ) {toast.error("أدخل  ولاية العمل ", GConf.TostErrorGonf)}
              else if (!inscData.deleg || inscData.deleg == '' ) {toast.error("أدخل  مدينة العمل ", GConf.TostErrorGonf)}
              else if (!timming) {toast.error("أدخل أوقات العمل  !", GConf.TostErrorGonf)}
              else if (!okayForCondition ) {toast.error("يحب أن توافق علي شروط الأستخدام ", GConf.TostErrorGonf)}
              else{
                  setLS(true)
                  axios.post(`${GConf.ApiLink}/systems/save`, {
                      system : Tag,
                      userData : userData,
                      UID : GConf.UserData.UData.UID,
                      inscData : inscData,
                      horaireData : timming,
                      alwaysOpen : alwaysState,
                      position : position,
                      addTodirectory : localStorage.getItem('AddToDirectory') ? localStorage.getItem('AddToDirectory')  : false
                  }).then(function (response) {
                      if(response.data.PID) {
                          if (!localStorage.getItem('AddToDirectory')) { localStorage.setItem('AddToDirectory', response.data.Req_ID); }
                          setSaveBtnState(true)
                          setLS(false)
                          //setOpenMoadal(true)
                          localStorage.setItem('PID', response.data.PID);
                          localStorage.setItem('APP_Tag', Tag);
                          window.location.href = `/App/Login/${Tag}`
                      }
                      else{
                          toast.error('حاول مرة أخري', GConf.TostSuucessGonf)
                          setLS(false)
                      }
                  }).catch((error) => {
                      if(error.request) {
                        toast.error(<><div><h5>مشكل في الإتصال</h5> لم نتمكن من الوصول لقاعدة البيانات </div></>, GConf.TostInternetGonf)   
                        setLS(false)
                      }
                    });
                  
              }
      }
      const MapEventsHandler = ({ onLocationSelected }) => {
          useMapEvents({
            click: (e) => {
              const { lat, lng } = e.latlng;
              onLocationSelected({ lat, lng });
            },
          });
        
          return null;
      };

      const handleLocationSelected = (location) => {
          setPosition({Lat: location.lat , Lng:location.lng})
      };

      const GetMyLocation = () =>{
          // navigator.geolocation.getCurrentPosition(
          //     function(position) {
          //         if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
          //         else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
          //         else{
          //             setPosition({Lat:position.coords.latitude, Lng:position.coords.longitude})
          //         }
          //     },
          //     function(error) {
          //         toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
          //     }
          // );
          Alert.alert('No Location')
      }
      function findElementByLink(link) {
          for (const category in dirItem) {
            if (dirItem[category] && dirItem[category].slides) {
              for (const slide of dirItem[category].slides) {
                if (Array.isArray(slide)) {
                  for (const subSlide of slide) {
                    if (subSlide.link === link) {
                      return subSlide.name
                    }
                  }
                } else if (slide.link === link) {
                  return slide.name
                }
              }
            }
          }
          return null;
      }


  /* ############################[Card     ]################################ */
    const UserCard = () => {
        return (
            <TouchableOpacity 
                // onPress={() => navigation.navigate('User', { Tag })}
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    borderWidth : 1,
                    borderRadius : 14,
                    borderColor : '#dfdfdf',
                    padding: 15,
                    margin: 10
                }}
            >
                <View style={{ flexDirection: isRTL ? 'row' : 'row-reverse'  }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Ionicons name={isRTL ? 'arrow-back-outline' : 'arrow-forward-outline' } size={20} color="#6c757d" />
                    </View>
                    <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <Text style={{fontFamily :'Droid', color: '#6c757d',   }} numberOfLines={1} >
                            {t('subscribeToSystems.inscriptionUserWith')} : Khelifi houssem
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , width: 30, height: 30, borderRadius : 15,  overflow: 'hidden',}}>
                        <Image
                            source={{ uri: `https://cdn.abyedh.tn/images/p_pic/05.gif` }}
                            style={{ width: 30, height: 30, borderRadius: 15 }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    const BtnCard = () => {
        return (
            <View style={{ marginBottom: 15, marginTop : 40}}>
                 
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                    <Ionicons name='save-outline' size={20} color="#6c757d" />
                    <Text style={{ textAlign: isRTL ? 'right' : 'left', color: '#6c757d', fontFamily :'Droid', fontSize: 18, marginBottom: 10 }} >  {t('subscribeToSystems.InscriptionLastText')} </Text>
                </View>

                <View style={{  marginTop: 10 }}>
                    <View style={{ padding : 10 }}>
                        <Text style={{fontFamily :'Droid',  color: '#6c757d' }}>
                            <Text>• {t('subscribeToSystems.InscriptionLast.firstCondition')}</Text>
                            {'\n'}• {t('subscribeToSystems.InscriptionLast.secondCondition')}
                            {'\n'}• <Text style={{fontFamily :'Droid', color: 'red' }}>⚠</Text> {t('subscribeToSystems.InscriptionLast.thirdCondition')}
                        </Text>
                    </View>


                    <View style={{alignItems: isRTL ? 'flex-end' : 'flex-start', marginVertical : 20 }}>
                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between',  marginBottom: 10, alignItems: 'center' }}>
                            <Text style={{ fontFamily :'Droid', flex: 8, textAlign: isRTL ? 'right' : 'left' }}>
                                {t('subscribeToSystems.InscriptionLast.okayCondition')}
                            </Text>
                            <View style={{ flex: 4 , }}>
                                <Checkbox
                                    status={true ? 'checked' : 'unchecked'}
                                    //status={okayForCondition ? 'checked' : 'unchecked'}
                                     
                                    onValueChange={setOkayForCondition}
                                />
                                
                                {/* <Text style={{textAlign: isRTL ? 'left' : 'right'}} >CK</Text> */}
                            </View>
                        </View>
                        
                    </View>
                    

                    <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center',  backgroundColor : GConf.ADIL[Tag].themeColor, borderRadius : 50,  paddingVertical : 10}} onPress={Inscription} >
                          <Text style={{fontFamily: 'Droid', color:'white', textAlign:'center'}} >{t('subscribeToSystems.InscriptionLast.InscriptionButtonText')}</Text>
                          {loaderState && ( <ActivityIndicator size="small" color="white" style={{ marginLeft: 10 }} />)}
                    </TouchableOpacity>                    

                </View>


            </View>
        );
    }

    return (
      <SafeAreaProvider style={{backgroundColor : 'white'}}>
          <SafeAreaView style={{ flex: 1}} >
            
              <StackBarCard backColor='' leftCom=''   backLink='MainPage' rigthImage='05.gif' clickOption=''  />

              
                  
                   
                    {!GConf.UserData.Logged ? 
                      <ScrollView style={{ paddingHorizontal:10, direction: isRTL ? 'rtl' : 'ltr', fontFamily: 'Droid' }}>
                        
                        <Text style={{
                          textAlign: 'center',
                          color: targetSystem.themeColor,
                          fontSize: 20,
                          fontFamily :'Droid',
                          marginVertical: 20
                        }}>
                          {t('subscribeToSystems.mainTitle', { one: t(`landingPage.systemOwnersNames.${Tag}`) })}
                        </Text>
                        
                        <UserCard />

                        <View style={{   padding: 15, marginVertical: 15  }}>
                           <GeneralProfileData
                            OnKeyPressFunc={OnKeyPressFunc}
                            Tag={Tag}
                            GConf={GConf}
                            inscData={inscData}
                            setInscData={setInscData}
                            PDL={PDL}
                            targetSystem={targetSystem}
                            GouvChanged={GouvChanged}
                            gouvList={gouvList}
                            setGouvListe={setGouvListe}
                          />
                          <Location
                            position={position}
                            handleLocationSelected={handleLocationSelected}
                            GetMyLocation={GetMyLocation}
                            Tag={Tag}
                          />
                          <Horaire
                            alwaysState={alwaysState}
                            setAlwaysState={setAlwaysState}
                            timming={timming}
                            setTimming={setTimming}
                            setPauseDay={setPauseDay}
                            SetTimmingData={SetTimmingData}
                            setSelectedUpdateDay={setSelectedUpdateDay}
                            selectedUpdateDay={selectedUpdateDay}
                            UpdateTimmingData={UpdateTimmingData}
                          /> 

                          <BtnCard /> 

                        </View>
                        <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
                      </ScrollView>
                     : 
                      <View style={{justifyContent:'center', alignContent:'center', paddingHorizontal:20,  idth: '100%', padding: 10, color: '#6c757d' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                          <View style={{  alignItems: 'center' }}>
                            <Image
                              source={{ uri: 'https://cdn.abyedh.tn/Images/required/log-in.png' }}
                              style={{ width: 150, height: 150, marginBottom: 20 }}
                              resizeMode="contain"
                            />
                          </View>
                          <View style={{  alignItems: 'center' }}>
                            <Text style={{fontFamily :'Droid', color: '#dc3545', fontSize: 20 }}>
                              {t('subscribeToSystems.shouldLogInData.shouldText')}
                            </Text>
                            <Text style={{fontFamily :'Droid', fontSize: 15 }}>
                              {t('subscribeToSystems.shouldLogInData.detailText', { one: t(`landingPage.systemNames.${Tag}`) })}
                            </Text>
                              <TouchableOpacity
                                  style={{   flexDirection:  'row', alignItems: 'center' , justifyContent:'center',   width: Dimensions.get('window').width -40, padding: 10,  paddingHorizontal: 15,
                                  borderRadius: 50,
                                  borderColor: '#dfdfdf',
                                  borderWidth: 1,
                                  marginTop: 15, }}
                                  onPress={() => navigation.navigate('UserLogInPage')}
                                >
                                  <Text style={{  color: '#dc3545', fontFamily :'Droid', marginRight: 10 }}>
                                    {t('subscribeToSystems.shouldLogInData.clicLink')}
                                  </Text>
                                  <Text style={{  fontFamily :'Droid', color: '#dc3545', fontSize: 18 }}>
                                      <Ionicons name={isRTL ? 'arrow-back-outline' : 'arrow-forward-outline' } size={20} color="#dc3545" />
                                  </Text>
                              </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    }

                  

        </SafeAreaView>
      </SafeAreaProvider>
    );
};

 

export default FastSearch;
