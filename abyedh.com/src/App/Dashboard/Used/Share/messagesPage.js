import React, { useEffect, useRef, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Form, Loader, Input, Icon } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import GConf from '../../../AssetsM/APPConf';
import { toast } from 'react-toastify';
import SKLT from '../../../../AssetsM/Cards/usedSlk';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import FrameForPrint from '../../../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../../../AssetsM/Hooks/printFunction';
import QRCode from "react-qr-code";
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function MessagesPages() {
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [openD, setOpenD] = useState(false)
     
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /*###############################[UseEffect]################################# */
    useEffect(() => {
        window.scrollTo(0, 0);
  
        axios.post(`${GConf.ApiLink}/profile`, {
            PID: GConf.PID,
            SystemTag : GConf.systemTag
        })
        .then(function (response) {
             
             

             
            setLoading(true)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              
            }
        });
    }, [])
     
    const PrintFunction = (frameId) =>{usePrintFunction(frameId)}
     
    const onShare = async () => {
        if (navigator.share) {
        try {
            const result = await navigator.share({
            title: 'profileData.general[0].Name ',
            text: '${profileData.general[0].Name} - abyedh.com' ,
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

    return (<>
        
            <h5><span className="bi bi-chat-left-text-fill"></span> {t('appPages.imprimerPage.titleText')}  </h5>
            <br />
            <div className="container">
            <div className="row">
                    <div className="col-12 col-lg-3 text-center mb-3 align-self-center">
                            <QRCode value={GConf.PID} size={150} />
                        </div>
                        <div className="col-12 col-lg-9" dir='rtl'>

                                <h1 className='text-center text-secondary '> {GConf.PID} </h1>
                                        {t('appPages.imprimerPage.textOne')}
                                <div>
                                <Button size='mini' fluid className='rounded-pill' onClick={() => navigator.clipboard.writeText(localStorage.getItem('PID'))}><Icon name='copy'  />  {t('appPages.imprimerPage.btnCopy')} </Button>
                                </div>
                                <br /> 
                                    {t('appPages.imprimerPage.textTwo')}
                                <div className='mt-2'>
                                    <Button  className='rounded-pill' fluid  positive onClick={(e) => PrintFunction('printPID')}> <Icon name='print'  /> {t('appPages.imprimerPage.btnPrint')}  </Button>
                                    <Button className='mt-2 rounded-pill' fluid     onClick={() => onShare()}  >  <Icon name='share alternate' /> {t('appPages.imprimerPage.btnShare')} </Button>
                                   
                                </div>
                                 
                                
                        </div>
                    </div>
                    
            </div>
            <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                <div className='card-body'>
                                        
                 
                 </div>
            </BottomSheet>
            <FrameForPrint frameId='printPID' src={`/App/Profile/ProfilePrint`} />
    </>);
}

export default MessagesPages;