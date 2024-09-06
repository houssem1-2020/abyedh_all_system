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
import { Button , Icon, Label,   Form,  Input, Loader, Select, TextArea} from 'semantic-ui-react';
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
    const [fournisseurData, setFSData] = useState([])
    const [inDirArticle, setInDirA] = useState();
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [delegList ,setDelegList] = useState([]) 
    const fournisseurGenres = [
      { key: 1 , value: 'af', text: 'Alimentaire' },
      { key: 2 , value: 'af', text: 'Cosmetique' },
      { key: 3 , value: 'af', text: 'Medicale' },
    ]
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/bultin`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            console.log(response.data)
            let testTable = []
              response.data.map( (getData) => testTable.push([
            _(<AvatarCard lettre={capitalizeFirstLetter(getData.Four_Name)} />),
            getData.Four_Code_Fiscale,
            getData.Four_Name,
            getData.Four_Phone,
            getData.Four_Adress,
            getData.Articles_Genre,
            getData.Jour_Periodique,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/fs/info/${getData.Four_ID}`)}><span className='d-none d-lg-inline'> Info </span> </Button>)
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
        if (!fournisseurData.Code_Fiscale) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Social_Name) {toast.error("Nom Sociale  Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Deleg) {toast.error("Delegation Invalide !", GConf.TostErrorGonf)}
        else if (!fournisseurData.Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/bultin/ajouter`, {
                PID : GConf.PID,
                fournisseurData : fournisseurData,
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

    return ( 
        <>
                <NavLink exaxt='true' to='/S/el'><Button className='rounded-circle' icon='arrow left' /></NavLink>
            
                {/* <SubNav dataForNav={GConf.SubNavs.Fournisseur}/>*/}
                <br /> 
                <br /> 
                <div className='row'>
                  <div className='col-12 col-lg-8'>
                    <TableGrid tableData={clientList} columns={GConf.TableHead.fournisseur} />
                  </div>
                  <div className='col-12 col-lg-4 mb-3'>
                    <div className="sticky-top" style={{top:'70px'}}>
                        <div className='card card-body border-div shadow-sm mb-4'>
                          <div className='p-1 mb-2'>
                              <h5 className='mb-1'>Matricule Fiscale:</h5>
                              <Input icon='key' iconPosition='left' placeholder='Matricule Fiscale' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Code_Fiscale} onBlur={checkFSExistance}  onChange={(e) => setFSData({...fournisseurData, Code_Fiscale: e.target.value })}/>
                          </div>
                          <div className='p-1  mb-2'>
                              <h5 className='mb-1'>Nom Et Prenon :</h5>
                              <Input icon='user' iconPosition='left' placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Name} onChange={(e) => setFSData({...fournisseurData, Name: e.target.value })} />
                          </div>
                          <div className='p-1 mb-2'>
                              <h5 className='mb-1'>Telephone :</h5>
                              <Input icon='phone' iconPosition='left' placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Phone} onChange={(e) => setFSData({...fournisseurData, Phone: e.target.value })} />
                          </div>
                          <div className='p-1 mb-2'>
                              <h5 className='mb-1'> Nom Sociale:</h5>
                              <Input icon='home' iconPosition='left' placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Social_Name} onChange={(e) => setFSData({...fournisseurData, Social_Name: e.target.value })}/>
                          </div>
                          <div className='p-1 mb-2'>
                              <h5 className='mb-1'>Geolocation</h5>
                              <div className='row'>
                                    <div className='col-6'><Select placeholder='Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={fournisseurData.gouv} onChange={(e, { value }) => GetDelegList(value)} /></div>
                                    <div className='col-6'><Select placeholder='Delegation ' fluid value={fournisseurData.Deleg} options={delegList} onChange={(e, { value }) => setFSData({...fournisseurData, Deleg: value })} /></div>
                              </div> 
                              
                              
                          </div>
                          {/* <div className='p-1 mb-2'>
                              <h5 className='mb-1'> Map:</h5>
                              <Select placeholder='Choisir Une Region' options={clientMap}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, Gouv: data.value })} />  
                            
                          </div> */}
                          <div className='p-1 mb-2'>
                              <h5 className='mb-1'> Adresse:</h5>
                              <Form>
                                  <TextArea  rows="3" placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Adress} onChange={(e) => setFSData({...fournisseurData, Adress: e.target.value })}/>
                              </Form> 
                          </div>
                          <div className='text-end mb-2'>
                              <Button  onClick={SaveFournisseur} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                          </div>
                          </div>
                    </div>
                  </div>
                </div>
                
                
                <Fade></Fade>         
        </>);
}

export default FournisseurPage;