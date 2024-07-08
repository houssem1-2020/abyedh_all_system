import React, {useEffect,useState}  from 'react';
import APPConf from '../../AssetsM/APPConf';
import axios from 'axios';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import { Button , Statistic} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import CountUp from 'react-countup';
//import { io } from "socket.io-client"
import GConf from '../../../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function RequestPage() {
    /*#########################[Const]##################################*/
    let [reservationList, setReservationList] = useState([SKLT.TableSlt]); 
    let [requestListe, setRequestListe] = useState([]); 
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const [generalData, setGeneralData] = useState({Name:'', Matricule_F:'', Phone:'', Adress:'',Genre:'', Lat: '0.0', Lng:'0.2'})
    const [loading , setLoading] = useState(true)
    const [profileData, setProfileData] = useState([])
    //SOket-io : it works cool in localhost but the problem with domaine name 
    // let [userView, setUserVew] = useState(0); 
    // const socket = io(GConf.SoketLink, {query: { userId: `${APPConf.systemTag}-${APPConf.PID}`, }, });
    // socket.on(`${APPConf.systemTag}-${APPConf.PID}` , (data) => { receiveNewMessage() ; setUserVew(userView + 1) })
    //fin socket.io

  /*#########################[UseEfeect]##################################*/
   useEffect(() => {
        //requestNotificationPermission()
        axios.post(`${APPConf.ApiLink}/main`, {
            PID : APPConf.PID,
            SystemTag : APPConf.landing[APPConf.systemTag].itemsList[0].link.replace("rq/", "") 
        })
        .then(function (response) {
            setRequestListe(response.data)
        }).catch((error) => {
            if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, APPConf.TostInternetGonf)   
                
            }
        });

        axios.post(`${APPConf.ApiLink}/profile`, {
            PID: localStorage.getItem('PID'),
            SystemTag : localStorage.getItem('APP_TAG')
        })
        .then(function (response) {
            setGeneralData(response.data.general[0])
            setProfileData(response.data)
            setLoading(false)
        }).catch((error) => {
            if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
            setProfileData([])
            }
        });

   }, [])
   
 

  /*#########################[Function]##################################*/
    const onShare = async () => {
        if (navigator.share) {
        try {
            const result = await navigator.share({
            title: profileData.general[0].Name ,
            text: `${profileData.general[0].Name} - abyedh.com`,
            url: `http://abyedh.com/S/P/${localStorage.getItem('APP_TAG')}/${localStorage.getItem('PID')}`,
            });
            console.log('Successfully shared', result);
        } catch (error) {
            console.error('Error sharing:', error);
        }
        } else {
        alert('Sharing is not supported in this browser.');
        }
    };

   /* ############### Notofication System #################
        const [unreadMessages, setUnreadMessages] = useState(0);
        // Function to request notification permission
        const requestNotificationPermission = () => {
            if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                // Permission granted, you can now send notifications.
                }
            });
            }
        };
        // Function to create and display a new notification
        const showNotification = () => {
            if (Notification.permission === "granted") {
            const notification = new Notification("New Message", {
                body: "You have a new message.",
                icon: "https://cdn.abyedh.com/images/logo/mlogo.gif", // Replace with your icon path
            });

            // Play a sound
            const audio = new Audio("https://cdn.abyedh.com/Sounds/notif.mp3"); // Replace with your audio file
            audio.play();

            // Handle click event on the notification (e.g., open a chat window)
            notification.onclick = function () {
                // Handle the click event (e.g., open a chat window).
                // For now, we'll just close the notification.
                notification.close();
            };
            }
        };
        // Function to simulate receiving a new message
        const receiveNewMessage = () => {
            setUnreadMessages(unreadMessages + 1);
            showNotification();
        };
    */
     const GetRequestValue = (genre) =>{
       const elementToFind = requestListe.find(item => item.State === genre);
       if (elementToFind) {
         return elementToFind.State_Num
       } else {
         return 0
       }
     }

     const RemoveToday = () =>{
        localStorage.setItem('removedCard', new Date().toLocaleDateString('fr-FR'));
        window.location.reload()
    }

    const LogOut = () =>{
        localStorage.removeItem(`PID`);
        localStorage.removeItem(`APP_TAG`);
        window.location.href = "/";
    }

   /*#########################[Card]##################################*/
    const StatCard = (props) =>{
        return(<>
            <Statistic color={props.color}>
                <Statistic.Value><CountUp end={props.value} /></Statistic.Value>
                <Statistic.Label>{props.title}</Statistic.Label>
            </Statistic>
        </>)
    }
    const IndefinieCard = (props) =>{
        return(<>
            <div className='text-center p-2 text-secondary'>
                    <span className='bi bi-file-earmark-lock bi-lg '></span>
                    <h5>صفحة غير متوفرة</h5> 
            </div>
        </>)
    }
    const AdsCard = (props) =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div pt-2  font-Expo-book'>
                <div className='row'>
                    <div className='col-1 text-center  '><b onClick={() => RemoveToday()} className='shadow  rounded-circle  pt-1 pb-1 ps-2 pe-2'>x</b></div>
                    <div className='col-12 text-end '><span className='bi bi-badge-ad-fill bi-md text-danger'></span></div>
                </div>
                
                <div className='row'>
                    <div className={`col-4 align-self-center ${isRTL ? '' : 'order-2'}`} ><img className="rounded-circle mb-3" src={`https://cdn.abyedh.com/images/ads/${APPConf.systemTag}.svg`} width="90px" height="90px"/></div>
                    <div className={`col-8 align-self-center text-secondary ${isRTL ? '' : 'order-1'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                        <span className='text-secondary'>  {t('appPages.mainPage.adsData.adsContentTextOne')}  <b className="text-danger ">  {t('appPages.mainPage.adsData.adsContentTextTwo')} </b> {t('appPages.mainPage.adsData.adsContentTextThree')}  {t(`landingPage.systemNames.${APPConf.systemTag}`)}  ؟   </span>
                        <br />
                        <br />
                        {/* <ul>
                            {APPConf.landing[APPConf.systemTag].systemPos.map((data,index) =>  <li key={index}> {data.posName} </li>)} 
                        </ul> */}
                        <NavLink exact='true' to='/App/S/System'  >
                            <Button fluid className='rounded-pill font-Expo-book' size='mini'> {t('appPages.mainPage.adsData.buttonNavText')} </Button>
                        </NavLink>
                        
                    </div>
                </div>
            </div>
            <br />
        </>)
    }
    const AdsCardSmall = (props) =>{
        return(<>
         
        <div className='col-12 col-lg-12  mb-4 mt-4 font-Expo-book'>
            <div className='card  p-4 shadow-sm  border-div '>
                <NavLink exact='true' to='/App/S/System' className="stretched-link"></NavLink>
                <div className='row'>
                    <div className='col-3 align-self-center text-center'><img className="rounded-circle  " src={`https://cdn.abyedh.com/images/ads/${APPConf.systemTag}.svg`} width="50px" height="50px"/></div>
                    <div className='col-8 align-self-center text-secondary pe-4' dir='rtl'>
                     النسخة الكاملة لـ {APPConf.landing[APPConf.systemTag].systemTitle} 
                    </div>
                    <div className='col-1 align-self-center text-secondary' dir='rtl'>
                      <span className='bi bi-arrow-right-short bi-md'></span> 
                    </div>
                </div>
            </div>
        </div>
        </>)
    }
    const CammingSoonSystem = (props) =>{
        return(<>
         
        <div className='col-12 col-lg-12  mb-4 mt-4 font-Expo-book'>
            <div className='card  p-4 shadow-sm  border-div '>
                {/* <NavLink exact='true' to='/S/System' className="stretched-link"></NavLink> */}
                <div className='row'>
                    <div className='col-2 align-self-center text-center'><img className="rounded-circle  " src={`https://cdn.abyedh.com/images/ads/${APPConf.systemTag}.svg`} width="50px" height="50px"/></div>
                    <div className='col-10 align-self-center text-secondary pe-4' dir='rtl'>
                        <div>النسخة الكاملة لـ {APPConf.landing[APPConf.systemTag].systemTitle} </div>
                        <small className='text-danger'>ستكون متوفرة قريبا ... </small>
                    </div>
                    {/* <div className='col-1 align-self-center text-secondary' dir='rtl'>
                      <span className='bi bi-arrow-right-short bi-md'></span> 
                    </div> */}
                </div>
            </div>
        </div>
        </>)
    }
    const ItemCard = (props) =>{
        return(<>
            <div className={`col-${props.data.colSm} col-lg-${props.data.colLg} `}>
                <div className='card card-body shadow-sm  border-div text-center mb-3' style={{color: APPConf.themeColor}}>
                    <NavLink exact='true' to={`/App/S/${props.data.link}`} className="stretched-link"></NavLink>
                    <div className='row'>
                        <div className='col-3 align-self-center '> <span className={`bi bi-${props.data.icon} bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                        <div className='col-9 align-self-center'><h3 className='mt-0 mb-1'>{t(`appPages.mainPage.requestTabs.${APPConf.systemTag}.${props.data.link.replace(/\/?rq\/?/g, "")}`)}  </h3> <small> {t(`appPages.mainPage.requestTabs.gestionDe`)}  {t(`appPages.mainPage.requestTabs.${APPConf.systemTag}.${props.data.link.replace(/\/?rq\/?/g, "")}`)}   {`>>`}</small></div>
                    </div>
                </div> 
            </div>
        </>)
    }
    const SystemItemCard = (props) =>{
        return(<>
            <div className={`col-4 col-lg-2 me-3`}>
                <div className='card card-body shadow-sm  border-div text-center mb-3' style={{color: APPConf.themeColor}}>
                    <NavLink exact='true' to={`/App/S/System`} className="stretched-link"></NavLink>
                        <div className='text-center align-self-center '> <span className={`bi bi-${props.data.icon} bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                        <div className='text-center align-self-center'><h5 className='mt-1 mb-0'> {t(`appPages.mainPage.spesificTabs.${APPConf.systemTag}.${props.data.link}`)}   <span className='bi bi-gem text-info' style={{fontSize:'10px'}}></span></h5> </div>
                </div> 
            </div>
        </>)
    }
    return (<>
            {(!localStorage.getItem('removedCard') || (localStorage.getItem('removedCard') < new Date().toLocaleDateString('fr-FR'))) ? <AdsCard data={APPConf.systemTag} /> : ''}
           
             
            <div className='row'>
              <div className='col-12 mb-4'>
                  <div className='rows d-flex' style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                      <span className='col-4 col-lg-3 mb-4 text-center border-end'>
                          <StatCard title={t('appPages.mainPage.statData.attente')} value={GetRequestValue('W')} color='yellow' />
                      </span>
                      <span className='col-4 col-lg-3 mb-4 text-center border-end'>
                          <StatCard title={t('appPages.mainPage.statData.vueText')} value={GetRequestValue('S')} color='blue' />
                      </span>
                      <span className='col-4 col-lg-3 mb-4 text-center border-end'>
                          <StatCard title={t('appPages.mainPage.statData.accepter')} value={GetRequestValue('A')} color='teal'/>
                      </span>
                      <span className='col-4 col-lg-3 mb-4 text-center border-end'>
                          <StatCard title={t('appPages.mainPage.statData.refusee')} value={GetRequestValue('R')} color='red' />
                      </span>
                      <span className='col-4 col-lg-3 mb-4 text-center'>
                          <StatCard title={t('appPages.mainPage.statData.terminer')} value={GetRequestValue('T')} color='brown' />
                      </span>
                  </div>
              </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-12 col-lg-9 '>
                    <div className='row'>
                        {APPConf.landing[APPConf.systemTag].itemsList.map((data,index) => <ItemCard key={index} data={data} /> ).slice(0, APPConf.landing[APPConf.systemTag].itemsList.length - 1)}
                    
                        <div className='col-12 col-lg-12  mt-4' >
                            <div className='rows   d-flex' style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                                <div className={`col-4 col-lg-2 me-3`}>
                                    <div className='card card-body shadow-sm  border-div text-center mb-3' style={{color: APPConf.themeColor}}>
                                        <NavLink exact='true' to={`/App/S/Spesific`} className="stretched-link"></NavLink>
                                            <div className='text-center align-self-center '> <span className={`bi bi-${APPConf.landing[APPConf.systemTag].itemsList[APPConf.landing[APPConf.systemTag].itemsList.length - 1].icon} bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                            <div className='text-center align-self-center'><h5 className='mt-1 mb-0'>{APPConf.landing[APPConf.systemTag].itemsList[APPConf.landing[APPConf.systemTag].itemsList.length - 1].itemName}</h5> </div>
                                    </div> 
                                </div>
                                {/* <div className={`col-4 col-lg-2 me-3`}>
                                    <div className='card card-body shadow-sm  border-div text-center mb-3' style={{color: APPConf.themeColor}}>
                                        <NavLink exact='true' to={`/App/S/Spesific`} className="stretched-link"></NavLink>
                                            <div className='text-center align-self-center '> <span className={`bi bi-images bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                            <div className='text-center align-self-center'><h5 className='mt-1 mb-0'> Images </h5> </div>
                                    </div> 
                                </div>
                                <div className={`col-4 col-lg-2 me-3`}>
                                    <div className='card card-body shadow-sm  border-div text-center mb-3' style={{color: APPConf.themeColor}}>
                                        <NavLink exact='true' to={`/App/S/Spesific`} className="stretched-link"></NavLink>
                                            <div className='text-center align-self-center '> <span className={`bi bi-clock bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                            <div className='text-center align-self-center'><h5 className='mt-1 mb-0'> Horaires </h5> </div>
                                    </div> 
                                </div> */}
                                {APPConf.landing[APPConf.systemTag].systemItemsList.map((data,index) => <SystemItemCard key={index} data={data} /> )}
                                <div className={`col-4 col-lg-2 me-3`}>
                                    <div className='card card-body shadow-sm  border-div text-center mb-3' style={{color: APPConf.themeColor}}>
                                        <NavLink exact='true' to={`/App/S/System`} className="stretched-link"></NavLink>
                                            <div className='text-center align-self-center '> <span className={`bi bi-envelope-check bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                            <div className='text-center align-self-center'><h5 className='mt-1 mb-0'> Messages  <span className='bi bi-gem text-info' style={{fontSize:'10px'}}></span></h5> </div>
                                    </div> 
                                </div>
                            </div>
                        </div>

                        <div className='col-6 mt-4'>
                            <div className='card p-3 shadow-sm  border-div text-center  mb-3' style={{color: APPConf.themeColor}}>
                                <NavLink exact='true' to='/App/S/Images' className="stretched-link"></NavLink>
                                        <div className='text-center align-self-center '> <span className={`bi bi-images bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                        <div className='text-center align-self-center'><h5 className='mt-1 mb-0'> {t('appPages.mainPage.imagesText')} </h5> </div>
                            </div>
                        </div>
                        <div className='col-6 mt-4'>
                            <div className='card p-3 shadow-sm  border-div text-center  mb-3' style={{color: APPConf.themeColor}}>
                                <NavLink exact='true' to='/App/S/Horaire' className="stretched-link"></NavLink>
                                    <div className='text-center align-self-center '> <span className={`bi bi-clock bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                    <div className='text-center align-self-center'><h5 className='mt-1 mb-0'>  {t('appPages.mainPage.horaireText')} </h5> </div>
                            </div>
                        </div>
                        <div className='col-4  '>
                            <div className='card p-3 shadow-sm  border-div text-center  mb-3' style={{color: APPConf.themeColor}}>
                                <NavLink exact='true' to='/App/S/Publication' className="stretched-link"></NavLink>
                                        <div className='text-center align-self-center '> <span className={`bi bi-megaphone bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                        <div className='text-center align-self-center'><h5 className='mt-1 mb-0'>  {t('appPages.mainPage.publicationText')} </h5> </div>
                            </div>
                        </div>
                        <div className='col-4  '>
                            <div className='card p-3 shadow-sm  border-div text-center  mb-3' style={{color: APPConf.themeColor}}>
                                <NavLink exact='true' to='/App/S/Avis' className="stretched-link"></NavLink>
                                    <div className='text-center align-self-center '> <span className={`bi bi-star-half bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                    <div className='text-center align-self-center'><h5 className='mt-1 mb-0'> {t('appPages.mainPage.ratingText')}  </h5> </div>
                            </div>
                        </div>
                        <div className='col-4  '>
                            <div className='card p-3 shadow-sm  border-div text-center  mb-3' style={{color: APPConf.themeColor}}>
                                <NavLink exact='true' to='/App/S/Share' className="stretched-link"></NavLink>
                                    <div className='text-center align-self-center '> <span className={`bi bi-share bi-lg ` } style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}></span> </div>
                                    <div className='text-center align-self-center'><h5 className='mt-1 mb-0'>  {t('appPages.mainPage.shareText')}   </h5> </div>
                            </div>
                        </div>

                        <div className='col-12 col-lg-12 mb-4' >
                            <div className='card p-3 shadow-sm  border-div text-center  ' style={{color: APPConf.themeColor}}>
                                <NavLink exact='true' to='/App/S/profile' className="stretched-link"></NavLink>
                                <div className='row' style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}>
                                    <div className='col-2 align-self-center'><h1 className='bi bi-gear bi-md mt-1' ></h1></div>
                                    <div className='col-8 align-self-center'><h3 className='mt-0'>{t('appPages.mainPage.parametreText')}</h3></div>
                                    <div className='col-2 align-self-center'><h1 className='bi bi-arrow-right-short bi-md mt-1' ></h1></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card card-body border-div shadow-sm mb-4'>
                        <div className='row'>
                            <div className={`col-4 align-self-center ${isRTL ? 'order-2' : ''}`} ><img className="border-div mb-3 border shadow-sm" src={`https://cdn.abyedh.com/Images/Search/CIcons/${APPConf.systemTag}.gif`} width="90px" height="90px"/></div>
                            <div className={`col-8 align-self-center text-secondary ${isRTL ? 'order-1' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                                <h5 className='mb-0'>{loading ? SKLT.BarreSkl :  profileData.general[0].Name  } </h5>
                                <div><small className="text-secondary"><span className="bi bi-geo-alt"></span> {loading ? SKLT.BarreSkl :  <>   {profileData.general[0].Gouv} </>  } </small></div>
                                <h5 className='mt-1 mb-2' dir={isRTL ? 'rtl' : 'ltr'} >  <span> PID :</span> <span> {localStorage.getItem('PID')} </span> <Button size='mini' icon='copy' className='rounded-circle   bg-transparent' onClick={() => navigator.clipboard.writeText(localStorage.getItem('PID'))}></Button> </h5>
                                
                                
                            </div>
                            <div className='col-12 order-3'>
                                 <div className='row'>
                                        <div className='col-10'>
                                            <NavLink className='btn btn-danger  w-100 me-4  bnt-block rounded-pill text-white '   to={`/S/P/${localStorage.getItem('APP_TAG')}/${localStorage.getItem('PID')}`}>
                                                <span className='bi bi-person-circle me-2'></span>    
                                                {t('appPages.mainPage.voirProfileText')}
                                            </NavLink>
                                        </div>
                                        <div className='col-2'><Button circular icon='share'  onClick={() => onShare()} /></div>
                                 </div>
                            </div>
                        </div>         
                    </div>
                    {/* <div className='card card-body border-div shadow-sm mb-4'>
                        <Button fluid onClick={() => LogOut()}> Decennexion </Button>
                    </div> */}
                    
                </div>
            </div>
            {/* {APPConf.landing[APPConf.systemTag].systemReady && localStorage.getItem('removedCard') == new Date().toLocaleDateString('fr-FR') ? <AdsCardSmall data={APPConf.systemTag} /> : ''} */}
            {/* {!APPConf.landing[APPConf.systemTag].systemReady  ? <CammingSoonSystem data={APPConf.systemTag} /> : ''} */}
    </>);
}

export default RequestPage;