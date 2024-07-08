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


function MessagesPages() {
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [openD, setOpenD] = useState(false)
     
     
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
        
            <h5><span className="bi bi-chat-left-text-fill"></span> Partager  </h5>
            <br />
            <div className="container">
            <div className="row">
                    <div className="col-12 col-lg-3 text-center mb-3 align-self-center">
                            <QRCode value={GConf.PID} size={150} />
                        </div>
                        <div className="col-12 col-lg-9" dir='rtl'>

                                <h1 className='text-center text-secondary '> {GConf.PID} </h1>
                                هذا المعرف سوف يميزك عن بقية المسجلين على المنصة. يمكن أن تكون هذه أيضًا طريقة قصيرة للإعلان لك
                                <div>
                                <Button size='mini' fluid className='rounded-pill' onClick={() => navigator.clipboard.writeText(localStorage.getItem('PID'))}><Icon name='copy'  />  نسخ  PID</Button>
                                </div>
                                <br /> 
                                اطبع هذا الرابط الذي يمكن تعليقه على باب متجرك حتى يتمكن عملاؤك من الوصول إليك بسهولة، كما يمكن مشاركته مباشرة على وسائل التواصل الاجتماعي
                                <div className='mt-2'>
                                    <Button  className='rounded-pill' fluid  positive onClick={(e) => PrintFunction('printPID')}> <Icon name='print'  />  طباعة </Button>
                                    <Button className='mt-2 rounded-pill' fluid     onClick={() => onShare()}  >  <Icon name='share alternate' />  نشر الملف </Button>
                                    {/* <Button size='mini' primary target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://abyedh.tn/S/P/${GConf.systemTag}/${GConf.PID}`} >  <Icon name='facebook f' /> إعلان علي الفايسبوك  </Button> */}
                                </div>
                                {/* <FacebookProvider appId="1323119021701572">
                                    <ShareButton className='btn btn-primary ' href={`https://abyedh.tn/S/P/${GConf.systemTag}/${GConf.PID}`}>
                                        Share
                                    </ShareButton>
                                </FacebookProvider> */}
                                
                        </div>
                    </div>
                    {/* <Divider /> */}
                    <div className="d-flex d-none">
                        <div className="flex-shrink-0">
                        {/* <QRCode value={`${GConf.systemTag}/${GConf.PID}`} size={130} /> */}
                        </div>
                        <div className="flex-grow-1 ms-3">
                            Imprimez ce lien qui peut être accroché à la porte de votre magasin afin que vos clients puissent vous joindre facilement, et il peut également être partagé directement sur les réseaux sociaux
                            <div className='mt-2'>
                                <Button size='mini' positive onClick={(e) => PrintFunction('printPID')}> <Icon name='print'  />Imprimer</Button>
                                <Button className='mt-2 rounded-pill' fluid     onClick={() => onShare()}  >  <Icon name='share alternate' />  نشر الملف </Button>
                                {/* <Button size='mini' primary target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://abyedh.tn/S/P/${GConf.systemTag}/${GConf.PID}`} >  <Icon name='facebook f' /> Partager </Button> */}
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