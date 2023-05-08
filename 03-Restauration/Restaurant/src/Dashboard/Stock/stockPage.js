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
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 
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
      axios.post(`${GConf.ApiLink}/stock`, {
          PID : GConf.PID,
        })
        .then(function (response) {
         console.log(response.data)
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
              let articleListContainer = []
              response.data.map( (getData) => articleListContainer.push([
                _(<TableImage image={'article.png'} forStock onClick={() => openEditModal(getData,true)}/>),
                getData.A_Code,
                getData.Name,
                getData.Genre,
                getData.Quantite,
                getData.Prix_achat.toFixed(3),
                _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sk/info/${getData.A_Code}`)}><span className='d-none d-lg-inline'> Info </span> </Button>),
              ],))
              setArticleList(articleListContainer) 
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
            let articleListContainer = []
            Offline.stock.map( (getData) => articleListContainer.push([
                _(<TableImage image={'article.png'} forStock/>),
                getData.A_Code,
                _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> {getData.Name} </b></a>),
                getData.Genre,
                getData.Quantite,
                getData.Prix_achat.toFixed(3),
                getData.Prix_vente.toFixed(3),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sk/info/${getData.A_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
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
    const MainSubNavCard = (props) =>{
       return(<>
          <NavLink exact='true' to={`/S/${props.link}`} className='card card-body mb-1 rounded-pill shadow-sm d-inline-block ' >
            <spn className={`bi bi-${props.icon} me-1 `}></spn>{props.text}
          </NavLink> 
       </>) 
         }
      const SaveArticle = (event) => {
               if (!articleD.A_Code) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Name || articleD.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Genre) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Groupage) {toast.error("Groupage Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Socite) {toast.error("Socite Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.PrixA) {toast.error("Prix Achat Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.PrixV) {toast.error("Prix Vente Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.PrixP) {toast.error("Prix Promo Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Qte) {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Repture) {toast.error("Repture Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.TVA) {toast.error("TVA Invalide !", GConf.TostErrorGonf)}
               else if (!articleD.Desc) {toast.error("Description Invalide !", GConf.TostErrorGonf)}
               else{
                  setLS(true)
                  axios.post(`${GConf.ApiLink}/stock/ajouter`, {
                     PID : GConf.PID,
                     articleD : articleD,
                  }).then(function (response) {
                     if(response.data.affectedRows) {
                           setSaveBtnState('disabled')
                           toast.success("Article Enregistreé !", GConf.TostSuucessGonf)
                           setLS(false)
                           SaveNotification('stockSaveArticle',GConf.PID, articleD)
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
         if(articleD.A_Code){
               if(articles.includes(parseInt(articleD.A_Code))) {
                  toast.error("Article Exist Deja", GConf.TostErrorGonf)
                  setArticleD({...articleD, A_Code: '' })
               } 
         }
      }
      const checkPrixCompatiblite = () =>{
         if(articleD.PrixA && articleD.PrixV){
               if(parseFloat(articleD.PrixA) > parseFloat(articleD.PrixV)) {
                  toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                  setArticleD({...articleD, PrixV: '', PrixA: '' })
               } 
         }
         
      }
      const FindInDirectoryFunc = () =>{
         if (!inDirArticle) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
         else{
               setLS(true)
               axios.post(`${GConf.ApiLink}/stock/checkAbyedhDb`, {
                  Code : inDirArticle,
               }).then(function (response) {
                  if(response.data.length  != 0) {
                     toast.success("Article Connu !", GConf.TostSuucessGonf)
                     setLS(false)
                     setArticleD({ ...articleD, A_Code: response.data.A_Code,  Name: response.data.Name, Groupage : response.data.Colis, Socite : response.data.Socite})
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
              <NavLink exaxt='true' to='/S/mu'><Button className='rounded-circle' icon='arrow left' /></NavLink>
              <br />
              <br />
              <div className='row'>
                  <div className='col-12 col-lg-8'><TableGrid tableData={articleList} columns={GConf.TableHead.stock} /></div>
                  <div className='col-12 col-lg-4  '>
                     <div className="sticky-top" style={{top:'70px'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                             <h3 className='mb-1'>Ajouter Article</h3> 
                              <h5 className='mb-1'>Code à barre:</h5>
                              <Input icon='barcode' iconPosition='left' type='number' placeholder='code a barre' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} onBlur={checkArticleExistance} value={articleD.A_Code} onChange={(e) => setArticleD({...articleD, A_Code: e.target.value })} />
                              
                              <h5 className='mb-1 mt-0'>Nom: </h5>
                              <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={articleD.Name}  onChange={(e) => setArticleD({...articleD, Name: e.target.value })}/>
                              
                              <div className='row'>
                                          <div className='col-12 col-lg-6'>
                                                <h5 className='mb-1'>Prix Acaht: </h5>
                                                <Input icon='dollar' iconPosition='left' type='number' placeholder='achat' value={articleD.PrixA} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, PrixA: e.target.value })}/> 
                                          </div>
                                          <div className='col-12 col-lg-6'>
                                                <h5 className='mb-1'>Quantité: </h5>
                                                <Input icon='dropbox' iconPosition='left' type='number' placeholder='quantité' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Qte: e.target.value })}/> 
                                          </div>
                                          <div className='col-12'>
                                                <h5 className='mb-1'>Repture du stock: </h5>
                                                <Input icon='angle double down' iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Repture: e.target.value })}/>
                                          </div>
                                    </div>
                                    {/* <div className='row'>
                                    <h5 className='mb-1'>Description</h5>
                                       <Form>
                                          <TextArea  rows="3" placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)}  onChange={(e) => setArticleD({...articleD, Desc: e.target.value })}/>
                                       </Form> 
                                    </div> */}
                                    <div className='text-end mb-2'>
                                       <Button onClick={SaveArticle}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`}  positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                                    </div>
                              
                        </div> 
                     </div>
                  </div>
              </div>
               
                
                <Fade></Fade> 
              <Transition animation='scale' duration={500}> 
                  <Modal
                           size='small'
                           open={modalS}
                           closeIcon
                           onClose={() => setModalS(false)}
                           onOpen={() => setModalS(true)}
                        >
                           <Modal.Header><h4>{selectedArticle.Name}</h4></Modal.Header>
                           <Modal.Content>
                                    <div className='row'>
                                       <div className='col-4'> <img src={`https://assets.ansl.tn/Images/Articles/${selectedArticle.Photo_Path}`} className='img-responsive' width='80%' height='200px' /></div>
                                       <div className='col-8 align-self-center'>
                                             <table className='table table-striped'>
                                             <tbody>
                                                   <tr>
                                                      <td>Code : </td> 
                                                      <td>{selectedArticle.A_Code}</td> 
                                                   </tr>
                                                   <tr>
                                                      <td>Achat : </td> 
                                                      <td>{selectedArticle.Prix_achat ? (selectedArticle.Prix_achat).toFixed(3) : ''}</td> 
                                                   </tr>
                                                   <tr>
                                                      <td>Vente : </td> 
                                                      <td>{selectedArticle.Prix_vente ? (selectedArticle.Prix_vente).toFixed(3) : ''}</td> 
                                                   </tr>
                                                   <tr>
                                                      <td>Gros :</td> 
                                                      <td>{selectedArticle.Prix_gros ? (selectedArticle.Prix_gros).toFixed(3) : ''}</td> 
                                                   </tr>
                                                   <tr>
                                                      <td>Qauntite :</td> 
                                                      <td>{selectedArticle.Quantite}</td> 
                                                   </tr>
                                                   <tr>
                                                      <td>Repture  :</td> 
                                                      <td>{selectedArticle.Repture}</td> 
                                                   </tr>
                                                   <tr>
                                                      <td>Groupage : </td> 
                                                      <td>{selectedArticle.Groupage}</td> 
                                                   </tr>
                                                   <tr>
                                                      <td>Description</td> 
                                                      <td>{selectedArticle.Detail}</td> 
                                                   </tr>
                                                </tbody>
                                             </table>
                                       </div>
                                    </div>  
                           </Modal.Content>
                           <Modal.Actions>
                                       <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                                       <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/sk/info/${selectedArticle.A_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                           </Modal.Actions>
                  </Modal>  
               </Transition>
        </>);
}

export default StockPage;