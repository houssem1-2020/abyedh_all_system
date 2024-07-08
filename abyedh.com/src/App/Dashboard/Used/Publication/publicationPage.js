import React, {useEffect,useState}  from 'react';
import APPConf from '../../../AssetsM/APPConf';
import { Form, Icon, Input, Loader, Menu, TextArea } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Button , Tab} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Fade } from 'react-reveal';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import { useNavigate} from 'react-router-dom';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import { _ } from 'gridjs-react';
import TableImage from '../../../AssetsM/Cards/tableImg';
import axios from 'axios';
import { toast } from 'react-toastify';
import GConf from '../../../../AssetsM/generalConf';


const CustomTabs = ({activeIndex, setActiveIndex}) => {
    return(<>

           <div className="mt-1 p-1 mb-4"   style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                <Menu secondary >
                    <Menu.Item key={0} active={activeIndex == 0} className='rounded-pill' onClick={ () => setActiveIndex(0)}>
                        <span style={{color: '#848a94'}}>
                            <b>
                            <span className={`bi bi-blockquote-left`}></span> Texte
                            </b>
                        </span>
                    </Menu.Item>
                    {/* <Menu.Item key={1} active={activeIndex == 1} className='rounded-pill' onClick={ () => setActiveIndex(1)}>
                        <span style={{color: '#314770'}}>
                            <b>
                            <span className={`bi bi-list-columns-reverse`}></span> Article
                            </b>
                        </span>
                    </Menu.Item> */}
                    <Menu.Item key={2} active={activeIndex == 2} className='rounded-pill' onClick={ () => setActiveIndex(2)}>
                        <span style={{color: '#216e55'}}>
                            <b>
                            <span className={`bi bi-images`}></span> Image
                            </b>
                        </span>
                    </Menu.Item>
                    <Menu.Item key={3} active={activeIndex == 3} className='rounded-pill' onClick={ () => setActiveIndex(3)}>
                        <span style={{color: '#b32525'}}>
                            <b>
                            <span className={`bi bi-camera-reels`}></span> Video
                            </b>
                        </span>
                    </Menu.Item>
                    {/* <Menu.Item key={5} active={activeIndex == 5} className='rounded-pill' onClick={ () => setActiveIndex(5)}>
                        <span style={{color: 'gray'}}>
                            <b>
                            <span className={`bi bi-badge-ad`}></span> Annonces
                            </b>
                        </span>
                    </Menu.Item>
                    <Menu.Item key={4} active={activeIndex == 4} className='rounded-pill' onClick={ () => setActiveIndex(4)}>
                        <span style={{color: 'pink'}}>
                            <b>
                            <span className={`bi bi-trash`}></span> Supprimer
                            </b>
                        </span>
                    </Menu.Item> */}
                    
                </Menu>
          </div>
    </>)
}

const TextPubCard = ({publicationData, setPublicationData, SavePublicationFunc, disabledSaveBtn , OnKeyPressFunc, loaderState}) => {
    return(<>
            <div className='  card-body  mb-4 border-div'>
                <Form className='mb-3 '>
                    <TextArea placeholder='La taille maximale est de 300 caractères.' onKeyPress={event => OnKeyPressFunc(event)} maxLength={300} className='border-0 font-droid'  rows={5} value={publicationData.text} onChange={ (e,value) => setPublicationData({...publicationData, text:e.target.value})} />
                </Form>
                <div className='p-1'>
                    <Button className='rounded-pill'  fluid onClick={() => SavePublicationFunc('text','text','text')} disabled={disabledSaveBtn} size='small' icon style={{backgroundColor:'#848a94', color:'white'}} >   تسجيل   <Icon name='save' />   <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
            </div>
    </>)
}
const ArticlePubCard = ({publicationData, setPublicationData, SavePublicationFunc, disabledSaveBtn , OnKeyPressFunc, loaderState}) => {
    return(<>
            <div className='  card-body  mb-4 border-div'>
                <Form className='mb-3'>
                    <TextArea placeholder='La taille maximale est de 3500 caractères.' onKeyPress={event => OnKeyPressFunc(event)} maxLength={3500} className='border-0 font-droid'  rows={8} value={publicationData.article} onChange={ (e,value) => setPublicationData({...publicationData, article:e.target.value})} />
                </Form>
                <div className='p-1'>
                    <Button className='rounded-pill' fluid onClick={() => SavePublicationFunc('article','article','article')} disabled={disabledSaveBtn} size='small' icon style={{backgroundColor:'#314770', color:'white'}} >   تسجيل   <Icon name='save' />   <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
            </div>
    </>)
}
const ImagePubCard = ({publicationData, setPublicationData, SavePublicationFunc, disabledSaveBtn , OnKeyPressFunc, loaderState}) => {
    const [imageLink, setImageLink] = useState('')

    const GetImageFunction = (link) => {
        setPublicationData({...publicationData, imageUrl: link })
        checkImageURL(link, isValid => {
           if (isValid) {
             setImageLink(link)
             // setPublicationData({...publicationData, imageUrl: link })

           } else {
            toast.error(<><div><h5> URL Invalide </h5>  esseyer une autre image !  </div></>, GConf.TostInternetGonf)
            //setPublicationData({...publicationData, image: link })
           }
          });
        
    }

    function checkImageURL(url, callback) {
        const img = new Image();
        
        img.onload = function() {
          callback(true); // Image loaded successfully
        };
      
        img.onerror = function() {
          callback(false); // Image failed to load
        };
      
        img.src = url;
      }

    return(<>
            <div className='  card-body  mb-4 border-div'>
                <Form className='mb-3'>
                    <TextArea placeholder='La taille maximale est de 180 caractères.' onKeyPress={event => OnKeyPressFunc(event)} maxLength={180} className='border-0 font-droid'  rows={2} value={publicationData.imageText} onChange={ (e,value) => setPublicationData({...publicationData, imageText:e.target.value})} />
                </Form>
                <small>Entrez ici le lien de l'image ! veiullez entrer un lien utile </small>
                <input className='text-start form-control'  fluid   placeholder={`Adresse de l'image`}   onBlur={(e) => GetImageFunction(e.target.value)} />
                <br />
                {imageLink == '' ? <></> : <img src={imageLink} width={'100%'} height='auto' />}
                <br /> 
                <br /> 
                <div className='p-1'>
                    <Button className='rounded-pill' fluid onClick={() => SavePublicationFunc('image','image','image')} disabled={disabledSaveBtn} size='small' icon style={{backgroundColor:'#216e55', color:'white'}} >   تسجيل   <Icon name='save' />   <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
            </div>
    </>)
}
const VideoPubCard = ({publicationData, setPublicationData, SavePublicationFunc, disabledSaveBtn , OnKeyPressFunc, loaderState}) => {
    const [videoLink, setVideoLink] = useState('')

    const GetImageFunction = (link) => {
        //checkVideoURL(link, isValid => {
           //if (isValid) {
             //console.log(true);
             setVideoLink(link)
             setPublicationData({...publicationData, videoUrl: link })

           //} else {
            //console.log(false);
            //setPublicationData({...publicationData, image: link })
           //}
          //});
        
    }

    function checkVideoURL(url, callback) {
        const video = document.createElement('video');
  
        video.onloadedmetadata = video.oncanplay = function() {
            callback(true); // Video loaded successfully
        };

        video.onerror = function() {
            callback(false); // Video failed to load
        };

        video.src = url;
    }
    
    return(<>
            <div className='  card-body  mb-4 border-div'>
                <Form className='mb-3'>
                    <TextArea placeholder='La taille maximale est de 180 caractères.' onKeyPress={event => OnKeyPressFunc(event)} maxLength={180} className='border-0 font-droid' rows={2} value={publicationData.videoText} onChange={ (e,value) => setPublicationData({...publicationData, videoText:e.target.value})} />
                </Form>
                <small>Entrez l'ID de video Youtube (example : jNQXAC9IVRw , on accepte que les video youtube !! ) </small>
                <input className='text-start form-control'  fluid   placeholder='ID de video '  onBlur={(e) => GetImageFunction(e.target.value)} />
                <br />
                {videoLink == '' ? 
                    <></> 
                    : 
                    <iframe
                        width="100%" height="250"
                        src={`https://www.youtube.com/embed/${videoLink}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                    }
                <br /> 
                <br /> 
                <div className='p-1'>
                    <Button className='rounded-pill' fluid onClick={() => SavePublicationFunc('video','video','video')} disabled={disabledSaveBtn} size='small' icon style={{backgroundColor: '#b32525' , color:'white'}} >   تسجيل   <Icon name='save' />   <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
            </div>
    </>)
}
const ReseauxPubCard = () =>{
    return(<>
    Resaeux Sociale 
    </>)
}
const AnnocesPubCard = () =>{
    return(<>
    Annonces 
    </>)
}

function PublicationPage() {
     /*#########################[Const]##################################*/
     const [publicationData, setPublicationData] = useState({text : '', article:'', imageText:'', imageUrl:'', videoText:'', videoUrl:''})
     const [activeIndex, setActiveIndex] = useState(0)
     const [loaderState, setLS] = useState(false)
     const [disabledSaveBtn, setDisabledBtn] = useState(false)

     const panesRes = [
        {
          menuItem: { key: 'attent',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
          render: () => <TextPubCard OnKeyPressFunc={OnKeyPressFunc} publicationData={publicationData} setPublicationData={setPublicationData} SavePublicationFunc={SavePublicationFunc} disabledSaveBtn={disabledSaveBtn} loaderState={loaderState} />,
        },
        {
          menuItem: { key: 'vu',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
          render: () => <ArticlePubCard OnKeyPressFunc={OnKeyPressFunc} publicationData={publicationData} setPublicationData={setPublicationData} SavePublicationFunc={SavePublicationFunc} disabledSaveBtn={disabledSaveBtn} loaderState={loaderState} />,
        },
        {
          menuItem: { key: 'accept',  content: <span className='text-success'><b><span className='bi bi-check-square-fill'></span> Accepteé</b></span> , className:'rounded-pill' },
          render: () => <ImagePubCard OnKeyPressFunc={OnKeyPressFunc} publicationData={publicationData} setPublicationData={setPublicationData} SavePublicationFunc={SavePublicationFunc} disabledSaveBtn={disabledSaveBtn} loaderState={loaderState} />,
        },
        {
          menuItem: { key: 'refuse',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
          render: () => <VideoPubCard OnKeyPressFunc={OnKeyPressFunc} publicationData={publicationData} setPublicationData={setPublicationData} SavePublicationFunc={SavePublicationFunc} disabledSaveBtn={disabledSaveBtn} loaderState={loaderState} />,
        },
        {
          menuItem: { key: 'retarder',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Retardeé</b></span>, className:'rounded-pill' },
          render: () => <ReseauxPubCard OnKeyPressFunc={OnKeyPressFunc} publicationData={publicationData} setPublicationData={setPublicationData} SavePublicationFunc={SavePublicationFunc} disabledSaveBtn={disabledSaveBtn} loaderState={loaderState} />,
        },
        {
          menuItem: { key: 'redireter',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Redirecte</b></span>, className:'rounded-pill' },
          render: () => <AnnocesPubCard OnKeyPressFunc={OnKeyPressFunc} publicationData={publicationData} setPublicationData={setPublicationData} SavePublicationFunc={SavePublicationFunc} disabledSaveBtn={disabledSaveBtn} loaderState={loaderState} />,
        },
    ]

     /*#########################[UseEffect]##################################*/

     /*#########################[Functions]##################################*/
    const SavePublicationFunc= (genre, columnName, data) =>{
        console.log(publicationData)
        if (genre == 'text' && (!publicationData.text || publicationData.text =='')) {toast.error("أدخل النص المطلوب !", GConf.TostErrorGonf)}
        else if (genre == 'image' && (publicationData.imageUrl == '' || publicationData.imageText == '')) {toast.error("أدخل معلومات الصورة المطلوب !", GConf.TostErrorGonf)}
        else if (genre == 'video' && (publicationData.videoUrl == '' || publicationData.videoText == '')) {toast.error("أدخل معلومات الفيديو المطلوب !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${APPConf.ApiLink}/publications/ajouter`, {
                PID : APPConf.PID,
                TAG : APPConf.systemTag ,
                genre : genre,
                publicationData: publicationData ,
            }).then(function (response) {
                console.log(response.data)
                toast.success(<><div><h5>تم تسجيل  المنشور  بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                setLS(false)
                setDisabledBtn(true)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5> لم يتم تسجيل المنشور</h5> حاول مرة أخري  </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        } 
    }
    const OnKeyPressFunc = (e) => {
        const charCode = e.charCode || e.keyCode;
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || charCode === 42 || charCode === 32 || charCode === 47 || (charCode >= 0x0600 && charCode <= 0x06FF))) {
            e.preventDefault();
        }
    }

     /*#########################[Card]##################################*/

    return ( <> 
                <h5 className='text-danger'>Partagez vos activités avec vos abonnés !!</h5>
                <CustomTabs  activeIndex={activeIndex} setActiveIndex={setActiveIndex}   />
                <Tab menu={{ secondary: true }} activeIndex={activeIndex} panes={panesRes}  className='no-menu-tabs mt-2' />
        </> );
}

export default PublicationPage;