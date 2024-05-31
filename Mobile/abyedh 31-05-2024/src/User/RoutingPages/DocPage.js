import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';


function DocumentPage() {
     
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

     

    const folderGenres = [
        { id: 0, name: 'ملفات صحية', link: 'sante', icon: 'heart-pulse-fill', color: '#3048d1' },
        { id: 1, name: 'ملفات التعليم', link: 'education', icon: 'mortarboard-fill', color: '#20274f' },
        { id: 2, name: 'ملفات النقل', link: 'transport', icon: 'truck-front-fill', color: '#b5452f' },
        { id: 3, name: 'ملفات رياضية', link: 'sport', icon: 'bicycle', color: '#60bdd6' },
    ];

    const borderedFolderGenres = [
        { id: 0, name: 'وثائق  ', link: 'document', icon: 'file-earmark-break-fill', color: '#2766ee' },
        { id: 1, name: ' إشتراكات', link: 'souscription', icon: 'postcard-heart-fill', color: '#e8276e' },
        { id: 2, name: ' فواتير', link: 'factures', icon: 'receipt-cutoff', color: '#4287f5' },
        { id: 3, name: ' وصل', link: 'ticket', icon: 'ticket-detailed-fill', color: '#4287f5' },
    ];

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
                <Text style={{ textAlign: 'right', fontSize: 20, fontFamily:'Droid', marginBottom: 10 }}>ملفات</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    {folderGenres.map((data, index) => (
                        <DocumentCard key={index} data={data} fullW />
                    ))}
                </View>

                <Text style={{ textAlign: 'right', fontSize: 20, fontFamily:'Droid', marginBottom: 10 }}>وثائق عامة</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center', alignItems: 'center' }}>
                    {borderedFolderGenres.map((data, index) => (
                        <DocumentCard key={index} data={data} />
                    ))}
                </View>
            </View>
       
    );
}

export default DocumentPage;
