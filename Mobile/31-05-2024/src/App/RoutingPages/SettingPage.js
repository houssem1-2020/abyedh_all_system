import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,  Button,TextInput,  Alert, Share, Switch, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import {Picker} from '@react-native-picker/picker';
import APPConf from '../../AssetsM/APPConf';
import { SvgUri } from 'react-native-svg';

const CustomTabs = ({ activeIndex, setActiveIndex }) => {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const tabs = [
        { key: 0, icon: 'hospital-building', color: '#0275c5', label: 'Modifier' },
        { key: 1, icon: 'cart-arrow-down', color: '#8bc24a', label: 'MDP' },
        { key: 2, icon: 'heart', color: '#009788', label: 'Horaire' },
        { key: 3, icon: 'book', color: '#00bcd5', label: 'Position' },
        { key: 4, icon: 'truck', color: '#f44236', label: 'Images' },
        { key: 5, icon: 'leaf', color: '#fb1e6b', label: 'Evaluation' },
        
    ];

    return (
        <ScrollView    horizontal showsHorizontalScrollIndicator={false}  style={{     marginTop: 10, paddingHorizontal: 5, marginBottom: 20, width: '100%', overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={tab.key}
                    onPress={() => setActiveIndex(index)}
                    style={{   borderRadius: 50, paddingHorizontal: 10, paddingVertical: 10,   backgroundColor: activeIndex === index ? '#eee' : 'transparent' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                            <Icon color={tab.color} style={{marginHorizontal : 3, [isRTL ? 'marginLeft' : 'marginRight']: 3}} name={tab.icon}    />
                            <Text style={{fontFamily:'Droid',  textAlign: 'center',  color: tab.color,  }}> {tab.label} </Text>
                        </View>
                    
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const EditProfile = ({generalData, setGeneralData, UpdateGeneralDataFunc, delegList, GetDelegList, loaderState}) => {
    const genreOptions = [
        { key: 1 , value: '5 ETOILE', label: '5 ETOILE' },
        { key: 2 , value: 'MLAWOUI', label: 'MLAWOUI' },
        { key: 3 , value: 'PIZZA', label: 'PIZZA' },
        { key: 4 , value: 'FAST FOOD', label: 'FAST FOOD' },
    ];
    
    const Livraisonoptions = [
        { key: '1', value: 'INTIGO', label: 'INTIGO', image: 'https://foodealz.com/wp-content/uploads/2020/04/intigo-1-300x145-1.png' },
        { key: '2', value: 'Yassir', label: 'Yassir', image: 'https://foodealz.com/wp-content/uploads/2020/04/yassir.png' },
        { key: '3', value: 'Farm Trust', label: 'Farm Trust', image: 'https://foodealz.com/wp-content/uploads/2020/04/farmtrust.png' },
        { key: '4', value: 'Founashop', label: 'Founashop', image: 'https://foodealz.com/wp-content/uploads/2020/04/founa-shop.png' },
        { key: '5', value: 'Joy s', label: 'Joy’s', image: 'https://foodealz.com/wp-content/uploads/2020/04/28070452_400909117034010_1865031699315847664_o-300x300-1.jpg' },
    ];

    function GenerateGenreListe() {
        return APPConf.landing[GConf.systemTag].genreListe.map(item => ({
            key: item.id.toString(),
            value: item.name,
            label: item.name,
            image: `https://cdn.abyedh.tn/images/Search/Land_icons/${item.imgSrc}.gif`
        }));
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Information Génerale</Text>

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Nom</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
                placeholder='Nom'
                value={generalData.Name}
                onChangeText={text => setGeneralData({ ...generalData, Name: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Telephone</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
                placeholder='Telephone'
                value={generalData.Phone}
                onChangeText={text => setGeneralData({ ...generalData, Phone: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Geolocation</Text>
            <View style={{ marginBottom: 20 }}>
                {/* <Picker
                    selectedValue={generalData.Gouv}
                    style={{ height: 50, marginBottom: 20 }}
                    onValueChange={(itemValue, itemIndex) => GetDelegList(itemValue)}>
                    {TunMap.Gouv.map(option => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={generalData.Deleg}
                    style={{ height: 50 }}
                    onValueChange={(itemValue, itemIndex) => setGeneralData({ ...generalData, Deleg: itemValue })}>
                    {delegList.map(option => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker> */}
            </View>

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Adresse</Text>
            <TextInput
                style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10, textAlignVertical: 'top' }}
                placeholder='Adresse'
                multiline
                numberOfLines={3}
                value={generalData.Adress}
                onChangeText={text => setGeneralData({ ...generalData, Adress: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Genre</Text>
            <Picker
                selectedValue={generalData.Genre}
                style={{ height: 50, marginBottom: 20 }}
                onValueChange={(itemValue, itemIndex) => setGeneralData({ ...generalData, Genre: itemValue })}>
                {GenerateGenreListe().map(option => (
                    <Picker.Item key={option.key} label={option.label} value={option.value} />
                ))}
            </Picker>

            <View style={{ alignItems: 'flex-end' }}>
                <Button title="Modifier" onPress={UpdateGeneralDataFunc} />
                {loaderState && <ActivityIndicator size="small" color="#0000ff" style={{ marginLeft: 10 }} />}
            </View>
        </View>
    );
};

const EditPassword = ({ passwordData, setPasswordData, UpdatePasswordFunc, loaderState }) => {
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Modification de la mot de passe</Text>

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Identifiant</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
                placeholder='Nom'
                value={passwordData.Identification}
                onChangeText={text => setPasswordData({ ...passwordData, Identification: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Mot de passe</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 }}
                placeholder='Mot de passe'
                secureTextEntry
                value={passwordData.PasswordSalt}
                onChangeText={text => setPasswordData({ ...passwordData, PasswordSalt: text })}
            />

            <View style={{ alignItems: 'flex-end' }}>
                <Button title="Modifier" onPress={UpdatePasswordFunc} />
                {loaderState && <ActivityIndicator size="small" color="#0000ff" style={{ marginLeft: 10 }} />}
            </View>
        </View>
    );
};

const App = () => {

    /*###############################[Const]################################# */
    const [profileData, setProfileData] = useState([])
    const [generalData, setGeneralData] = useState({Name:'', Matricule_F:'', Phone:'', Adress:'',Genre:'', Lat: '0.0', Lng:'0.2'})
    const [passwordData, setPasswordData] = useState({Identification:'',PasswordSalt:''})
    
    /*Horiare */
    const [horaireData, setHoraireData] = useState([])
    //const [alwaysState , setAlwaysState] = useState(false)
    const [delegList ,setDelegList] = useState([])
    let [selectedUpdateDay , setSelectedUpdateDay] = useState('Lun')
    let [alwaysState , setAlwaysState] = useState(false)
    let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}}])
    let [test , setTest] = useState(10)
    

    /*Images */
    const [imagesListe, setImagesListe] = useState([])
    const [uploadImageName, setUploadImageName] = useState('')
    const [uploadImage, setUploadImages] = useState()
    const [formaDataArr, setFormDataArr] = useState()
    const [displayedImage, setDisplayedImage] = useState()
    const [todisplayedImage, setToDisplayedImage] = useState([])
    
    /*Position */
    const [myPosition, setMyPosition] = useState([36.17720,9.12337])
    let [position, setPosition] = useState({Lat: 36.83040, Lng: 10.13280})

    /* Others */
    const [loading , setLoading] = useState(false)
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const refRBSheet = useRef();
    const navigation = useNavigation();
    
    const renderTab = () => {
        switch (activeIndex) {
          case 0:  return <EditProfile generalData={generalData} setGeneralData={setGeneralData} UpdateGeneralDataFunc={UpdateGeneralDataFunc} delegList={delegList} GetDelegList={GetDelegList} loaderState={loaderState} />;
          case 1:  return <EditPassword passwordData={passwordData} setPasswordData={setPasswordData} UpdatePasswordFunc={UpdatePasswordFunc} loaderState={loaderState} />;
          case 2:  return <Horaire alwaysState={alwaysState} setAlwaysState={setAlwaysState} timming={timming} setTimming={setTimming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} setSelectedUpdateDay={setSelectedUpdateDay} selectedUpdateDay={selectedUpdateDay} UpdateTimmingData={UpdateTimmingData} />;
          case 3:  return <Location position={position} handleLocationSelected={handleLocationSelected} GetMyLocation={GetMyLocation} />;
          case 4:  return <ImageCard />;
          case 5:  return <EvaluationCard />;
          default:  return <Text>...</Text>;
        }
      };

    /*###############################[UseEffect]################################# */
    useEffect(() => {
        //window.scrollTo(0, 0);
        //GetPositionNow();
        axios.post(`${GConf.ApiLink}/profile`, {
            PID: GConf.PID,
            SystemTag : GConf.systemTag
        })
        .then(function (response) {
            console.log(response.data)
            setGeneralData(response.data.general[0])
            setProfileData(response.data)
            setPasswordData(response.data.password[0]) 
            setImagesListe(response.data.images)

            if (response.data.horaire[0]) { setAlwaysState(response.data.horaire[0].ALL_Time) } else { }
            if (response.data.horaire[0]) { setHoraireData(JSON.parse(response.data.horaire[0].WorkingTime)) } else { } 
            setLoading(true)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              setProfileData([])
              //setLoading(true)
            }
        });
    }, [])

    /*###############################[Function]################################# */
     
    
    /*Genrale */
    const GetDelegList = (value) =>{
        setGeneralData({...generalData, Gouv: value })
        const found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList(found)
    }
    const UpdateGeneralDataFunc = () =>{
        if (!generalData.Name) {toast.error("Matricule est Invalide !", GConf.TostErrorGonf)}
        // else if (!generalData.Name ) {toast.error("Nom de la ste est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Gouv ) {toast.error("Gouv est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Deleg ) {toast.error("Delegation est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Phone ) {toast.error("Phone est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Adress ) {toast.error("Adress est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Genre ) {toast.error("Genre est  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/profile/update/general`, {
                PID : GConf.PID,
                profileDataSent : generalData,
                SystemTag : GConf.systemTag
            }).then(function (response) {
                console.log(response.data)
                if(response.data.affectedRows) {
                    toast.success("Profile Modifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            })                
        }
    }
    const UpdatePasswordFunc = () =>{
        if (!passwordData.Identification) {toast.error("Identifiant est Invalide !", GConf.TostErrorGonf)}
        else if (!passwordData.PasswordSalt ) {toast.error("Mot de passe est  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/profile/update/password`, {
                PID : GConf.PID,
                passwordDataSent : passwordData,
                SystemTag : ADIL[GConf.systemTag].RequestTable
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Mot de Passe Modifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            })                
        }
    }



    /* Rating */
    const CalculateRating = (table) =>{
        let tot = 0;
        table.map( data => {
            tot = tot + data.Rating
        })
        if (tot == 0) {
            return tot
        } else {
            return parseFloat(tot / table.length).toFixed(1)
        }
        
        //
    }
    const CalculateLikes = (table) =>{
        const WantedValue =  table.length ;
        if ( (WantedValue / 1000) > 1 && (WantedValue / 1000000) < 1) { return parseFloat(WantedValue / 1000 ).toFixed(1) + 'K' }
        else  if ( (WantedValue / 1000000) > 1) { return parseFloat(WantedValue / 1000000 ).toFixed(1) +'M' }
        else{ return parseInt(WantedValue)  }
    }
    const CalculateReview = (table, value ) =>{
        let filteredArray = table.filter(obj => parseInt(obj.Rating) == value );
        if (filteredArray != 0) {
            return(parseInt((filteredArray.length / table.length) * 100 ) )
        } else {
            return 0
        }
        
    }
    const ReturnAvatarGroupList = (list) =>{
        let FinalList = []

        list.map( (data,index) => FinalList.push({ key: index, name: data.Name , src: `https://cdn.abyedh.tn/images/p_pic/${data.PictureId}.gif`},))
        return FinalList
    }

    /*Images */
    const UploadImageFunc = (e) => {
        setDisplayedImage(URL.createObjectURL(e.target.files[0]))
        setUploadImages(e.target.files[0])
    }
    const UpdateImageFunc = (genre) =>{
        if (!uploadImage) {toast.error("Image est Invalide !", GConf.TostErrorGonf) } 
        else {
            const formData = new FormData();
            formData.append("Images", uploadImage);
            formData.append("PID", GConf.PID);
            formData.append("Genre", genre);
            setLS(true)
            axios({
                method: 'post',
                url: `${GConf.ApiInputLink}/nouveaux/image`,
                data: formData ,
            }).then(function (response) {
                toast.success("Image Enregistreé !", GConf.TostSuucessGonf)
                setLS(false)
            }).catch((error) => {
                toast.error(<><div><h5>Probleme de Connextion</h5> La commande sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)
            });  
        } 
    }
    const handleFileSelect = (event)  =>{
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            const filename = `restaurant_${GConf.PID}_${i}-`;
            formData.append('Images', files[i], filename);
        }
        formData.append("PID", GConf.PID);
        //setDisplayedImage(URL.createObjectURL(event.target.files[0]))
        const uploadedImages = Array.from(event.target.files);
        setToDisplayedImage(uploadedImages);
        //files.map(() => console.log(files.length))
        
        setFormDataArr(formData);
        //UpdateImageFuncMultiple(formData);
    }
    const UpdateImageFuncMultiple = (formData) =>{
        console.log(todisplayedImage.length)
        if (todisplayedImage.length < 5) {toast.error("Il Faut 5 Images !", GConf.TostErrorGonf) } 
        else if (todisplayedImage.length > 5) {toast.error("cinque Images Seulemment Sont autoriseé !", GConf.TostErrorGonf) } 
        else {
            axios.post(`${GConf.ApiLink}/profile/images/ajouter`, formData)
            .then(response => toast.error("Images Enregistreé !", GConf.TostSuucessGonf))
            .catch(error => console.log(error));
        }
        
    }
    // const UpdateImageFunc = () =>{
    //     if (!uploadImage) { } 
    //     else if (!uploadImageName) { }
    //     else {
    //         const formData = new FormData();
    //         formData.append("ProfileImage", uploadImage);
    //         formData.append("Tag", uploadImageName);
    //         formData.append("PID", GConf.PID);
    //         axios({
    //             method: 'post',
    //             url: `${GConf.ApiLink}/profile/images/ajouter`,
    //             data: formData ,
    //         }).then(function (response) {
    //             console.log(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         });  
    //     } 
    // }
    // const UploadImageFunc = (e) => {
    //     setDisplayedImage(URL.createObjectURL(e.target.files[0]))
    //     setUploadImages(e.target.files[0])
    // }
    const RemoveImageFunc = (imgName) => {
        console.log(imgName.slice(0, -4))
        axios.post(`${GConf.ApiLink}/profile/images/deletefile`, {
            fileName : imgName,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Image Supprimeé !", GConf.TostSuucessGonf)
                setLS(false)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        })
    }
    
    /*Position */
    const GetPositionNow = () =>{
        //get position 
        navigator.geolocation.getCurrentPosition(
            function(position) {
                if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
                else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
                else{
                    setMyPosition([position.coords.latitude, position.coords.longitude])
                }
            },
            function(error) {
                toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
            }
        );
    }
    const CheckPositions = () =>{
        let LAT = myPosition[0] === parseFloat(generalData.Lat)
        let LNG = myPosition[1] === parseFloat(generalData.Lng)
        return (LAT && LNG)
    }
    const UpdatePositionFunc = () =>{
        if (!passwordData.Identification) {toast.error("Identifiant est Invalide !", GConf.TostErrorGonf)}
        else if (!passwordData.PasswordSalt ) {toast.error("Mot de passe est  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/profile/update/position`, {
                PID : GConf.PID,
                positionDataSent : myPosition,
                SystemTag : GConf.systemTag
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Position Modifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            })                
        }
    }
    const handleLocationSelected = (location) => {
        setPosition({Lat: location.lat , Lng:location.lng})
    }
    const GetMyLocation = () =>{
        navigator.geolocation.getCurrentPosition(
            function(position) {
                if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
                else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
                else{
                    setPosition({Lat:position.coords.latitude, Lng:position.coords.longitude})
                }
            },
            function(error) {
                toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
            }
        );
    }

    /*Horiare */
    const SetTimmingData = (day,time,genre,value) => {
        const targetIndex = timming.findIndex(element => element.day === day)
        let copyOfHoraire = timming

        if (time == 'matin') {
            if (genre == 'start') {
                copyOfHoraire[targetIndex].matin.start = value
                setTimming(copyOfHoraire)
            } else {
                copyOfHoraire[targetIndex].matin.end = value
                setTimming(copyOfHoraire)
            }
        } else {
            if (genre == 'start') {
                copyOfHoraire[targetIndex].soir.start = value
                setTimming(copyOfHoraire)
            } else {
                copyOfHoraire[targetIndex].soir.end = value
                setTimming(copyOfHoraire)
            }
        }

    }
    const UpdateTimmingData = (day,time,genre,value) => {
        //setTimming(...timming)
        setTest(Math.random())
        toast.success("", GConf.TostAddedToTimming)

    }  
    const setPauseDay = (day,state) =>{
        const targetIndex = timming.findIndex(element => element.day === day)
        let copyOfHoraire = timming
        copyOfHoraire[targetIndex].dayOff = !state
        setTimming(copyOfHoraire)
        setTest(Math.random())
    }

    /*###############################[Card]################################# */

    const Location = () => {
        return(<Text>Location</Text>)
    }

    const Horaire = () => {
        return(<Text>Horaire</Text>)
    }

    const ImageCard = () => {
        return(<Text>Images</Text>)
    }

    const EvaluationCard = () => {
        return(<Text>EvaluationCard</Text>)
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, paddingTop: 15}} >
        <View style={{ flexDirection:'row',  alignItems:'center', justifyContent:'space-between' ,  marginBottom: 25,}}>
          <View style={{ flex: 4,  alignItems:'center', justifyContent:'center' , }}>
            <TouchableOpacity style={{alignItems: 'center', marginRight: 15 , marginBottom: 12,  marginLeft: 15, width: 80, height: 80 ,  borderRadius: 80 / 2, overflow: 'hidden', position: 'relative', }}  onPress={() => refRBSheet.current.open()}  >
              <SvgUri
                  uri={`https://cdn.abyedh.tn/images/ads/${GConf.systemTag}.svg`} 
                  width = '80px' 
                  height= '80px'
                  //style={{borderRadius : 15}} 
              />
              
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                right: 10,
                width: 24,
                height: 24,
                zIndex:100,
                borderWidth:3,
                borderColor: 'white',
                borderRadius: 12,
                backgroundColor: '#e0e0de',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => refRBSheet.current.open()} ><Icon name="account-edit" size={16} color="#4287f5" /></TouchableOpacity>
              
            </View>
          </View>
          <View style={{ flex: 8,  alignItems:'center', justifyContent: 'flex-start' , }}> 
            <Text style={{color:'grey', fontFamily:'Droid', fontSize: 15}} > Houusem Khelifi  </Text>
            <Text style={{color:'grey', fontFamily:'Droid', fontSize: 20}} > 
                    5566987514  
                    <TouchableOpacity style={{paddingLeft : 5, }}><Text><Icon name='content-copy' color='grey'  size={20} /> </Text></TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft : 5, }}><Text><Icon name='qrcode-scan' color='grey'  size={20} /> </Text></TouchableOpacity>
            </Text>
          </View>
        </View>
        <CustomTabs activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        
        {renderTab()}
        
        <RBSheet 
            height = {Dimensions.get('window').height - 65}
            ref={refRBSheet} 
            draggable 
            //dragOnContent  
            customStyles={{ 
                draggableIcon: {
                    backgroundColor: 'grey',
                },
                container : {
                borderTopRightRadius : 15,
                borderTopLeftRadius : 15 , 
                padding : 7,
                }
            }} 
            style={{borderTopStartRadius : 13, borderTopRightRadius : 13}}
            >
                <View style={{borderTopStartRadius : 13, borderTopRightRadius : 13}}  >
                        
                    <Text>Seeting </Text>      
                </View>
            
        </RBSheet>
            
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

 

export default App;
