import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';


function DocumentPage() {
     
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

     

    

    const DocumentCard = ({ data, fullW, bordered }) => (
        <View style={{  width: fullW ? '100%' : '48%', borderWidth: 1,  marginHorizontal : 1,   borderColor:'#dfdfdf' , borderRadius: 10, marginBottom: 10 }}>
            <TouchableOpacity onPress={() => console.log(data.link)}>
                <View style={{ padding: 10, borderColor: bordered ? 'black' : 'transparent' }}>
                    <View style={{ flexDirection: isRTL ? 'row-reverse' :  'row', alignItems: 'center' }}>
                        <View style={{ width: 40, alignItems: 'center', marginRight: isRTL ? 10 : 0, marginLeft: isRTL ? 0 : 10 }}>
                            <Icon name={data.icon} size={24} color={data.color} />
                        </View>
                        <Text style={{ fontSize: 16, fontFamily:'Droid',  alignSelf: 'center', textAlign: isRTL ? 'right' : 'left' }}>{data.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        
            <View style={{ flex: 1, padding: 10 }}>
                 
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                     <Text style={{fontFamily:'Droid', fontSize : 15}}>
                        Vous n'avez pas du compte pro {'\n'}
                        vous pouvez ajouter un compte ou bien vous pouver enoyer cette page a un ami 
                        {'\n'}{'\n'}{'\n'}
                        or fetch all waiting request related for this UID
                        {'\n'}{'\n'}{'\n'}
                         
                    </Text>
                </View>

            
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center', alignItems: 'center' }}>
                     
                </View>
            </View>
       
    );
}

export default DocumentPage;
