import React, { useEffect, useState } from 'react';
import { View, ScrollView,  Text, Image, ActivityIndicator,   FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';

import GConf from './../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
 



const { width: screenWidth } = Dimensions.get('window');


const FastSearch = () => {
  /* ############################[Variable ]################################ */
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  const navigation = useNavigation();
  const [loadingImage, setLoadingImage] = useState(true)
  toolList = {
    transportTools : [
      {id:1, width : 2.5,  text: t('toolsApps.toolsPage.appNames.taxiApp') , image:'taxi.svg', link:'taxi'},
      {id:2, width : 2.5,  text: t('toolsApps.toolsPage.appNames.louageApp') , image:'louage.svg', link:'Louage'},
      {id:3, width : 2.5,  text: t('toolsApps.toolsPage.appNames.transportApp') , image:'public.svg', link:'Public'},
      {id:4, width : 2.5,  text: t('toolsApps.toolsPage.appNames.automobileApp') , image:'automobile.svg', link:'Automobile'},
    ],
    financeTools : [
      {id:1, width : 1.5,  text: t('toolsApps.toolsPage.appNames.findworkApp') , image:'jobs.svg', link:'taxi'},
      {id:2, width : 1.5,  text: t('toolsApps.toolsPage.appNames.salaireApp') , image:'salaire.svg', link:'Louage'},
       
    ],
    santeTools : [
      {id:1, width : 2.5,  text: t('toolsApps.toolsPage.appNames.taxiApp') , image:'taxi.svg', link:'taxi'},
      {id:2, width : 2.5,  text: t('toolsApps.toolsPage.appNames.louageApp') , image:'louage.svg', link:'Louage'},
      {id:3, width : 2.5,  text: t('toolsApps.toolsPage.appNames.transportApp') , image:'public.svg', link:'Public'},
      {id:4, width : 2.5,  text: t('toolsApps.toolsPage.appNames.automobileApp') , image:'automobile.svg', link:'Automobile'},
    ],
    educationTools : [
      {id:1, width : 2,  text: t('toolsApps.toolsPage.appNames.etudeApp') , image:'etude.svg', link:'Etude'},
      {id:2, width : 2,  text: t('toolsApps.toolsPage.appNames.programAnuueliApp') , image:'prog_annu.svg', link:'ProgramScolair'},
      {id:3, width : 2,  text: t('toolsApps.toolsPage.appNames.livreScolaireApp') , image:'livre_scolaire.svg', link:'LivreScolair'},
      {id:4, width : 2,  text: t('toolsApps.toolsPage.appNames.examainApp') , image:'devoire.svg', link:'Devoirat'},
    ],
    constructionTools : [
      {id:1, width : 1,  text: t('toolsApps.toolsPage.appNames.locationApp') , image:'rent_house.svg', link:'taxi'},
      
    ],
    others : [
      {id:1, width : 2,  text: t('toolsApps.toolsPage.appNames.taxiApp') , image:'taxi.svg', link:'taxi'},
      {id:2, width : 2,  text: t('toolsApps.toolsPage.appNames.louageApp') , image:'louage.svg', link:'Louage'},
      {id:3, width : 2,  text: t('toolsApps.toolsPage.appNames.transportApp') , image:'public.svg', link:'Public'},
      {id:4, width : 2,  text: t('toolsApps.toolsPage.appNames.automobileApp') , image:'automobile.svg', link:'Automobile'},
    ]
  }
  /* ############################[UseEffect]################################ */
  useEffect(() => {

  },[])

  /* ############################[Functions]################################ */
  const SaveFunction = () => {

  }
  /* ############################[Card     ]################################ */
    const AdsLanding = () => {
    return (
        <View style={{paddingHorizontal: 20, paddingBottom: 15}} >
            <View style={{ flexDirection: isRTL ? 'row' : 'row-reverse'}}>
                <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{fontFamily:'Droid',  color: '#46d5e8', textAlign: isRTL ? 'right' : 'left', fontSize: 15 }}>
                        {t('toolsApps.toolsPage.mainTitle')}
                    </Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center',  }}>
                    <SvgUri 
                        uri={'https://cdn.abyedh.tn/images/Tools/ads.svg'}
                        width="50px" height="50px"  
                    />
                </View>
            </View>
            
        </View>
    );
    };
  
    const LinkCard = ({ link, name, img }) => (
      <View style={{ marginBottom: 12, width:'33.33%' , alignItems:'center', justifyContent:'center' }}>
        <View style={{  width:'90%', height: 60,   borderWidth: 1, borderColor:'#dfdfdf', borderRadius:15,   justifyContent: 'center', alignItems: 'center' }}>
            {/* <SvgUri width="60px" height="60px"   uri={`https://cdn.abyedh.tn/images/Tools/${img}`} /> */}
            <SvgImage width="60px" height="60px" uri={`https://cdn.abyedh.tn/images/Tools/${img}`} />
        </View>
        <Text  numberOfLines={1} style={{fontFamily:'Droid',}} >{name}</Text>
      </View>
    );

    const SvgImage = ({ uri, width, height }) => {
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        // Prefetch the image to detect when it is loaded
        Image.prefetch(uri)
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }, [uri]);
    
      return (
        <View style={{ width, height }}>
          {loading && <ActivityIndicator size="small" color="#0000ff" />}
          {!loading && <SvgUri width={width} height={height} uri={uri} />}
        </View>
      );
    };

    const renderItem = ({ item, index }) => (
      <TouchableOpacity  style={{    width: Dimensions.get('window').width / item.width}}  onPress={() => navigation.navigate('MainPage', { Tag: item.tag })}>
        <View style={{ padding: 2, marginBottom: 8, backgroundColor:'#ffffff' ,  margin: 1,   }}>
          <View style={{ flexDirection: 'column', alignContent:'center' }}>
            <View style={{ marginRight: 10, borderWidth: 1, borderColor:'#dfdfdf', borderRadius:10, height:60,  justifyContent: 'center', alignItems: 'center' }}>
              {/* {loadingImage ? <Text>... </Text> : */}
                {/* <SvgUri width="60px" height="60px" onLoad={() => setLoadingImage(false)}  uri={`https://cdn.abyedh.tn/images/Tools/${item.image}`} /> */}
                <SvgImage width="60px" height="60px" uri={`https://cdn.abyedh.tn/images/Tools/${item.image}`} />
              {/* } */}
              
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text numberOfLines={1} style={{ fontSize: 14,  fontFamily: 'Droid', textAlign: 'center',  color: '#333', marginBottom: 2 }}>{item.text}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor='' leftCom=''    backLink='MainPage' rigthImage='05.gif' clickOption=''  />
            <AdsLanding />
            <ScrollView style={{ paddingHorizontal:10,  }}>

               
              <View style={{ padding: 0 }}>
 


                <Text style={{ textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',  marginVertical: 10 }}>{t('toolsApps.toolsPage.transportTitle')}</Text>
                <FlatList
                    data={toolList.transportTools}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    showsHorizontalScrollIndicator={false}
                    inverted={isRTL} 
                    // snapToInterval={screenWidth/2}
                    // pagingEnabled 
                />

                <Text style={{ textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',  marginVertical: 10 }}>{t('toolsApps.toolsPage.educationTitle')}</Text>
                <FlatList
                    data={toolList.educationTools}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    showsHorizontalScrollIndicator={false}
                    inverted={isRTL} 
                    // snapToInterval={screenWidth/2}
                    // pagingEnabled 
                />

                <Text style={{ textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',  marginVertical: 10 }}>{t('toolsApps.toolsPage.financeTite')}</Text>
                <FlatList
                    data={toolList.financeTools}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    showsHorizontalScrollIndicator={false}
                    inverted={isRTL} 
                    // snapToInterval={screenWidth/2}
                    // pagingEnabled 
                />

                <Text style={{ textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',  marginVertical: 10 }}>{t('toolsApps.toolsPage.constructionTitle')}</Text>
                <FlatList
                    data={toolList.constructionTools}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                    showsHorizontalScrollIndicator={false}
                    inverted={isRTL} 
                    // snapToInterval={screenWidth/2}
                    // pagingEnabled 
                />

                <Text style={{ textAlign: isRTL ? 'right' : 'left', fontFamily:'Droid',  marginVertical: 10 }}>{t('toolsApps.toolsPage.otherTitle')}</Text>
                <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', flexWrap: 'wrap' }}>
                  <LinkCard link='News' name={t('toolsApps.toolsPage.appNames.newsApp')} img='news.svg' />
                  <LinkCard link='Forum' name={t('toolsApps.toolsPage.appNames.forumApp')} img='forum.svg' />
                  <LinkCard link='Data' name={t('toolsApps.toolsPage.appNames.statApp')} img='data.svg' />
                  <LinkCard link='Blog' name={t('toolsApps.toolsPage.appNames.adminBlogApp')} img='blog.svg' />
                  <LinkCard link='Products' name={t('toolsApps.toolsPage.appNames.catalogueApp')} img='products.svg' />
                  <LinkCard link='Sport' name={t('toolsApps.toolsPage.appNames.sportApp')} img='sport.svg' />
                  <LinkCard link='Art' name={t('toolsApps.toolsPage.appNames.cultureApp')} img='art.svg' />
                  <LinkCard link='Touristique' name={t('toolsApps.toolsPage.appNames.tourizmeApp')} img='images.svg' />
                </View>
              </View>

            </ScrollView>
            <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default FastSearch;
