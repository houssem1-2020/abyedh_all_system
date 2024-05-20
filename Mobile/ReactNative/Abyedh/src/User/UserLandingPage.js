import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';


const UserPage = () => {
  /* ############################[Variable ]################################ */
  let [xxxxxxx, setxxxxxxx] = useState()

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

  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />

            <ScrollView style={{ marginHorizontal:0, paddingHorizontal : 10 }}>
                
                <MainCard />
                <MainCard2 />
                <MainCard3 />

                <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
            </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default UserPage;
