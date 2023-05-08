import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import GoBtn from '../../AssetsM/Cards/goBtn';
import TableImage from '../../AssetsM/Cards/tableImg';
import { Button , Divider, Icon, Modal, Input, Loader} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

function CaissePage() {
  /*#########################[Const]##################################*/
  let [camionList, setCamionList] = useState([ SKLT.TableSlt ]); 
  let [loadingPage, setLoadingP] = useState(false); 
  const navigate = useNavigate();
  let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
  const [modalS, setModalS] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState([])
  const [camionD, setCamionD] = useState([])
  const [saveBtnState, setSaveBtnState] = useState('')
  const [loaderState, setLS] = useState(false)

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    axios.post(`${GConf.ApiLink}/tables`, {
        PID: GConf.PID,
      })
      .then(function (response) {
        setLoadingP(true)
         let testTable = []
          response.data.map( (getData) => testTable.push([
         _(<TableImage image='camion.jpg' />),
         getData.Table_Name,
         getData.Matricule,
         getData.Chauffeur,
         getData.Fond,
         getData.Recette,
         _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
         _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cm/info/${getData.Cam_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
        ],))
        setCamionList(response.data)
      }).catch((error) => {
        if(error.request) {
          toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
          let testTable = []
          Offline.camion.map( (getData) => testTable.push([
          _(<TableImage image='camion.jpg' />),
          getData.Cam_Name,
          getData.Matricule,
          getData.Chauffeur,
          getData.Fond,
          getData.Recette,
          _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
          _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cm/info/${getData.Cam_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
          ],))
          setCamionList(Offline.camion)
        }
      });
    }, [])
    
  /*#########################[Function]##################################*/
  const NavigateFunction = (link) => {  navigate(link) }
  const openEditModal = (event,selected) =>{
    setSelectedArticle(event)
    setModalS(true)
  }
  const SaveCamion = () => {
      if (!camionD.Matricule) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
      else if (!camionD.Cam_Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
      else if (!camionD.Marque) {toast.error("Marque Invalide !", GConf.TostErrorGonf)}
      else if (!camionD.Chauffeur) {toast.error("Chauffeur Invalide !", GConf.TostErrorGonf)}
      else if (!camionD.Identifiant) {toast.error("Identifiant Invalide !", GConf.TostErrorGonf)}
      else if (!camionD.Password) {toast.error("Mot De Passe Invalide !", GConf.TostErrorGonf)}
      else{
              setLS(true)
              axios.post(`${GConf.ApiLink}/camions/ajouter`, {
                  PID : GConf.PID,
                  camionD : camionD,
              }).then(function (response) {
                  console.log(response.data)
                  if(response.data.affectedRows) {
                      setSaveBtnState('disabled')
                      toast.success("Camion Ajouteé !", GConf.TostSuucessGonf)
                      setLS(false)
                      
                  }
                  else {
                          toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                          setLS(false)
                      }
              }).catch((error) => {
                  if(error.request) {
                    toast.error(<><div><h5>Probleme de Connextion</h5> Le Camion sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                    Offline.camionToSave.push(camionD)
                    localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                    setLS(false)

                  }
              });
                  
          }        
  }
  const GenrateKey = () =>{
      let ID = Math.random().toString(36).slice(2, 8);
      let PWD =  Math.floor(Math.random() * 1000000);
      setCamionD({...camionD, Identifiant: ID , Password:PWD})
  }
  /*#########################[Function]##################################*/
  const  CamionCard = (props) =>{
      return(<>
          <div className='col-12 col-md-4 mb-3'>
            <div className='card card-body border-div  shadow-sm h-100 bg-hover-card-st'>
                    <div className="text-center">
                            <div className='row mb-0'>
                                <div className='col-4 align-self-center text-center'><img src="https://cdn.abyedh.tn/images/system/Resto/table.png" className="rounded-circle" width="50px" /></div>
                                <div className='col-8 align-self-center text-start'>
                                  <h4 className='mt-2 mb-0'><a  className='data-link-modal' ><b> {loadingPage ? props.data.Table_Name : SKLT.BarreSkl } </b></a> </h4> 
                                  <h5 className="text-secondary mt-0 mb-2"> NO:  {loadingPage ? props.data.Table_Num : 0 } </h5>
                                </div>
                            </div>
                            
                    </div>
                    <div className='row mb-0'>
                                <div className='col-6 align-self-center text-center'><Button className='rounded-pill bg-primary text-white mt-2' size='mini' icon fluid  onClick={() => openEditModal(props.data,true)} ><span className='d-none d-lg-inline'>  </span><Icon  name='edit' /></Button></div>
                                <div className='col-6 align-self-center text-center'><Button className='rounded-pill bg-danger text-white mt-2' size='mini' icon fluid  onClick={() => openEditModal(props.data,true)} ><span className='d-none d-lg-inline'>  </span><Icon  name='trash' /></Button></div>
                    </div>
                    
            </div>
          </div>
      </>)
  }

  return ( <>
          
            <NavLink exaxt='true' to='/S/ft'><Button className='rounded-circle' icon='arrow left' /></NavLink>
            <br /> 
            <br /> 
            <div className='row'>
              <div className='col-12 col-lg-8'>
                {
                  loadingPage ? 
                    <div className='row'>
                      {
                        camionList.map( (data,index) => <CamionCard key={index}  data={data} />)
                      }
                    </div>
                  :
                  <>Loading</>
                }
              </div>
              <div className='col-12 col-lg-4'>
                    <div className="sticky-top" style={{top:'70px'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                              <div className='p-1  mb-2'>
                                  <h5 className='mb-1'>Nom:</h5>
                                  <Input icon='desktop' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Cam_Name: e.target.value })} />
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Fond:</h5>
                                  <Input icon='dollar sign' iconPosition='left' placeholder='Fond' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCamionD({...camionD, Chauffeur: e.target.value })}/>
                              </div>
                              <div className='row mb-3 d-none'>
                                      <div className='col-12 col-lg-5'>
                                          <h5 className='mb-1'>Identifiant:</h5>
                                          <Input icon='linkify' iconPosition='left' placeholder='identifiant'  className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Identifiant} onChange={(e) => setCamionD({...camionD, Identifiant: e.target.value })} />
                                      </div>
                                      <div className='col-9 col-lg-5'>
                                          <h5 className='mb-1'>Mot De Pass: </h5>
                                          <Input icon='eye' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Password} onChange={(e) => setCamionD({...camionD, Password: e.target.value })}/>
                                      </div>
                                      <div className='col-3 col-lg-2 align-self-center'>
                                        <Button onClick={GenrateKey} className="rounded-pill " icon='random'></Button>
                                      </div>
                              </div> 
                              <div className='text-end mb-2'>
                                  <Button  onClick={SaveCamion}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`} positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                              </div>
                        </div>
                    </div>
              </div>
            </div>
              
          <Fade></Fade>
          <Modal
              size='mini'
              open={modalS}
              closeIcon
              onClose={() => setModalS(false)}
              onOpen={() => setModalS(true)}
          >
              <Modal.Header><h4>{selectedArticle.Cam_Name}</h4></Modal.Header>
              <Modal.Content>
                      <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <td>ID : </td> 
                                <td>{selectedArticle.Cam_ID}</td> 
                            </tr>
                            <tr>
                                <td>Matricule : </td> 
                                <td>{selectedArticle.Matricule}</td> 
                            </tr>
                            <tr>
                                <td>CHauffeur : </td> 
                                <td>{selectedArticle.Chauffeur}</td> 
                            </tr>
                            <tr>
                                <td>Identifiant : </td> 
                                <td>{selectedArticle.Identifiant}</td> 
                            </tr>
                            <tr>
                                <td>Mot de passe  :</td> 
                                <td>{selectedArticle.Pasword}</td> 
                            </tr>
                          </tbody>
                      </table> 
              </Modal.Content>
              <Modal.Actions>
                          <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                          <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/cm/info/${selectedArticle.Cam_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
              </Modal.Actions>
      </Modal>
    </> );
}

export default CaissePage;