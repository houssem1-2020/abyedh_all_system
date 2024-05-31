import React, { useEffect, useState , Suspense, lazy} from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Text, TouchableNativeFeedback, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';

//Spesific List  
const MainDataCard = lazy(() => import('.//RoutingPages/NotifPage'));
const SpesificCard = lazy(() => import('.//RoutingPages/SuiviePage'));
const ActionCard = lazy(() => import('.//RoutingPages/FavoritePage'));
const SuivieCard = lazy(() => import('.//RoutingPages/DocPage'));
const PublicationProfilePage = lazy(() => import('.//RoutingPages/SettingPage'));
const CompteProf = lazy(() => import('.//RoutingPages/CompteProf'));

const UserPage = () => {
  /* ############################[Variable ]################################ */
  const [selectedTab, setSelectedTab] = useState(0);
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  const renderTab = () => {
    switch (selectedTab) {
      case 0:
        return <Suspense fallback={<ActivityIndicator style={{marginTop: Dimensions.get('window').height / 2}} size="large" color="#0000ff" />}><MainDataCard /></Suspense>;
      case 1:
        return <Suspense fallback={<ActivityIndicator style={{marginTop: Dimensions.get('window').height / 2}} size="large" color="#0000ff" />}><SpesificCard  /></Suspense>;
      case 2:
        return <Suspense fallback={<ActivityIndicator style={{marginTop: Dimensions.get('window').height / 2}} size="large" color="#0000ff" />}><ActionCard /></Suspense>;
      case 3:
        return <Suspense fallback={<ActivityIndicator style={{marginTop: Dimensions.get('window').height / 2}} size="large" color="#0000ff" />}><SuivieCard /></Suspense>;
      case 4:
          return <Suspense fallback={<ActivityIndicator style={{marginTop: Dimensions.get('window').height / 2}}  size="large" color="#0000ff" />}><PublicationProfilePage   /></Suspense>;
      case 5:
            return <Suspense fallback={<ActivityIndicator style={{marginTop: Dimensions.get('window').height / 2}}  size="large" color="#0000ff" />}><CompteProf /></Suspense>;
          default:
        return <Text>...</Text>;
    }
  };

  /* ############################[UseEffect]################################ */
  useEffect(() => {

  },[])

  /* ############################[Functions]################################ */
  const SaveFunction = () => {

  }
  /* ############################[Card     ]################################ */
  const MainCard = () => {
    return(<>
      <View style={{padding : 1, height : 200, marginBottom: 10,  backgroundColor :'red' , }}>
      </View> 
    </>)
  }

  const MainCard2 = () => {
    return(<>
      <View style={{padding : 1, height : 200, marginBottom: 10,  backgroundColor :'red' , }}>
      </View> 
    </>)
  }
  const MainCard3 = () => {
    return(<>
      <View style={{padding : 1, height : 200, marginBottom: 10,  backgroundColor :'red' , }}>
      </View> 
    </>)
  }

  const UserBottomNavCard = (props) => {
    const TabsList =  [
      {id:1, iconName:'view-dashboard', indexNum : 0 },
      {id:1, iconName:'eye-refresh', indexNum : 1 },
      {id:1, iconName:'hand-heart', indexNum : 2 },
      {id:1, iconName:'folder-eye', indexNum : 3 },
       {id:1, iconName:'account-wrench', indexNum : 4 },
      
    ]
    const TabsCard = (props) => {
      return(
        <Ripple
          style={{ padding: 10 , flex : 1,   alignItems:'center', justifyContent:'center' }}
          onPress={() => setSelectedTab(props.data.indexNum)}
           
        >
          <Text >
            <Icon name={props.data.indexNum == selectedTab ? props.data.iconName : `${props.data.iconName}-outline`} size={27} color={props.data.indexNum == selectedTab ? '#2771e8': 'grey'} />
          </Text>
        </Ripple>
      )
    }
    return(<>
      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row' , alignItems:'center', justifyContent:'center',     marginBottom: 10 , paddingTop: 10,  backgroundColor :'white'  }}>
        {TabsList.map((data, index) => <TabsCard data={data} key={index} />)} 
        {/* <TabsCard data={{id:1, iconName:'shield-account-variant', indexNum : 5 }} key={5} /> */}
      </View> 
    </>)
  };

  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor='' leftCom=''    backLink='MainPage' rigthImage='05.gif' clickOption=''  />

            <ScrollView style={{ marginHorizontal:0, paddingHorizontal : 10 }}>
                
              {renderTab()}
            </ScrollView>
            <UserBottomNavCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default UserPage;
