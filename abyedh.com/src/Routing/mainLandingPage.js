import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, json } from 'react-router-dom';
import Typed from 'react-typed';
import { Grid, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import 'swiper/css/pagination';
import { QrReader } from 'react-qr-reader';
import GConf from '../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input, Modal } from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import APPItem from '../App/AssetsM/APPITEM';
import NotifGenres from '../Profile/Main/notifGenres';
import SuivieRequestData from '../Profile/Suivie/suivieRequestData';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import axios from 'axios';

const ToolsModal = React.lazy(() => import('./MainPageAssets/toolsModal'));
const QrCodeModal = React.lazy(() => import('./MainPageAssets/qrCodeModal'));

const CostumInput = ({searchKey, setSearchKey}) =>{
    return(<input  value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className='text-end main-input-costum' icon='user' />)
}
const SearchBar = ({open, setOpen, searchKey, OpenBottomSheetFunction, setSearchKey,SearchFunction,GoToQrCodeFunction, data, setData }) =>{
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();


    return(<>
        <div className='rounded-0 border-0 bg-white p-3  sticky-top shadow-bottom-card' style={{zIndex:2}}>
            <Input
                placeholder={t('mainPage.mainsearchInput')}
                fluid
                action
                actionPosition='left'
                onChange={(e) => setSearchKey(e.target.value)}
                className='main-page-input '
            >
                <Button className='border-0 bg-white border-top border-bottom border-start ' icon onClick={() => OpenBottomSheetFunction('qrCode')} ><Icon name='qrcode' /></Button>
                <Button className='bg-white border-top border-bottom' onClick={() => SearchFunction()} icon ><Icon name='arrow right' /></Button>
                <input   className='text-end main-input-costum' icon='user' />
            </Input>   
        </div>
    </>)
}

function MainLandingPage() {
    /* ############### Const #################*/
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [openD, setOpenD] = useState(false)
    const [toolsModal, setToolsModal] = useState(false)
    const [selectedToolsModal, setSelectedToolsModal] = useState([])
    const [recentList, setRecentList] = useState(['magazin', 'boutique'  ,'restaurant' , , 'boucherie' , 'cafe', 'docteur', 'autoecole', 'gym'])
    const [searchKey, setSearchKey] = useState('')
    const [data, setData] = useState('');
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const [notifList, setNotifList] = useState([])
    const [seledtedItem, setSelectedItem] = useState('main')

    /* ############### Notofication System #################*/
    // const [unreadMessages, setUnreadMessages] = useState(0);
    // // Function to request notification permission
    // const requestNotificationPermission = () => {
    //     if (Notification.permission !== "granted") {
    //     Notification.requestPermission().then((permission) => {
    //         if (permission === "granted") {
    //         // Permission granted, you can now send notifications.
    //         }
    //     });
    //     }
    // };
    // // Function to create and display a new notification
    // const showNotification = () => {
    //     if (Notification.permission === "granted") {
    //     const notification = new Notification("New Message", {
    //         body: "You have a new message.",
    //         icon: "phttps://cdn.abyedh.com/images/logo/mlogo.gif", // Replace with your icon path
    //     });

    //     // Play a sound
    //     const audio = new Audio("https://cdn.abyedh.com/Sounds/notif.mp3"); // Replace with your audio file
    //     audio.play();

    //     // Handle click event on the notification (e.g., open a chat window)
    //     notification.onclick = function () {
    //         // Handle the click event (e.g., open a chat window).
    //         // For now, we'll just close the notification.
    //         notification.close();
    //     };
    //     }
    // };
    // // Function to simulate receiving a new message
    // const receiveNewMessage = () => {
    //     setUnreadMessages(unreadMessages + 1);
    //     showNotification();
    // };

    const [qrCodeValue, setQRCodeValue] = useState(null)
    const [selectedListeTag, setSelectedListeTag] = useState([])

    /* ############### UseEffect #################*/
    useEffect(() => {
        if (GConf.UserData.Logged) {GetNotificationLists() }
    }, []);

    /* Used Func */
    const PrintFunction = () =>{
        let objectTwo = {}
        for (const key in SuivieRequestData) {
            // Check if the current key is a property of the object (not inherited)
            if (Object.prototype.hasOwnProperty.call(SuivieRequestData, key)) {
              // Add the 'a' value to objectTwo with the same key
                let itemToAdd = {};
                // for (const item of SuivieRequestData[key].systemItemsList) {
                //     //itemToAdd[(item.id)] = item.posName;
                // }

                objectTwo[key] = SuivieRequestData[key].title //itemToAdd;
                //objectTwo[key] = GConf.ADIL[key].systemName;
            }
          }

        // for (const key in APPItem) {
        //     // Check if the current key is a property of the object (not inherited)
        //     if (Object.prototype.hasOwnProperty.call(APPItem, key)) {
        //       // Add the 'a' value to objectTwo with the same key
        //         let itemToAdd = {};
        //         // for (const item of APPItem[key].systemItemsList) {
        //         //     //itemToAdd[(item.id)] = item.posName;
        //         // }

        //         objectTwo[key] = APPItem[key].navItemList2 //itemToAdd;
        //         //objectTwo[key] = GConf.ADIL[key].systemName;
        //     }
        //   }
        // for (const key in APPItem) {
        //     if (Object.prototype.hasOwnProperty.call(APPItem, key)) {
        //         const navItemList2 = APPItem[key].navItemList2;
        //         if (navItemList2 && typeof navItemList2 === 'object') {
        //             let itemToAdd = {};
        //             for (const navIndexName in navItemList2) {
        //                 if (Object.prototype.hasOwnProperty.call(navItemList2, navIndexName)) {
        //                     let houssemToAdd = {};
        //                     //console.log(navItemList2[navIndexName])
                            
        //                     for (const itemHS of navItemList2[navIndexName]) {
        //                         houssemToAdd[(itemHS.navIndexName)] = itemHS.navName;
        //                     }

        //                     itemToAdd[navIndexName] = houssemToAdd //navItemList2[navIndexName][0].navName;
        //                 }
        //             }
        //             objectTwo[key] = itemToAdd;
        //         } else {
        //             console.error(`navItemList2 is not an object for key: ${key}`);
        //         }
        //     }
        // }
        console.log(objectTwo)
    }
    /* ############### Functions #################*/
    const GetNotificationLists = () => {
        axios.post(`${GConf.ApiProfileLink}/main-page`, {
            UID: GConf.UserData.Logged ? GConf.UserData.UData.UID : false,
        })
        .then(function (response) {
            setNotifList(response.data)
            console.log(response.data)
        })

    }

    const SearchFunction = (key) =>{
        if (!searchKey) { } 
        else {
            navigate(`/S/S/${searchKey}`)
        }
    }

    const GoToQrCodeFunction = (value) =>{
        navigate(`/S/P/${value}`)
    }

    const OpenBottomSheetFunction = (genre) => {
        setSelectedItem(genre)
        setOpenD(!openD)
    }

    /* ############### Card #################*/
    const TopNavBar = () =>{
        const GetFlag = () => {
            switch (GConf.Country) {
                
                case 'TN': return 'tn'
                break;
                case 'MA': return 'ma'
                break;
                case 'EG': return 'eg'
                break;
                case 'SA': return 'sa'
                break;
                case 'QA': return 'qa'
                break;
                case 'AE': return 'ae'
                break;
                case 'JP': return 'jp'
                break;
                case 'IN': return 'in'
                break;
                case 'CN': return 'cn'
                break;
                case 'CA': return 'ca'
                break;
                case 'US': return 'us'
                break;
                case 'FR': return 'fr'
                break;
                case 'IT': return 'it'
                break;
                case 'GB': return 'gb'
                break;
                case 'RU': return 'ru'
                break;
                case 'DE': return 'de'
                break;
            
                default: return 'us'
                break;
            }
        }
        const UserCard = () =>{
            return(<>
                {/* <NavLink exact='true' to='/Profile' className="navbar-brand border-div m-0 p-0 ms-3"> */}
                    <span className="navbar-brand border-div m-0 p-0 ms-3" onClick={() => {localStorage.getItem('PID') && localStorage.getItem('APP_TAG') ? OpenBottomSheetFunction('main') : navigate('/Profile')}}>
                        <img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} />
                    </span>
                    {/* </NavLink> */}
            </>)
        }
        return(<>
                <div className="rounded-0 border-0   m-0  bg-white" >
                    <div className='row m-0'>
                        <div className='col-3 col-lg-11 text-start align-self-center'  >
                            <NavLink exact='true' to='/' className="m-0 p-0 ms-3">
                                <img  className="  bg-danger border border-danger"   src="https://cdn.abyedh.com/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px', borderRadius: '10px 20px 10px 50px'}} />
                            </NavLink>
                        </div>
                        <div className='col-6 col-lg-6 text-center  d-lg-none align-self-center'>
                            <h3 className='text-danger mt-5'> {t('mainPage.mainTitle')} </h3>
                        </div>
                        <div className='col-3 col-lg-1 text-end  align-self-center'>
                            
                       
                            {GConf.UserData.Logged  ? 
                            
                            <>    
                                <NavLink exact='true' to='/Country' className="m-0 p-0 text-secondary">   
                                  {/* <span className='bi bi-globe-americas'></span>   */}
                                  <img src={`https://flagpedia.net/data/flags/w580/${GetFlag()}.webp`} className='rounded-circle' width='20px' height='20px' />
                                </NavLink>
                                <UserCard />
                            </> 
                            : 
                            
                            <NavLink exact='true' to='/Profile' className="m-0 p-0">    <img  className="rounded-circle9 p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/p_pic/logIn.gif`}   alt="Logo" style={{width:'25px', height:'25px'}} />   </NavLink>}
                            
                            
                        </div>
                    </div>
                </div>
            </>)
    }
    const AddsCard = () =>{
        return(<>
                <div className='rounded-0 border-0 bg-white text-secondary text-center pt-2 d-none d-lg-block' style={{heigth:'200px'}}>
                    <h1 className='display-3'> {t('mainPage.mainTitle')}</h1> 
                    <h3 className='text-danger'> {t('mainPage.mainsubads')}
                            {/* <Trans i18nKey='mainsubads'>
                                برشا تطبيقات في تطبيق واحد 
                            </Trans> */}
                    </h3>
                    <h5 className='display-6 d-none'>
                            <Typed    
                                strings={[
                                    'مَنْظٌومَة إِلِكْترٌونِيَّة شَامِلَة',
                                    'أَكْبَرْ دَلِيلْ تَفَاعٌلِي فِي تٌونِسْ',
                                    'نِظَامْ إِدَارَة وَ مٌحَاسَبَة لأَصْحَابْ الأَعْمَالْ',
                                    'لَوحَةْ تَحَكٌّمْ لِأَنْشِطَتِكَ اليٌوْمِيَّة',
                                    'مَوْسٌوعَة إِرْشَادِيَة وَ تَعْلِيمِّيَة تٌونِسِيًّة',
                                    'بِبَسَاطَة, كٌلْ شَيْ تَعْملٌو بِالأَنْتِرْنَاتْ ...']}
                                typeSpeed={5}
                                backSpeed={8}
                                backDelay={4000}
                                loop
                                showCursor={false} 
                                className="font-droid"  
                            >
                                
                            </Typed>
                    </h5>
                    <br  />
                </div>
            </>)
    }
    const IntroducingCard = () =>{
        const RecentCard = (props) =>{
            return(<>
            <NavLink exact='true' to={`S/L/${props.data}`} >
                <div className={`rounded-circle  text-center p-2 pt-3 col ${isRTL ? ' ms-5' :' me-5'}`}  style={{backgroundColor:GConf.ADIL[props.data].themeColor, width:'60px', height:'60px'}}>
                    <div className='align-self-center'><img className='mb-0 ' src={`https://cdn.abyedh.com/Images/Search/WIcons/${props.data}.gif`}  width='30px' height='30px' /></div>
                </div>
            </NavLink>
            </>)
        }
        return(<>
        {GConf.UserData.Logged  ? 
            <>
            <h5 className={`text-secondary ${isRTL ? 'text-end': 'text-start'}`}> {t('mainPage.recent')} </h5>
            <div className="mt-1 p-1 mb-4 d-inline-flex"   style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                {
                    recentList.map((data,index) => <RecentCard key={index} data={data} />)
                }
            </div>
            </>
        :
            <div className='card p-4 mb-3   border-div border-0' style={{backgroundColor: '#dedede', fontSize:'14px', color:'#14524f'}} >
                <b> {t('mainPage.mainadsCard')} </b>
            </div>
        }
                
                
            </>)
    }

    const DisplayedCardLarge = (props)  =>{
        const CheckNotif = (props) => {
            let Item = Array.isArray(notifList) ? notifList.find((item) => item.P_Genre === props.tag) : undefined;
            return <> { Item != undefined ? <span className='rounded-circle text-danger bg-danger bi bi-dot' style={{fontSize : '5px'}}></span> : ''} </>
        }
        const ItemCard = (props) => {
           
            return(
                <>
                    <div  className="text-center hvr-float mb-4">
                        <NavLink exact='true' to={props.cardData.tools ?  `${props.cardData.Slink}` : `S/L/${props.cardData.link}`} >
                            <img className='mb-0' src={`https://cdn.abyedh.com/Images/Search/CIconsS/${props.cardData.image}.gif`}  width='50px' height='50px' />
                            {/* <small className='d-block text-secondary  mb-0 mt-0 d-none'>{Math.floor(1000 + Math.random() * 9000)}</small> */}
                            <h5 className="font-droid text-secondary mt-0"> {t(`mainPage.itemsNames.${props.cardData.link}`)} <CheckNotif tag={props.cardData.link} /> </h5>
                        </NavLink>
                    </div>
                </>
            )
        }
    
        const WithSwiper = () => {
            return (
                <>
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper pb-4 mb-1"
                    >
                       {
                            props.data.smallDisplay.map((slides, index) => (
                                <SwiperSlide key={index}>
                                    <div className='row' >
                                        {slides.map((slideItem, index) => (
                                            <div className='col-3 p-0' key={index}>
                                                <ItemCard cardData={slideItem} />
                                            </div>
                                        ))}     
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                        
                    </Swiper>
                </>
            )
        }
        const WithoutSwiper = () => {
            return (
                <>
                    <div className='row'>
                        {props.data.slides.map((slides,index) => (
                            <div className='col-3' key={index}>
                               <ItemCard cardData={slides} /> 
                            </div>      
                            ))            
                        }       
                    </div>
                </>
            )
        }
        
        const WithSwiperSmall = () => {
            return (
                <>
                <Swiper
                    pagination={{
                    dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper pb-4 mb-0"
                    
                >
                    {
                        props.data.smallDisplay.map((smallDisplay,index) => (
                            <SwiperSlide key={index}>
                                <div className='row'>
                                
                                    {smallDisplay.map((slideItem,index) => (
                                        <div className='col-6 p-0' key={index}>
                                            <ItemCard cardData={slideItem} floating={-50}/>
                                        </div>
                                    ))}     
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    
                </Swiper>
                </>
            )
        }
        const WithoutSwiperSmall = () => {
            return (
                <>
                    <div className='row'>
                        {props.data.slides.map((slides,index) => (
                            <div className='col-6' key={index}>
                               <ItemCard cardData={slides} floating={-50}/> 
                            </div>      
                            ))            
                        }       
                    </div>
                </>
            )
        }
        
        const OpenToolsModal = (targetGenre) => {
            setToolsModal(true)
            setSelectedToolsModal(targetGenre)
        }
    
        return (<>
            <div className='card mb-3 border-div-main '>
               <div className={`border-bottom pe-2 ${isRTL ? 'text-end' : 'text-start'} `}>
                    <div className='row'>
                            <div className='col-9'> <h4 className='p-4' style={{color:props.data.themeColor}}><span className={`bi bi-${props.data.icon}`}></span> {t(`mainPage.mainTagsName.${props.slectedTag}`)} </h4></div>
                            <div className={`col-3 align-self-center  ${!isRTL ? 'text-end' : 'text-start'} ps-4`} >{ props.data.haveTools ? <Button  size='mini' icon  className='rounded-circle  ' onClick={() => OpenToolsModal(props.data.toolsList)} style={{color :props.data.themeColor, backgroundColor:'white'}}> <Icon name='plus'   /> </Button> : <></>}</div>
                    </div> 
                </div> 
               <div className='card-body pb-0'>
                    {/* {props.smallDisplay ?   */}
                            {/* <> { props.data.smallSlider ? <WithSwiperSmall /> : <WithoutSwiperSmall />} </> */}
                            {/* :  */}
                            <> {props.data.slider ? <WithSwiper /> : <WithoutSwiper />}</>
                    {/* } */}
               </div> 
            </div>
        </>);
    }
    const DisplayedCard = (props) => {
        const CheckNotif = (props) => {
            let Item = Array.isArray(notifList) ? notifList.find((item) => item.P_Genre === props.tag) : undefined;
            return <> { Item != undefined ? <span className='rounded-circle text-danger bg-danger bi bi-dot' style={{fontSize : '5px'}}></span> : ''} </>
        }

        const ItemCard = (props) => {
           
            return(
                <>
                    <div  className="text-center hvr-float mb-4">
                        <NavLink exact='true' to={props.cardData.tools ?  `${props.cardData.Slink}` : `S/L/${props.cardData.link}`} >
                            <img className='mb-0' src={`https://cdn.abyedh.com/Images/Search/CIconsS/${props.cardData.image}.gif`}  width='50px' height='50px' />
                            <h5 className="font-droid text-secondary mt-0"> {t(`mainPage.itemsNames.${props.cardData.link}`)} <CheckNotif tag={props.cardData.link} /> </h5>
                        </NavLink>
                    </div>
                </>
            )
        }
        const OpenToolsModal = (targetGenre) => {
            setSelectedToolsModal(targetGenre)
            setSelectedItem('tools')
            setOpenD(!openD)
        }
        const SeeAll = (props) => {
            const SlectedAndOpenModal = (targetGenre) => {
                //setSelectedToolsModal(targetGenre)
                setSelectedItem('seeAll')
                setOpenD(!openD)
            }
            return(
                <>
                    <div  className="text-center hvr-float  mt-3" onClick={() => SlectedAndOpenModal(props.target)}>
                             <span className={`bi bi-arrow-${isRTL ? 'left': 'right'} bi-sm mb-4`}></span>
                             <h5 className="font-droid text-secondary mt-0"> {t(`mainPage.voisTous`)}  </h5>
                    </div>
                </>
            )
        }
        return(
            <div className='card mb-3 border-div-main border-0'>
                <div className={`border-bottom-s pe-2 ${isRTL ? 'text-end' : 'text-start'} `}>
                    <div className='row'>
                            <div className='col-9'> <h4 className='p-4' style={{color:props.data.themeColor}}><span className={`bi bi-${props.data.icon}`}></span> {t(`mainPage.mainTagsName.${props.slectedTag}`)} </h4></div>
                            <div className={`col-3 align-self-center  ${!isRTL ? 'text-end' : 'text-start'} ps-4`} >{ props.data.haveTools ? <Button  size='mini' icon  className='rounded-circle  ' onClick={() => OpenToolsModal(props.data.toolsList)} style={{color :props.data.themeColor, backgroundColor:'white'}}> <Icon name='plus'   /> </Button> : <></>}</div>
                    </div> 
                </div> 
                <div className='  pb-0'>
                    <div className="mt-1 p-1 mb-4 d-inline-flex"   style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                        {props.data.slides.map((slides,index) => (
                            <span className={`col ${isRTL ? ' ms-5' :' me-5'}`} key={index}>
                               <ItemCard cardData={slides} floating={-50}/> 
                            </span>      
                            ))            
                        }   
                        {props.data.fullList ? <SeeAll target={props.data.slectedTag} /> : <></>}    
                    </div>
                </div> 
            </div>
         )
    }
    const ButtomCard = () =>{
        const onShare = async () => {
            if (navigator.share) {
              try {
                const result = await navigator.share({
                  title: 'abyedh.com',
                  text: 'Abyedh.com Application',
                  url: 'https://play.google.com/store/apps/details?id=com.abyedh.twa',
                });
                 
              } catch (error) {
                console.error('Error sharing:', error);
              }
            } else {
              alert('Sharing is not supported in this browser.');
            }
        };

        return(<>
            <div className='card-body rounded-bottom-card bg-danger'>
                <div className='row'>
                    <div className={` col-12 col-lg-4 align-self-center d-none d-lg-block  ${isRTL ? 'text-end order-1' : 'text-start order-3'}  `}>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}> +216 96787676  - <span className='bi bi-telephone-outbound-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  khelifihoussem53@gmail.com -  <span className='bi bi-mailbox2' ></span></NavLink></div>
                        <div className='d-inline mt-2'>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-facebook bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-youtube bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-app-indicator bi-md' ></span></NavLink></div>
                        </div>
                    </div>
                    <div className={` col-7 col-lg-4 align-self-center order-2 ${isRTL ? 'text-end' : 'text-start'}  text-secondary`}>
                        <div className='mb-1'><NavLink exact='true' to='/About' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  {t('mainPage.footerVision')} - <span className='bi bi-patch-question-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/Country' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  {t('mainPage.footerHow')} -  <span className='bi bi-globe-asia-australia' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}> {t('mainPage.footerWho')}  -  <span className='bi bi-people-fill' ></span> </NavLink></div>
                    </div>
                    <div className={` col-5 col-lg-4 align-self-center text-center  ${isRTL ? 'order-3' : 'order-1'}  `} >
                        <img  className="rounded-pill-abyedh-s" src="https://cdn.abyedh.com/images/logo/mlogo.gif" alt="Logo" style={{width:'40px', height:'90px', borderRadius: '10px 20px 10px 50px'}} />
                    </div>
                </div>
                <div className='row mt-3 ps-2 pe-2'>
                    <div className='col-2'><span className='bi bi-facebook text-white bi-sm'></span></div>
                    <div className='col-2'><span className='bi bi-youtube text-white bi-sm'></span></div>
                    <div className='col-2'><span className='bi bi-instagram text-white bi-sm'></span></div>
                    <div className='col-2'><span className='bi bi-tiktok text-white bi-sm'></span></div>
                    <div className='col-2'><span className='bi bi-twitter-x text-white bi-sm'></span></div>
                    <div className='col-2 text-end' onClick={() => onShare()}><span className='bi bi-share-fill text-white bi-sm'></span></div>
                </div>
            </div>
        </>)
    }
    const Tools = () =>{
        return(<>
            <div className="container text-end">
                <NavLink exact='true' to='Tools'>  
                    <div className="card p-4 border-div shadow-sm" >
                        <div className={` ${isRTL ? 'text-end' : 'text-start'}  text-secondary`} ><h4> {t('mainPage.toolsTitls')} </h4></div>
                        <div className="row">
                            <div className={`col-8 align-self-center ${!isRTL ? 'order-2' : ''}`}>
                                <div className={` ${isRTL ? 'text-end' : 'text-start'}  d-none d-lg-block text-secondary`} > {t('mainPage.toolsBSText1')} <br /> {t('mainPage.toolsBSText2')}</div>
                                <div className={` ${isRTL ? 'text-end' : 'text-start'}  d-lg-none text-secondary`} >{t('mainPage.toolsSSText')}</div>
                            </div>
                            <div className={`col-4 text-center align-self-center  ${!isRTL ? 'order-1' : ''}`}> 
                                <img src="https://cdn.abyedh.com/images/Search/tools.svg" className="img-responsive  mb-2" style={{width:'100px'}}  />
                            </div>
                        </div>
                    </div>
                </NavLink>
            </div>
        </>)
    }
    const DownloadTheApp = () =>{
        return(<>
            <div className="container text-end">
                <a exact='true' target='c_blank'  href='https://play.google.com/store/apps/details?id=tn.abyedh.twa'>  
                    <div className="card p-3 border-div shadow-sm" >
                        <div className="row">
                            <div className="col-2 text-center align-self-center"> 
                                <img src="https://cdn.abyedh.com/images/About/gp.jpg" className="img-responsive  mb-2" style={{width:'50px'}}  />
                            </div>
                            <div className="col-10 align-self-center">
                                <div className={` ${isRTL ? 'text-end' : 'text-start'}  text-secondary`} ><h4>  { t('mainPage.googlePlayAds') } </h4>     </div>
                                <div className={` ${isRTL ? 'text-end' : 'text-start'}  text-secondary`} >  <small dir='rtl'> {t('mainPage.googlePlayAdsAppVolume')}</small>    </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </>)
    }
    const ForLazyLoading = () =>{
        return (<>
                 
                <div className='loader-container-small'><div className="loader"></div></div>  
                 
            </>);
      }
    return ( <>
            <Helmet>
                <title> {t('mainPage.mainTitle')} </title>
            </Helmet>
            <TopNavBar />
            <AddsCard />
            <SearchBar open={open} setOpen={setOpen} OpenBottomSheetFunction={OpenBottomSheetFunction} searchKey={searchKey} setSearchKey={setSearchKey} SearchFunction={SearchFunction} GoToQrCodeFunction={GoToQrCodeFunction} data={data} setData={setData}  />

            <br />
            <br />
             
            <div className='container' dir={isRTL ? 'rtl' : 'ltr'}>
                <IntroducingCard />
                <br />
                 
                <div className='row'>
                    <div className='col-12 col-lg-6 d-none d-lg-inline'>
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'sante'} data={GConf.Items.sante} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'nutrition'} data={GConf.Items.nutrition} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'construction'} data={GConf.Items.construction} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'culture'} data={GConf.Items.culture} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'finance'} data={GConf.Items.finance} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'tourizme'} data={GConf.Items.tourizme} />
                    </div>
                    <div className='col-12 col-lg-6 d-none d-lg-inline'>
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'education'} data={GConf.Items.education} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'trasnportation'} data={GConf.Items.trasnportation} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'houseCar'} data={GConf.Items.houseCar} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'life'} data={GConf.Items.life} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'politique'} data={GConf.Items.politique} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'agricole'} data={GConf.Items.agricole} />
                        <DisplayedCardLarge smallDisplay={false} slectedTag={'generale'} data={GConf.Items.generale} />
                    </div>
                </div>

                <div className='row d-lg-none'>
                    <div className='col-12'>
                        <DisplayedCard smallDisplay={true} slectedTag={'commerceSmall'} data={GConf.Items.commerceSmall} />
                        <DisplayedCard smallDisplay={true} slectedTag={'sante'} data={GConf.Items.sante} />
                        <DisplayedCard smallDisplay={true} slectedTag={'education'} data={GConf.Items.education} />
                        <DisplayedCard smallDisplay={true} slectedTag={'trasnportationSmall'} data={GConf.Items.trasnportationSmall} />
                        <DisplayedCard smallDisplay={true} slectedTag={'restaurationSmall'} data={GConf.Items.restaurationSmall} />
                        <DisplayedCard smallDisplay={true} slectedTag={'lifeSmall'} data={GConf.Items.lifeSmall} />
                        <DisplayedCard smallDisplay={true} slectedTag={'artisanatSmall'} data={GConf.Items.artisanatSmall} />
                        <DisplayedCard smallDisplay={true} slectedTag={'culture'} data={GConf.Items.culture} />
                        <DisplayedCard smallDisplay={true} slectedTag={'financeSmall'} data={GConf.Items.financeSmall} />
                        <DisplayedCard smallDisplay={true} slectedTag={'constructionSmall'} data={GConf.Items.constructionSmall} />
                        <DisplayedCard smallDisplay={true} slectedTag={'politique'} data={GConf.Items.politique} />
                        <DisplayedCard smallDisplay={true} slectedTag={'agricole'} data={GConf.Items.agricole} />
                        <DisplayedCard smallDisplay={true} slectedTag={'generale'} data={GConf.Items.generale} />
                    </div>
                </div>
            </div>
            <br />
            {/* <Tools /> 
            <DownloadTheApp />
            <br />*/}
            <Tools />
            <br />
            <br />
            <ButtomCard />
             

           
            <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                    {seledtedItem == 'main' ? 
                    <div className='m-4'>
                    
                            <div className='card p-2 rounded-pill shadow-sm mb-3' onClick={() => navigate('/Profile')} >
                            <div className='row'>
                                    <div className='col-2 align-self-center'><img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} /></div>
                                    <div className='col-10 align-self-center'><h5 className='text-secondary'>{GConf.UserData.UData.Name}</h5></div>
                                </div> 
                            </div>

                            <div className='card p-2 rounded-pill shadow-sm' onClick={() => navigate('/App/S')}> 
                                <div className='row'>
                                    <div className='col-2 align-self-center'><img className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/ads/${localStorage.getItem('APP_TAG')}.svg`}    style={{width:'30px', height:'30px'}} /> </div>
                                    <div className='col-10 align-self-center'><h5 className='text-secondary'>{t(`landingPage.systemNames.${localStorage.getItem('APP_TAG')}`)}</h5></div>
                                </div> 
                            </div>  
                    </div>
                    : <></>}
                    {seledtedItem == 'qrCode' ? <Suspense fallback={<ForLazyLoading />}><QrCodeModal   setQRCodeValue={setQRCodeValue} qrCodeValue={qrCodeValue} GoToQrCodeFunction={GoToQrCodeFunction} selectedListeTag={selectedListeTag}  /></Suspense> : <></> }
                    {seledtedItem == 'seeAll' ? <Suspense fallback={<ForLazyLoading />}> Sea All</Suspense> : <></> }
                    {seledtedItem == 'tools' ? 
                        <div className='card-body'>
                            <div className='row mb-4'>
                                <div className='col-12 align-self-center'><h3 className='text-center'> {t('mainPage.toolsModalText')} </h3></div>  
                               
                            </div>
                            <div className='row' dir='rtl'>
                                <Suspense fallback={<ForLazyLoading />}><ToolsModal selectedToolsModal={selectedToolsModal} /></Suspense>
                            </div>
                        </div>
                        : <></> }
            </BottomSheet>
            
        </> );
}

export default MainLandingPage;