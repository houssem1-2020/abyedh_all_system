import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { View, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator ,  Dimensions ,Text, Image, Button} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';
import GConf from '../AssetsM/generalConf';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView, { Marker, Callout } from 'react-native-maps';
import WorldMap from '../AssetsM/worldMap';

const ResultPage = () => {
  /* ############################[Variable ]################################ */
  const route = useRoute();
  const { Tag , subTag,  gouv, deleg} = route.params;
  //const { Tag } = route.params;
  //Tag = 'restaurant'
  let [openMapModal,setOpenMM] = useState(false)
  let [loading,setLoading] = useState(true)
  let [filterLoader,setFilterLoader] = useState(false)
  let [resultList,setResultList] = useState([])
  let [localiteList,setLocaliteL] = useState([])
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  const refRBSheet = useRef();
  const [position, setPosition] = useState({latitude :36.7881, longitude :10.1315})

  /* ############################[UseEffect]################################ */
  useEffect(() => {
 
     axios.post(`${GConf.ApiLink}/search`, {
         tag:  Tag,
         genre: 'dentiste', //subTag,
         gouv: 'Tunis', //gouv,
         deleg : 'Carthage', //deleg
       })
       .then(function (response) {
         setResultList(response.data)
         setLoading(false)
       }).catch((error) => {
         if(error.request) {
           ToastAndroid.show('Probleme de connection !', ToastAndroid.LONG)  
           setResultList([])
           setLoading(false)
           }
       });

      //  let selectedGouv =  WorldMap[GConf.Country].filter(gouvr => gouvr.name == deleg)
      //   //let position = [0,0]
      //   if (selectedGouv[0]) {
      //       setPosition({latitude :selectedGouv[0].lat, longitude :selectedGouv[0].lng})  
      //   } 

   }, [])

  /* ############################[Functions]################################ */
  const SaveFunction = () => {

  }
  /* ############################[Card     ]################################ */
  const ResultEmpty = () => {
    return(<>
      <View style={{padding : 1, height : 200, marginBottom: 10,  backgroundColor :'red' , }}>
      </View> 
    </>)
  }
  const ResultCard = (props) => {
    const HalfStarRating = ({ rating }) => {
        const wholeStars = Math.floor(rating);
        const hasHalfStar = rating - wholeStars !== 0;

        return (
            <View style={{ flexDirection: 'row' }}>
                {[...Array(wholeStars)].map((_, index) => (
                    <Ionicons key={index} name="star" size={14} color="yellow" />
                ))}
                {hasHalfStar && (
                    <Ionicons name="star-half" size={14} color="yellow" />
                )}
                {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                    <Ionicons key={index} name="star-outline" size={14} color="grey" />
                ))}
            </View>
        );
    };

    return (
        <TouchableOpacity style={{ borderColor: '#e3e3e3', borderWidth:1, borderRadius:12, marginBottom: 7, padding:11, flexDirection:'row'}} onPress={ () => navigation.navigate('ProfilePage', {Tag:Tag, PID: props.data.PID})} >
            <View style={{flex: 1 , flexDirection: isRTL ? 'row-reverse' : 'row', }}>
              <View style={{flex:1, flexDirection:'column'}} >
                    <Image
                          source={{ uri: `https://cdn.abyedh.tn/Images/Search/CIcons/${Tag}.gif` }}
                          style={{ width: 80, height: 80, borderRadius: 50 }}
                      />
                  <View style={{ flexDirection: 'column', alignItems: 'center',   }}>
                      <Text style={{  color: 'black', fontWeight: 'bold' }}>
                          {Math.min(Math.max(parseFloat(`${Math.abs(props.data.PID)}`[0] + '.' + `${Math.abs(props.data.PID)}`.slice(-1)), 1), 5)}
                      </Text>
                      <HalfStarRating rating={Math.min(Math.max(parseFloat(`${Math.abs(props.data.PID)}`[0] + '.' + `${Math.abs(props.data.PID)}`.slice(-1)), 1), 5)} />
                  </View>
              </View>
              <View style={{flex:3,  }} >
                  
                    <Text style={{ fontFamily:'Droid', fontSize: 17 ,  color: GConf.ADIL[Tag].themeColor }} numberOfLines={2} >
                        {props.data.Name} {(props.data.Activated == 'true' || props.data.Activated == 'autoSaved') ? <Ionicons name="shield-checkmark" size={20} color="#1d9bf0" /> : ''}
                    </Text>
                    <View style={{ color: 'black', marginBottom: 10 }}>
                        {props.data.Genre != '' ? <Text ><Ionicons name="pricetags" size={15} color={GConf.ADIL[Tag].themeColor} /> : {props.data.Genre}</Text> : null}
                        {props.data.Gouv != '' ? <Text><Ionicons name="location" size={15} color={GConf.ADIL[Tag].themeColor} /> : {props.data.Gouv}</Text> : null}
                        {props.data.Deleg != '' ? <Text><Ionicons name="map" size={15} color={GConf.ADIL[Tag].themeColor} /> : {props.data.Deleg}</Text> : null}
                        {props.data.Adress != '' ? <Text numberOfLines={2} style={{fontSize:11}} ><Ionicons name="map-outline" size={15} color={GConf.ADIL[Tag].themeColor} /> : {props.data.Adress}</Text> : null}
                    </View>
                    <View style={{ flexDirection:'row', alignItems:'flex-end'}} >
                        <Text style={{ color: 'black' }}>
                            <Ionicons name="thumbs-up-outline" size={14} color="black" /> {props.data.Likes_Num}
                        </Text>
                        <Text style={{ marginLeft: 10, color: 'black' }}>
                            <Ionicons name="eye-outline" size={14} color="black" /> {props.data.Views_Num >= 1000 ? (parseInt(props.data.Views_Num.toString().substring(0, 4)) / 1000).toFixed(1) + 'K' : props.data.Views_Num}
                        </Text>
                    </View>
              </View>
            </View>
        </TouchableOpacity>
    );
  };

  const FliterBox = () => {
    return(<>
      <View style={{flexDirection:'row', marginBottom: 20}}>
        <View style={{flex: 10, padding : 10, marginHorizontal: 12 , height : 'auto', marginBottom: 4, borderRadius: 20,   backgroundColor :'#e8e8e8' , }}>
          <Text>Search ... </Text>
        </View>
        <View style={{flex: 2, alignItems:'center', justifyContent:'center'}} >
          <TouchableOpacity style={{  padding:8, borderRadius:10, backgroundColor:'#e8e8e8'}} onPress={() => refRBSheet.current.open()} >
              <Ionicons size={22} name='map-outline' color={GConf.ADIL[Tag].themeColor} />
          </TouchableOpacity> 
        </View>
      </View> 
    </>)
  }

  const ShowLoadingCard = () => {
    return(<View style={{ position : 'absolute', backgroundColor: 'white', width: Dimensions.get('window').width, height: Dimensions.get('window').height, marginTop:64, zIndex:99, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size="large" color="#185fc9" /></View>)
  }
  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor={GConf.ADIL[Tag].themeColor} leftCom='' backLinkColor='white'   backLink='MainPage' rigthImage='05.gif' clickOption=''  />
 
            { loading ?  <ShowLoadingCard /> :

            <ScrollView style={{ paddingHorizontal:10, paddingTop : 15 }}>
                <FliterBox />
                 
                <>
                                {
                                    resultList.length == 0 ? <ResultEmpty /> 
                                    :
                                    <View>
                                        {
                                            resultList.map( (data,index) =>  <ResultCard randomRate={((Math.random() * (5 - 2)) + 2).toFixed(1)} key={index} data={data} />  )
                                        }
                                    </View>
                                }
                                
                </>
                 
                <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
            </ScrollView>
            }
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
                  <View style={{borderTopStartRadius : 13, borderTopRightRadius : 13}}  >
                        <MapView
                          style={{ height: 450, zIndex: 50 }}
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
                              <Text>Houssem</Text>
                              <Button title="تسجيل طلب"   />
                            </View>
                          </Callout>
                        </Marker>
                        </MapView> 
                  </View>
             
            </RBSheet>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default ResultPage;
