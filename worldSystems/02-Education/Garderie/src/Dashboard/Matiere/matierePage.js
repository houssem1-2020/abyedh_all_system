import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import TunMap from '../../AssetsM/tunMap';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk'
import TableGrid from '../../AssetsM/Cards/tableGrid';
import TableImage from '../../AssetsM/Cards/tableImg';
import GoBtn from '../../AssetsM/Cards/goBtn';
import { Button , Icon, Label,   Form,  Input, Loader, Select, TextArea, Modal, ModalContent, ModalActions, Segment} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import MatiereList from '../../AssetsM/listeDesMatiere';

function FournisseurPage() {
    /*################[Variable]###############*/
    let  [clientList, setClientList] = useState([SKLT.TableSlt]); 
    const [open, setOpen] =  useState(false)
    let navigate = useNavigate();
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const colors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
        'black',
    ]
    const [fsList, setFSList] = useState([]); 
    const [fournisseurData, setFSData] = useState({})
    const [inDirArticle, setInDirA] = useState();
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [delegList ,setDelegList] = useState([]) 
    
    const genreListe = [
      { key: 1 , value: 'SciencesHumainesSociales', text: 'SciencesHumainesSociales' },
      { key: 2 , value: 'LanguesLitterature', text: 'LanguesLitterature' },
      { key: 3 , value: 'Mathematiques', text: 'Mathematiques' },
      { key: 4 , value: 'Sciences', text: 'Sciences' },
      { key: 5 , value: 'LanguesEtrangeres', text: 'LanguesEtrangeres' },
      { key: 6 , value: 'BeauxArts', text: 'BeauxArts' },
      { key: 7 , value: 'SanteEducationphysique', text: 'SanteEducationphysique' },
      { key: 8 , value: 'TechnologieInformatique', text: 'TechnologieInformatique' },
      { key: 9 , value: 'EducationProfessionnelleTechnique', text: 'EducationProfessionnelleTechnique' },
    ]
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/matiere`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            let testTable = []
              response.data.map( (getData) => testTable.push([
           _(<AvatarCard lettre={capitalizeFirstLetter(getData.Matiere_Name)} />),
            getData.Matiere_ID,
            getData.Matiere_Name,
            getData.Matiere_Genre,
            getData.Matiere_Description,
            _(<Segment  className='rounded-circle' style={{backgroundColor: getData.Matiere_Color, width:'10px'}} />),
            // _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/fs/info/${getData.Four_ID}`)}><span className='d-none d-lg-inline'> Info </span> </Button>)
            ],))
            setClientList(testTable)
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
              setClientList(Offline.camion)
            }
          });
        }, [])


    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const  capitalizeFirstLetter = (string) =>{
        return (string.charAt(0).toUpperCase() + string.slice(1)).charAt(0);
    }
    const GetDelegList = (value) =>{
        setFSData({...fournisseurData, Gouv: value })
        let found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList([])
        setDelegList(found)
    }
    const checkFSExistance = () =>{
        if(fournisseurData.Code_Fiscale){
            const foundClient = fsList.find(element => element.Code_Fiscale === fournisseurData.Code_Fiscale)
            if (foundClient) {
                toast.error("Client Exist Deja", GConf.TostErrorGonf)
                setFSData({...fournisseurData, Code_Fiscale: '' })
            }
            
        }
    }
    const SaveFournisseur = (event) => {
        if (!fournisseurData.Matiere_Name) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Matiere_Genre) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Matiere_Description) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Matiere_Color) {toast.error("Nom Sociale  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/matiere/ajouter`, {
                PID : GConf.PID,
                matiereData : fournisseurData,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    setSaveBtnState(true)
                    toast.success("Client Ajouter !", GConf.TostSuucessGonf)
                    
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                    }
            }).catch((error) => {
                if(error.request) {
                    toast.error(<><div><h5>Probleme de Connextion</h5> Le client sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                    Offline.clientToSave.push(fournisseurData)
                    localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                    setLS(false)
                    setSaveBtnState(true)
                }
                });
                    
        }
                
    }
    const SetThisItemToAdd = (data) => {
        setFSData(data)
        setOpen(false)
    }

    /*################[Card]###############*/
     const AvatarCard = (props) =>{
            return(<>
                <Label size='massive' circular color={colors[Math.floor(Math.random() * 10)]} key={1}>
                    <h3>{props.lettre}</h3>
                </Label>
                
            </>)
    }

    const MatiereSepesificList = (props) => {
        const MatiereItemCard = (props) =>{
            return(<>
                <div className='card p-2 border-div mb-2 shadow-sm' style={{ cursor: 'pointer' }} onClick={() => SetThisItemToAdd(props.data)}>
                        <div className='row'>
                            <div className='col-12'>{props.index +1 } - {props.data.Matiere_Name}</div>
                        </div>
                </div>
            </>)
        }
        return(<>
            <h5>{props.Item}</h5>
            {
                MatiereList[props.Item].map((data,index) => <MatiereItemCard key={index} index={index} data={data} /> )
            }
        </>)
    }
    return ( 
        <>
                <NavLink exaxt='true' to='/S/sa'><Button className='rounded-circle' icon='arrow left' /></NavLink>
            
                <br /> 
                <br /> 
                <div className='row'>
                  <div className='col-12 col-lg-8'>
                    <TableGrid tableData={clientList} columns={GConf.TableHead.matiereListe} />
                  </div>
                  <div className='col-12 col-lg-4 mb-3'>
                    <div className="sticky-top" style={{top:'70px', zIndex:'80'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                          <div className='card card-body mb-4 border-div shadow-sm cursor-pointer text-center' style={{ cursor: 'pointer' }} onClick={() => setOpen(true)} ><b>Toutes Les Matiéres</b></div>
                          <div className='p-1  mb-2'>
                              <h5 className='mb-1'>Nom du Matiére :</h5>
                              <Input icon='user' iconPosition='left' placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Matiere_Name} onChange={(e) => setFSData({...fournisseurData, Matiere_Name: e.target.value })} />
                          </div>
                          <div className='p-1 mb-2'>
                              <h5 className='mb-1'>Genre :</h5>
                              <Select placeholder='Delegation ' fluid value={fournisseurData.Matiere_Genre} options={genreListe} onChange={(e, { value }) => setFSData({...fournisseurData, Matiere_Genre: value })} />
                          </div>
                          <div className='p-1  mb-2'>
                              <h5 className='mb-1'>Coleur :</h5>
                              <Input icon='user' type='color' iconPosition='left' placeholder='Coleur' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Matiere_Color} onChange={(e) => setFSData({...fournisseurData, Matiere_Color: e.target.value })} />
                          </div>
                          <div className='p-1 mb-2'>
                              <h5 className='mb-1'> Description :</h5>
                              <Form>
                                  <TextArea  rows="3" placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Matiere_Description} onChange={(e) => setFSData({...fournisseurData, Matiere_Description: e.target.value })}/>
                              </Form>
                          </div>
                           
                          <div className='text-end mb-2'>
                              <Button  onClick={SaveFournisseur} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                          </div>
                          </div>
                    </div>
                  </div>
                </div>
                
                
    <Modal
      closeIcon
      open={open}
       size='fullscreen'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
       
      <ModalContent scrolling>
        <div className='row'>
            <div className='col-4'>
                <MatiereSepesificList Item='SciencesHumainesSociales' />
                <MatiereSepesificList Item='BeauxArts' />
                <MatiereSepesificList Item='EducationProfessionnelleTechnique' />
            </div>
            <div className='col-4'>
                <MatiereSepesificList Item='LanguesLitterature' />
                <MatiereSepesificList Item='LanguesEtrangeres' />
                <MatiereSepesificList Item='TechnologieInformatique' />
            </div>
            <div className='col-4'>
                <MatiereSepesificList Item='Sciences' />
                <MatiereSepesificList Item='SanteEducationphysique' />
                <MatiereSepesificList Item='Mathematiques' />
                
            </div>
        </div>
      </ModalContent>
      <ModalActions>
        <Button color='red' className='rounded-pill' onClick={() => setOpen(false)}>
          <Icon name='remove'  /> Fermee
        </Button>
        
      </ModalActions>
    </Modal>        
        </>);
}

export default FournisseurPage;