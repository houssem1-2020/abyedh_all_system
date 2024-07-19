import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/APPConf';
import ADIL from '../../AssetsM/APPITEM';
import { Button, Icon, Loader } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import APPConf from '../../AssetsM/APPConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';


function RequestPage() {
    /*#########################[Const]##################################*/
    let [requestToSystem, setRequestToSystem] = useState({Req_State : 'W'})
    let [pWD, setPWD] = useState({Identification:'', PasswordSalt:''})
    let [loaderState, setLoading] = useState(false)
    let [savedBtn, setSavedBtn] = useState(false)
    let [loading, setLoad] = useState(true)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /*#########################[UseEfeect]##############################*/
    useEffect(() => {
        window.scrollTo(0, 0);
        GetPWD()
        axios.post(`${GConf.ApiLink}/system/request`, {
           PID : GConf.PID,
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
        axios.post(`${GConf.ApiLink}/system/request/getpwd`, {
            PID : GConf.PID,
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
    const RequestSaved = (props) =>{
        return(<>
            <br />
            <br />
            <div className='card card-body border-div mb-4'>
                <h3 className='bi bi-check-circle bi-lg text-success mb-0 text-center'></h3> 
                <h3 className={`text-warning  mb-3 mt-3 ${isRTL ? 'text-end' : 'text-start'}`}> {t('appPages.systemInscriptionPage.waitingCard.subsIsRunning')}  </h3>
                <h6 > {t('appPages.systemInscriptionPage.waitingCard.suppText')} </h6>
            </div>
        </>)
    }
    const RequestAccepted = (props) =>{
        return(<>
            <br />
            <br />
            <div className='card card-body border-div shadow-sm mb-4 '>
                <h3 className='text-success text-center '> {t('appPages.systemInscriptionPage.SuccessCard.congratText')} </h3>
                <b> {t('appPages.systemInscriptionPage.SuccessCard.clicHer')}   </b>
                <div> {t('appPages.systemInscriptionPage.SuccessCard.identif')}{pWD.Identification}</div>
                <div> {t('appPages.systemInscriptionPage.SuccessCard.pwdText')} {pWD.PasswordSalt}</div>
                <br />
                            {t('appPages.systemInscriptionPage.SuccessCard.youCanText')}
                <br />
                <br />
                    <Button fluid size='large' className='border-div' href={GConf.landing[GConf.systemTag].systemUrl}><Icon name='desktop' />  {t('appPages.systemInscriptionPage.SuccessCard.btnText')}  </Button>
                <br />

            </div>
        </>)
    }
    const PleaseSignUp = (props) =>{
        return(<>
             <br />
                <div className='card card-body border-div mt-4 text-center '>
                    <h3 className={`text-danger ${isRTL ? 'text-end': 'text-start'}`}> {t('appPages.systemInscriptionPage.startCard.subscribeNow')}</h3>  
                
                <br />
                <div className={`p-2 text-secondary ${isRTL ? 'text-end': 'text-start'}`}>
                        <h5>  {t('appPages.systemInscriptionPage.startCard.systemNeedTwoCon')} </h5>
                        <ul>
                            <li>  {t('appPages.systemInscriptionPage.startCard.conditionOne')}  </li> 
                            <li> {t('appPages.systemInscriptionPage.startCard.conditionTwo')} </li> 
                        </ul>
                </div>
                <Button style={{backgroundColor: GConf.landing[GConf.systemTag].colorTheme}} fluid size='large' disabled={savedBtn} className='border-div text-white' onClick={() => RequestSystem()}> <Loader active={loaderState}    inline size='tiny' className='ms-2'/>  {t('appPages.systemInscriptionPage.startCard.saveSubsRequestButton')} </Button>
                 <br />
                 <h6 className='text-secondary'> {t('appPages.systemInscriptionPage.startCard.priceText')} </h6> 
                </div>
                <br />
                <br />
                {/* <div className='mb-0'><small>سعر الأشتراك السنوي : 500 د.ت</small></div> */}
        </>)
    }
    const CammingSoonSystem = (props) =>{
        return(<>
         
        <div className='col-12 col-lg-12  mb-4 mt-4 font-Expo-book'>
            <div className='card  p-4 shadow-sm  border-div '>
                <div className='row'>
                    <div className='col-2 align-self-center text-center'><img className="rounded-circle  " src={`https://cdn.abyedh.com/images/ads/${APPConf.systemTag}.svg`} width="50px" height="50px"/></div>
                    <div className='col-10 align-self-center text-secondary pe-4' dir='rtl'>
                        <div>النسخة الكاملة لـ {APPConf.landing[APPConf.systemTag].systemTitle} <span className='text-danger'>ستكون متوفرة قريبا ... </span> قم بتسجيل طلب الإشتراك  و سنعلمك حين تكون متوفرة </div>
                        
                    </div>
                    <br />
                    <br />
                    <div>
                        {requestToSystem.length == 0 ? <Button style={{backgroundColor: GConf.landing[GConf.systemTag].colorTheme}} fluid size='large' disabled={savedBtn} className='border-div text-white mt-4' onClick={() => RequestSystem()}> <Loader active={loaderState}    inline size='tiny' className='ms-2'/> تسجيل طلب الإشتراك </Button> : '' }
                        {requestToSystem.Req_State  &&  requestToSystem.Req_State  == 'W' ? <h4 className='text-center text-warning mt-4'>جاري عملية التسجيل للحصول علي نظام ... </h4> : '' }
                    </div>
                    
                </div>
            </div>
        </div>
        </>)
    }
    return (<>
             <div className=' ' dir={isRTL ? 'rtl':'lrt'}>
                {
                    loading ? 
                    <div className="loader-container">
                        <div className="loader-small"></div>
                    </div>

                    : 
                    <>
                        <h5 className='mb-1 mt-0 text-center' style={{color: GConf.landing[GConf.systemTag].colorTheme}}> {t('appPages.systemInscriptionPage.mainFirstTitle')}</h5>
                        <h2 className='text-center mt-0' style={{color: GConf.landing[GConf.systemTag].colorTheme}}>  {t(`landingPage.systemNames.${GConf.systemTag}`)}  </h2>
                        {/* <h4>{GConf.landing[GConf.systemTag].adsText}</h4>  */}
                        <h4 className='text-secondary'> {t('appPages.systemInscriptionPage.systemNamesData')} {t(`landingPage.systemNames.${GConf.systemTag}`)} {t('appPages.systemInscriptionPage.fullVersionHelpYouText')} </h4> 
                        <br />
                        <div className='text-secondary me-2 '>
                            {GConf.landing[GConf.systemTag].systemPos.map((data,index) => 
                                <div key={index} className='mb-3'><h5 className='mb-0'> <span className={`bi bi-node-plus-fill text-danger`}> </span> {t(`appPages.systemInscriptionPage.systemsPlusData.${GConf.systemTag}.${data.id}`)} </h5></div> 
                            )}
                        </div>
                        <br />
                        {/* <div className='card card-body border-div mb-4 ' style={{backgroundColor :'#e0e0e0'}}> 
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                        </div> */}
                         {APPConf.landing[APPConf.systemTag].systemReady  ?
                        //  <iframe
                        //     width="100%" height="250"
                        //     src={`https://www.youtube.com/embed/${GConf.landing[GConf.systemTag].systemVideoId}`}
                        //     title="YouTube video player"
                             
                        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        //     allowFullScreen
                        //     className='border-div'
                        // ></iframe>
                        <img src={`https://cdn.abyedh.com/Images/system_landing/forApp/${APPConf.systemTag}.jpg`} className='img-responsive border border-div' width='100%' height='200px' />
                        :
                        <></>
                         }
                        {!APPConf.landing[APPConf.systemTag].systemReady  ? <CammingSoonSystem data={APPConf.systemTag} /> : 
                        <>  
                             
                            {requestToSystem.length == 0 ? <PleaseSignUp /> : '' }
                            {requestToSystem.Req_State  &&  requestToSystem.Req_State  == 'W' ? <RequestSaved /> : '' }
                            {requestToSystem.Req_State  &&  requestToSystem.Req_State  == 'A' ? <RequestAccepted /> : '' }
                        </>}
                        
                         
                    </>
                    
                }
                
             </div>
            
    </>);
}

export default RequestPage;