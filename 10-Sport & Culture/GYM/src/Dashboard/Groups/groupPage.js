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
import { Button , Divider, Icon, Modal, Input, Loader, Form, Select, TextArea} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const EditModal = ({setModalS,EditTable,editGroupData,setEditGroupData,modalS}) =>{
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
                                  <Input icon='stop circle' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' value={editGroupData.Name}  onChange={(e) => setEditGroupData({...editGroupData, Name: e.target.value })} />
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Numero:</h5>
                                  <Input icon='sort numeric up' iconPosition='left' placeholder='Numero' className='w-100 border-0 shadow-sm rounded mb-1' value={editGroupData.Num} onChange={(e) => setEditGroupData({...editGroupData, Num: e.target.value })}/>
                              </div>
                  </Modal.Content>
                  <Modal.Actions>
                              {/* <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                              <Button  className=' bg-system-btn rounded-pill' onClick={EditTable}>  <Icon name='save' /> Modifier </Button>
                  </Modal.Actions>
          </Modal>
  </>)
}
const DeleteModal = ({setDeleteModalS,DeleteTable,editGroupData,setEditGroupData,deletemodalS}) =>{
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
                          <div className='mb-0 p-0'><h5> Table : {editGroupData.Name}</h5></div>         
                          <div><h5> Numero : {editGroupData.Num} </h5></div>
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
  const Today = new Date()
  let [GrouListe, setGroupListe] = useState([]); 
  let [loadingPage, setLoadingP] = useState(false); 
  const navigate = useNavigate();
  let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
  const [modalS, setModalS] = useState(false)
 
  const [groupData, setGroupData] = useState({GP_Temps: new Date().toLocaleTimeString([],{ hourCycle: 'h23'})})
  const [saveBtnState, setSaveBtnState] = useState(false)
  const [loaderState, setLS] = useState(false)
  const [editGroupData, setEditGroupData] = useState([])
  const [deletemodalS, setDeleteModalS] = useState(false)
  const Genres = [
    {id:1 , value: 'Male', text : 'Male'},
    {id:1 , value: 'Female', text : 'Female'},
    {id:1 , value: 'Mixte', text : 'Mixte'},
  ]

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    axios.post(`${GConf.ApiLink}/groupe`, {
        PID: GConf.PID,
      })
      .then(function (response) {
        setLoadingP(true)
        setGroupListe(response.data)
      }).catch((error) => {
        if(error.request) {
          toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
          let testTable = []
          setGroupListe(Offline.camion)
        }
      });
    }, [])
    
  /*#########################[Function]##################################*/
  const NavigateFunction = (link) => {  navigate(link) }

  const openEditModal = (event,selected) =>{
    setEditGroupData({PK: event.PK , Name:event.Table_Name, Num:event.Table_Num})
    selected ? setModalS(true) : setDeleteModalS(true)
}
  const SaveGroupFunction = () => {
      if (!groupData.GP_Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
      else if (!groupData.GP_Genre) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
      else if (!groupData.GP_Activite) {toast.error("Activite Invalide !", GConf.TostErrorGonf)}
      else if (!groupData.GP_Temps) {toast.error("Temps Invalide !", GConf.TostErrorGonf)}
      else if (!groupData.GP_Cotch) {toast.error("Cotch Invalide !", GConf.TostErrorGonf)}
      else{
              setLS(true)
              axios.post(`${GConf.ApiLink}/groupe/ajouter`, {
                  PID : GConf.PID,
                  groupData : groupData,
              }).then(function (response) {
                  console.log(response.data)
                  if(response.data.affectedRows) {
                      setSaveBtnState(true)
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
                    Offline.camionToSave.push(groupData)
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
    axios.post(`${GConf.ApiLink}/groupe/modifier`, {
        PID : GConf.PID,
        editGroupData : editGroupData,
    }).then(function (response) {
        if(response.data.affectedRows) {
            setModalS(false)
            toast.success("Table Modifier avec Suucess", GConf.TostSuucessGonf)
            //setUpdateFT(Math.random() * 10)
            setLS(false)
            //SaveNotification('stockEditTable',GConf.PID, editGroupData)
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
  const OnKeyPressFunc = (e) => {
    if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
        e.preventDefault();
    }   
}

  /*#########################[Function]##################################*/
  const  GrouCard = (props) =>{
      return(<>
          <div className='col-12 col-md-6 mb-3'>
            <div className='card card-body border-div  shadow-sm h-100 bg-hover-card-st'>
              <div className='row'>
                  <div className='col-6'>
                  <div className="text-center">
                      <div className='row mb-0'>
                          <div className='col-4 align-self-center text-center'><img src="https://cdn.abyedh.tn/images/system/gym/group.jpg" className="rounded" width="50px" /></div>
                          <div className='col-8 align-self-center text-start'>
                            <h4 className='mb-0 ms-2'><a  className='data-link-modal' ><b> {loadingPage ? props.data.GP_Name : SKLT.BarreSkl } </b></a> </h4> 
                            <h5 className='mt-2 mb-0'> <span className='bi bi-bookmarks-fill '></span> <b> {loadingPage ? props.data.GP_Genre : SKLT.BarreSkl } </b> </h5>
                          </div>
                      </div>            
                    </div>

                  </div>
                  <div className='col-6'>
                        <h5 className='mt-0 mb-0'> <span className='bi bi-bicycle '></span> <b> {loadingPage ? props.data.GP_Activite : SKLT.BarreSkl } </b> </h5>
                        <h5 className='mt-0 mb-0'> <span className='bi bi-calendar '></span> <b> {loadingPage ? props.data.GP_Temps : SKLT.BarreSkl } </b> </h5>
                        <h5 className='mt-0 mb-0'> <span className='bi bi-person '></span> <b> {loadingPage ? props.data.GP_Cotch : SKLT.BarreSkl } </b> </h5>
                  </div>
              </div>
                    
                    <div className='row mb-0'>
                                <div className='col-8 align-self-center text-center'><Button className='rounded-pill bg-primary text-white mt-2' size='mini' icon fluid  onClick={() => openEditModal(props.data,true)} ><span className='d-none d-lg-inline'>  </span><Icon  name='edit' /> Modifier </Button></div>
                                <div className='col-4 align-self-center text-center'><Button className='rounded-pill bg-danger text-white mt-2' size='mini' icon fluid  onClick={() => openEditModal(props.data,false)} ><span className='d-none d-lg-inline'>  </span><Icon  name='trash' /> Supp</Button></div>
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
          
            <NavLink exaxt='true' to='/S/mb'><Button className='rounded-circle' icon='arrow left' /></NavLink>
            <br /> 
            <br /> 
            <div className='row'>
              <div className='col-12 col-lg-8'>
                {
                  loadingPage ? 
                    <>
                        {GrouListe.length == 0 ? 
                        <EmptyListeCard />
                        :
                        <div className='row'>
                          {
                            GrouListe.map( (data,index) => <GrouCard key={index}  data={data} />)
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
                                  <Input icon='stop circle' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setGroupData({...groupData, GP_Name: e.target.value })} />
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Genre:</h5>
                                  <Select placeholder='Choisir Uu Poste'  options={Genres}  className='w-100 shadow-sm rounded mb-3' value={groupData.GP_Genre} onChange={(e, data) => setGroupData({...groupData, GP_Genre: data.value })} />
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Activite:</h5>
                                  <Form>
                                      <TextArea  rows="2" placeholder='Adresse' onKeyPress={event => OnKeyPressFunc(event)} className='w-100 shadow-sm rounded mb-3' value={groupData.GP_Activite} onChange={(e) => setGroupData({...groupData, GP_Activite: e.target.value })}/>
                                  </Form>
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Temps d'entrainnement:</h5>
                                  <Input icon='map marker' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='De'  fluid className='mb-1 shadow-sm'  value={groupData.GP_Temps}  onChange={(e) => setGroupData({...groupData, GP_Temps : e.target.value })}/>
                              </div>
                              <div className='p-1 mb-2'>
                                  <h5 className='mb-1'> Cotch :</h5>
                                  <Input icon='male' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setGroupData({...groupData, GP_Cotch: e.target.value })} />
                              </div>
                              <div className='text-end mb-2'>
                                  <Button  onClick={SaveGroupFunction}  className='text-end rounded-pill bg-system-btn ' disabled={saveBtnState} positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                              </div>
                        </div>
                    </div>
              </div>
            </div>
            <EditModal setModalS={setModalS} EditTable={EditTable} editGroupData={editGroupData}  setEditGroupData={setEditGroupData} modalS={modalS} />
            <DeleteModal setDeleteModalS={setDeleteModalS} DeleteTable={DeleteTable} editGroupData={editGroupData}  setEditGroupData={setEditGroupData} deletemodalS={deletemodalS} />
    </> );
}

export default CaissePage;