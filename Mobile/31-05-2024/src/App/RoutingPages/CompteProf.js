import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity , Button, Image, ActivityIndicator, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import APPConf from '../../AssetsM/APPConf';


function DocumentPage() {
     
    let [requestToSystem, setRequestToSystem] = useState({Req_State : 'W'})
    let [pWD, setPWD] = useState({Identification:'', PasswordSalt:''})
    let [loaderState, setLoading] = useState(false)
    let [savedBtn, setSavedBtn] = useState(false)
    let [loading, setLoad] = useState(false)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

     
    /*#########################[UseEfeect]##############################*/
    useEffect(() => {
         
    //     //GetPWD()
        axios.post(`${GConf.ApiSysLink}/system/request`, {
           PID : 1328110200, //GConf.PID,
           SystemTag : 'TAG'
        })
        .then(function (response) {
            setRequestToSystem(response.data)
            setLoad(false)
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, GConf.TostInternetGonf)   
            setRequestToSystem([])
          }
        });
    }, [])
    /*#########################[Function]###############################*/
    
     
    const RemoveToday = () =>{
        localStorage.setItem('removedCard', new Date().toLocaleDateString('fr-FR'));
        window.location.reload()
    }
    const RequestSystem = () => {
        setLoading(true)
        axios.post(`${GConf.ApiLink}/system/request/add`, {
            PID : GConf.PID,
            SystemTag : GConf.systemTag
         })
         .then(function (response) {
            setSavedBtn(true)
            setLoading(false)
            window.location.reload()
         }).catch((error) => {
           if(error.request) {
             toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, GConf.TostInternetGonf)   
              
           }
         });
    }
    const GetPWD = () => {
        axios.post(`${GConf.ApiSysLink}/system/request/getpwd`, {
            PID : 1328110200, //GConf.PID,
            SystemTag : GConf.systemTag
         })
         .then(function (response) {
              setPWD(response.data)
         }).catch((error) => {
           if(error.request) {
             toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, GConf.TostInternetGonf)   
              
           }
         });
    }
    /*#########################[Card]##################################*/

    const RequestSaved = (props) => {
        return (
            <>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ borderWidth: 1, padding: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, color: 'green', textAlign: 'center', marginBottom: 10 }}>✔</Text>
                        <Text style={{ fontSize: 20, color: 'orange', textAlign: 'right', marginBottom: 20 }}>جاري عملية التسجيل للحصول علي النظام المطلوب ...</Text>
                        <Text>تم إستقبال الطلب و سنقوم بالتواصل معكم عبر الرقم الذي قمتهم بالتسجيل به خلال 24 ساعة</Text>
                    </View>
                </View>
            </>
        );
    }
    
    const RequestAccepted = (props) => {
        return (
            <>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ borderWidth: 1, padding: 20, marginBottom: 20, shadowOpacity: 0.1 }}>
                        <Text style={{ fontSize: 20, color: 'green', textAlign: 'center' }}>مبروك لقد تحصلت علي النظام</Text>
                        <Text style={{ fontWeight: 'bold' }}>إضغط علي الرابط للتحول للنظام</Text>
                        <Text>معرف الدخول: {pWD.Identification}</Text>
                        <Text>كلمة المرور: {pWD.PasswordSalt}</Text>
                        <Text style={{ marginVertical: 20 }}>
                            يمكنك دائما التواصل معنا من أجل مساعدتك في فهم النظام و في إتمام عملية التثبيت, كما ننصح بمشاهدة الفيديو في الأعلي
                        </Text>
                        <TouchableOpacity style={{ backgroundColor: '#007bff', padding: 10, borderRadius: 5, alignItems: 'center' }} onPress={() => Linking.openURL(APPConf.landing[GConf.systemTag].systemUrl)}>
                            <Text style={{ color: 'white' }}>رابط النظام</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
    
    const PleaseSignUp = (props) => {
        return (
            <>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ borderWidth: 1, padding: 20, marginTop: 20, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'red', textAlign: 'right' }}>إشترك الآن و أحصل علي 15 يوم مجاني لتجرب النظام</Text>
                        <View style={{ padding: 10, color: 'grey', textAlign: 'right' }}>
                            <Text style={{ fontSize: 18 }}>النظام يحتاج إلي شرطين للعمل:</Text>
                            <Text>جهاز حاسوب ولا يهم إن كان محمول أو قار (يستسحن أن لا تقل الـRAM عن 4GB)</Text>
                            <Text>إتصال بالأنترنت (كلما كان الإتصال أفضل كان عمل النظام أفضل و الـWIFI أفضل من الـ3G/4G)</Text>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: APPConf.landing[GConf.systemTag].colorTheme, padding: 10, borderRadius: 5, alignItems: 'center' }} disabled={savedBtn} onPress={() => RequestSystem()}>
                            {loaderState && <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 10 }} />}
                            <Text style={{ color: 'white' }}>تسجيل طلب الإشتراك</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'grey' }}>سعر الإشتراك السنوي: 500 د.ت</Text>
                    </View>
                </View>
            </>
        );
    }
    
    const CammingSoonSystem = (props) => {
        return (
            <>
                <View style={{ marginVertical: 20, padding: 20 }}>
                    <View style={{ borderWidth: 1, padding: 20, shadowOpacity: 0.1 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image source={{ uri: `https://cdn.abyedh.tn/images/ads/${APPConf.systemTag}.svg` }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            <View style={{ marginLeft: 20, textAlign: 'right' }}>
                                <Text style={{ color: 'grey' }}>النسخة الكاملة لـ {APPConf.landing[APPConf.systemTag].systemTitle} <Text style={{ color: 'red' }}>ستكون متوفرة قريبا ...</Text> قم بتسجيل طلب الإشتراك و سنعلمك حين تكون متوفرة</Text>
                            </View>
                        </View>
                        {requestToSystem.length == 0 && (
                            <TouchableOpacity style={{ backgroundColor: APPConf.landing[GConf.systemTag].colorTheme, padding: 10, borderRadius: 5, alignItems: 'center' }} disabled={savedBtn} onPress={() => RequestSystem()}>
                                {loaderState && <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 10 }} />}
                                <Text style={{ color: 'white' }}>تسجيل طلب الإشتراك</Text>
                            </TouchableOpacity>
                        )}
                        {requestToSystem.Req_State && requestToSystem.Req_State == 'W' && (
                            <Text style={{ textAlign: 'center', color: 'orange', marginTop: 20 }}>جاري عملية التسجيل للحصول علي نظام ...</Text>
                        )}
                    </View>
                </View>
            </>
        );
    }

    const SystemItemCard = (props) => {
         
      
        return (
          <View style={{ flex: 1, maxWidth: '33%', marginRight: 8 }}>
            <View style={{
              backgroundColor: 'white',
              padding: 16,
              borderRadius: 8,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              borderColor: 'lightgray',
              borderWidth: 1,
              alignItems: 'center',
              marginBottom: 12,
              //color: APPConf.themeColor
            }}>
              <TouchableOpacity
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                onPress={() => navigation.navigate('System')}
              />
              <View style={{ alignItems: 'center' }}>
                <Icon
                  icon={props.data.icon}
                  size={32}
                  color={APPConf.landing[GConf.systemTag].colorTheme}
                />
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 4, marginBottom: 0, fontSize: 18, fontWeight: 'bold' }}>
                  {t(`appPages.mainPage.spesificTabs.${GConf.systemTag}.${props.data.link}`)}
                  <Icon
                    //icon={faGem}
                    size={10}
                    color="deepskyblue"
                  />
                </Text>
              </View>
            </View>
          </View>
        );
      };

    return (
        
            <View style={{ flex: 1, padding: 10 }}>
                 
                 <ScrollView  >
            {
                loading ? 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View> 
                : 
                <>
                    <Text style={{ marginBottom: 10, marginTop: 0, textAlign: 'center', color: APPConf.landing[GConf.systemTag].colorTheme, fontSize: 18 }}>
                        صفحة الأشتراك في النــــسـخـة الكــامـــلة
                    </Text>
                    <Text style={{ textAlign: 'center', marginTop: 0, color: APPConf.landing[GConf.systemTag].colorTheme, fontSize: 24 }}>
                        لـ{APPConf.landing[GConf.systemTag].systemTitle}
                    </Text>
                    <Text style={{ color: 'grey', fontSize: 18 }}>
                        النسخة الكاملة لــ{APPConf.landing[GConf.systemTag].systemTitle} تساعدك علي رقمنة نشاطك المهني , حيث تمكنك من :
                    </Text>
                    <View style={{ marginVertical: 20 }}>
                        {APPConf.landing[GConf.systemTag].systemPos.map((data, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={{ marginBottom: 0, fontSize: 18 }}>
                                    <Text style={{ fontSize: 12 }}>*</Text> {t(`appPages.systemInscriptionPage.systemsPlusData.${GConf.systemTag}.${data.id}`)}
                                </Text>
                            </View>
                        ))}
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {APPConf.landing[GConf.systemTag].systemItemsList.map((data,index) => <SystemItemCard key={index} data={data} /> )}
                    </ScrollView>
                    {/* {APPConf.landing[APPConf.systemTag].systemReady ?
                        <WebView
                            style={{ width: '100%', height: 250, borderRadius: 10 }}
                            source={{ uri: `https://www.youtube.com/embed/${APPConf.landing[GConf.systemTag].systemVideoId}` }}
                            allowsFullscreenVideo
                            allowsInlineMediaPlayback
                        />
                        : null
                    } */}
                    {!APPConf.landing[GConf.systemTag].systemReady ? <CammingSoonSystem data={APPConf.systemTag} /> : 
                        <>
                            {requestToSystem.length === 0 ? <PleaseSignUp /> : null}
                            {requestToSystem.Req_State === 'W' ? <RequestSaved /> : null}
                            {requestToSystem.Req_State === 'A' ? <RequestAccepted /> : null}
                        </>
                    }
                </>
            }
        </ScrollView>
            </View>
       
    );
}

export default DocumentPage;
