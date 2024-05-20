import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
 
import { Appbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const StackBarCard = (props) => {

    const navigation = useNavigation();

     const UserIconClicked = (genreClicked) =>{
        if (genreClicked == 'test') { navigation.navigate('MainPage') } 
        else { Alert.alert('LogIn')}
     }
    return(<>
        <Appbar style={{backgroundColor: props.backColor ? props.backColor : 'white'}}>
            {props.leftComLogo ?
            <View style={{borderWidth: 1 , padding: 3,  borderColor:'red', marginLeft : 12 , borderTopLeftRadius: 5, borderTopRightRadius: 5,  borderBottomLeftRadius: 12, borderBottomRightRadius: 5,}} >
            <Image
                source={{uri:`https://cdn.abyedh.tn/images/logo/mlogo.gif`}} 
                style={{ width: 15, height: 35,  borderTopLeftRadius: 5, borderTopRightRadius: 5,  borderBottomLeftRadius: 12, borderBottomRightRadius: 5, backgroundColor:'red'}}
                
            />
            </View>
            :
            <Appbar.BackAction color={props.backLinkColor ? props.backLinkColor : 'black' } onPress={() => navigation.navigate(props.backLink)} />
            }
            
            <Appbar.Content title="" /> 
            {
                props.dropDwon && 
                <View style={{ alignItems: 'center', marginTop: 5,   }} >
                    <Ionicons name="caret-down-outline" size={12} color="grey" onPress={() => navigation.navigate('CountryPage')} />
                </View>
            }
            <TouchableOpacity style={{alignItems: 'center', marginRight: 15 , marginLeft: 15, width: 28, height: 28 ,  borderRadius: 28 / 2, overflow: 'hidden',  }}  onPress={() => UserIconClicked('')}  >
                {
                    props.rigthImage && 
                    <Image
                        source={{uri:`https://cdn.abyedh.tn/images/p_pic/${props.rigthImage}`}} 
                        style={{ width: 28, height: 28 ,  borderRadius: 14  }}
                    />
                }
            </TouchableOpacity >
        </Appbar>
        {/* {
            props.bottomSearch &&  
            <View style={{padding : 15}}>
            <TextInput
                style={{ borderRadius: 20 }}
                mode="outlined"
                label="Email"
                //value={'text'}
                //onChangeText={text => setText(text)}
            />  
            </View> 
        } */}
        
    </>)
};

export default StackBarCard;