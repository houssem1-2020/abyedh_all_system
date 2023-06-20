import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import ReactImageZoom from 'react-image-zoom';

const EditArticle = ({articleD, setArticleD, checkPrixCompatiblite, familles, EditArticleFunction,loaderState,updateQte}) =>{
    return(<>

                <h5 className='mb-1'>Code à barre:</h5>
                <Input icon='barcode' disabled iconPosition='left' type='number' placeholder='code a barre' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.A_Code} onChange={(e) => setArticleD({...articleD, A_Code: e.target.value })} />
                <h5 className='mb-1 mt-0'>Nom: </h5>
                <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Name} onChange={(e) => setArticleD({...articleD, Name: e.target.value })}/>
                
                <div className='row'>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Genre: </h5>
                                <Input icon='dollar' iconPosition='left'   placeholder='genre' defaultValue={articleD.Genre}   className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Genre: e.target.value })}/> </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Acaht: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='achat' defaultValue={articleD.Prix_achat} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Prix_achat: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Quantité: </h5>
                                <Input icon='dropbox' iconPosition='left' type='number' disabled={true} placeholder='quantité' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Quantite} onChange={(e) => setArticleD({...articleD, Quantite: e.target.value })}/> 
                            </div>
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-12'>
                                <h5 className='mb-1'>Repture du stock: </h5>
                                <Input icon='angle double down' iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Repture} onChange={(e) => setArticleD({...articleD, Repture: e.target.value })}/>
                            </div>
                </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditArticleFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function ArticleInfo() {
    /*#########################[Const]##################################*/
    let Today = new Date().toISOString().split('T')[0]
    let {code} = useParams();
    const[familles] = []
    const [loading , setLoading] = useState(false)
    const [articleD, setArticleD] = useState({});
    const [loaderState, setLS] = useState(false)
    const [photoExist, setPhotoExist] = useState(false)
    const [updateQte, setUpdateQte] = useState(true)
    const [resDay , setResDay] = useState({start:Today, end:Today})
    const [articleEvents , setArticleEvents] = useState([])
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    const props = {width: 400, height: 250, zoomWidth: 500, img: articleD ? articleD.Photo_Path : 'default_img.jpg'};

    const [uploadImageName, setUploadImageName] = useState('')
    const [uploadImage, setUploadImages] = useState()
    const [displayedImage, setDisplayedImage] = useState()


    const panes = [
        {
            menuItem: { key: 'resumer', icon: 'file excel', content: 'Resumeé' }, 
            render: () => <><Tab.Pane attached={false}><StockESCard /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'suivie', icon: 'calendar alternate', content: 'Suivie' }, 
            render: () =><><Tab.Pane attached={false}><SuivieInPlatCard /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle articleD={articleD}  setArticleD={setArticleD} checkPrixCompatiblite={checkPrixCompatiblite} familles={familles} EditArticleFunction={EditArticleFunction} loaderState={loaderState} updateQte={updateQte} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'image', icon: 'image', content: 'Image' }, 
            render: () => <><Tab.Pane attached={false}><Images /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteArticleCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock/article`, {
            PID: GConf.PID,
            code: code, 
          })
          .then(function (response) {
            if(!response.data[0]) {
                toast.error('Article Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/sk"; }, 2000)
                
            } else {
                setArticleD(response.data[0])
                setLoading(true)
            }
                
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger l'article  </div></>, GConf.TostInternetGonf)   
              setLoading(true)
              setArticleD([])
            }
          });

        // //calendar
        // axios.post(`${GConf.ApiLink}/stock/article/calendar`, {
        //     PID : GConf.PID,
        //     code: code, 
        //   })
        // .then(function (response) {
            
        //     let inFactureList = []
        //     response.data[0].InFacture.map( (factureList) => inFactureList.push( { title: GetTargetArticleQte(factureList.Articles,'Qte'), date: GenerateDate(factureList.Cre_Date, 1), className:'bg-primary border-0 w-25 text-center' }))
            
        //     let forCamionList = []
        //     response.data[0].ForCamion.map( (camionData) => forCamionList.push( { title: GetTargetArticleQte(camionData.Articles,'QteAjoute') , date: GenerateDate(camionData.Jour, 1) , className:'bg-danger border-0 w-25 text-center' }))
            
        //     let fromBonBE = []
        //     response.data[0].bonE.map( (bonBe) => fromBonBE.push( { title: GetTargetArticleQte(bonBe.Articles,'NewQte'), date:  GenerateDate(bonBe.BE_Date, 1) , className:'bg-success border-0 w-25 text-center'}))
            

        //     let fromBonBS = []
        //     response.data[0].bonS.map( (bonBs) => fromBonBE.push( { title: GetTargetArticleQte(bonBs.Articles,'NewQte'), date: GenerateDate(bonBs.BE_Date, 1), className:'bg-warning border-0 w-25 text-center'}))

        //     //setArticleEvents(inFactureList.concat(forCamionList,fromBonBE,fromBonBS))
        //     setArticleEvents(ConcatunateResult(inFactureList).concat(ConcatunateResult(forCamionList),ConcatunateResult(fromBonBE),ConcatunateResult(fromBonBS)))
                
        // })

        // Find Image 
        axios.post(`${GConf.ApiLink}/stock/checkAbyedhDb`, {
            Code :code,
          })
          .then(function (response) {
            if(response.data.length != 0 ){setPhotoExist(response.data)}
          })

        //check Permission
        // axios.post(`${GConf.ApiLink}/Permission`, {
        //     PID : GConf.PID,
        //   })
        //   .then(function (response) {
        //     if(response.data[0].Edit_Stock === 'true'){setUpdateQte(false)}
        //   })
    }, [])


    /*#########################[Function]##################################*/
    const EditArticleFunction = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/stock/modifier`, {
            PID :GConf.PID,
            articleND :articleD,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Article Modifier !", GConf.TostSuucessGonf)
                setLS(false)
                SaveNotification('stockEditArticle',GConf.PID, articleD)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier l'article  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const UpdatePhotoFunction = (pathLink) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/stock/modifier/image`, {
            PID  :GConf.PID,
            code : code,
            path : pathLink
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Image Modifier !", GConf.TostSuucessGonf)
                setLS(false)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier l'image  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }

    const DeleteArticle = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/stock/supprimer`, {
            tag :GConf.PID,
            code : code ,
            pk: articleD.PK
        }).then(function (response) {
            if (response.data.affectedRows != 0) {
                toast.error('Article Supprimer  !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/sk"; }, 500)
                setLS(false)
            } else {
                setLS(false)
            }
            console.log(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de supprimer l'article  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const checkPrixCompatiblite = () =>{
        if(articleD.PrixA && articleD.PrixV){
            if(articleD.PrixA > articleD.PrixV) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setArticleD({...articleD, PrixV: '', PrixA: '' })
            } 
        }  
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId) }
    const GetTargetArticleQte = (value,column) =>{
        const JsValue = JSON.parse(value)
        const searchObject= JsValue.find((article) => article.A_Code == code);
        return parseInt(searchObject[column]);
    }
    const GenerateDate = function(str, days) {
        var myDate = new Date(str);
        myDate.setDate(myDate.getDate() + parseInt(days));
        return myDate.toISOString().split('T')[0];
    }
    const ConcatunateResult = (targetArray) =>{

        const endresult = Object.values(targetArray.reduce((value, object) => {
            if (value[object.date]) {
              value[object.date].title += object.title; 
              value[object.date].count++;
          
          } else {
              value[object.date] = { ...object , count : 1
              };
            }
            return value;
          }, {}));
          
          return(endresult)
        
    }

    const UpdateImageFunc = () =>{
        if (!uploadImage) { } 
        else {
            const formData = new FormData();
            formData.append("ProfileImage", uploadImage);
            formData.append("Tag", uploadImageName);
            formData.append("Code", code);
            formData.append("Tag", GConf.PID);
            setLS(true)
            axios({
                method: 'post',
                url: `${GConf.ApiLink}/stock/modifier/images`,
                data: formData ,
            }).then(function (response) {
                toast.success("Image Modifier !", GConf.TostSuucessGonf)
                setLS(false)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            });  
        } 
    }
    const UploadImageFunc = (e) => {
        setDisplayedImage(URL.createObjectURL(e.target.files[0]))
        setUploadImages(e.target.files[0])
    }
   
   /*#########################[Card]##################################*/
    const ArticleCard = (props) =>{
        const ReptureState = () =>{
            return (
            props.data.Repture >= props.data.Quantite ? <span className='bi bi-exclamation-triangle-fill bi-sm text-danger'></span> : <span className='bi bi-box2-heart-fill bi-sm text-success'></span>
            )
        }
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container notification">
                            <img src={`https://assets.ansl.tn/Images/Articles/${props.data.Photo_Path}`} className="rounded-circle" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.data.Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.Genre } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-house-heart-fill"></span> { props.data.Socite } </>: SKLT.BarreSkl } </h6>
                            <Divider horizontal className='text-secondary mt-4'>Prix</Divider>
                                <Statistic color='red' size='tiny' className='mb-0'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {parseFloat(props.data.Prix_achat).toFixed(3)} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Achat</Statistic.Label>
                                </Statistic>
                            <Divider horizontal className='text-secondary mt-4'>Quantite</Divider>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Quantite} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                    </Statistic>
                                </div>
                                <div className='col-6  align-self-center border-end'>
                                    <ReptureState />
                                </div>
                                <div className='col-6 align-self-center'>
                                <h6 className='mb-1'> Repture En: {props.data.Repture}</h6> 
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
    const SuivieInPlatCard = () =>{
        return(<>
                Listes des PLat Qui contient cette article 
        </>)
    }
    const DeleteArticleCard = () =>{
        return(<>
            <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Cett Article ?</h3> 
            <div className='row'>
                <div className='col-9'>
                    <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer L'Article : </b></h5>
                    <ul className="text-info text-left">
                    <li>L'article ne sera pas visible dans la branche 'Stock'</li>
                    <li>Tous les article avec son code a barre se suppriment </li>
                    <li>L'article Soit visible seulemment dans les facture  </li>
                    </ul>
                </div>
                <div className='col-lg-3 d-none d-lg-block align-self-center'>
                    <div className='text-center'>
                            <img src='https://assets.ansl.tn/Images/usful/delete.svg' width='80%'  height='80px' /> 
                    </div> 
                </div>
            </div>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill" onClick={DeleteArticle}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></button>
            </div>
        </>)
    }
    const StockESCard = () =>{
        return(<>
                <h5>Bon Entre / Sortie </h5>
                <div className='mb-2 row'>
                    <div className='col-6 mb-3'><Input size='small' fluid    value={resDay.start}  onChange={(e) => setResDay({...resDay, start: e.target.value })}/></div>
                    
                    <div className='col-6 self-align-center mb-2'>
                        <Button size='small' className='rounded-pill btn-imprimer' fluid onClick={(e) => PrintFunction('printResumer')} icon >  <Icon name='print' /> Enregistrer </Button>
                    </div>
                </div> 
        </>)
    }
    const Images = () =>{   
        const UploadImage = () =>{
            return(<>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                        <div className='card p-2 mb-2'>
                            <label onChange={UploadImageFunc} htmlFor="formId" className='text-info ' role="button">
                               <Input type='file' hidden name="imagez" id="formId"  />
                                <span className='bi bi-cloud-upload-fill bi-sm'> <span className='mb-2 ms-4'>CHARGER UNE IMAGE </span></span>
                                
                            </label>
                        </div>
                        <div className='text-start mt-2'>
                            <Button  className='rounded-pill bg-system-btn' size='tiny' onClick={UpdateImageFunc} ><Icon name='save' /> Modifier Image <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-5'>
                        <div className='card card-body  text-center p-4 img-container'>
                            {displayedImage ? <img src={displayedImage} width='100%' height='200px'  /> : 'PaS d\'image'}
                        </div>
                    </div>
                </div>
            </>)
        }
        const UpdateImage = () =>{
            const UpdateCard = (props) =>{
                return(<>
                    <div className='row'>
                        <div className='col-12 col-lg-4'>
                                <div className='card card-body  text-center p-4 border-3 img-container'>
                                    <img src={`https://assets.ansl.tn/Images/Articles/${props.link}`} width='100%' height='200px'  /> 
                                </div> 
                        </div>
                        <div className='col-12 col-lg-8'>
                           <Button onClick={(e) => UpdatePhotoFunction(props.link)} >Modifier </Button> 
                        </div>
                    </div> 
                </>)
            }
            return(<>
                {photoExist.Photo_Path ? <UpdateCard link={photoExist.Photo_Path} /> : <> Cette article n'est pas connu pour les base de donneé abyedh.tn </>}
            </>)
        }
        const ImageExist = () =>{
            return(<>
            <div className="card-body text-center">
                    <h5>Image existe déja</h5> 
                    {/* <img src={`https://assets.ansl.tn/Images/Articles/${articleD ? articleD.Photo_Path : 'default_img.jpg'}`} className="rounded-circle" width="300px" />                     */}
                    <ReactImageZoom width={300} height={400}  zoomPosition='original'  img={`https://assets.ansl.tn/Images/Articles/${articleD ? articleD.Photo_Path : 'default_img.jpg'}`} />
            </div>
            </>)
        }
        return(<>
        <div className='p-2 mb-2'>   
            {articleD.Photo_Path == 'default_img.jpg' ? <UpdateImage /> : <ImageExist />  } 
        </div>
       
        </>)
    }

    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.stockInfo} />
                <br />
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <ArticleCard data={articleD}/> 
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>  
                </div>
                <FrameForPrint frameId='printResumer' src={`/Pr/Stock/resumer/${code}/${resDay.start}/${resDay.end}`} />
                <FrameForPrint frameId='printVente' src={`/Pr/Stock/vente/${code}/${resDay.start}/${resDay.end}`} />
     </> );
}

export default ArticleInfo;