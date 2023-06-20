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
    let [forfaitListe, setForfaitListe] = useState([['...','...','...','...','...','...']]); 
    const [forfaitD, setForfaitD] = useState({})

    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    let test = useGetArticles()
 
 
    const [articles] = useGetArticles()  
    ;
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}


    /*#########################[UseEffect]##################################*/
      useEffect(() => {
         axios.post(`${GConf.ApiLink}/forfait`, {
            PID : GConf.PID,
         })
         .then(function (response) {

            if (!response.data) {
                  toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
            } else {
               let forfaitListeContainer = []
               response.data.map( (getData) => forfaitListeContainer.push([
                  _(<TableImage image={'tarifs.png'}   onClick={() => openEditModal(getData,true)}/>),
                  getData.F_ID,
                  getData.F_Name,
                  getData.NB_Seance,
                  getData.Tarif.toFixed(3),
                  _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/of/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span> </Button>),
               ],))
               setForfaitListe(forfaitListeContainer) 
            }
         }).catch((error) => {
            if(error.request) {
               toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
               let forfaitListeContainer = []
               Offline.stock.map( (getData) => forfaitListeContainer.push([
                  _(<TableImage image={'article.png'} forStock onClick={() => openEditModal(getData,true)}/>),
                  getData.F_ID,
                  getData.F_Name,
                  getData.Genre,
                  getData.Tarif.toFixed(3),
                  _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/of/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span> </Button>),
               ],))
               setForfaitListe(forfaitListeContainer)
               }
         });
      }, [])



    /*#########################[Function]##################################*/
      const NavigateFunction = (link) => {  navigate(link) }
      const openEditModal = (event,selected) =>{
         setSelectedArticle(event)
         setModalS(true)
      }
      const SaveForfait = (event) => {
               if (!forfaitD.F_Name) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
               else if (!forfaitD.NB_Seance) {toast.error("Name Invalide !", GConf.TostErrorGonf)}
               else if (!forfaitD.Tarif) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
               else{
                  setLS(true)
                  axios.post(`${GConf.ApiLink}/forfait/ajouter`, {
                     PID : GConf.PID,
                     forfaitD : forfaitD,
                  }).then(function (response) {
                     if(response.data.affectedRows) {
                           setSaveBtnState('disabled')
                           toast.success("Article Enregistreé !", GConf.TostSuucessGonf)
                           setLS(false)
                           //SaveNotification('stockSaveForfait',GConf.PID, forfaitD)
                     }
                     else{
                           toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                           setLS(false)
                     }
                  }).catch((error) => {
                     if(error.request) {
                        toast.error(<><div><h5>Probleme de Connextion</h5> L'article sera enregistrer sue votre ordinateur </div></>, GConf.TostInternetGonf)   
                        Offline.articleToSave.push(forfaitD)
                        localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                        setLS(false)
                     }
                     });
                  
               }
               
      }  
 
      const checkPrixCompatiblite = () =>{
         if(forfaitD.Tarif && forfaitD.PrixV){
               if(parseFloat(forfaitD.Tarif) > parseFloat(forfaitD.PrixV)) {
                  toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                  setForfaitD({...forfaitD, PrixV: '', Tarif: '' })
               } 
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
                  <div className='col-12 col-lg-8'><TableGrid tableData={forfaitListe} columns={GConf.TableHead.stock} /></div>
                  <div className='col-12 col-lg-4  '>
                     <div className="sticky-top" style={{top:'70px'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                              <h3 className='mb-1'>Ajouter Forfait</h3> 
                              
                              <h5 className='mb-1 mt-0'>Nom: </h5>
                              <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={forfaitD.F_Name}  onChange={(e) => setForfaitD({...forfaitD, F_Name: e.target.value })}/>
                              
                              <h5 className='mb-1 mt-0'>Tarif: </h5>
                              <Input icon='tag' iconPosition='left' placeholder='Genre' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={forfaitD.Tarif}  onChange={(e) => setForfaitD({...forfaitD, Tarif: e.target.value })}/>

                              <div className='row'>
                                 <div className='col-12'>
                                       <h5 className='mb-1'>Nombre de Seabce: </h5>
                                       <Input icon='dollar' iconPosition='left' type='number' placeholder='Tarif' value={forfaitD.NB_Seance}   className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setForfaitD({...forfaitD, NB_Seance: e.target.value })}/> 
                                 </div>
                              </div>
                              <div className='text-end mb-2'>
                                 <Button onClick={() => SaveForfait()}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`}  positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                              </div>
                              
                        </div> 
                     </div>
                  </div>
              </div>
               
                
      </>);
}

export default StockPage;
