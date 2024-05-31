import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Share, Switch, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const App = () => {

  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Khelifi houssem  Profile sur Abyedh  http://abyedh.com/',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
       //navigation.navigate('MainPage');
       navigation.reset({
        index: 0,
        routes: [{ name: 'MainPage' }],
      })
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 15}} >
        <View style={{alignItems:'center', justifyContent:'center',  marginBottom: 25,}}>
          <View >
            <TouchableOpacity style={{alignItems: 'center', marginRight: 15 , marginBottom: 12,  marginLeft: 15, width: 80, height: 80 ,  borderRadius: 80 / 2, overflow: 'hidden', position: 'relative', }}  onPress={() => refRBSheet.current.open()}  >
              <Image
                  source={{uri:`https://cdn.abyedh.tn/images/p_pic/05.gif`}} 
                  style={{ width: 80, height: 80 ,  borderRadius: 14  }}
              />
              
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                right: 10,
                width: 24,
                height: 24,
                zIndex:100,
                borderWidth:3,
                borderColor: 'white',
                borderRadius: 12,
                backgroundColor: '#e0e0de',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => refRBSheet.current.open()} ><Icon name="account-edit" size={16} color="#4287f5" /></TouchableOpacity>
              
            </View>
          </View>
          <Text style={{color:'grey', fontFamily:'Droid', fontSize: 15}} > Houusem Khelifi  </Text>
          <Text style={{color:'grey', fontFamily:'Droid', fontSize: 20}} > 
                  5566987514  
                  <TouchableOpacity style={{paddingLeft : 5, }}><Text><Icon name='content-copy' color='grey'  size={20} /> </Text></TouchableOpacity>
                  <TouchableOpacity style={{paddingLeft : 5, }}><Text><Icon name='qrcode-scan' color='grey'  size={20} /> </Text></TouchableOpacity>
          </Text>
        </View>

        <View style={{alignItems:'center', marginTop:20,  justifyContent:'center', borderWidth:1, borderRadius : 12, borderColor:'#dfdfdf'}}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='incognito' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Basic Info
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='security' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Security
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='map-marker-account' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Location
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
        </View>

        <View style={{alignItems:'center', marginTop:20,  justifyContent:'center', borderWidth:1, borderRadius : 12, borderColor:'#dfdfdf'}}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='weather-night' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Dark Theme 
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Switch  />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='bell-badge' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Notfication
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Switch  value={true} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='translate' size={19}  color='grey' />
                </View>
                <View style={{ flex: 5, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        language
                    </Text>
                </View>
                <View style={{ flex: 2,  alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{fontFamily:'Droid', color:'grey', fontSize:11,  textAlign : 'right'}} >العربية</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='earth' size={19}  color='grey' />
                </View>
                <View style={{ flex: 5, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Country
                    </Text>
                </View>
                <View style={{ flex: 2,  alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{fontFamily:'Droid', color:'grey', fontSize:11,  textAlign : 'right'}} >France</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
        </View>
        
        <View style={{alignItems:'center', marginTop:20,  justifyContent:'center', borderWidth:1, borderRadius : 12, borderColor:'#dfdfdf'}}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='bug-check' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Report Bug
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='android-messages' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Contact Us 
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare} style={{ flexDirection: isRTL ? 'row-reverse':'row', padding: 13 , borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='share-variant' size={19}  color='grey' />
                </View>
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Inviter Un ami 
                    </Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={isRTL ? 'arrow-left' : 'arrow-right'} color='grey'  size={24} />
                </View>
            </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => LogOut()} style={{ alignItems:'center', marginTop:20,  justifyContent:'center', borderWidth:1, borderRadius : 12, borderColor:'#dfdfdf', padding: 13 , marginBottom: 0,  borderBottomColor:'#dfdfdf',   }}>  
                <View style={{ flex: 9, alignItems: isRTL ? 'flex-end' : 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey',  fontFamily:'Droid' }}>
                        Deconnextion
                    </Text>
                </View>
        </TouchableOpacity>


        <RBSheet 
                height = {Dimensions.get('window').height - 65}
                ref={refRBSheet} 
                draggable 
                //dragOnContent  
                customStyles={{ 
                  draggableIcon: {
                      backgroundColor: 'grey',
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
                         
                       <Text>Seeting </Text>      
                  </View>
             
            </RBSheet>
            
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default App;
