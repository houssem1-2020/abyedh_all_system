import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
 
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const App = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 15}} >
        <View style={{height: 800, backgroundColor:'yellow'}}>
           
           
        </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default App;
