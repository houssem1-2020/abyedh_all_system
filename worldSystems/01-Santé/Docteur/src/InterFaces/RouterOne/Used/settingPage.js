import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Link, NavLink } from 'react-router-dom';
import GConf from '../../../AssetsM/generalConf';
import CountUp from 'react-countup';
import { Tab, Divider, Icon, Statistic, Comment, Input, Button, Form, TextArea, Select, Loader, Dropdown, Checkbox, Label, Menu} from 'semantic-ui-react';
import axios from 'axios';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import { toast } from 'react-toastify';
import Ripples from 'react-ripples'
import { useTranslation, Trans } from 'react-i18next';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { getToken } from "firebase/messaging";
import { messaging } from "./../../../AssetsM/firebase";
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';


const EditPassword = ({passwordData, setPasswordData, UpdatePasswordFunc,loaderState}) =>{
    const { t, i18n } = useTranslation();
    
    return(<>
        <h3>{t('communUsed.profilePage.pwdEditData.title')}</h3>
        <h5 className='mb-1'>{t('communUsed.profilePage.pwdEditData.identifiant')}</h5>
        <Input icon='user' iconPosition='left' placeholder={t('communUsed.profilePage.pwdEditData.identifiant')} value={passwordData.Identification} onChange={(e) => setPasswordData({...passwordData, Identification: e.target.value })}   fluid />
        <h5 className='mb-1'>{t('communUsed.profilePage.pwdEditData.pwd')}e</h5>
        <Input icon='eye' iconPosition='left' placeholder={t('communUsed.profilePage.pwdEditData.pwd')} value={passwordData.PasswordSalt} onChange={(e) => setPasswordData({...passwordData, PasswordSalt: e.target.value })}   fluid />
        <br />
        <div className='text-end'>
            <Button  className='rounded-pill bg-system-btn' onClick={() => UpdatePasswordFunc()} ><Icon name='save' /> {t('communUsed.profilePage.pwdEditData.editBtn')} <Loader active={loaderState} inverted  inline size='tiny' className='ms-2'/></Button>
        </div>
    </>)
}
const EditCountry = () => {
    const { t, i18n } = useTranslation();

    const SelectCountry = (country) => {
        //i18n.changeLanguage(lan)
        localStorage.setItem('country', country);
        window.location.reload();
      }
    const ItemCard = (props) => {
        return(<>
            <div className='card p-2 shadow-sm border-div mb-2' onClick={() => SelectCountry(props.country)} >
                    <div className='row'>
                       <div className='col-2'> <img src={`https://flagpedia.net/data/flags/w580/${props.countryFlag}.webp`} className="img-responsive rounded-circle" width="30px" height="30px" /></div> 
                       <div className='col-10 align-self-center'>{props.countryName}</div> 
                    </div>
            </div>
        </>)
    }
    return(<>
    <div className='row justify-content-center'>
        <div className='col-8'>
            <h5>Slectioner un Payes</h5>
            <ItemCard country='TN' countryFlag='tn' countryName='تونس' />
            <ItemCard country='MA' countryFlag='ma' countryName='المغرب' />
            <ItemCard country='EG' countryFlag='eg' countryName='مصر' />
            <ItemCard country='FR' countryFlag='fr' countryName='France' />
            <ItemCard country='IT' countryFlag='it' countryName='Italia' />
            <ItemCard country='DE' countryFlag='de' countryName='Deutschland' />
            <ItemCard country='RU' countryFlag='ru' countryName='россия' />
            <ItemCard country='GB' countryFlag='gb' countryName='United Kongdom' />
            <ItemCard country='CA' countryFlag='ca' countryName='Canada' />
            <ItemCard country='US' countryFlag='us' countryName='United State' />
            <ItemCard country='SA' countryFlag='sa' countryName='العربية السعودية' />
            <ItemCard country='QA' countryFlag='qa' countryName='قطر' />
            <ItemCard country='AE' countryFlag='ae' countryName='الأمارات المتحدة العربية' />
            <ItemCard country='JP' countryFlag='jp' countryName='日本' />
            <ItemCard country='IN' countryFlag='in' countryName='भारत ' />
            <ItemCard country='CN' countryFlag='cn' countryName='中国' />
        </div>
    </div>
    </>)
}
const EditLanguage = () => {
    const { t, i18n } = useTranslation();

    const SelectCountry = (lan) => {
        i18n.changeLanguage(lan)
        //localStorage.setItem('country', country);
      }
    const ItemCard = (props) => {
        return(<>
            <div className='card p-2 shadow-sm border-div mb-2' onClick={() => SelectCountry(props.country)} >
                    <div className='row'>
                       <div className='col-2'> <img src={`https://flagpedia.net/data/flags/w580/${props.countryFlag}.webp`} className="img-responsive rounded-circle" width="30px" height="30px" /></div> 
                       <div className='col-10 align-self-center'>{props.countryName}</div> 
                    </div>
            </div>
        </>)
    }
    return(<>
    <div className='row justify-content-center'>
        <div className='col-8'>
            <h5>Slectioner un Payes</h5>

            <ItemCard country='fr_FR' countryFlag='fr' countryName='France' />
            <ItemCard country='en_US' countryFlag='us' countryName='United State' />
            <ItemCard country='ja' countryFlag='jp' countryName='日本' />
            <ItemCard country='hi' countryFlag='in' countryName='भारत ' />
            <ItemCard country='zh_CN' countryFlag='cn' countryName='中国' />
            <ItemCard country='de_DE' countryFlag='de' countryName='Deutschland' />
            <ItemCard country='ru' countryFlag='ru' countryName='россия' />
            <ItemCard country='it_IT' countryFlag='it' countryName='Italia' />
            
        </div>
    </div>
    </>)
}
function SettingPage() {
    /*###############################[Const]################################# */
    const { t, i18n } = useTranslation();
    const [loading , setLoading] = useState(false)
    const [confirmed , setConfirmed] = useState(false)
    const [setting , setSetting] = useState([])
    const [activationState , setActivationState] = useState(false)
    const [modalS, setModalS] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [openD, setOpenD] = useState(false)
    const [checkedTT, setChekedTT] = useState(false)
    const [checkedTN, setChekedTN] = useState(false)
    const [tokenIdValue, setTokenIdValue] = useState('')
    const [countryName, setCountryName] = useState('')
    const [passwordData, setPasswordData] = useState({Identification:'',PasswordSalt:''})
    const [loaderState, setLS] = useState(false)
    const Defaultactivation = {
        "PK": 4,
        "PID": OneGConf.forPID.PID,
        "State": "Expired",
        "ExpiredThe": new Date(),
        "FirstActivation": new Date(),
        "LatsActivation": new Date()
    }
    const Defaultconfirmation = {
        "PK": 4,
        "PID": OneGConf.forPID.PID,
        "Activated": "",
    }
    const defaultSettingData = {
        "PK": 1,
        "PID": OneGConf.forPID.PID,
        "Profile": "[true,false,true]",
        "Commandes": "[false,5,true]",
        "Menu": "[true,false,true]",
        "Stock": "[true,true,true]",
        "Factures": "[2.2,true,true]",
        "Caisses": "[true,false,false,false]",
        "Clients": "[true,false,true]",
        "Equipe": "[true,6]",
        "Fournisseur": "[true,false,true]"
    }
     
    /*###############################[UseEffect]############################# */
    useEffect(() => {
        axios.post(`${GConf.SharedApi}/parametre`, {
            PID: OneGConf.forPID.PID,
            SystemTag : GConf.systemTag
        })
        .then(function (response) { 
            console.log(response.data)
            if (!response.data.confirmation || !response.data.activation || !response.data.setting) {
                setConfirmed(Defaultconfirmation)
                setActivationState(Defaultactivation)
                setSetting(defaultSettingData)
                setLoading(true)
                if (response.data.tokenID && response.data.tokenID.Notif_Token != '' ) { setChekedTN(true); setTokenIdValue(response.data.tokenID.Notif_Token)}
                
            } else {
                setConfirmed(response.data.confirmation)
                setActivationState(response.data.activation)
                setSetting(response.data.setting)
                setLoading(true)
                
            }
            
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              setConfirmed([])
              setActivationState([])
              setSetting([])
            }   
        });
        axios.post(`${GConf.SharedApi}/subsystem/get-password`, {
            PID: OneGConf.forPID.PID,
            UserID : OneGConf.forPID[OneGConf.loginData.ID_Tag],
            loginUsedData : OneGConf.loginData,
        })
        .then(function (response) {
            setPasswordData({Identification: response.data[OneGConf.loginData.Identifiant] ,PasswordSalt: response.data[OneGConf.loginData.Password]}) 
            setLoading(true)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
            }
        });

        GetCountryNameInDefaultLanguage(GConf.Country)
    }, [])

    /*###############################[Function]############################## */
    const CalculateResteJour = (date) =>{
        let exDate = new Date(date) 
        let date_1 = new Date(exDate);
        let date_2 = new Date();
        const days = (date_1, date_2) =>{
            let difference = date_1.getTime() - date_2.getTime();
            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
            return TotalDays;
        }
        return days(date_1, date_2)
    }
    const setChekingItem = (genre,index) =>{
        console.log(genre)
        console.log(index)
    }
    const OpenBottomSheetFunction = (genre) => {
        setActiveIndex(genre)
        setOpenD(!openD)
    }
    const UpdatePasswordFunc = () =>{
        console.log(OneGConf.forPID[OneGConf.loginData.ID_Tag])
        console.log(OneGConf.loginData)
        console.log(passwordData)
        if (!passwordData.Identification) {toast.error("Identifiant est Invalide !", GConf.TostErrorGonf)}
        else if (!passwordData.PasswordSalt ) {toast.error("Mot de passe est  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.SharedApi}/subsystem/password`, {
                PID : OneGConf.forPID.PID,
                UserID : OneGConf.forPID[OneGConf.loginData.ID_Tag],
                loginUsedData : OneGConf.loginData,
                passwordDataSent : passwordData,
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
    const UpdateNotifToken = (genre,token) => {
        if (genre == 'remove'  ) {
            setLS(true)
            axios.post(`${GConf.SharedApi}/subsystem/notification`, {
                PID : OneGConf.forPID.PID,
                Token : '',
                UserID : OneGConf.forPID[OneGConf.loginData.ID_Tag],
                loginData : OneGConf.loginData
            }).then(function (response) {
                setChekedTN(!checkedTN); 
            })
        }
        else {
            setLS(true)
            axios.post(`${GConf.SharedApi}/subsystem/notification`, {
                PID : OneGConf.forPID.PID,
                Token : token,
                UserID : OneGConf.forPID[OneGConf.loginData.ID_Tag],
                loginData : OneGConf.loginData
            }).then(function (response) {
                setChekedTN(!checkedTN); 
            }) 
        } 
    }
    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();
    
        if (permission === "granted") {
          const token = await getToken(messaging, {
            vapidKey: 'BLi4rh1fVu7f9p_RBBscq7eQs3tY8yETbeW7p0tj2oH9oM0rnAxwSDs1F4Xy6Q0bITAo9F_fTxwLz3TA3-4Gw5U',
          });
    
          //We can send token to server
          console.log("Token generated : ", token);
          UpdateNotifToken('Add', token)
        } else if (permission === "denied") {
          //notifications are blocked
          console.log("You denied for the notification");
        }
    }
    const GetCountryNameInDefaultLanguage = async  (isoCode) => {
        console.log(isoCode)
        const url = `https://restcountries.com/v3.1/alpha/${isoCode}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data[0]) {
                // Get the default language based on the first language in the list
                const defaultLanguageCode = Object.keys(data[0].languages)[0];
                
                // Get the country name in the default language
                const countryNameInDefaultLanguage = data[0].translations && data[0].translations[defaultLanguageCode]
                    ? data[0].translations[defaultLanguageCode].common
                    : data[0].name.common; // Fallback to common name if translation is not available
    
                    
                    setCountryName(countryNameInDefaultLanguage);
            } else {
                throw new Error('Country data not found');
            }
        } catch (error) {
            console.error('Error fetching country name:', error);
            return null;
        }
    }
    const UpdateNotificationState = () => {
        if (checkedTN) {
            UpdateNotifToken('remove', '')
        } else {
            requestPermission();
        }
    }
    const logOutInput = () =>{    
        localStorage.removeItem(`${OneGConf.routerTagName}_forPID`);
        window.location.href = `/${OneGConf.routerName}`;
    }

    /*###############################[Card]################################# */
    const GeneralSetting = () =>{
        const ConirmedCard = () =>{
            return(<>
                <div className="row p-2">
                    <div className="col-12 col-lg-3 align-self-center text-center"><span className='bi bi-shield-fill-check bi-lg text-success'></span> </div>
                    <div className="col-12 col-lg-8 text-start">
                        <div className='text-success'><b>{t('communUsed.settingPage.confirmerCard.isConfirmer')}</b></div> 
                        <p className='abyedh-text'>{t('communUsed.settingPage.confirmerCard.isConfirmerText')} </p>
                    </div>
                </div>
            </>)
        }
        const NonConirmedCard = () =>{
            return(<>
                <div className="row p-2">
                    <div className="col-12 col-lg-2 align-self-center text-center"><span className='bi bi-shield-fill-exclamation bi-lg text-danger'></span> </div>
                    <div className="col-12 col-lg-6 text-start">
                        <div className='text-danger'><b>{t('communUsed.settingPage.confirmerCard.nonConfirmer')}</b></div> 
                        <p className='abyedh-text'>{t('communUsed.settingPage.confirmerCard.nonConfirmerText')} </p>
                    </div>
                    <div className="col-12 col-lg-4 align-self-center text-center">
                        <NavLink exact='true' to='confirmation'>
                            <Button  className='rounded-pill bg-system-btn' size="tiny"  ><Icon name='check' /> {t('communUsed.settingPage.confirmerCard.nonConfirmerBtn')} </Button> 
                        </NavLink>   
                    </div>
                </div>
            </>)
        }
        const Activated = (props) =>{
            return(<>
                    <h5><i className="bi bi-check-circle-fill text-success me-1"></i> {t('communUsed.settingPage.activationCard.isActivated')} </h5>
                    <div>{new Date(props.data.LatsActivation).toLocaleDateString()} <i className="bi bi-arrow-left-right"></i> {new Date(props.data.ExpiredThe).toLocaleDateString()}</div>
            </>)
        }
        const Expired = (props) =>{
            return(<>
                    <h5><i className="bi bi-exclamation-diamond-fill text-danger me-1"></i> {t('communUsed.settingPage.activationCard.isExpired')} </h5>
                    <div>{new Date(props.data.LatsActivation).toLocaleDateString()} <i className="bi bi-arrow-left-right"></i> {new Date(props.data.ExpiredThe).toLocaleDateString()}</div>
            </>)
        }
        const RedirectToActivationCard = () =>{
            return(<>

                <div className='row mt-5'>
                    <div className='col-9 align-self-center'> <h5>{t('communUsed.settingPage.activationCard.activeIci')} </h5></div>
                    <div className='col-3'>
                        <NavLink exact='true' to='paymment'>
                            <Button  className='rounded-pill text-dark' size="tiny"    style={{backgroundColor : '#fcba03'}}>  {t('communUsed.settingPage.activationCard.activeIciBtn')} </Button> 
                        </NavLink>
                    </div>
                </div>
            </>) 
        }
        return (<>
                <div className="card card-body shadow-sm mb-3 border-div " style={{backgroundColor:'#dae8f0'}}>
                    <h3 style={{color:GConf.themeColor}}> <span className='bi bi-toggle-on'></span> {t('communUsed.settingPage.activationCard.title')}</h3>
                    
                    <div className="row">
                        <div className="col-12 col-md-5 align-self-center text-center">
                            <h1 className="pb-0 mb-0 text-danger"> <CountUp end={CalculateResteJour(activationState.ExpiredThe)} duration={2} /> </h1>
                            <small>{t('communUsed.settingPage.activationCard.jour')}</small>
                        </div>
                        <div className="col-12 col-md-7  border-end">
                            {/* {activationState.State == 'Activated' ? <Activated data={activationState} /> : <Expired data={activationState} />} */}
                            {CalculateResteJour(activationState.ExpiredThe) > 0 ? <Activated data={activationState} /> : <Expired data={activationState} />}
                        </div>
                            {CalculateResteJour(activationState.ExpiredThe) > 0 ? '' :  <RedirectToActivationCard />} 
                    </div>
                </div>
                <div className="card card-body shadow-sm mb-3 border-div" style={{backgroundColor:'#e6daf0'}}>
                    <h3 style={{color:GConf.themeColor}}><span className='bi bi-check-circle-fill'></span> {t('communUsed.settingPage.confirmerCard.title')}</h3>
                    {confirmed.Activated == 'true' ? <ConirmedCard /> : <NonConirmedCard />}
                </div>  
        </>);
    }
    const ProfileSetting = (props) =>{
        let  genre = props.genre
        let  setting = JSON.parse(props.setting)
        const CheckBoxSetting = (props) =>{
            return(<>
            <Ripples className='d-block mb-2 shadow-sm border-div' > 
                <div className="card card-body border-div">
                    <h3 style={{color:GConf.themeColor}}><span className={`bi bi-${props.data.icon}`}></span> {props.data.title}</h3>
                    <div className="row">
                        <div className="col-10 col-lg-11 text-secondary">
                        {props.data.text}
                        </div>
                        <div className="col-2 col-lg-1">
                            <div className="form-check form-switch">
                                <input className="form-check-input form-check-input-lg" type="checkbox" onChange={() => setChekingItem(props.genre,props.index)} checked={props.setting} />
                            </div>
                        </div>
                    </div>
                </div>
                </Ripples>
            </>)
        }
        const InputTextSetting = (props) =>{
            
            return(<>
            <Ripples className='d-block mb-2 shadow-sm border-div' >
                <div className="card card-body  border-div">
                    <h3 style={{color:GConf.themeColor}}><span className={`bi bi-${props.data.icon}`}></span> {props.data.title}</h3>
                    <div className="row">
                        <div className="col-8 col-lg-11 text-secondary align-self-center">
                            {props.data.text}
                        </div>
                        <div className="col-4 col-lg-1 align-self-center tex-end">
                            <h2><Input size="mini" transparent className='text-blod w-75'  defaultValue={props.setting} /></h2>
                        </div>
                    </div>
                </div>
                </Ripples>
            </>)
        }
        return (<>
                {GConf.Setting[genre].items.map( (Sitem,index) => 
                        <>
                        { Sitem.genre == 'C' ?
                        <CheckBoxSetting index={index} setting={setting[index]} data={Sitem} genre={genre}/>
                        :
                        <InputTextSetting index={index} setting={setting[index]} data={Sitem} genre={genre} />
                        }
                        </>
                )}
        </>);
    }
    const SettingItemCard = (props) =>{
        return(<>
                <div className="list-group-item list-group-item-action" onClick={() => OpenBottomSheetFunction('general')}>
                    <Link to='#' className="stretched-link"></Link>
                    <div className="row p-2">
                        <div className="col-11 align-self-center text-left">
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    {/* <img src={`https://cdn.abyedh.com/Images/setting/${props.image}.gif`} className="img-responsive rounded-circle" style={{width:"50px"}}></img> */}
                                    <div className='rounded-circle text-white m-0'  style={{width:45 , height:45, backgroundColor: props.color , textAlign:'center', paddingTop:'25%'}}><span className={`bi bi-${props.icon} bi-sm`} ></span></div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <b>{t(`communUsed.settingPage.settingCard.${props.id}.title`)}</b>
                                    <br />
                                    <small className="text-secondary">{t(`communUsed.settingPage.settingCard.${props.id}.desc`)}</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 align-self-center"><span className="bi bi-arrow-right-short bi-md"></span></div>
                    </div>
                </div>
        </>)
    }
    const ChangeThemeMode = () =>{
        if (OneGConf.themeMode == 'dark') {
            localStorage.setItem(`${OneGConf.routerTagName}_Theme`, 'ligth');
            window.location.reload()
        } else {
            localStorage.setItem(`${OneGConf.routerTagName}_Theme`, 'dark');
            window.location.reload()
        }
       
    }
    return (<>
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.rt}/>
            <br />
            <div className='container'>
            <Bounce bottom> 
                <div className="row justify-content-center">
                     
                    <div className="col-12 col-lg-7">
                        <div className="list-group shadow-sm mb-4 border-div">
                            {/* {GConf.Setting.map((sett,index) => <SettingItemCard key={index} link={sett.link} color={sett.color} icon={sett.icon} image={sett.image} description={sett.description} id={sett.id} title={sett.title} />)} */}
                            <div className="list-group-item list-group-item-action" onClick={() => OpenBottomSheetFunction('language')}>
                                <div className="row p-2">
                                    <div className="col-11 align-self-center text-left">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className='rounded-circle text-secondary m-0'  style={{width:45 , height:45, backgroundColor: 'white' , textAlign:'center', paddingTop:'25%'}}><span className={`bi bi-translate bi-sm`} ></span></div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                {/* <b>{t(`communUsed.profilePage.menuTabList.imagesEdit`)}</b> */}
                                                <b>Language</b>
                                                <br />
                                                <small className="text-secondary">{localStorage.getItem('i18nextLng')}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 align-self-center"><span className="bi bi-arrow-right-short bi-md"></span></div>
                                </div>
                            </div>
                            <div className="list-group-item list-group-item-action" onClick={() => OpenBottomSheetFunction('country')}>
                                <div className="row p-2">
                                    <div className="col-11 align-self-center text-left">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className='rounded-circle text-secondary m-0'  style={{width:45 , height:45, backgroundColor: 'white' , textAlign:'center', paddingTop:'25%'}}><span className={`bi bi-globe-europe-africa bi-sm`} ></span></div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <b>Country</b>
                                                {/* <b>{t(`communUsed.profilePage.menuTabList.avisShow`)}</b> */}
                                                <br />
                                                <small className="text-secondary">{countryName}</small>
                                                

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 align-self-center"><span className="bi bi-arrow-right-short bi-md"></span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="list-group shadow-sm mb-4 border-div">
                            <div className="list-group-item list-group-item-action" onClick={() => OpenBottomSheetFunction('pwd')}>
                                <div className="row p-2">
                                    <div className="col-11 align-self-center text-left">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className='rounded-circle text-secondary m-0'  style={{width:45 , height:45, backgroundColor: 'white' , textAlign:'center', paddingTop:'25%'}}><span className={`bi bi-eye-slash bi-sm`} ></span></div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <b>{t(`communUsed.profilePage.menuTabList.pwdEdit`)}</b>
                                                <br />
                                                <small className="text-secondary">**************</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 align-self-center"><span className="bi bi-arrow-right-short bi-md"></span></div>
                                </div>
                            </div>
                             
                        </div>
                        <div className="list-group shadow-sm mb-4 border-div">
                            <div className="list-group-item list-group-item-action"  >
                                <div className="row p-2">
                                    <div className="col-11 align-self-center text-left">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className='rounded-circle text-secondary m-0'  style={{width:45 , height:45, backgroundColor: 'white' , textAlign:'center', paddingTop:'25%'}}><span className={`bi bi-moon-stars bi-sm`} ></span></div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <b>Mode Sombre</b>
                                                {/* <b>{t(`communUsed.profilePage.menuTabList.horaireEdit`)}</b> */}
                                                <br />
                                                <small className="text-secondary">{'Ligth'}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 align-self-center">
                                         <div className="form-check form-switch">
                                            <input className="form-check-input form-check-input-lg" type="checkbox" defaultChecked={OneGConf.themeMode == 'dark'} checked={OneGConf.themeMode == 'dark'} onChange={() => ChangeThemeMode()}  />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="list-group-item list-group-item-action"  >
                                <div className="row p-2">
                                    <div className="col-11 align-self-center text-left">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0">
                                                <div className='rounded-circle text-secondary m-0'  style={{width:45 , height:45, backgroundColor: 'white' , textAlign:'center', paddingTop:'25%'}}><span className={`bi bi-bell bi-sm`} ></span></div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <b>Notification </b>
                                                {/* <b>{t(`communUsed.profilePage.menuTabList.horaireEdit`)}</b> */}
                                                <br />
                                                <div className="text-secondary text-truncate small" style={{maxWidth : '350px'}}>{tokenIdValue}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-1 align-self-center">
                                         <div className="form-check form-switch">
                                            <input className="form-check-input form-check-input-lg" type="checkbox" checked={checkedTN} onChange={ () => UpdateNotificationState()}  />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>  
                        </div>

                        <Button onClick={logOutInput} fluid style={{backgroundColor:GConf.themeColor}} className='rounded-pill text-white p-2' icon='log out' />

                    </div>
                </div>
        </Bounce>
            </div>
        </div>

        
        <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
            <div className='card-body'>
                
                { activeIndex =='country' ?   <EditCountry /> : <></> }  
                { activeIndex == 'pwd' ?  <EditPassword passwordData={passwordData} setPasswordData={setPasswordData} UpdatePasswordFunc={UpdatePasswordFunc} loaderState={loaderState} /> : <></> }
                { activeIndex == 'language' ?  <EditLanguage /> : <></> }   
                </div>
        </BottomSheet>
         
    </>);
}
 
export default SettingPage;