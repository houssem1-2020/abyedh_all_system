import React, { useEffect, useState } from 'react';
import { Image, StatusBar, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import SeeAllList from './src/Search/SeeAllList'

//User
import UserPage from './src/User/UserLandingPage'
import UserLogInPage from './src/User/UserLandingPage'
import UserSignUpPage from './src/User/UserLandingPage'

//App
import AppPage from './src/User/UserLandingPage'
import SystemSignUp from './src/User/UserLandingPage'

//Tools
import ToolsPage from './src/User/UserLandingPage'


const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({ 'Droid': require('./assets/fonts/Droid.ttf'), });

  const CheckCoutryDetected = async () => {
    const value = await AsyncStorage.getItem('Country');
    if (!value) { return  true } else  { return false }
  }
  return (
     
      <NavigationContainer>
        <StatusBar barStyle="default" />
        <Stack.Navigator initialRouteName={'MainPage'} >

          <Stack.Screen options={{ headerShown: false  }} name="CountryPage" component={CountryPage} />
          
          <Stack.Screen options={{ headerShown: false  }} name="MainPage" component={MainPage} />
          <Stack.Screen options={{ headerShown: false  }} name="LandingPage" component={LandingPage} />
          <Stack.Screen options={{ headerShown: false  }} name="ResultPage" component={ResultPage} />
          <Stack.Screen options={{ headerShown: false  }} name="ProfilePage" component={ProfilePage} />
          <Stack.Screen options={{ headerShown: false  }} name="FastSearch" component={FastSearch} />
          <Stack.Screen options={{ headerShown: false  }} name="SeeAllList" component={SeeAllList} />

          <Stack.Screen options={{ headerShown: false  }} name="UserPage" component={UserPage} />
          <Stack.Screen options={{ headerShown: false  }} name="UserLogInPage" component={UserLogInPage} />
          <Stack.Screen options={{ headerShown: false  }} name="UserSignUpPage" component={UserSignUpPage} />
          
          <Stack.Screen options={{ headerShown: false  }} name="AppPage" component={AppPage} />
          <Stack.Screen options={{ headerShown: false  }} name="SystemSignUp" component={SystemSignUp} />
          
          
          <Stack.Screen options={{ headerShown: false  }} name="ToolsPage" component={ToolsPage} />

        </Stack.Navigator>
      </NavigationContainer>
     
  );
}
 