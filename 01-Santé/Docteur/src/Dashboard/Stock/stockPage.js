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
import { Button , Icon, Label,   Form,  Input, Loader, Select, TextArea, Modal, Dimmer} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

 
function FournisseurPage() {
    /*################[Variable]###############*/
    let  [clientList, setClientList] = useState([['...','...','...','...','...','...','...','...']]); 
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
    const  [fsList, setFSList] = useState([]); 
    const [modalS, setModalS] = useState(false)
    const [fournisseurData, setFSData] = useState({Date_AMM : new Date().toISOString().split('T')[0] })
    const [inDirArticle, setInDirA] = useState();
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
 
    const [delegList ,setDelegList] = useState([]) 
    const tableaux = [
      { key: 1 , value: 'af', text: 'A' },
      { key: 2 , value: 'af', text: 'O' },
      { key: 3 , value: 'af', text: 'C' },
      { key: 3 , value: 'af', text: 'B' },
    ]

    const gpb = [
        { key: 1 , value: 'af', text: 'Générique' },
        { key: 2 , value: 'af', text: 'Princeps' },
        { key: 3 , value: 'af', text: 'Biosimilaire' },
      ]

      const VEIC = [
        { key: 1 , value: 'af', text: 'Vital' },
        { key: 2 , value: 'af', text: 'Essentiel' },
        { key: 3 , value: 'af', text: 'Intermédiaire' },
        { key: 3 , value: 'af', text: 'Confort' },
      ]
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/ordonance/medicamment`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            console.log(response.data)
            let testTable = []
              response.data.map( (getData) => testTable.push([
            _(<AvatarCard lettre={capitalizeFirstLetter(getData.Nom)} />),
            getData.PK,
            _(<StateCard status={getData.PID} />),
            getData.Nom,
            getData.Dosage,
            getData.Forme,
            getData.Presentation,
            getData.Classe,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sk/info/${getData.PK}`)}><span className='d-none d-lg-inline'> Info </span> </Button>)
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
        if (!fournisseurData.Nom) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Dosage) {toast.error("Dosage Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Forme) {toast.error("Forme Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Presentation) {toast.error("Presentation Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.DCI) {toast.error("DCI Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Classe) {toast.error("Classe Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Sous_Classe) {toast.error("Sous_Classe Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Laboratoire) {toast.error("Laboratoire Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.AMM) {toast.error("AMM Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Date_AMM) {toast.error("Date_AMM Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Conditionnement_primaire) {toast.error("Conditionnement_primaire Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Specifocation) {toast.error("Specifocation Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Tableau) {toast.error("Tableau Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Duree_de_conservation) {toast.error("Duree_de_conservation Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Indications) {toast.error("Indications Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.G_P_B) {toast.error("G_P_B Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.VEIC) {toast.error("VEIC Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/ordonance/medicamment/ajouter`, {
                PID : GConf.PID,
                medicammentData : fournisseurData,
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

    /*################[Card]###############*/
     const AvatarCard = (props) =>{
            return(<>
                <Label size='massive' circular color={colors[Math.floor(Math.random() * 10)]} key={1}>
                    <h3>{props.lettre}</h3>
                </Label>
                
            </>)
    }
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'ABYEDH': return <StateCard color='info' text='Publique' />;  
            default:  return <StateCard color='success' text='Priveé' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    return ( 
        <>
                
                <div className='row'>
                    <div className='col-6 text-start'><NavLink exaxt='true' to='/S/or'><Button className='rounded-circle' icon='arrow left' /></NavLink></div>
                    <div className='col-6 text-end'> <Button icon='add plus' className='rounded-pill bg-system-btn mb-0' onClick={() => setModalS(true)} /></div>
                </div>
 
                <br /> 
 
                <TableGrid tableData={clientList} columns={GConf.TableHead.medicammentPage} />
                
                <Modal
                    size='large'
                    open={modalS}
                    closeIcon
                    onClose={() => setModalS(false)}
                    onOpen={() => setModalS(true)}
                >
                    <Modal.Header><h4> Ajouter Nouveaux Medicamment </h4></Modal.Header>
                    <Modal.Content scrolling>
                     
                            <Dimmer inverted active={loaderState}>
                                <Loader />
                            </Dimmer>
                            <div className='row'>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Nom:</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Nom}   onChange={(e) => setFSData({...fournisseurData, Nom: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Dosage :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Dosage ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Dosage} onChange={(e) => setFSData({...fournisseurData, Dosage: e.target.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Forme :</h5>
                                    <Select placeholder='Choisir Forme' options={tableaux}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, Forme: data.value })} />
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Presentation:</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Presentation' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Presentation}   onChange={(e) => setFSData({...fournisseurData, Presentation: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>DCI :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='DCI ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.DCI} onChange={(e) => setFSData({...fournisseurData, DCI: e.target.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Classe :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Classe ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Classe} onChange={(e) => setFSData({...fournisseurData, Classe: e.target.value })} />
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Sous_Classe:</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Sous_Classe' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Sous_Classe}   onChange={(e) => setFSData({...fournisseurData, Sous_Classe: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Laboratoire :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Laboratoire ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Laboratoire} onChange={(e) => setFSData({...fournisseurData, Laboratoire: e.target.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>AMM :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='AMM ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.AMM} onChange={(e) => setFSData({...fournisseurData, AMM: e.target.value })} />
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Date_AMM:</h5>
                                    <Input icon='medkit' type='date' iconPosition='left'   className='w-100 border-0 shadow-sm rounded mb-1'   value={fournisseurData.Date_AMM}   onChange={(e) => setFSData({...fournisseurData, Date_AMM: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Conditionnement_primaire :</h5>
                                    <Form>
                                        <TextArea  rows="3" placeholder='Conditionnement_primaire' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Conditionnement_primaire} onChange={(e) => setFSData({...fournisseurData, Conditionnement_primaire: e.target.value })}/>
                                    </Form>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Specifocation :</h5>
                                    <Form>
                                        <TextArea  rows="3" placeholder='Specifocation' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Specifocation} onChange={(e) => setFSData({...fournisseurData, Specifocation: e.target.value })}/>
                                    </Form>
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Tableau:</h5>
                                    <Select placeholder='Choisir Tableau' options={tableaux}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, Tableau: data.value })} />  
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Duree_de_conservation :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Duree_de_conservation ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Duree_de_conservation} onChange={(e) => setFSData({...fournisseurData, Duree_de_conservation: e.target.value })} />
                                </div>
                                <div className='col-12   p-1 mb-2'>
                                    <h5 className='mb-1'>Indications :</h5>
                                    <Form>
                                        <TextArea  rows="3" placeholder='Indications' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Indications} onChange={(e) => setFSData({...fournisseurData, Indications: e.target.value })}/>
                                    </Form>
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>G_P_B:</h5>
                                    <Select placeholder='Choisir G_P_B' options={gpb}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, G_P_B: data.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>VEIC :</h5>
                                    <Select placeholder='Choisir VEIC' options={VEIC}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, VEIC: data.value })} />
                                </div>
                            </div>
                            <div className='text-end mb-2'>
                                <Button  onClick={() => SaveFournisseur()} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer </Button>
                                    
                            </div>
        

                    </Modal.Content>
                    <Modal.Actions>
                                <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                    </Modal.Actions>
                </Modal>
               
        </>);
}

export default FournisseurPage;