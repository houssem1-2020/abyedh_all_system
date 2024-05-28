import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';


const FastSearch = () => {
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
      <View style={{padding : 1, height : 1200, marginBottom: 10,    }}>
      </View> 
    </>)
  }

  

  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor='' leftCom=''   backLink='MainPage' rigthImage='05.gif' clickOption=''  />

            <ScrollView style={{ paddingHorizontal:10,  }}>
                
                <MainCard />
                

                <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
            </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default FastSearch;
