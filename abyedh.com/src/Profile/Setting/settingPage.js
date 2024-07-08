import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import {Grid, _ } from "gridjs-react";
import { Button, Accordion, Icon, List, Input, Header,  Modal, Placeholder } from 'semantic-ui-react';
import { Select } from 'semantic-ui-react'
import { Bounce } from 'react-reveal';
import { NavLink } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

const ChangePhoto = () => {
    return<>
    ChangePhoto 
    </>
}

const EditGeneralSettingCard = ({delegList,GetDelegList, GConf, setGeneralData, generalData, SaveGeneralDFunc}) =>{
    const options = [
        { key: '1', value: '01', text: '01', image: { src: 'https://cdn.abyedh.com/images/p_pic/01.gif', avatar: true } },
        { key: '2', value: '02', text: '02', image: { src: 'https://cdn.abyedh.com/images/p_pic/02.gif', avatar: true } },
        { key: '3', value: '03', text: '03', image: { src: 'https://cdn.abyedh.com/images/p_pic/03.gif', avatar: true } },
        { key: '4', value: '04', text: '04', image: { src: 'https://cdn.abyedh.com/images/p_pic/04.gif', avatar: true } },
        { key: '5', value: '05', text: '05', image: { src: 'https://cdn.abyedh.com/images/p_pic/05.gif', avatar: true } },
        { key: '6', value: '06', text: '06', image: { src: 'https://cdn.abyedh.com/images/p_pic/06.gif', avatar: true } },
        { key: '7', value: '07', text: '07', image: { src: 'https://cdn.abyedh.com/images/p_pic/07.gif', avatar: true } },
        { key: '8', value: '08', text: '08', image: { src: 'https://cdn.abyedh.com/images/p_pic/08.gif', avatar: true } },
        { key: '9', value: '09', text: '09', image: { src: 'https://cdn.abyedh.com/images/p_pic/09.gif', avatar: true } },
        { key: '10', value: '10', text: '10', image: { src: 'https://cdn.abyedh.com/images/p_pic/10.gif', avatar: true } },
        { key: '11', value: '11', text: '11', image: { src: 'https://cdn.abyedh.com/images/p_pic/11.gif', avatar: true } },
        { key: '12', value: '12', text: '12', image: { src: 'https://cdn.abyedh.com/images/p_pic/12.gif', avatar: true } },
        { key: '13', value: '13', text: '13', image: { src: 'https://cdn.abyedh.com/images/p_pic/13.gif', avatar: true } },
        { key: '14', value: '14', text: '14', image: { src: 'https://cdn.abyedh.com/images/p_pic/14.gif', avatar: true } },
        { key: '15', value: '15', text: '15', image: { src: 'https://cdn.abyedh.com/images/p_pic/15.gif', avatar: true } },
    ]
    const sexOptions = [
        { key: '1', value: 'male', text: 'ذكر'  },
        { key: '2', value: 'female', text: 'أنثي'},
         
    ]

    return(<>
            <h5 className='mb-1 text-end'>    <span className='bi bi-calendar2'></span> الاسم</h5>
            <Input className='mb-3' type='text' fluid   value={generalData.Name}  autoComplete='off' onChange={(e) => setGeneralData({...generalData, Name: e.target.value })} />
            
            <h5 className='mb-1 text-end'> <span className='bi bi-calendar2'></span>  تاريخ الولادة   </h5>
            <Input className='mb-3' type='date' fluid   value={new Date(generalData.BirthDay).toISOString().substring(0, 10)} onChange={(e) => setGeneralData({...generalData, BirthDay: e.target.value })} />

            <h5 className='mb-1 text-end'> <span className='bi bi-calendar2'></span>  الهاتف   </h5>
            <Input className='mb-3' type='text' fluid   value={generalData.PhoneNum} onChange={(e) => setGeneralData({...generalData, PhoneNum: e.target.value })} />

            <h5 className='mb-1 text-end'> <span className='bi bi-person-x-fill'></span>   الجنس   </h5>
            <Select className='mb-3' fluid options={sexOptions} value={generalData.EL_Genre} onChange={(e, { value }) => setGeneralData({...generalData, EL_Genre: value })} />
            
            <div className='p-1 mb-2'>
                <h5 className='mb-1 text-end'>  <span className='bi bi-person-x-fill'></span>      الموقع الجغرافي :  {generalData.BirthGouv} - {generalData.BirthDeleg}</h5>
                <Select placeholder='اختر ولاية' fluid className='mb-2' options={GConf.abyedhMap.Gouv} value={generalData.BirthGouv} onChange={(e, { value }) => GetDelegList(value,true)} />
                <Select placeholder='اختر مدينة ' fluid value={generalData.BirthDeleg} options={delegList} onChange={(e, { value }) => setGeneralData({...generalData, BirthDeleg: value })} />
            </div>

            <h5 className='mb-1 text-end'> 
                     <img src={`https://cdn.abyedh.com/images/p_pic/${generalData.PictureId}.gif`} className='rounded-circle' width='30px' height='30px'  />     صورة الحساب          
            </h5>
            <Select className='mb-3' fluid options={options} onChange={(e, { value }) => setGeneralData({...generalData, PictureId: value })} />

            <div className='text-end mt-4'>
                <Button size='tiny' fluid onClick={ (e) => SaveGeneralDFunc()} className='rounded-pill bg-danger text-white' icon> <Icon name='edit' /> حفظ التعديلات </Button>    
            </div>

    </>)
}
const EditPWDSettingCard = ({passwordData, setPWDData, SavePWDFunc}) =>{
    return(<>
            <div dir='rtl'>
                 <h5 className='mb-1 text-end'  > <span className='bi bi-geo-alt'></span> المعرف </h5>
                <Input className='mb-1' type='text' fluid  value={passwordData.PhoneNum} onChange={(e) => setPWDData({...passwordData, PhoneNum: e.target.value })} />

                <h5 className='mb-1 text-end mt-2'  > <span className='bi bi-geo-alt-fill'></span> كلمة المرور </h5>
                <Input className='mb-3' type='text' fluid  value={passwordData.PasswordHash} onChange={(e) => setPWDData({...passwordData, PasswordHash: e.target.value })} />
                 
                <div className='text-start mt-4'>
                    <Button size='tiny' fluid onClick={ () => SavePWDFunc()} className='rounded-pill bg-danger text-white' icon> <Icon name='edit' /> حفظ التعديلات  </Button>    
                </div> 
            </div>
    </>)
}
const EditDirectorySettingCard = ({delegList,GetDelegList, GConf, generalData, setGeneralData, SaveSettingFunc}) =>{
    return(<>
            <div dir='rtl'>
                <h5 className='text-end'>مكان البحث الإفتراضي</h5> 
                <div className='p-1 mb-2'>
                    <h5 className='mb-1 text-end'>    {generalData.BirthGouv} - {generalData.BirthDeleg} </h5>
                    <Select placeholder='اختر ولاية' fluid className='mb-2' options={GConf.abyedhMap.Gouv} value={generalData.BirthGouv} onChange={(e, { value }) => GetDelegList(value,true)} />
                    <Select placeholder='اختر مدينة ' fluid value={generalData.BirthDeleg} options={delegList} onChange={(e, { value }) => setGeneralData({...generalData, BirthDeleg: value })} />
                </div>

                <div className='text-start mt-4'>
                    <Button size='tiny' fluid onClick={ (e) => SaveSettingFunc()} className='rounded-pill bg-danger text-white' icon> <Icon name='edit' /> حفظ التعديلات  </Button>    
                </div> 
            </div>
    </>)
}
const ChangeCountry = () => {
    return<>
    Change Countrey 
    </>
}
const ChangeLanguage = () => {
    return<>
    Change Language 
    </>
}
const ReportBug = () => {
    return<>
    ReportBug
    </>
}
const ContactUs = () => {
    return<>
    ContactUs
    </>
}
function SettingPage() {
     /* ########################[Const]########################## */
    let UID = JSON.parse(localStorage.getItem("UID"));
    const [modalS, setModalS] = useState(false)
    const [seledtedItem, setSelectedItem] = useState('pwd')

    const [generalData, setGeneralData] = useState([])
    const [passwordData, setPWDData] = useState([])
    const [settingData, setSettingData] = useState([])

    const [activeIndex, setActiveIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [delegList ,setDelegList] = useState([]) 

    const [generalEditStat, setGeneraleEditState] = useState(false)
    const [passwordEditStat, setPasswordEditState] = useState(false)
    const [directoryEditStat, setDirectoryEditState] = useState(false)

    const [loaderState, setLS] = useState(false)

    const [checkedTT, setChekedTT] = useState(false)
    const [checkedTN, setChekedTN] = useState(false)
    const [openD, setOpenD] = useState(false)

    const setting =[
        {id:0, name:'عام', imgSrc:'01', iconTitle:'arrows-move'},
        {id:1, name:'كملة المرور', imgSrc:'05', iconTitle:'key-fill'},
        {id:2, name:'محرك البحث', imgSrc:'03', iconTitle:'search-heart'},
        // {id:1, name:'المفضلة', imgSrc:'02', iconTitle:'balloon-heart-fill'},
        // {id:2, name:'الارشيف و الوثائق', imgSrc:'04', iconTitle:'file-zip-fill'},
    ]

    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /* ########################[UseEffect]###################### */
    useEffect(() => {
        console.log(GConf.UserData)
        axios.post(`${GConf.ApiProfileLink}/setting`, {
            UID:UID
          })
          .then(function (response) {
            setPWDData(response.data.Auth)
            setGeneralData(response.data.General)
            setSettingData(JSON.parse(response.data.Setting.Directory))
          })
      }, [])

    /* ########################[Functions]###################### */
    const OpenModalFunction = (genre) => {
        setSelectedItem(genre)
        setModalS(true)
    }
    const OpenBottomSheetFunction = (genre) => {
        setSelectedItem(genre)
        setOpenD(!openD)
    }
    const GetDelegList = (value,state) =>{
        if (state) {
            setGeneralData({...generalData, BirthGouv: value })
        } else {
            setSettingData({...settingData, Gouv: value })
        } 
        const found = GConf.abyedhMap.Deleg.filter(element => element.tag === value)
        setDelegList(found)
    }

    const SaveSettingFunc = () => {
        if (!generalData.BirthDeleg  ) {toast.error("أدخل  كلمة المرور   !", GConf.TostErrorGonf)}
        else if (!generalData.BirthGouv  ) {toast.error("أدخل  المعرف   !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiProfileLink}/setting/update/location`, {
                UID : UID,
                BirthGouv : generalData.BirthGouv,
                BirthDeleg : generalData.BirthDeleg,

            }).then(function (response) {

                if (response.status == 200) {
                    toast.success(<><div><h5>تم التعديل بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                    setLS(false)
                    localStorage.setItem('UserData', JSON.stringify(generalData)); 
                    // console.log({Logged: true, UData : generalData})
                    // console.log(GConf.UserData)
                }
                
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        } 
    }
    const SavePWDFunc = () => {
        if (!passwordData.PasswordHash  ) {toast.error("أدخل  كلمة المرور   !", GConf.TostErrorGonf)}
        else if (!passwordData.PhoneNum  ) {toast.error("أدخل  المعرف   !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiProfileLink}/setting/update/pwd`, {
                UID : UID,
                PasswordHash : passwordData.PasswordHash,
                PhoneNum : passwordData.PhoneNum,

            }).then(function (response) {
                toast.success(<><div><h5>تم التعديل بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                setLS(false)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        } 

    }
    const SaveGeneralDFunc = () => {
        if (!generalData.Name  ) {toast.error("أدخل  كلمة المرور   !", GConf.TostErrorGonf)}
        else if (!generalData.BirthDay  ) {toast.error("أدخل  المعرف   !", GConf.TostErrorGonf)}
        else if (!generalData.Sex  ) {toast.error("أدخل  المعرف   !", GConf.TostErrorGonf)}
        else if (!generalData.BirthGouv  ) {toast.error("أدخل  المعرف   !", GConf.TostErrorGonf)}
        else if (!generalData.BirthGouv  ) {toast.error("أدخل  المعرف   !", GConf.TostErrorGonf)}
        else if (!generalData.PictureId  ) {toast.error("أدخل  المعرف   !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiProfileLink}/setting/update/generale`, {
                UID : UID,
                generalData : generalData,

            }).then(function (response) {

                if (response.status == 200) {
                    toast.success(<><div><h5>تم التعديل بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                    setLS(false)
                    localStorage.setItem('UserData', JSON.stringify(generalData)); 
                }
                
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        }
    }
    const logOutInput = () =>{    
        //localStorage.clear();
        localStorage.removeItem('UID')
        localStorage.removeItem('UserData')
        localStorage.removeItem('PID')
        localStorage.removeItem('APP_TAG')
        window.location.href = "/Profile";
    }
    const onShare = async () => {
        if (navigator.share) {
          try {
            const result = await navigator.share({
              title: 'Khelifi Houssem Profile',
              text: 'Khelifi houssem Profile sur Abyedh',
              url: 'http://abyedh.com/',
            });
            console.log('Successfully shared', result);
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          alert('Sharing is not supported in this browser.');
        }
    };

    /* ########################[Card]########################### */
    const SettingItem = (props) =>{
        return(<>
            <Accordion.Title
                active={activeIndex === props.data.id}
                index={props.data.id}
                onClick={(e) => setActiveIndex(props.data.id)}
                className='card shadow-sm border-div mb-1'
            >
                    <div className='row p-2'>
                        <div className={`col-6 align-self-center pe-3   ${isRTL ? 'text-end' : 'text-start'}`} style={{color:'#4287f5'}}><h4 dir={isRTL ? 'rtl' : 'ltr'} >{props.data.name} <span className={`bi bi-${props.data.iconTitle}`}></span></h4></div>
                        <div className={`col-6 align-self-center ps-3  ${isRTL ? 'text-start' : 'text-end'}`}><img src={`https://cdn.abyedh.com/Images/Profile/setting/${props.data.imgSrc}.gif`} width='30px' height='30px' /></div>
                    </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === props.data.id} className='card mt-2 mb-2 shadow-sm border-div ' >
                <div className='card-body '>
                        <SelectSetting selected={props.data.id} />
                </div>
            </Accordion.Content>
        </>)
    }
    const SelectSetting = ({ selected }) => {
        const statusCard = React.useCallback(() => {
          switch(selected) {
            case 0 : return <GenralSettingCard />;  
            case 1 : return <PWDSettingCard /> ;
            case 2 : return <DirectorySettinfCard />;
            default:  return <GenralSettingCard />;    
          }
        }, [selected]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        )
    }

    const GenralSettingCard = () =>{
       
        return(<>
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-qr-code-scan bi-sm text-secondary ms-2'></span>  المعرف الوحيد</b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ? <b className='text-danger' onClick={ (e) => OpenModalFunction('qrcode')}>{generalData.UID}</b>  : ''} </div>
            </div>
            <hr /> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-person-fill bi-sm text-secondary ms-2'></span> الاسم و اللقب</b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ?  generalData.Name : ''} </div>
            </div>
            <hr /> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-calendar-heart-fill bi-sm text-secondary ms-2'></span>  تاريخ الميلاد </b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ?  new Date(generalData.BirthDay).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) : ''} </div>
            </div>
            <hr /> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-telephone-x-fill bi-sm text-secondary ms-2'></span>  رقم الهاتف </b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ?  generalData.PhoneNum : ''} </div>
            </div>
            <hr /> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-gender-ambiguous bi-sm text-secondary ms-2'></span>   الجنس </b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ?  generalData.Sex : ''} </div>
            </div>
            <hr /> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-geo-alt-fill bi-sm text-secondary ms-2'></span>  الولاية  </b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ?  generalData.BirthGouv : ''} </div>
            </div>
            <hr /> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-pin-map-fill bi-sm text-secondary ms-2'></span>  المدينة  </b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ?  generalData.BirthDeleg : ''} </div>
            </div>
            <hr /> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-person-circle bi-sm text-secondary ms-2'></span>  صورة الحساب  </b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {generalData ?  <img src={`https://cdn.abyedh.com/images/p_pic/${generalData.PictureId}.gif`} className='rounded-circle' width='30px' height='30px'  /> : ''} </div>
            </div>
            {/* <br />
            <div className='text-start'>
                <Button size='tiny' onClick={ () => setGeneraleEditState(!generalEditStat)} className='rounded-pill' icon> <Icon name='edit' /> تعديل </Button>    
            </div> */}
        </>)
    }
    const PWDSettingCard = () =>{
        return(<>
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-person-badge-fill bi-sm text-secondary ms-2'></span> المعرف</b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {passwordData.PhoneNum} </div>
            </div>
            <hr />
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-key-fill bi-sm text-secondary ms-2'></span>  كلمة المرور</b>  </div>
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> {passwordData.PasswordHash} </div>
            </div>
            {/* <br />
            <div className='text-start'>
                <Button size='tiny' onClick={ (e) => OpenModalFunction('pwd')} className='rounded-pill' icon> <Icon name='edit' /> تعديل </Button>    
            </div> */}
        </>)
    }
    const DirectorySettinfCard = () =>{
        return(<>
            <h5>مكان البحث الإفتراضي</h5> 
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-calendar-heart-fill bi-sm text-secondary ms-2'></span> الولاية </b>  </div>
                <div className='col-6  align-self-center text-start'> {generalData.BirthGouv} </div>
            </div>
            <hr />
            <div className='row mb-2'> 
                <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}> <b><span className='bi bi-calendar-heart-fill bi-sm text-secondary ms-2'></span> المدينة  </b>  </div>
                <div className='col-6  align-self-center text-start'> {generalData.BirthDeleg} </div>
            </div>
            {/* <hr />
            <div className='text-start'>
                <Button size='tiny' onClick={ (e) => OpenModalFunction('directory')} className='rounded-pill' icon> <Icon name='edit' /> تعديل </Button>    
            </div> */}
        </>)
    }
    const QrCodeCard = () => {
        return(<>
            <div className='text-center'>
                <h5>{UID}</h5>
                <QRCode fgColor={'red'} value={UID} size={300} />
            </div>
             
        </>)
    }

    const SelectedItemToViewCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'general': return <EditGeneralSettingCard generalData={generalData} setGeneralData={setGeneralData} SaveGeneralDFunc={SaveGeneralDFunc} delegList={delegList} GetDelegList={GetDelegList}  GConf={GConf}  />;  
            case 'pwd': return <EditPWDSettingCard passwordData={passwordData} setPWDData={setPWDData} SavePWDFunc={SavePWDFunc} /> ;
            case 'directory': return <EditDirectorySettingCard settingData={settingData} setSettingData={setSettingData} SaveSettingFunc={SaveSettingFunc}  delegList={delegList} GetDelegList={GetDelegList}  GConf={GConf} /> ;
            case 'qrcode': return <QrCodeCard /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="p-1">
            {statusCard()}
          </div>
        );
    };
    const SekeltonCard = () =>{
        const PlaceHolderCard = () =>{
            return(<>
            <Placeholder className='mb-0 border-div' style={{ height: 120, width: '100%' }}>
                <Placeholder.Image />
            </Placeholder>
            </>)
        }
        return(<>
            <PlaceHolderCard />
            <PlaceHolderCard />
            <PlaceHolderCard />
        </>)
    }

    return (  <>        
            {
                loading ? 
                <SekeltonCard /> 
                :
                <>
                <div className='conta'>

                    <div className='text-center' >
                            <div><img onClick={() => OpenBottomSheetFunction('photo')}  className="rounded-circle p-0 m-0  " src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'80px', height:'80px'}} /></div>
                            <h3 className='text-secondary mb-1'>{GConf.UserData.UData.Name}</h3>
                            <h5 className='text-secondary mb-0 mt-0'>{GConf.UserData.UData.UID}</h5>
                    </div>
                    <br />
                    <br />
                     
                    <div className='border' style={{borderRadius : '10px'}}>
                        <div className='p-3 border-bottom' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-person-exclamation bi-sm'></span></div>
                                    <div className='col-9 align-self-center'>Basic Info</div>
                                    <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('general')}> <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>
                        <div className='p-3 border-bottom' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-shield-lock bi-sm'></span></div>
                                    <div className='col-9 align-self-center'>Security</div>
                                    <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('pwd')}> <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>
                        <div className='p-3' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-geo-alt bi-sm'></span></div>
                                    <div className='col-4 align-self-center'> Location </div>
                                    <div className='col-5 align-self-center text-start'> {GConf.UserData.UData.BirthGouv}, {GConf.UserData.UData.BirthDeleg} </div>
                                    <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('directory')}> <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>

                    </div>
                    <br />
                    <div className='border' style={{borderRadius : '10px'}}>
                        <div className='p-3 border-bottom' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-moon-stars bi-sm'></span></div>
                                    <div className='col-9 align-self-center'>Dark Theme </div>
                                    <div className='col-2 align-self-center'  >  
                                        <div className="form-check form-switch">
                                            <input className="form-check-input form-check-input-lg" type="checkbox" checked={checkedTT} onChange={ () => setChekedTT(!checkedTT)}  />
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className='p-3 border-bottom' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-bell bi-sm'></span></div>
                                    <div className='col-9 align-self-center'>Notfication</div>
                                    <div className='col-2 align-self-center'  > 
                                        <div className="form-check form-switch">
                                            <input className="form-check-input form-check-input-lg" type="checkbox" checked={checkedTN} onChange={ () => setChekedTN(!checkedTN)}  />
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className='p-3 border-bottom' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-translate bi-sm'></span></div>
                                    <div className='col-4 align-self-center'> language </div>
                                    <div className='col-5 align-self-center text-start'> {localStorage.getItem('i18nextLng')} </div>
                                    <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('language')}> <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>
                        <div className='p-3' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-globe-europe-africa bi-sm'></span></div>
                                    <div className='col-4 align-self-center'> Country </div>
                                    <div className='col-5 align-self-center text-start'> {GConf.Country} </div>
                                    <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('country')}> <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>

                    </div>
                    <br />
                    <div className='border' style={{borderRadius : '10px'}}>
                        <div className='p-3 border-bottom' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-bug bi-sm'></span></div>
                                    <div className='col-9 align-self-center'>Report Bug</div>
                                    <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('bug')}> <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>
                        <div className='p-3 border-bottom' >
                                <div className='row'>
                                    <div className='col-1 align-self-center'><span className='bi bi-envelope-check bi-sm'></span></div>
                                    <div className='col-9 align-self-center'>Contact Us</div>
                                    <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('contact')}> <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>
                        <div className='p-3' >
                                <div className='row' onClick={() => onShare()}>
                                    <div className='col-1 align-self-center'><span className='bi bi-share bi-sm'></span></div>
                                    <div className='col-9 align-self-center'> Inviter Un ami </div>
                                    <div className='col-2 align-self-center' > <span className={`bi bi-${isRTL ? 'arrow-left' : 'arrow-right'}`}></span> </div>
                                </div>
                        </div>

                    </div>
                    <br />
                    <div className='card card-body shadow-sm'>
                        <Button onClick={logOutInput}  size='large' style={{backgroundColor:GConf.themeColor}} fluid className='rounded-pill text-white'  >تسجيل الخروج </Button>
                    </div>
                </div>
                <div>
                {/*<Bounce bottom>
                    <Accordion >
                        <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={(e) => setActiveIndex(0)}
                            className='card shadow-sm border-div mb-1'
                        >
                                <div className='row p-2'>
                                    <div className={`col-6 align-self-center pe-3   ${isRTL ? 'text-end' : 'text-start'}`} style={{color:'#4287f5'}}><h4 dir={isRTL ? 'rtl' : 'ltr'}><span className={`bi bi-arrows-move`}></span>  عام  </h4></div>
                                    <div className={`col-6 align-self-center ps-3  ${isRTL ? 'text-start' : 'text-end'}`}><img src={`https://cdn.abyedh.com/Images/Profile/setting/01.gif`} width='30px' height='30px' /></div>
                                </div>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0} className='card mt-2 mb-2 shadow-sm border-div ' >
                            <div className='card-body '>
                                    {
                                        generalEditStat ? 
                                        <EditGeneralSettingCard generalData={generalData} setGeneralData={setGeneralData} SaveGeneralDFunc={SaveGeneralDFunc} delegList={delegList} GetDelegList={GetDelegList}  GConf={GConf}  />
                                        :
                                        <GenralSettingCard />
                                        
                                    }
                                    <br />
                                    <div className='text-start'>
                                        <Button size='tiny' onClick={ () => setGeneraleEditState(!generalEditStat)} className='rounded-pill' icon> <Icon name='edit' /> تعديل </Button>    
                                    </div>
                            </div>
                        </Accordion.Content>
                        
                        <Accordion.Title
                            active={activeIndex === 1}
                            index={1}
                            onClick={(e) => setActiveIndex(1)}
                            className='card shadow-sm border-div mb-1'
                        >
                                <div className='row p-2'>
                                    <div className={`col-6 align-self-center pe-3   ${isRTL ? 'text-end' : 'text-start'}`} style={{color:'#4287f5'}}><h4 dir={isRTL ? 'rtl' : 'ltr'} ><span className={`bi bi-key-fill`}></span> كملة المرور </h4></div>
                                    <div className={`col-6 align-self-center ps-3  ${isRTL ? 'text-start' : 'text-end'}`}><img src={`https://cdn.abyedh.com/Images/Profile/setting/05.gif`} width='30px' height='30px' /></div>
                                </div>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1} className='card mt-2 mb-2 shadow-sm border-div ' >
                            <div className='card-body '>
                                    {
                                        passwordEditStat ? 
                                        <EditPWDSettingCard passwordData={passwordData} setPWDData={setPWDData} SavePWDFunc={SavePWDFunc} />
                                        :
                                        <PWDSettingCard />
                                        
                                    }
                                    <br />
                                    <div className='text-start'>
                                        <Button size='tiny' onClick={ () => setPasswordEditState(!passwordEditStat)} className='rounded-pill' icon> <Icon name='edit' /> تعديل </Button>    
                                    </div>
                            </div>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 2}
                            index={2}
                            onClick={(e) => setActiveIndex(2)}
                            className='card shadow-sm border-div mb-1'
                        >
                                <div className='row p-2'>
                                    <div className={`col-6 align-self-center pe-3   ${isRTL ? 'text-end' : 'text-start'}`} style={{color:'#4287f5'}}><h4 dir={isRTL ? 'rtl' : 'ltr'} > <span className={`bi bi-search-heart`}></span> محرك البحث </h4></div>
                                    <div className={`col-6 align-self-center ps-3  ${isRTL ? 'text-start' : 'text-end'}`}><img src={`https://cdn.abyedh.com/Images/Profile/setting/03.gif`} width='30px' height='30px' /></div>
                                </div>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2} className='card mt-2 mb-2 shadow-sm border-div ' >
                            <div className='card-body '>
                                    {
                                        directoryEditStat ? 
                                        <EditDirectorySettingCard generalData={generalData} setGeneralData={setGeneralData} SaveSettingFunc={SaveSettingFunc}  delegList={delegList} GetDelegList={GetDelegList}  GConf={GConf} />
                                        :
                                        <DirectorySettinfCard />
                                        
                                    }
                                    <br />
                                    <div className='text-start'>
                                        <Button size='tiny' onClick={ () => setDirectoryEditState(!directoryEditStat)} className='rounded-pill' icon> <Icon name='edit' /> تعديل </Button>    
                                    </div>
                            </div>
                        </Accordion.Content>
                            
                    </Accordion>
                </Bounce>*/}
                
                </div>
                </>
            }
                
                {/* <Modal
                    size='fullscreen'
                    open={modalS}
                    onClose={() => setModalS(false)}
                    onOpen={() => setModalS(true)}
                    className='fullscreen-profile-modal'
                >
                    <Modal.Content scrolling>
                        <SelectedItemToViewCard status={seledtedItem} />                         
                    </Modal.Content>
                    <Modal.Actions>
                                <Button className='rounded-pill' negative onClick={ () => setModalS(false)}>   غلق</Button>
                    </Modal.Actions>
                </Modal> */}
            <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                <div className='card-body'>
                    {/* <SelectedItemToViewCard status={seledtedItem} /> */}
                    { seledtedItem =='general' ?   <EditGeneralSettingCard generalData={generalData} setGeneralData={setGeneralData} SaveGeneralDFunc={SaveGeneralDFunc} delegList={delegList} GetDelegList={GetDelegList}  GConf={GConf}  /> : <></> }  
                    { seledtedItem == 'pwd' ?  <EditPWDSettingCard passwordData={passwordData} setPWDData={setPWDData} SavePWDFunc={SavePWDFunc} /> : <></> }
                    { seledtedItem == 'directory' ?  <EditDirectorySettingCard generalData={generalData} setGeneralData={setGeneralData} settingData={settingData} setSettingData={setSettingData} SaveSettingFunc={SaveSettingFunc}  delegList={delegList} GetDelegList={GetDelegList}  GConf={GConf} /> : <></> }
                    { seledtedItem == 'country' ?  <ChangeCountry /> : <></> }
                    { seledtedItem == 'language' ?  <ChangeLanguage /> : <></> }
                    { seledtedItem == 'bug' ?  <ReportBug /> : <></> }
                    { seledtedItem == 'contact' ?  <ContactUs /> : <></> }
                    { seledtedItem == 'photo' ?  <ChangePhoto /> : <></> }
                     
                 
                 </div>
            </BottomSheet>
                
        <br />
        <br />
 
    </>);
}


export default SettingPage;