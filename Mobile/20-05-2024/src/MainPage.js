import React, { useEffect, useState } from 'react';
import { View, ScrollView, Platform, Text, FlatList, TouchableOpacity, Image, StyleSheet, Animated, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StackBarCard from '../src/AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../src/AssetsM/Cards/BottomCard/usedButtomCard';
import { Button, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import GConf from './AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CountryPage = () => {
  /* ############################[Variable ]################################ */
  let [xxxxxxx, setxxxxxxx] = useState()
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  const navigation = useNavigation();
  const headerSectionHeight = 10;
  const scrollY = new Animated.Value(0)

  /* ############################[UseEffect]################################ */
  useEffect(() => {

  },[])

  /* ############################[Functions]################################ */
  const SaveFunction = () => {

  }
  const stickyTop = scrollY.interpolate({
    outputRange: [-150, 0],
    inputRange: [headerSectionHeight, headerSectionHeight + 150],
    extrapolate: 'clamp'
  })
  const stickyOpacity = scrollY.interpolate({
    outputRange: [0, 1],
    inputRange: [headerSectionHeight, headerSectionHeight + 10],
    extrapolate: 'clamp'
  })

  /* ############################[Card     ]################################ */
  const ItemListCard = (props) => {
    const LastItem = (item) => {
      return(<TouchableOpacity onPress={() => navigation.navigate('SeeAllList' , { Tag: props.slectedTag })}>
      <View style={{ padding: 10, marginBottom: 8, backgroundColor:'#ffffff', margin: 5,   borderRadius: 8,     }}>
        <View style={{ flexDirection: 'column', alignContent:'center' }}>
          <View style={{ marginRight: 10, width: 40,  height: 40, borderColor:'white', borderWidth :1, borderRadius: 50,  justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name={isRTL ? 'arrow-back-outline' : 'arrow-forward-outline' } size={20} color="grey" />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 14,  fontFamily: 'Droid', textAlign: 'center',  color: '#333', marginBottom: 2 }}>{t(`mainPage.itemsNames.docteur`)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>)
    }
    const renderItem = ({ item, index }) => (
      
        item.seeAll  ?
        <TouchableOpacity onPress={() => navigation.navigate(item.tools ? 'ToolsPage' : 'SeeAllList' , { Tag: props.slectedTag })}>
          <View style={{ padding: 10, marginBottom: 8, backgroundColor:'#ffffff', margin: 5,   borderRadius: 8,     }}>
            <View style={{ flexDirection: 'column', alignContent:'center' }}>
              <View style={{ marginRight: 10, width: 40,  height: 40, borderColor:'white', borderWidth :1, borderRadius: 50,  justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name={isRTL ? 'arrow-back-outline' : 'arrow-forward-outline' } size={20} color="grey" />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14,  fontFamily: 'Droid', textAlign: 'center',  color: '#333', marginBottom: 2 }}>{t(`mainPage.itemsNames.docteur`)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => { if (item.tools) { navigation.navigate('ToolsPage', { Tag: item.link }); } else {  navigation.navigate('LandingPage', { Tag: item.link }); }} }>
          <View style={{ padding: 10, marginBottom: 8, backgroundColor:'#ffffff' ,  margin: 5,   borderRadius: 8,     }}>
            <View style={{ flexDirection: 'column', alignContent:'center' }}>
              <View style={{ marginRight: 10,   justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{ uri: `https://cdn.abyedh.tn/Images/Search/CIconsS/${item.image}.gif` }}
                  style={{width: 40, height: 40,}}
                />
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 14,  fontFamily: 'Droid', textAlign: 'center',  color: '#333', marginBottom: 2 }}>{t(`mainPage.itemsNames.${item.link}`)}</Text>
                
              </View>
            </View>
          </View>
        </TouchableOpacity>
      
    );

    return(<>
      <View style={{padding : 8, height : 'auto', marginBottom: 10, marginTop: 10,    }}>
          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', }}>
            <Ionicons name={props.data.icon} size={20} color="grey" />
            <Text style={{ fontFamily:'Droid', color: 'grey', textAlign: 'center',   marginLeft: 5 }}> {t(`mainPage.mainTagsName.${props.slectedTag}`)} </Text>
          </View>

          <View style={{flexDirection: isRTL ? 'row-reverse' : 'row'  , justifyContent: 'space-between',}}>
            <FlatList
                data={props.data.slides}
                horizontal
                renderItem={renderItem}
                keyExtractor={item => item.key}
                showsHorizontalScrollIndicator={false}
                inverted={isRTL} 
                ListFooterComponent={<LastItem item={props.data.slides} />}
              />
              
          </View>       
                   
        <View >

        </View>
      </View> 
    </>)
  }

  const GoToToolsMainPage = () => {
    return(<>
      <View style={{ flex: 1 , marginBottom : 20, marginTop : 20}}>
        <Ripple  onPress={() => navigation.navigate('ToolsPage')}>
          <View
            style={{
              width : '100%',
              padding: 13,
              borderRadius: 8,
              borderWidth : 1,
              borderColor:'#e6e6e6'
            }}
          >
            <View style={{ marginBottom: 7, alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
              <Text style={{ fontFamily:'Droid',  fontSize: 18, color: '#6c757d' }}>{t('mainPage.toolsTitls')}</Text>
            </View>
            <View style={{ flexDirection: isRTL ? 'row' : 'row-reverse' , alignItems: 'center' }}>
              <View style={{ flex: 8, alignSelf: 'center', order: isRTL ? 2:1 }}>
                {/* <View style={{ display: 'none', display: 'flex', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                  <Text style={{ fontFamily:'Droid',  color: '#6c757d' }}>
                    {t('mainPage.toolsBSText1')}  {'\n'}  {t('mainPage.toolsBSText2')}
                  </Text>
                </View> */}
                <View style={{ display: 'flex', alignItems: isRTL ? 'flex-end' : 'flex-start' }}>
                  <Text style={{ fontFamily:'Droid', color: '#6c757d' }}>{t('mainPage.toolsSSText')}</Text>
                </View>
              </View>
              <View style={{ flex: 4, alignItems: 'center', alignSelf: 'center', order: isRTL ? 1:2 }}>
                <SvgUri
                  width="80"
                  height="80"
                  uri= 'https://cdn.abyedh.tn/images/Search/tools.svg'
                  style={{ marginBottom: 8 }}
                />
                 
              </View>
            </View>
          </View>
        </Ripple>
    </View>
    </>)
  }
  
  const SearchBox = () => {
    return(<>
      <View style={{flexDirection:'row'}}>
       
        <View style={{flex: 2, padding:5,  alignItems:'center', justifyContent:'center'}} >
           <TouchableOpacity onPress={() => navigation.navigate('QRSearch')}>
           <Ionicons size={22} name='qr-code-outline' color='grey' />
           </TouchableOpacity> 
        </View>
        {/* <View style={{flex: 10, padding : 10, marginHorizontal: 12 , height : 'auto', marginBottom: 4, borderRadius: 20,   backgroundColor :'#e8e8e8' , }}>
          <Text>Search ... </Text>
        </View> */}
        <View style={{ flex: 10 , flexDirection: 'row',     marginBottom: 4,      alignItems: 'center',  [isRTL ? 'marginLeft' : 'marginRight']: 15,   backgroundColor: '#ebebeb',  borderRadius: 50,  width: '100%',  height: 40,  paddingHorizontal: 10, flexDirection : isRTL ? 'row-reverse' :'row'}}>
            <View><Ionicons name="search" size={20} color="#888"  /></View>
            <TextInput
              style={{ flex: 1,
                height: '100%', textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',}}
              placeholder={t('mainPage.mainsearchInput')}
              cursorColor ='#888'
              onChangeText={(text) => {}}
            />
            <TouchableOpacity onPress={() => navigation.navigate('FastSearch')}><Icon name={isRTL ? "arrow-left" : "arrow-right" } size={20} color="#888"   /></TouchableOpacity>
          </View>

        {/* <View style={{flex: 1 , alignItems:'center', justifyContent:'center'}} >
           <Ionicons size={15} name='eye'  />
        </View> */}
      </View> 
    </>)
  }

  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          <Animated.View style={[styles.animatedView,{ top: stickyTop, opacity: stickyOpacity , zIndex: 400 }]}>
              <SearchBox />
          </Animated.View>

          <ScrollView 
            scrollEventThrottle={16} 
            onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}],{ useNativeDriver: false })}
            
          >
                <View style={{ paddingHorizontal:10,  }}  >
                    <StackBarCard backColor='' leftComLogo dropDwon={true}  backLink='UserPage' rigthImage='05.gif' clickOption='' bottomSearchs />
                    <SearchBox />
                    <View style={{height:30}} ></View>
                    <ItemListCard slectedTag={'commerceSmall'}  data={GConf.Items.commerceSmall} />
                    <ItemListCard slectedTag={'sante'}  data={GConf.Items.sante} />
                    <ItemListCard slectedTag={'education'}  data={GConf.Items.education} />
                    <ItemListCard slectedTag={'trasnportationSmall'}  data={GConf.Items.trasnportationSmall} />
                    <ItemListCard slectedTag={'restaurationSmall'}  data={GConf.Items.restaurationSmall} />
                    <ItemListCard slectedTag={'lifeSmall'}  data={GConf.Items.lifeSmall} />
                    <ItemListCard slectedTag={'artisanatSmall'}  data={GConf.Items.artisanatSmall} />
                    <ItemListCard slectedTag={'culture'}  data={GConf.Items.culture} />
                    <ItemListCard slectedTag={'financeSmall'}  data={GConf.Items.financeSmall} />
                    <ItemListCard slectedTag={'constructionSmall'}  data={GConf.Items.constructionSmall} />
                    <ItemListCard slectedTag={'politique'}  data={GConf.Items.politique} />
                    <ItemListCard slectedTag={'agricole'}  data={GConf.Items.agricole} />
                    <ItemListCard slectedTag={'generale'}  data={GConf.Items.generale} />
                    <GoToToolsMainPage />
                </View>
                <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />

            </ScrollView>
            

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default CountryPage;


const styles = StyleSheet.create({
  animatedView: {
    height: 60,
    paddingBottom: 7,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: -150, // -150 -> 0
    left: 0,
    right: 0,
    opacity: 1,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 16,
        shadowOffset: {
          width: 4,
          height: 3,
        },
      },
    }),
  },
});