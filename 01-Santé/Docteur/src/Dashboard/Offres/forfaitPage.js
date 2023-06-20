import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import TableImage from '../../AssetsM/Cards/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Transition,  Input, Loader, Select, TextArea, Form} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import useGetArticles from '../../AssetsM/Hooks/Used/fetchArticles';
import { NavLink } from 'react-router-dom';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
// import useGetFamilleArticle from '../../AssetsM/Hooks/fetchArticlesFamille';

function StockPage() {

    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let [articleList, setArticleList] = useState([['...','...','...','...','...','...']]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    let test = useGetArticles()
   //  const [familles] = useGetFamilleArticle() 
    const [inDirArticle, setInDirA] = useState();  
    const [articles] = useGetArticles()  
    const [articleD, setArticleD] = useState({Groupage:1});
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}


    /*#########################[UseEffect]##################################*/
      useEffect(() => {
         axios.post(`${GConf.ApiLink}/forfait`, {
            PID : GConf.PID,
         })
         .then(function (response) {
            console.log(response.data)
            if (!response.data) {
                  toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
            } else {
               let articleListContainer = []
               response.data.map( (getData) => articleListContainer.push([
                  _(<TableImage image={'tarif.png'}  onClick={() => openEditModal(getData,true)}/>),
                  getData.F_ID,
                  getData.Service,
                  getData.Genre,
                  getData.Tarif.toFixed(3),
                  _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/of/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span> </Button>),
               ],))
               setArticleList(articleListContainer) 
            }
         }).catch((error) => {
            if(error.request) {
               toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
               let articleListContainer = []
               Offline.stock.map( (getData) => articleListContainer.push([
                  _(<TableImage image={'tarif.png'}  onClick={() => openEditModal(getData,true)}/>),
                  getData.F_ID,
                  getData.Service,
                  getData.Genre,
                  getData.Tarif.toFixed(3),
                  _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/of/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span> </Button>),
               ],))
               setArticleList(articleListContainer)
               }
         });
      }, [])



    /*#########################[Function]##################################*/
      const NavigateFunction = (link) => {  navigate(link) }
      const openEditModal = (event,selected) =>{
         setSelectedArticle(event)
         setModalS(true)
      }
      const SaveArticle = (event) => {
               if (!articleD.F_ID) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.F_Name || articleD.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Genre) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Tarif) {toast.error("Prix Achat Invalide !", GConf.TostErrorGonf)}
               else{
                  setLS(true)
                  axios.post(`${GConf.ApiLink}/forfait/ajouter`, {
                     PID : GConf.PID,
                     articleD : articleD,
                  }).then(function (response) {
                     if(response.data.affectedRows) {
                           setSaveBtnState('disabled')
                           toast.success("Article Enregistreé !", GConf.TostSuucessGonf)
                           setLS(false)
                           //SaveNotification('stockSaveArticle',GConf.PID, articleD)
                     }
                     else{
                           toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                           setLS(false)
                     }
                  }).catch((error) => {
                     if(error.request) {
                        toast.error(<><div><h5>Probleme de Connextion</h5> L'article sera enregistrer sue votre ordinateur </div></>, GConf.TostInternetGonf)   
                        Offline.articleToSave.push(articleD)
                        localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                        setLS(false)
                     }
                     });
                  
               }
               
      }  
      const checkArticleExistance = () =>{
         if(articleD.F_ID){
               if(articles.includes(parseInt(articleD.F_ID))) {
                  toast.error("Article Exist Deja", GConf.TostErrorGonf)
                  setArticleD({...articleD, F_ID: '' })
               } 
         }
      }
      const checkPrixCompatiblite = () =>{
         if(articleD.Tarif && articleD.PrixV){
               if(parseFloat(articleD.Tarif) > parseFloat(articleD.PrixV)) {
                  toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                  setArticleD({...articleD, PrixV: '', Tarif: '' })
               } 
         }
         
      }
      const FindInDirectoryFunc = () =>{
         if (!inDirArticle) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
         else{
               setLS(true)
               axios.post(`${GConf.ApiLink}/forfait/checkAbyedhDb`, {
                  Code : inDirArticle,
               }).then(function (response) {
                  if(response.data.length  != 0) {
                     toast.success("Article Connu !", GConf.TostSuucessGonf)
                     setLS(false)
                     setArticleD({ ...articleD, F_ID: response.data.F_ID,  Name: response.data.Name, Groupage : response.data.Colis, Socite : response.data.Socite})
                  }
                  else{
                     toast.error('Pas De Resultat ', GConf.TostSuucessGonf)
                     setLS(false)
                  }
               }).catch((error) => {
                  if(error.request) {
                     toast.error(<><div><h5>Probleme de Connextion</h5> </div></>, GConf.TostInternetGonf)   
                     setLS(false)
                  }
               });
               
         }
      }
      const OnKeyPressFunc = (e) => {
         if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
               e.preventDefault();
         }   
      }

      /*  */
      return (<>
              <NavLink exaxt='true' to='/S/ab'><Button className='rounded-circle' icon='arrow left' /></NavLink>
              <br />
              <br />
              <div className='row'>
                  <div className='col-12 col-lg-8'><TableGrid tableData={articleList} columns={GConf.TableHead.stock} /></div>
                  <div className='col-12 col-lg-4  '>
                     <div className="sticky-top" style={{top:'70px'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                             <h3 className='mb-1'>Ajouter Article</h3> 
                              <h5 className='mb-1'>Code à barre:</h5>
                              <Input icon='barcode' iconPosition='left' type='number' placeholder='code a barre' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} onBlur={checkArticleExistance} value={articleD.F_ID} onChange={(e) => setArticleD({...articleD, F_ID: e.target.value })} />
                              
                              <h5 className='mb-1 mt-0'>Nom: </h5>
                              <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={articleD.Name}  onChange={(e) => setArticleD({...articleD, Name: e.target.value })}/>
                              
                              <h5 className='mb-1 mt-0'>Nom: </h5>
                              <Input icon='tag' iconPosition='left' placeholder='Genre' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={articleD.Genre}  onChange={(e) => setArticleD({...articleD, Genre: e.target.value })}/>

                              <div className='row'>
                                       <div className='col-12'>
                                             <h5 className='mb-1'>Tarif: </h5>
                                             <Input icon='dollar' iconPosition='left' type='number' placeholder='Tarif' value={articleD.Tarif} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Tarif: e.target.value })}/> 
                                       </div>
                                    </div>
                                    <div className='text-end mb-2'>
                                       <Button onClick={SaveArticle}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`}  positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                                    </div>
                              
                        </div> 
                     </div>
                  </div>
              </div>
               
                
      </>);
}

export default StockPage;
