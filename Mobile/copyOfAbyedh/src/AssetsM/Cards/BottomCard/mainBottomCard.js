import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
 
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const StackBarCard = (props) => {

    const navigation = useNavigation();

     const UserIconClicked = (genreClicked) =>{
        if (genreClicked == 'test') { navigation.navigate('LandingPage') } 
        else { Alert.alert('LogIn')}
     }
    return(<>
        <Appbar style={{backgroundColor: props.backColor ? props.backColor : 'white'}}>
            <Appbar.BackAction onPress={() => navigation.navigate(props.backLink)} />
            <Appbar.Content title="" /> 
            {
                props.dropDwon && 
                <View style={{ alignItems: 'center', marginTop: 5,   }} >
                    <Ionicons name="caret-down-outline" size={12} color="grey" onPress={() => Alert.alert('Arrow')} />
                </View>
            }
            <TouchableOpacity style={{alignItems: 'center', marginRight: 15 , marginLeft: 15, width: 28, height: 28 , borderRadius: 50, }}  onPress={() => UserIconClicked('')}  >
                <Image
                    source={{uri:`https://cdn.abyedh.tn/images/p_pic/${props.rigthImage}`}} 
                    style={{ width: 28, height: 28 ,  borderRadius: 14  }}
                />
            </TouchableOpacity >
        </Appbar>
    </>)
};

export default StackBarCard;