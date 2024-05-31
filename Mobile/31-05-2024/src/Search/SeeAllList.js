import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
import { useRoute } from '@react-navigation/native';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import GConf from '../AssetsM/generalConf';


const SeeAllList = () => {
  /* ############################[Variable ]################################ */
  const route = useRoute();
  const { Tag } = route.params;
  
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);
  

  /* ############################[UseEffect]################################ */
  useEffect(() => {
    console.log(Tag)
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

  const RenderItem = (props) => (
      
    <TouchableOpacity style={{width : '33%', }} onPress={() => navigation.navigate('LandingPage')}>
      <View style={{ padding: 10, marginBottom: 8, backgroundColor:'#ffffff', margin: 5,   borderRadius: 8,     }}>
        <View style={{ flexDirection: 'column', alignContent:'center' }}>
          <View style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: `https://cdn.abyedh.tn/Images/Search/CIconsS/${props.item.image}.gif` }}
              style={{width: 40, height: 40,}}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 14,  fontFamily: 'Droid', textAlign: 'center',  color: '#333', marginBottom: 2 }}>{t(`mainPage.itemsNames.${props.item.link}`)}</Text>
            
          </View>
        </View>
      </View>
    </TouchableOpacity>
  
  );

  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor='' leftCom=''    backLink='MainPage'  clickOption=''  />

            <ScrollView style={{ marginHorizontal:10,  }}>
              <View style={{flexDirection: isRTL ? 'row-reverse' : 'row'  , flexGrow: 1, flexWrap: 'wrap', justifyContent: 'space-between',}}>
              {/* <FlatList
                  data={GConf.Items[Tag].slides}
                  vertical
                  renderItem={renderItem}
                  keyExtractor={item => item.key}
                  //showsHorizontalScrollIndicator={false}
                  inverted={isRTL} 
                /> */}

              {GConf.Items[Tag].slides.map((item) => (
                <RenderItem key={item.id} item={item} />
              ))}
                
            </View>  
                 
            </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default SeeAllList;
