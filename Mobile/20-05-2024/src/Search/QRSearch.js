import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Button, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { CameraView, Camera } from "expo-camera/next";

import { useNavigation } from '@react-navigation/native';
import GConf from '../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { Ionicons } from '@expo/vector-icons';


const FastSearch = () => {
  /* ############################[Variable ]################################ */
 
  const [qrCodeValue, setQRCodeValue] = useState(null);  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [selectedListeTag, setSelectedListeTag] = useState({name:'', icon:''})
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  /* ############################[UseEffect]################################ */
    useEffect(() => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      };

      getCameraPermissions();
    }, []);

  /* ############################[Functions]################################ */
    const SaveFunction = () => {

    }
    const ShowUpLinks = (value) =>{
        
      const resultArray = value.split('/');
      setSelectedListeTag(GConf.ADIL[resultArray[0]].profileBtns[0])
      //setSelectedListeTag(GConf.ADIL[resultArray[0]].profileBtns.slice(0, GConf.ADIL[resultArray[0]].profileBtns.length - 1))
  }
  const GoToQrCodeFunction = (value) =>{
    const match = value.split("/");
    console.log(match[0])
    console.log(match[1])
 
    navigation.navigate('ProfilePage', {Tag: match[0] , PID: match[1]})
}

    const handleBarCodeScanned = ({ type, data }) => {
      // setScanned(true);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      ShowUpLinks(data)
      //GoToQrCodeFunction(data)
      setQRCodeValue(data)
                     
    };

    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

  /* ############################[Card     ]################################ */
  const ActionsBtnCard = (props) => {
    const navigation = useNavigation();
    const { qrCodeValue, data } = props;

    return (
      <TouchableOpacity
      style={{
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 2,
        borderRadius: 18,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor:'#dfdfdf',
        borderWidth : 1
      }}
      onPress={() => navigation.navigate(`/S/P/${qrCodeValue}?action=true`)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={data.icon} size={20} color="black" style={{ marginLeft: 10 }} />
        <Text style={{ color: 'black', marginLeft: 5, fontFamily: 'Droid' }}>
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
    );
  }


  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor='' leftCom=''   backLink='MainPage'  clickOption=''  />

            <ScrollView style={{ marginHorizontal:10,  }}>
                
                <View style={{flex: 1, marginTop: 15, borderRadius: 18,  width : '100%', overflow:'hidden', flexDirection: 'column', justifyContent: 'center', height : 250}}>
 
                  <CameraView
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barcodeScannerSettings={{
                          barcodeTypes: ["qr", "pdf417"],
                        }}
                        style={StyleSheet.absoluteFillObject}
                      />
                  {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                </View>


                <View style={{marginTop : 40}} >
                    {qrCodeValue == null ? (
                        <View style={{ alignItems: 'center', alignContent:'center',  flexDirection : isRTL ? 'row-reverse' :'row', justifyContent:'center' }}>
                            <View style={{flex : 2, alignContent:'center', alignItems: 'center',}}>
                              <Image
                                  source={{ uri: 'https://cdn.abyedh.tn/Images/required/preview.gif' }}
                                  style={{ width: 100, height: 100 }}
                              />
                            </View>
                            <View style={{flex : 8, }}>
                                <Text style={{ textAlign: isRTL ? 'flex-end' :'flex-start', marginTop: 0, fontFamily:'Droid' }}>قم بمسح المعرف</Text>
                            </View>
                           
                        </View>
                    ) : (
                        // <Button
                        //     title="زيارة الملف"
                        //     buttonStyle={{ backgroundColor: 'red', marginBottom: 3, borderRadius: 20 }}
                        //     titleStyle={{ color: 'white' }}
                        //     disabled={qrCodeValue == null}
                        //     onPress={() => GoToQrCodeFunction(qrCodeValue)}
                        // />
                        <TouchableOpacity
                                style={{
                                  backgroundColor: qrCodeValue == null ? 'gray' : 'red',
                                  marginBottom: 3,
                                  borderRadius: 20,
                                  paddingVertical: 10,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onPress={() => !qrCodeValue == null && GoToQrCodeFunction(qrCodeValue)}
                                disabled={qrCodeValue == null}
                              >
                                <Text style={{ color: 'white' , fontFamily:'Droid'}}>
                                  زيارة الملف
                                </Text>
                              </TouchableOpacity>
                    )}
                    <View style={{ flexDirection: 'row-reverse' }}>
                        {selectedListeTag.name != '' ? (
                            <ActionsBtnCard data={selectedListeTag} />
                        ) : (
                            <View />
                        )}
                    </View>
                </View>

                
            </ScrollView>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height : 500
  },
});
 

export default FastSearch;
