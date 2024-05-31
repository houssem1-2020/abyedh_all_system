import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert, Button, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
 
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import NotifGenres from './Used/notifGenres';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {

  /* ###########################[const]############################ */
 
  let [loading, setLoading] = useState(true)
  let [feedData, setFeedData] = useState([])
  let [feedAllData, setFeedAllData] = useState([])
  let [loadMoreSpinner, setLoadMoreSpinner] = useState(false)
  let [lastFeedOrder, setLastFeedOrder] = useState(7)
  let [reachTheEnd, setReachTheEnd] = useState(false)
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  const navigation = useNavigation();
  
  /*#########################[UseEffect]###########################*/
  useEffect(() => {
      //window.scrollTo(0, 0);
      axios.post(`${GConf.ApiProfileLink}/main`, {
          UID : 9020480279,
      })
      .then(function (response) {
         
              let notification  = response.data.feeds.map(item => ({ ...item, NotifGenreTarget: 'notification' , dateAndTime: new Date(`${item.Notif_Date.split('T')[0]}T${item.Notif_Time}`).getTime() }));
              let publication  = response.data.publication.map(item => ({ ...item, NotifGenreTarget: 'publication' , dateAndTime: new Date(`${item.Pub_Date.split('T')[0]}T${item.Pub_Time}`).getTime() }));
              let tools  = response.data.tools.map(item => ({ ...item, NotifGenreTarget: 'tools' , dateAndTime: new Date(`${item.Notif_Date.split('T')[0]}T${item.Notif_Time}`).getTime()}));
              let toolsNews  = response.data.toolsNews.map(item => ({ ...item, NotifGenreTarget: 'toolsNews' , dateAndTime: new Date(`${item.News_Date.split('T')[0]}T${item.News_Time}`).getTime()}));
              let admin  = response.data.admin.map(item => ({ ...item, NotifGenreTarget: 'admin' , dateAndTime: new Date(`${item.Notif_Date.split('T')[0]}T${item.Notif_Time}`).getTime() }));
              let combinedArray = notification.concat(publication, tools, toolsNews, admin);
              let SortedTable = combinedArray.sort((a, b) => b.dateAndTime - a.dateAndTime);
              setFeedAllData(SortedTable)
              setFeedData(response.data.feeds)
              setLoading(false)
      }).catch((error) => {
          if(error.request) {
            Alert.alert('مشكل في الإتصال لم نتمكن من الوصول لقاعدة البيانات')   
            setLoading(false)
            setFeedData([])
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

  const NotificationCard = (props) => {
    const { data } = props;
    return (
      <View style={{ padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 12,  position: 'relative' }}>
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <TouchableOpacity style={{ flex: 10, flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center' }} onPress={() => navigation.navigate('ProfilePage', {Tag : data.P_Genre , PID: data.PID})}>
            <Image source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${data.P_Genre}.gif` }} style={{ width: 50, height: 50 }} />
            <View style={{ flex: 2, marginLeft: 10, alignItems : isRTL ? 'flex-end' : 'flex-start' }}>
              <Text style={{ color: 'grey', marginBottom: 0 }}>{data.P_Genre}</Text>
              <Text>{`${data.Notif_Time} | ${new Date(data.Notif_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}`}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 2, alignSelf: 'center' }}>
            <Icon style={{ color: 'green' }} name={NotifGenres[data.Notif_Name].icon} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ flex: 12, textAlign: 'left', fontFamily:'Droid' }}>{NotifGenres[data.Notif_Name].GenTextFunction(data.RequestData, data.PidData)}</Text>
        </View>
        <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 10, padding: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ddd', borderRadius: 50 }} onPress={() => navigation.navigate('SuiviePageInfo', {UID: 9249849849})}>
          <Icon name='arrow-right' />
        </TouchableOpacity>
      </View>
    );
  }

  const PublicationCard = (props) => {
      const isRTL = (text) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);

      const PublicationGenreCard = ({ status, postData }) => {
        const statusCard = React.useCallback(() => {
          switch (status) {
            case 'text': return <TextPostCard data={postData} Name='Houssem Khelifi' />;
            case 'article': return <ArticlePostCard data={postData} Name='Houssem Khelifi' />;
            case 'image': return <ImagePostCard data={postData} Name='Houssem Khelifi' />;
            case 'video': return <VideoPostCard data={postData} Name='Houssem Khelifi' />;
            default: return <Text>Indefinie Poste</Text>;
          }
        }, [status]);

        return (
          <View>
            {statusCard()}
          </View>
        );
      };
      const TextPostCard = (props) => {
        return (
          <View style={{ marginBottom: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${props.data.Owner_Genre}.gif` }} style={{ width: 50, height: 50 }} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{props.Name}</Text>
                <Text style={{ fontSize: 12 }}>{props.data.Pub_Time.slice(0, -3)} | {new Date(props.data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}</Text>
              </View>
            </View>
            <Text style={{ textAlign: isRTL(props.data.TextData) ? 'right' : 'left' }}>{props.data.TextData}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='like' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='comments' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='share' /></Button>
            </View>
          </View>
        );
      };
      const ArticlePostCard = (props) => {
        return (
          <View style={{ marginBottom: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10 }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${props.data.Owner_Genre}.gif` }} style={{ width: 50, height: 50 }} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{props.Name}</Text>
                <Text style={{ fontSize: 12 }}>{props.data.Pub_Time.slice(0, -3)} | {new Date(props.data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}</Text>
              </View>
            </View>
            <Text style={{ textAlign: isRTL(props.data.ArticleData) ? 'right' : 'left' }}>{props.data.ArticleData}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='like' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='comments' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='share' /></Button>
            </View>
          </View>
        );
      };
      const ImagePostCard = (props) => {
        const imageData = JSON.parse(props.data.ImageData);
        return (
          <View style={{ marginBottom: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 }}>
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Image source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${props.data.Owner_Genre}.gif` }} style={{ width: 50, height: 50 }} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>{props.Name}</Text>
                  <Text style={{ fontSize: 12 }}>{props.data.Pub_Time.slice(0, -3)} | {new Date(props.data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}</Text>
                </View>
              </View>
              <Text style={{ textAlign: isRTL(imageData.text) ? 'right' : 'left' }}>{imageData.text}</Text>
            </View>
            <Image source={{ uri: imageData.url }} style={{ width: '100%', height: 250 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='like' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='comments' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='share' /></Button>
            </View>
          </View>
        );
      };
      const VideoPostCard = (props) => {
        const videoData = JSON.parse(props.data.VideoData);
        return (
          <View style={{ marginBottom: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 }}>
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Image source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${props.data.Owner_Genre}.gif` }} style={{ width: 50, height: 50 }} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={{ fontWeight: 'bold' }}>{props.Name}</Text>
                  <Text style={{ fontSize: 12 }}>{props.data.Pub_Time.slice(0, -3)} | {new Date(props.data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}</Text>
                </View>
              </View>
              <Text style={{ textAlign: isRTL(videoData.text) ? 'right' : 'left' }}>{videoData.text}</Text>
            </View>
            <Video source={{ uri: videoData.url }} style={{ width: '100%', height: 250 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='like' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='comments' /></Button>
              <Button style={{ backgroundColor: 'white', color: GConf.ADIL[props.data.Owner_Genre].themeColor }}><Icon name='share' /></Button>
            </View>
          </View>
        );
      };
    
      return (
        <View>
          <PublicationGenreCard status={props.status} postData={props.data} />
        </View>
      );
  }
  const ToolsCard = (props) => {
      const { data } = props;
      return (
          <View style={{
              padding: 10,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 5,
              position: 'relative',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
          }}>
              <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${data.P_Genre}.gif` }} style={{ width: 50, height: 50 }} />
                          <View style={{ marginLeft: 10 }}>
                              <Text style={{ color: 'grey', marginBottom: 0 }}>{data.P_Genre}</Text>
                              <Text style={{ fontSize: 12 }}>{`${data.Notif_Time} | ${new Date(data.Notif_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}`}</Text>
                          </View>
                      </View>
                  </View>
                  <View style={{ flex: 2, alignSelf: 'center' }}>
                      <Text style={{ color: 'green' }}>{ToolsNotifGenres[data.Notif_Name].icon}</Text>
                  </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ textAlign: 'right' }}>{ToolsNotifGenres[data.Notif_Name].GenTextFunction(data.RequestData, data.PidData)}</Text>
              </View>
              {/* Uncomment and replace NavLink and Button with appropriate implementations if needed
              <View style={{ position: 'absolute', left: 10, bottom: 10 }}>
                  <NavLink to={`/Profile/L/sv/${data.RequestData.R_ID}`}>
                      <Button style={{ padding: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ddd', borderRadius: 50 }}>
                          <Icon name='arrow left' />
                      </Button>
                  </NavLink>
              </View>
              */}
          </View>
      );
  }
  const ToolsNewsCard = (props) => {
      const { data } = props;
      return (
          <View style={{
              padding: 10,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 5,
              position: 'relative',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
          }}>
              <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: "https://cdn.abyedh.tn/images/logo/mlogo.gif" }} style={{ width: 20, height: 40, borderRadius: 10, backgroundColor: 'red', marginLeft: 10 }} />
                          <View style={{ marginLeft: 10 }}>
                              <Text style={{ color: 'grey', marginBottom: 0 }}>أخبار منصة أبيض</Text>
                              <Text style={{ fontSize: 12 }}>{`${data.News_Time} | ${new Date(data.News_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}`}</Text>
                          </View>
                      </View>
                  </View>
                  <View style={{ flex: 2, alignSelf: 'center' }}>
                      {/* Optional icon */}
                  </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ textAlign: 'right' }}>{data.Description}</Text>
              </View>
              {/* Uncomment and replace NavLink and Button with appropriate implementations if needed
              <View style={{ position: 'absolute', left: 10, bottom: 10 }}>
                  <NavLink to={`/Profile/L/sv/${data.RequestData.R_ID}`}>
                      <Button style={{ padding: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ddd', borderRadius: 50 }}>
                          <Icon name='arrow left' />
                      </Button>
                  </NavLink>
              </View>
              */}
          </View>
      );
  }
  const AdminCard = (props) => {
      const { data } = props;
      return (
          <View style={{
              padding: 10,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 5,
              position: 'relative',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
          }}>
              <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={{ uri: "https://cdn.abyedh.tn/images/logo/mlogo.gif" }} style={{ width: 20, height: 40, borderRadius: 10, backgroundColor: 'red', marginLeft: 10 }} />
                          <View style={{ marginLeft: 10 }}>
                              <Text style={{ color: 'grey', marginBottom: 0 }}>إدارة منصة أبيض</Text>
                              <Text style={{ fontSize: 12 }}>{`${data.Notif_Time} | ${new Date(data.Notif_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}`}</Text>
                          </View>
                      </View>
                  </View>
                  <View style={{ flex: 2, alignSelf: 'center' }}>
                      {/* Optional icon */}
                  </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Text style={{ textAlign: 'right' }}>رسالة من إدارة منصة أبيض</Text>
              </View>
              {/* Uncomment and replace NavLink and Button with appropriate implementations if needed
              <View style={{ position: 'absolute', left: 10, bottom: 10 }}>
                  <NavLink to={`/Profile/L/sv/${data.RequestData.R_ID}`}>
                      <Button style={{ padding: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ddd', borderRadius: 50 }}>
                          <Icon name='arrow left' />
                      </Button>
                  </NavLink>
              </View>
              */}
          </View>
      );
  }

  const NotifGenreCard = ({ status, postData }) => {
    const StateCard = (props) => (
      <View style={{ backgroundColor: props.color, padding: 5, borderRadius: 4 }}>
        <Text style={{ color: 'white' }}>{props.text}</Text>
      </View>
    );
  
    const statusCard = React.useCallback(() => {
      switch(status) {
        case 'notification': return <NotificationCard data={postData} />;
        case 'publication': return <PublicationCard data={postData} />;
        case 'tools': return <ToolsCard data={postData} />;
        case 'toolsNews': return <ToolsNewsCard data={postData} />;
        case 'admin': return <AdminCard data={postData} />;
        default: return <Text>Indefinie Poste</Text>;
      }
    }, [status]);
  
    return (
      <View>
        {statusCard()}
      </View>
    );
  };


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 15}} >
      {
            loading ? 
            <View style={{  backgroundColor: 'white', width: Dimensions.get('window').width , height: Dimensions.get('window').height , zIndex:99, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator  size="large" color="#0000ff" /></View>
            :
            <>
                {
                    feedData.length == 0 ?
                    <EmptyCard />
                    :
                    <>
                       { feedAllData.map((data,i) => <NotifGenreCard key={i} status={data.NotifGenreTarget} postData={data} />)}
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
