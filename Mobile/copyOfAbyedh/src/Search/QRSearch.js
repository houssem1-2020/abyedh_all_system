import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Button, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import StackBarCard from '../AssetsM/Cards/NavBars/stackBar';
import UsedBottomCard from '../AssetsM/Cards/BottomCard/usedButtomCard';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { CameraView, Camera } from "expo-camera/next";

import { useNavigation } from '@react-navigation/native';
import GConf from '../AssetsM/generalConf';



const FastSearch = () => {
  /* ############################[Variable ]################################ */
 
  const [qrCodeValue, setQRCodeValue] = useState(null);  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [selectedListeTag, setSelectedListeTag] = useState({name:'', icon:''})
  const navigation = useNavigation();

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
 
    navigation.navigate('ProfilePage', {Tag: match[0] , PID: match[2]})
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
        <Button
            title={data.name}
            buttonStyle={{
                backgroundColor: 'white',
                marginTop: 10,
                marginBottom: 2,
                borderRadius: 18,
                width: 'auto'
            }}
            titleStyle={{
                color: 'black',
                marginLeft: 5
            }}
            icon={{
                name: data.icon,
                type: 'font-awesome',
                color: 'black',
                size: 20,
                marginLeft: 10
            }}
            onPress={() => navigation.navigate(`/S/P/${qrCodeValue}?action=true`)}
        />
    );
  }


  return (
    <SafeAreaProvider style={{backgroundColor : 'white'}}>
        <SafeAreaView style={{ flex: 1}} >
          
            <StackBarCard backColor='' leftCom='' dropDwon={true}  backLink='MainPage' rigthImage='05.gif' clickOption=''  />

            <ScrollView style={{ marginHorizontal:10,  }}>
                
                <View style={{flex: 1, width : '100%',  flexDirection: 'column', justifyContent: 'center', height : 250}}>
 
                  <CameraView
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        barcodeScannerSettings={{
                          barcodeTypes: ["qr", "pdf417"],
                        }}
                        style={StyleSheet.absoluteFillObject}
                      />
                  {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                </View>


                <View>
                    {qrCodeValue == null ? (
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={{ uri: 'https://cdn.abyedh.tn/Images/required/preview.gif' }}
                                style={{ width: '100%', height: 200 }}
                            />
                            <Text style={{ textAlign: 'center', marginTop: 0 }}>قم بمسح المعرف</Text>
                        </View>
                    ) : (
                        <Button
                            title="زيارة الملف"
                            buttonStyle={{ backgroundColor: 'red', marginBottom: 3, borderRadius: 20 }}
                            titleStyle={{ color: 'white' }}
                            disabled={qrCodeValue == null}
                            onPress={() => GoToQrCodeFunction(qrCodeValue)}
                        />
                    )}
                    <View style={{ flexDirection: 'row-reverse' }}>
                        {selectedListeTag.name != '' ? (
                            <ActionsBtnCard data={selectedListeTag} />
                        ) : (
                            <View />
                        )}
                    </View>
                </View>

                <UsedBottomCard backColor='' leftCom='' dropDwon={true}  backLink='LandingPage' rigthImage='05.gif' clickOption=''  />
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
