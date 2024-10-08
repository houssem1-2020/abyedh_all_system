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
import { useTranslation, Trans } from 'react-i18next';

function StockPage() {

    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    let [articleList, setArticleList] = useState([['...','...','...','...','...','...']]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    let test = useGetArticles()
   //  const [familles] = useGetFamilleArticle() 
    const [inDirArticle, setInDirA] = useState();  
    const [articles] = useGetArticles()  
    const [tarifData, setTarifData] = useState({});
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
 


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
                  getData.Tarif_ID,
                  getData.Tarif_Name,
                  getData.Tarif_Description,
                  getData.Tarif.toFixed(3),
                  _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/of/info/${getData.Tarif_ID}`)}><span className='d-none d-lg-inline'> {t('menuTabs.seancePage.tarifCard.infoBtn')} </span> </Button>),
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
               if (!tarifData.Tarif_Name) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
               else if (!tarifData.Tarif_Description ) {toast.error("Name Invalide !", GConf.TostErrorGonf)}
               else if (!tarifData.Tarif) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
               else{
                  setLS(true)
                  axios.post(`${GConf.ApiLink}/forfait/ajouter`, {
                     PID : GConf.PID,
                     tarifData : tarifData,
                  }).then(function (response) {
                     console.log(response.data)
                     if(response.data.affectedRows) {
                           setSaveBtnState(true)
                           toast.success("Offre Enregistreé !", GConf.TostSuucessGonf)
                           setLS(false)
                     }
                     else{
                           toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                           setLS(false)
                     }
                  }).catch((error) => {
                     if(error.request) {
                        toast.error(<><div><h5>Probleme de Connextion</h5> L'article sera enregistrer sue votre ordinateur </div></>, GConf.TostInternetGonf)   
                        Offline.articleToSave.push(tarifData)
                        localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
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
              <NavLink exaxt='true' to='/S/sa'><Button className='rounded-circle' icon='arrow left' /></NavLink>
              <br />
              <br />
              <div className='row'>
                  <div className='col-12 col-lg-8'><TableGrid tableData={articleList} columns={t(`TableHead.stock`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)}  /></div>
                  <div className='col-12 col-lg-4  '>
                     <div className="sticky-top" style={{top:'70px'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                             <h3 className='mb-1'>{t('menuTabs.seancePage.tarifCard.cardTitle')}  </h3> 
 
                              <h5 className='mb-1 mt-0'>{t('menuTabs.seancePage.tarifCard.Nom')}  </h5>
                              <Input icon='star' iconPosition='left' placeholder={t('menuTabs.seancePage.tarifCard.Nom')}  className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={tarifData.Tarif_Name}  onChange={(e) => setTarifData({...tarifData, Tarif_Name: e.target.value })}/>
                              
                              <h5 className='mb-1 mt-0'>{t('menuTabs.seancePage.tarifCard.Description')} </h5>
                              <Form>
                                 <TextArea rows={2} placeholder={t('menuTabs.seancePage.tarifCard.Description')} onKeyPress={event => OnKeyPressFunc(event)} value={tarifData.Tarif_Description} onChange={(e) => setTarifData({...tarifData, Tarif_Description: e.target.value })}/>
                              </Form>

                              <h5 className='mb-1'>{t('menuTabs.seancePage.tarifCard.Tarif')} </h5>
                              <Input icon='dollar' iconPosition='left' type='number' placeholder={t('menuTabs.seancePage.tarifCard.Tarif')}  value={tarifData.Tarif}   className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setTarifData({...tarifData, Tarif: e.target.value })}/> 
                                 
                              <div className='text-end mb-2'>
                                 <Button onClick={SaveArticle}  className='text-end rounded-pill bg-system-btn'  disabled={saveBtnState} positive>  <Icon name='save outline' /> {t('menuTabs.seancePage.tarifCard.addBtn')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                              </div>
                              
                        </div> 
                     </div>
                  </div>
              </div>
               
                
      </>);
}

export default StockPage;
