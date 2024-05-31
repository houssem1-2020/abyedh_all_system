import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';
import GConf from '../../AssetsM/generalConf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CustomTabs = ({ activeIndex, setActiveIndex }) => {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const tabs = [
        { key: 0, icon: 'hospital-building', color: '#0275c5', label: t(`userProfile.favoiteItemList.admin`) },
        { key: 1, icon: 'cart-arrow-down', color: '#8bc24a', label: t(`userProfile.favoiteItemList.commerce`) },
        { key: 2, icon: 'heart', color: '#009788', label: t(`userProfile.favoiteItemList.sante`) },
        { key: 3, icon: 'book', color: '#00bcd5', label: t(`userProfile.favoiteItemList.education`) },
        { key: 4, icon: 'truck', color: '#f44236', label: t(`userProfile.favoiteItemList.transport`) },
        { key: 5, icon: 'leaf', color: '#fb1e6b', label: t(`userProfile.favoiteItemList.life`) },
        { key: 6, icon: 'bicycle', color: '#47ccd1', label: t(`userProfile.favoiteItemList.sport`) },
        { key: 7, icon: 'bitcoin', color: '#ff9700', label: t(`userProfile.favoiteItemList.finance`) },
        { key: 8, icon: 'factory', color: '#565d61', label: t(`userProfile.favoiteItemList.construction`) },
        { key: 9, icon: 'halloween', color: '#673bb7', label: t(`userProfile.favoiteItemList.autre`) }
    ];

    return (
        <ScrollView inverted={isRTL}  horizontal showsHorizontalScrollIndicator={false}  style={{  transform: isRTL ?  [{ scaleX: -1 }] : [] ,   marginTop: 10, paddingHorizontal: 5, marginBottom: 20, width: '100%', overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={tab.key}
                    onPress={() => setActiveIndex(index)}
                    style={{transform: isRTL ?  [{ scaleX: -1 }] : [] ,  borderRadius: 50, paddingHorizontal: 10, paddingVertical: 10,   backgroundColor: activeIndex === index ? '#eee' : 'transparent' }}>

                        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', justifyContent:'center'}}>
                            <Icon color={tab.color} style={{marginHorizontal : 3, [isRTL ? 'marginLeft' : 'marginRight']: 3}} name={tab.icon}    />
                            <Text style={{fontFamily:'Droid',  textAlign: 'center',  color: tab.color,  }}> {tab.label} </Text>
                        </View>
                    
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const FavoritePage = () => {
    const UID = 9020480279;
    const [favoriteList, setFList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    useEffect(() => {
          axios.post(`${GConf.ApiProfileLink}/favorite`, {
            UID:UID
          })
          .then(function (response) {
            setFList(response.data)
            setLoading(false)
          })
    }, []);

    const ProfileCard = ({ data }) => (
      <View style={{ marginBottom: 15, alignItems: 'center' }}>
          <TouchableOpacity style={{alignItems:'center',}}   onPress={() =>  navigation.navigate('ProfilePage', {Tag: data.Genre , PID : data.PID})}> 
              <Image source={{ uri: `https://cdn.abyedh.tn/Images/Search/CIcons/${data.Genre}.gif` }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 5 }} />
              <Text style={{ fontSize: 12 }}>{data.Name}</Text>
          </TouchableOpacity>
      </View>
  );

    const FavoriteList = ({ categ }) => {
        const result = favoriteList.filter(table => table.Category === categ);
         

        

        if (loading) return <SekeltonCard />;

        if (result.length === 0) return <EmptyCard />;

        return (
            <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', flexWrap: 'wrap' }}>
                {result.map((data, index) => (
                    <View key={index} style={{ width: '50%', padding: 5,  }}>
                        <ProfileCard data={data} />
                    </View>
                ))}
            </View>
        );
    };

    const SekeltonCard = () => (
        <View style={{ flexDirection: 'row', flex: 1, paddingStart : 20,  flexWrap: 'wrap', alignItems:'center'  }}>
            {[...Array(6)].map((_, index) => (
                <View key={index} style={{ width: '33.33%', padding: 5 }}>
                    <View style={{ height: 70, width: 70, borderRadius: 35, backgroundColor: '#e0e0e0' }} />
                </View>
            ))}
        </View>
    );

    const EmptyCard = () => (
        <View style={{ alignItems: 'center', padding: 20 }}>
            <Image source={{ uri: 'https://cdn.abyedh.tn/images/profile/empty-fvrt.png' }} style={{ width: '80%', height: 220 }} />
            <Text style={{ fontFamily:'Droid',  textAlign: 'center', marginTop: 20 }}>ليس لديك اي عنصر في المفضلة . قم بإكتشاف محرك البحث في الصفحة الرئسية</Text>
        </View>
    );

    const panes = [
        { key: 'admin', label: 'Admin', categ: 'Admin' },
        { key: 'commerce', label: 'Commerce', categ: 'PTVente' },
        { key: 'sante', label: 'Sante', categ: 'Sante' },
        { key: 'education', label: 'Education', categ: 'Education' },
        { key: 'transport', label: 'Transport', categ: 'Transpo' },
        { key: 'life', label: 'Life', categ: 'Life' },
        { key: 'sport', label: 'Sport', categ: 'Sport' },
        { key: 'finance', label: 'Finance', categ: 'Finance' },
        { key: 'build', label: 'Build', categ: 'Construct' },
        { key: 'other', label: 'Other', categ: 'Other' }
    ];

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}  >
             
           <Text>Trif et articles </Text>  
        </ScrollView>
    );
};

export default FavoritePage;