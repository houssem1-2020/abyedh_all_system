import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert , Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';


const StackBarCard = (props) => {

    const navigation = useNavigation();

      
    return(<>
        <View style={{backgroundColor : '#dc3545', paddingTop: 14, paddingLeft : 14, height:'auto', borderTopLeftRadius: 35, borderTopRightRadius: 35,}}>
            {/* <Text style={{color : 'white', fontFamily:'Droid', marginBottom : 0}}>Abyedh.com</Text> */}
            <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'start', flex: 1 }}>
                  <IconButton icon={() => <Ionicons name="logo-facebook" size={20} color="white" />} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61557289701924')} />
                  <IconButton icon={() => <Ionicons name="logo-youtube" size={20} color="white" />} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61557289701924')} />
                  <IconButton icon={() => <Ionicons name="logo-instagram" size={20} color="white" />} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61557289701924')} />
                  <IconButton icon={() => <Ionicons name="logo-tiktok" size={20} color="white" />} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61557289701924')} />
                  <IconButton icon={() => <Ionicons name="logo-twitter" size={20} color="white" />} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61557289701924')} />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <IconButton icon={() => <Ionicons name="arrow-forward" size={20} color="white" />} onPress={() =>Linking.openURL('http://abyedh.com/about')} />
              </View>
            </View>
        </View>
         
    </>)
};

export default StackBarCard;