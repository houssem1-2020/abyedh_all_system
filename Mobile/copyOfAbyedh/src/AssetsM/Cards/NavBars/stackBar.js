import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const StackBarCard = (props) => {

    const navigation = useNavigation();
    const [isUserConnected, setIsUserConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkIfUserConnected = async () => {
          try {
            const value = await AsyncStorage.getItem('UserData');
            setIsUserConnected(!!value); // Set true if value exists, otherwise false
          } catch (error) {
            console.error('Error checking user connection:', error);
          } finally {
            setLoading(false); // Set loading to false after checking
          }
        };
    
        checkIfUserConnected();
      }, []);


      const LogOut = async () => {
        try {
          await AsyncStorage.removeItem('UserData');
           navigation.navigate('MainPage');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
      
    return(<>
        <Appbar style={{backgroundColor: props.backColor ? 'white' : 'white'}}>
            {props.leftComLogo ?
            <View style={{borderWidth: 1 , padding: 3,  borderColor:'red', marginLeft : 12 , borderTopLeftRadius: 5, borderTopRightRadius: 5,  borderBottomLeftRadius: 12, borderBottomRightRadius: 5,}} >
            <Image
                source={{uri:`https://cdn.abyedh.tn/images/logo/mlogo.gif`}} 
                style={{ width: 15, height: 35,  borderTopLeftRadius: 5, borderTopRightRadius: 5,  borderBottomLeftRadius: 12, borderBottomRightRadius: 5, backgroundColor:'red'}}
                
            />
            </View>
            :
            <View style={{marginLeft : 20, width: 28, height: 28 ,  borderRadius: 28 / 2,  justifyContent: 'center', alignItems: 'center', backgroundColor: props.backColor ? props.backColor : 'white'}}><Appbar.BackAction color={props.backLinkColor ? props.backLinkColor : 'black' } size={20} onPress={() => navigation.navigate(props.backLink)} /></View>
            }
            
            <Appbar.Content title="" /> 
            {
                props.dropDwon && 
                <View style={{ alignItems: 'center', marginTop: 5,   }} >
                    <Ionicons name="language" size={20} color="grey" onPress={() => navigation.navigate('CountryPage')} />
                </View>
            }
            <TouchableOpacity style={{alignItems: 'center', marginRight: 15 , marginLeft: 15, width: 28, height: 28 ,  borderRadius: 28 / 2, overflow: 'hidden',  }}  onPress={() => navigation.navigate('UserPage')}  >
                {
                    props.rigthImage && 

                    <>
                    {
                        isUserConnected ? 
                        <Image
                            source={{uri:`https://cdn.abyedh.tn/images/p_pic/${props.rigthImage}`}} 
                            style={{ width: 28, height: 28 ,  borderRadius: 14  }}
                        />
                        :
                        <TouchableOpacity onPress={() => navigation.navigate('UserLogInPage')} >
                            <Icon name="account-circle"  size={28} color={props.leftComLogo ? 'grey' :'white'} />
                        </TouchableOpacity>
                    }
                    </>
                    
                }
            </TouchableOpacity >
        </Appbar>
        
    </>)
};

export default StackBarCard;