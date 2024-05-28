import React, { useEffect, useState } from 'react';
import { Image, StatusBar, Text, StyleSheet, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './src/AssetsM/i18n';

//main
import MainPage from './src/MainPage'
import CountryPage from './src/CountryPage'

//Search 
import LandingPage from './src/Search/LandingPage'
import ResultPage from './src/Search/ResultPage'
import ProfilePage from './src/Search/ProfilePage'
import FastSearch from './src/Search/FastSearch'
import QRSearch from './src/Search/QRSearch'
import SpeachSearch from './src/Search/SpeachSearch'
import SeeAllList from './src/Search/SeeAllList'

//User
import UserPage from './src/User/UserLandingPage'
import UserLogInPage from './src/User/UserLoginPage'
import UserSignUpPage from './src/User/UserSignUpPage'
import SuiviePageInfo from './src/User/RoutingPages/SuiviePageInfo'
//App
import AppPage from './src/App/FollowPage'
import SystemSignUp from './src/App/SignUpPage'

//Tools
import ToolsPage from './src/Tools/ToolLandingPage'

import TRntf from './src/Search/notification'

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({ 'Droid': require('./assets/fonts/Droid.ttf'), });
  if (!loaded) {
    return <View style={{ position : 'absolute', backgroundColor: 'white', width: Dimensions.get('window').width, height: Dimensions.get('window').height, marginTop:64, zIndex:99, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size="large" color="#185fc9" /></View>;
  }

  const CheckCoutryDetected = async () => {
    const value = await AsyncStorage.getItem('Country');
    if (!value) { return  true } else  { return false }
  }
  return (
     
      <NavigationContainer>
        <StatusBar barStyle="default" />
        <Stack.Navigator initialRouteName={'MainPage'} >

          <Stack.Screen options={{ headerShown: false  }} name="TRntf" component={TRntf} />
          <Stack.Screen options={{ headerShown: false  }} name="CountryPage" component={CountryPage} />
          
          <Stack.Screen options={{ headerShown: false  }} name="MainPage" component={MainPage} />
          <Stack.Screen options={{ headerShown: false  }} name="LandingPage" component={LandingPage} />
          <Stack.Screen options={{ headerShown: false  }} name="ResultPage" component={ResultPage} />
          <Stack.Screen options={{ headerShown: false  }} name="ProfilePage" component={ProfilePage} />
          <Stack.Screen options={{ headerShown: false  }} name="FastSearch" component={FastSearch} />
          <Stack.Screen options={{ headerShown: false  }} name="SpeachSearch" component={SpeachSearch} />
          <Stack.Screen options={{ headerShown: false  }} name="QRSearch" component={QRSearch} />
          <Stack.Screen options={{ headerShown: false  }} name="SeeAllList" component={SeeAllList} />

          <Stack.Screen options={{ headerShown: false  }} name="UserPage" component={UserPage} />
          <Stack.Screen options={{ headerShown: false  }} name="SuiviePageInfo" component={SuiviePageInfo} />
          <Stack.Screen options={{ headerShown: false  }} name="UserLogInPage" component={UserLogInPage} />
          <Stack.Screen options={{ headerShown: false  }} name="UserSignUpPage" component={UserSignUpPage} />
          
          <Stack.Screen options={{ headerShown: false  }} name="AppPage" component={AppPage} />
          <Stack.Screen options={{ headerShown: false  }} name="SystemSignUp" component={SystemSignUp} />
          
          
          <Stack.Screen options={{ headerShown: false  }} name="ToolsPage" component={ToolsPage} />

        </Stack.Navigator>
      </NavigationContainer>
     
  );
}
 