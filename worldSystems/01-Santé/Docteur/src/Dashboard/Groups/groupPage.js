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

const EditModal = ({setModalS,EditTable,edittableD,setEditTableD,modalS}) =>{
  return(<>
          <Modal
                  size='mini'
                  open={modalS}
                  dimmer = 'blurring'
                  closeIcon
                  onClose={() => setModalS(false)}
                  onOpen={() => setModalS(true)}
              >
                  <Modal.Header><h4>Modifier Famille</h4></Modal.Header>
                  <Modal.Content>
                  <div className='p-1  mb-2'>
                              <h5 className='mb-1'>Nom:</h5>
                                  <Input icon='stop circle' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' value={edittableD.Name}  onChange={(e) => setEditTableD({...edittableD, Name: e.target.value })} />
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Numero:</h5>
                                  <Input icon='sort numeric up' iconPosition='left' placeholder='Numero' className='w-100 border-0 shadow-sm rounded mb-1' value={edittableD.Num} onChange={(e) => setEditTableD({...edittableD, Num: e.target.value })}/>
                              </div>
                  </Modal.Content>
                  <Modal.Actions>
                              {/* <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                              <Button  className=' bg-system-btn rounded-pill' onClick={EditTable}>  <Icon name='save' /> Modifier </Button>
                  </Modal.Actions>
          </Modal>
  </>)
}
const DeleteModal = ({setDeleteModalS,DeleteTable,edittableD,setEditTableD,deletemodalS}) =>{
  return(<>
          <Modal
                  size='mini'
                  open={deletemodalS}
                  dimmer = 'blurring'
                  closeIcon
                  onClose={() => setDeleteModalS(false)}
                  onOpen={() => setDeleteModalS(true)}
                  
              >
                  <Modal.Header><h4>Supprimer Table</h4></Modal.Header>
                  <Modal.Content>
                          Voulez-Vous Vraimment Supprimer Cette Table 
                          <br />
                          <br />
                          <div className='mb-0 p-0'><h5> Table : {edittableD.Name}</h5></div>         
                          <div><h5> Numero : {edittableD.Num} </h5></div>
                  </Modal.Content>
                  <Modal.Actions>
                              {/* <Button className='rounded-pill' negative onClick={ () => setDeleteModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                              <Button negative className='rounded-pill' onClick={DeleteTable}>  <Icon name='trash' /> Supprimer </Button>
                  </Modal.Actions>
          </Modal>
  </>)
}

function CaissePage() {
  /*#########################[Const]##################################*/
  let [camionList, setCamionList] = useState([ SKLT.TableSlt ]); 
  let [loadingPage, setLoadingP] = useState(false); 
  const navigate = useNavigate();
  let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
  const [modalS, setModalS] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState([])
  const [tableD, setTableD] = useState([])
  const [saveBtnState, setSaveBtnState] = useState('')
  const [loaderState, setLS] = useState(false)
  const [edittableD, setEditTableD] = useState([])
  const [deletemodalS, setDeleteModalS] = useState(false)

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    axios.post(`${GConf.ApiLink}/tables`, {
        PID: GConf.PID,
      })
      .then(function (response) {
        setLoadingP(true)
         let testTable = []
          response.data.map( (getData) => testTable.push([
         _(<TableImage image='patient-group.png' />),
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
          _(<TableImage image='patient-group.png' />),
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
    setEditTableD({PK: event.PK , Name:event.Table_Name, Num:event.Table_Num})
    selected ? setModalS(true) : setDeleteModalS(true)
}
  const SaveTable = () => {
      if (!tableD.Table_Name) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
      else if (!tableD.Table_Num) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
      else{
              setLS(true)
              axios.post(`${GConf.ApiLink}/tables/ajouter`, {
                  PID : GConf.PID,
                  tableD : tableD,
              }).then(function (response) {
                  console.log(response.data)
                  if(response.data.affectedRows) {
                      setSaveBtnState('disabled')
                      toast.success("Table Ajouteé !", GConf.TostSuucessGonf)
                      setLS(false)
                      
                  }
                  else {
                          toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                          setLS(false)
                      }
              }).catch((error) => {
                  if(error.request) {
                    toast.error(<><div><h5>Probleme de Connextion</h5> Le Camion sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                    Offline.camionToSave.push(tableD)
                    localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                    setLS(false)

                  }
              });
                  
          }        
  }

  const DeleteTable = () =>{

  }
  const EditTable = () => {
    setLS(true)
    axios.post(`${GConf.ApiLink}/tables/modifier`, {
        PID : GConf.PID,
        editTableD : edittableD,
    }).then(function (response) {
        if(response.data.affectedRows) {
            setModalS(false)
            toast.success("Table Modifier avec Suucess", GConf.TostSuucessGonf)
            //setUpdateFT(Math.random() * 10)
            setLS(false)
            //SaveNotification('stockEditTable',GConf.PID, edittableD)
        }
        else{
            setModalS(false)
            toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
            setLS(false)
        }
        
    }).catch((error) => {
        if(error.request) {
          toast.error(<><div><h5>Probleme de Connextion</h5> Vous Pouvez pas modifier cette famille </div></>, GConf.TostInternetGonf)   
          setLS(false)
        }
      });
    

  }

  /*#########################[Function]##################################*/
  const  TableCard = (props) =>{
      return(<>
          <div className='col-12 col-md-4 mb-3'>
            <div className='card card-body border-div  shadow-sm h-100 bg-hover-card-st'>
                    <div className="text-center">
                            <div className='row mb-0'>
                                <div className='col-4 align-self-center text-center'><img src="https://cdn.abyedh.com/images/system/docteur/patient-group.png" className="rounded" width="50px" /></div>
                                <div className='col-8 align-self-center text-start'>
                                  <h4 className='mt-2 mb-0'><a  className='data-link-modal' ><b> {loadingPage ? props.data.Table_Name : SKLT.BarreSkl } </b></a> </h4> 
                                  <h5 className="text-secondary mt-0 mb-2"> NO:  {loadingPage ? props.data.Table_Num : 0 } </h5>
                                </div>
                            </div>
                            
                    </div>
                    <div className='row mb-0'>
                                <div className='col-6 align-self-center text-center'><Button className='rounded-pill bg-primary text-white mt-2' size='mini' icon fluid  onClick={() => openEditModal(props.data,true)} ><span className='d-none d-lg-inline'>  </span><Icon  name='edit' /></Button></div>
                                <div className='col-6 align-self-center text-center'><Button className='rounded-pill bg-danger text-white mt-2' size='mini' icon fluid  onClick={() => openEditModal(props.data,false)} ><span className='d-none d-lg-inline'>  </span><Icon  name='trash' /></Button></div>
                    </div>
                    
            </div>
          </div>
      </>)
  }
  const EmptyListeCard = () =>{
    return(<>
          <div className='text-center'>
              <span className='bi bi-bounding-box-circles bi-xlg system-color'></span> 
              <h4>Ajouter des Tables à droite </h4>
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
                    <>
                        {camionList.length == 0 ? 
                        <EmptyListeCard />
                        :
                        <div className='row'>
                          {
                            camionList.map( (data,index) => <TableCard key={index}  data={data} />)
                          }
                        </div>
                        }
                    </>
                    
                  :
                  <>Loading</>
                }
              </div>
              <div className='col-12 col-lg-4'>
                    <div className="sticky-top" style={{top:'70px'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                              <div className='p-1  mb-2'>
                                  <h5 className='mb-1'>Nom:</h5>
                                  <Input icon='stop circle' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setTableD({...tableD, Table_Name: e.target.value })} />
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Numero:</h5>
                                  <Input icon='sort numeric up' iconPosition='left' placeholder='Numero' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setTableD({...tableD, Table_Num: e.target.value })}/>
                              </div>
                              <div className='text-end mb-2'>
                                  <Button  onClick={SaveTable}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`} positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                              </div>
                        </div>
                    </div>
              </div>
            </div>
            <EditModal setModalS={setModalS} EditTable={EditTable} edittableD={edittableD}  setEditTableD={setEditTableD} modalS={modalS} />
            <DeleteModal setDeleteModalS={setDeleteModalS} DeleteTable={DeleteTable} edittableD={edittableD}  setEditTableD={setEditTableD} deletemodalS={deletemodalS} />
    </> );
}

export default CaissePage;