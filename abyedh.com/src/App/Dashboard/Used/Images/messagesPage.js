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

    const ImageCard = () =>{
        const UploadImageCard = () =>{
            return(<>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-6 align-self-center text-center'>
                                <label onChange={handleFileSelect} htmlFor="formId"   className='text-info' role="button">
                                    <Input type='file' hidden name="Images" id="formId" multiple />
                                    <span className='bi bi-cloud-upload-fill bi-md'> </span> 
                                </label>
                                
                        </div>
                        <div className='col-6'>
                            <Button   className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFuncMultiple(formaDataArr)} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                        
                    </div>
                </div>
            </>)
        }
        const DisplayImageCard = (props) => {
            return(<>
                <div className='card card-body shadow-m mb-2 border-div'>
                    <div className='row'>
                       <div className='col-4'><div className='max-height-image'><img src={`https://cdn.abyedh.com/images/Directory/${props.imageLink}`} className='border border-2 rounded shadow-sm d-block' width='100%' height="auto"  /></div></div> 
                       <div className='col-4'></div> 
                       <div className='col-4'><Button onClick={() => RemoveImageFunc(props.imageLink)}>Delete Btn</Button></div> 
                    </div>
                </div>
            </>)
        }
        const PasDeResultat = () =>{
            return(<>
                <div className='text-center'>
                        <h3>
                            <span className='bi bi-exclamation-triangle-fill text-info bi-md me-3'></span> 
                            Vous n'avait pas d'images
                        </h3>
                        <label onChange={handleFileSelect} htmlFor="formId"   className='text-info' role="button">
                                <Input type='file' hidden name="Images" id="formId" multiple />
                                {/* <img src='https://assets.ansl.tn/Images/usful/uploadImage.jpg' width='100%'  height='150px' /> */}
                                <span className='bi bi-cloud-upload ' style={{fontSize : '100px'}}></span>
                                <h3> Cliquer Pour Charger des Imgaes  </h3>
                        </label>
                        
                </div>
            </>)
        }
        return(<>
            {imagesListe.length == 0 ?
                <>
                    {/* <UploadImageCard title='Image de Profile' tag='profile' />  */}
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
                                            <Button fluid onClick={() => {setToDisplayedImage(todisplayedImage.filter((item, tindex) => tindex !== index))}}>Supprimeé</Button>
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
                                            <Button   className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFuncMultiple(formaDataArr)} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='text-danger'/></Button>
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
                                    <p className="legend"><Button onClick={() => RemoveImageFunc(data.ImageLink)}>Supprimer</Button></p>
                                </div>
                        )}
                    </Carousel>
                    {/* {imagesListe.map((data,index) => <DisplayImageCard key={index} imageLink={data.ImageLink} />)} */}
                </>  
            }
                
        </>)
    }

    return (<>
        
            <h5><span className="bi bi-chat-left-text-fill"></span> Images </h5>
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