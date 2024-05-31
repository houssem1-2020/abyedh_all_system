import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, Button, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
 
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import SuivieRequestData from './Used/suivieRequestData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const App = () => {

  /* ###########################[const]############################ */
   
  let [loading, SetLoading] = useState(true)
  let [suivieData, setSuivieData] = useState([])
  const [openD, setOpenD] = useState(false)
  const [selectedForModal, setSelectedForModal] = useState('docteur_rdv')
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  let [loadMoreSpinner, setLoadMoreSpinner] = useState(false)

  /*#########################[UseEffect]###########################*/
  useEffect(() => {
      axios.post(`${GConf.ApiProfileLink}/suivie`, {
        UID : 9020480279 ,
      })
      .then(function (response) {
            setSuivieData(response.data)
            
            SetLoading(false)
      }).catch((error) => {
        if(error.request) {
          toast.error(<><div><h5>مشكل في الإتصال</h5> لم نتمكن من الوصول لقاعدة البيانات </div></>, GConf.TostInternetGonf)   
          SetLoading(false)
          setSuivieData([])
        }
      });
    
    }, [])

  /* ###########################[Function]############################# */
    const LoadMoreFunction = () => {
        setLoadMoreSpinner(true)
        axios.post(`${GConf.ApiProfileLink}/main/limitted`, {
            UID : 9020480279,
            lastUpdate : feedData.length,
        })
        .then(function (response) {
            setLoadMoreSpinner(false)
            if (response.data.length != 0) { 
                setFeedData(prevResults => [...prevResults, ...response.data])
                setLastFeedOrder(prevLastFeedOrder => prevLastFeedOrder + 3)
            } else {
                //setLoadMoreSpinner(false)
                setReachTheEnd(true)
            }

        }).catch((error) => {
            if(error.request) {
            toast.error(<><div><h5>مشكل في الإتصال</h5> لم نتمكن من الوصول لقاعدة البيانات </div></>, GConf.TostInternetGonf)   
            setLoadMoreSpinner(false)
            }
        });
    }

  /* ###########################[Card]############################# */
    
  const EmptyCard = () => {
      return (
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <Image
                  source={{ uri: 'https://cdn.abyedh.tn/images/profile/suivie-empty.png' }}
                  style={{ width: '80%', height: 290 }}
                  resizeMode="contain"
              />
              <Text style={{ marginTop: 20, fontSize: 16, textAlign: 'center' }}>
                  لا توجد نتائج . قم بإكتشاف محرك البحث في الصفحة الرئسية
              </Text>
          </View>
      );
  }

  const CircularPourcentage = ({ value }) => (
      <View style={{ width: 40, height: 40 }}>
          <CircularProgressbar strokeWidth={5} maxValue={100} minValue={0} value={value} text={`${value}%`} styles={{ background: { fill: 'red' } }} />
      </View>
  );

  const ActionBtns = () => (
      <View style={{ padding: 5, marginTop: 10, marginBottom: 0 }}>
          <TouchableOpacity style={{ marginBottom: 10, padding: 5, borderRadius: 20, backgroundColor: '#f0f0f0' }}>
             <Text> <Icon name='trash' />  حــذف </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 5, borderRadius: 20, backgroundColor: '#f0f0f0' }}>
               <Text><Icon name='edit' /> تعديــل </Text>
          </TouchableOpacity>
      </View>
  );

  const SmallActionBtns = () => (
      <View style={{ padding: 5, marginTop: 25, marginBottom: 0 }}>
          <TouchableOpacity style={{ marginBottom: 10, padding: 5, borderRadius: 20, backgroundColor: '#f0f0f0', width: '100%' }}>
              <Text><Icon name='trash' />  حــذف </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 5, borderRadius: 20, backgroundColor: '#f0f0f0', width: '100%' }}>
               <Text><Icon name='edit' /> تعديــل </Text>
          </TouchableOpacity>
      </View>
  );

  const RendredData = (props) => (
      <ScrollView style={{ textAlign: 'right', paddingEnd: 10, height: 190 }} contentContainerStyle={{ paddingVertical: 10 }}>
          <View>
              <Text style={{ textAlign: 'right', marginBottom: 15 }}>
                  <Text><Icon name='bookmarks-fill' style={{ color: 'red' }} /> التفاصيل : </Text>
              </Text>
              <Text>{SuivieRequestData[props.data.Notif_Name].GenTextFunction(props.data.RequestData, props.data.PidData)}</Text>
          </View>
      </ScrollView>
  );

  const SetpsCard = (props) => (
      <ScrollView style={{ textAlign: 'right', height: 190 }} contentContainerStyle={{ paddingVertical: 10 }}>
          {props.data.NotifList.map((data, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 12 }}>{new Date(data.Notif_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}</Text>
                  <Text style={{ margin: 0, padding: 0, marginBottom: 0, textAlign: 'right' }}>
                      <Icon name='check' style={{ width: 20, marginTop: 3, marginLeft: 4 }} />
                      {SuivieRequestData[data.Notif_Genre].stepsValues2[data.Notif_Name].text}
                  </Text>
              </View>
          ))}
          <View style={{ position: 'absolute', zIndex: 10000 }}>
              <TouchableOpacity style={{ padding: 5, borderRadius: 20, backgroundColor: '#f0f0f0' }} onPress={() => OpenModalFunction(props.data.Notif_Name)}>
                  <Icon name='sort amount down' />
              </TouchableOpacity>
          </View>
      </ScrollView>
  );

  const SuivieCard = (props) => (
      <View style={{ padding: 5, paddingBottom: 0, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 }}>
          <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 0 }}>
              <View style={{ flex: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${props.data.P_Genre}.gif` }} style={{ width: 50, height: 50 }} />
                      <View style={{ marginLeft: 10 }}>
                          <Text style={{ color: 'grey', marginBottom: 0 }}>
                              <TouchableOpacity  >
                                  <Text>{t(`userProfile.suivieTitlePage.${props.data.Notif_Name}`)}</Text>
                              </TouchableOpacity>
                          </Text>
                          <Text style={{ fontSize: 12, color: 'grey' }} dir='ltr'>
                              {new Date(props.data.Notif_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')} | {props.data.PidData.Name}
                          </Text>
                      </View>
                  </View>
              </View>
              {/* <View style={{ flex: 2, alignSelf: 'center', textAlign: 'right', paddingEnd: 0 }}> */}
              <AnimatedCircularProgress
                    size={40}
                    width={2}
                    fill={50}
                    tintColor="#00e0ff"
                     
                    backgroundColor="#3d5875" />
                  {/* <CircularPourcentage value={SuivieRequestData[props.data.Notif_Name].stepsValues2[props.data.State].value} /> */}
              {/* </View> */}
          </View>
          <View style={{ padding: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: 'white', padding: 10, alignItems: 'center', justifyContent: 'center', marginRight: 5 }} onPress={() => navigate(`/Profile/L/sv/${props.data.RequestData.R_ID}`)}>
                     <Text>  <Icon name='eye' />   متابعة  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, backgroundColor: 'white', padding: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigate(`/Profile/L/sv/${props.data.RequestData.R_ID}`)}>
                      <Text> <Icon name='edit outline' />  تعديل </Text>
                  </TouchableOpacity>
              </View>
          </View>
      </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 15}} >
      {
            loading ? 
            <View style={{  backgroundColor: 'white', width: Dimensions.get('window').width , height: Dimensions.get('window').height , zIndex:99, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator   size="large" color="#0000ff" /></View> 
            :
            <>
                {
                    suivieData.length  == 0 ?
                    <EmptyCard />
                    :
                    <>
                        { suivieData.map((data,i) => <SuivieCard  key={i} data={data} />)}
                        <View style={{alignItems:'center', padding : 8}}>
                            {loadMoreSpinner  ? <ActivityIndicator color='blue' size={20} /> : <TouchableOpacity    onPress={() => LoadMoreFunction()}  ><Text>تحميل</Text></TouchableOpacity>}    
                        </View>
                    </>
                }
            </>
        }
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default App;
