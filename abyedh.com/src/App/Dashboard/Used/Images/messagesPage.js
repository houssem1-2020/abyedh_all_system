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
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function MessagesPages() {
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [openD, setOpenD] = useState(false)
    /*Images */
    const [imagesListe, setImagesListe] = useState([])
    const [uploadImageName, setUploadImageName] = useState('')
    const [uploadImage, setUploadImages] = useState()
    const [formaDataArr, setFormDataArr] = useState()
    const [displayedImage, setDisplayedImage] = useState()
    const [todisplayedImage, setToDisplayedImage] = useState([])
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
             
            setImagesListe(response.data.images)

             
            setLoading(true)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              
            }
        });
    }, [])
     
    /*Images */
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
         
        if (todisplayedImage.length < 5) {toast.error(t('appPages.imagesPage.toast.one') , GConf.TostErrorGonf) } 
        else if (todisplayedImage.length > 5) {toast.error(t('appPages.imagesPage.toast.two'), GConf.TostErrorGonf) } 
        else {
            axios.post(`${GConf.ApiLink}/profile/images/ajouter`, formData)
            .then(response => toast.error(t('appPages.imagesPage.toast.three'), GConf.TostSuucessGonf))
            .catch(error => console.log(error));
        }
        
    }
    const RemoveImageFunc = (imgName) => {
        console.log(imgName.slice(0, -4))
        axios.post(`${GConf.ApiLink}/profile/images/deletefile`, {
            fileName : imgName,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success(t('appPages.imagesPage.toast.four'), GConf.TostSuucessGonf)
                setLS(false)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        })
    }

    const ImageCard = () =>{
        const PasDeResultat = () =>{
            return(<>
                <div className='text-center'>
                        <h3>
                            <span className='bi bi-exclamation-triangle-fill text-info bi-md me-3'></span> 
                            {t('appPages.imagesPage.dontHaveImage')}
                        </h3>
                        <label onChange={handleFileSelect} htmlFor="formId"   className='text-info' role="button">
                                <Input type='file' hidden name="Images" id="formId" multiple />
                                <span className='bi bi-cloud-upload ' style={{fontSize : '100px'}}></span>
                                <h3>  {t('appPages.imagesPage.clicForThat')} </h3>
                        </label>
                        
                </div>
            </>)
        }
        return(<>
            {imagesListe.length == 0 ?
                <>
                    <br />
                    <div className='row'>
                            {todisplayedImage.length != '0' ? 
                                <>
                                <Carousel>
                                    {todisplayedImage.map((data,index) => 
                                            <div className='col-12 col-lg-4 mb-5' key={index}>
                                                <div className='max-height-image mb-2'>
                                                    <img src={URL.createObjectURL(todisplayedImage[index])} className='border border-div d-block' width='100%' height='150px'  />
                                                </div>
                                                <Button fluid onClick={() => {setToDisplayedImage(todisplayedImage.filter((item, tindex) => tindex !== index))}}>{t('appPages.imagesPage.deleteBtn')}</Button>
                                            </div>
                                    )}
                                </Carousel>
                                <br />
                                <div className='row'>
                                    <div className='col-6 align-self-center'>
                                        {todisplayedImage.length == '5' ? <></> 
                                        :
                                        <label onChange={handleFileSelect} htmlFor="formId"   className='text-info' role="button">
                                                <Input type='file' hidden name="Images" id="formId" multiple />
                                                <span className='bi bi-cloud-upload ' style={{fontSize : '30px'}}></span>
                                        </label>
                                         }
                                    </div>
                                    <div className='col-6 align-self-center text-end'>
                                            <Button   className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFuncMultiple(formaDataArr)} ><Icon name='save' /> {t('appPages.imagesPage.saveBtn')} <Loader inverted active={loaderState} inline size='tiny' className='text-danger'/></Button>
                                    </div>
                                    
                                </div>
                                
                                
                            </>   
                            : 
                            <PasDeResultat />}
                    </div>
                </>
                :
                <>
                    <Carousel>
                        {imagesListe.map((data,index) => 
                                <div key={index}>
                                    <img src={`https://cdn.abyedh.com/images/Directory/${data.ImageLink}`} />
                                    <p className="legend"><Button onClick={() => RemoveImageFunc(data.ImageLink)}>{t('appPages.imagesPage.deleteBtn')}</Button></p>
                                </div>
                        )}
                    </Carousel>
                    
                </>  
            }
                
        </>)
    }

    return (<>
        
            <h5><span className="bi bi-chat-left-text-fill"></span> {t('appPages.imagesPage.title')} </h5>
            <br />
            <div className="container">
                 <ImageCard />
            </div>
            <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                <div className='card-body'>
                                        
                 
                 </div>
            </BottomSheet>
    </>);
}

export default MessagesPages;