import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import TunMap from '../../AssetsM/tunMap';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Icon, Input, Statistic, Form, Loader, Select, TextArea, Dropdown } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { _ } from "gridjs-react";
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { toast } from 'react-toastify';
 

const EditAvertisemment = ({membreListe,forfaitListe,EditAvertissemment,fournisseurData,setFSData,loaderState,OnKeyPressFunc}) =>{
    const [classeNow, setClasseNow] = useState([])
    const SelectClasseFunction = (value) => {
        if (value) {
            setFSData({...fournisseurData, Eleve_ID: value })
            let filtedClient = membreListe.find((data) => data.EL_ID == value)
            setClasseNow(filtedClient)
        }
        //onBlur={ (e) => setFSData({...fournisseurData, Eleve_ID: e.target.value })}
    }
    
    return(<>
           <div className='row'>
                <div className='col-12 col-lg-8'>
                    <h5 className='mb-0 text-secondary '> <span className='bi bi-person'></span> Eleve  </h5>
                    <datalist id="clientList">
                        {membreListe.map((test) =>
                        <option key={test.EL_ID} value={test.EL_ID}>{test.EL_Name} : {test.EL_Pere_Nom} | {test.EL_Mere_Nom}</option>
                        )}
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={fournisseurData.Eleve_ID} onBlur={ (e) => SelectClasseFunction(e.target.value)}    size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                        <div className='card-body border-div  mt-4 mb-3 bg-gray'>
                            <div className='row'>
                                <div className='col-4 '> <span className='bi bi-person-fill'></span> Eleve :  {classeNow.EL_Name  ? classeNow.EL_Name  : ''}</div>
                                <div className='col-4 '> <span className='bi bi-person-fill'></span> Eleve :  {classeNow.EL_Pere_Nom  ? classeNow.EL_Pere_Nom  : ''}</div>
                                <div className='col-4 '> <span className='bi bi-box'></span> Classe : {classeNow.CL_Name  ? classeNow.CL_Name  : ''} </div>
                                </div>
                        </div>
                    <h5 className='mb-0 mt-2 text-secondary '><span className='bi bi-people'></span> Prof  </h5>
                    <Dropdown
                        search
                        fluid
                        selection
                        wrapSelection={false}
                        options={forfaitListe}
                        placeholder={'Prof'}
                        className='mb-3 shadow-sm'
                        onChange={(e, { value }) => setFSData({...fournisseurData, Prof_ID: value })}
                        value={fournisseurData.Prof_ID}
                    /> 
 
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-calendar'></span> Date  </h5>
                            <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={fournisseurData.AV_Date} onChange={(e) => setFSData({...fournisseurData, AV_Date: e.target.value })}/> 
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-alarm'></span> Heur  </h5>
                            <Input icon='map marker' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='De'  fluid className='mb-1 shadow-sm'  value={fournisseurData.AV_Time}  onChange={(e) => setFSData({...fournisseurData, AV_Time : e.target.value })}/>
                        </div>
                    </div>

                    <div className='row'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-chat-square-dots-fill'></span> Cause :</h5>
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='Cause' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.AV_Cause} onChange={(e) => setFSData({...fournisseurData, AV_Cause: e.target.value })}/>
                            </Form>
                    </div>
                    <div className='text-end mt-4'>
                        <Button  className='rounded-pill text-secondary bg-system-btn'        onClick={(e) => EditAvertissemment()}><Icon name='edit outline' /> Modifier  <Loader active={loaderState} /> </Button>
                    </div>
                </div>
                <div className='col-12 col-lg-4 align-self-center'>
                        <div className='text-center d-none d-lg-block  align-self-center'>
                                <img src='https://cdn.abyedh.com/Images/system/garderie/avertissemment.svg' width='80%'  height='200px' /> 
                        </div>
                </div>
            </div>
    </>)
}
 

function FournisseurInfo() {
         /* ############################### Const ################################*/
         const {CLID} = useParams()
         const [fournisseurData, setFSData] = useState([])
         const [loading , setLoading] = useState(false)
         const [openD, setOpenD] = useState(false)
         const [loaderState, setLS] = useState(false)
         const [activeIndex, setActiveIndex] = useState(0)
         const [forfaitListe ,setForfaliListe] = useState([])
         const [membreListe ,setMmebreListe] = useState([])

          /* ############################### UseEffect ################################*/
         useEffect(() => {
              
             axios.post(`${GConf.ApiLink}/eleve/avertissemment/info`, {
                 PID: GConf.PID,
                 CLID : CLID
             }).then(function (response) {
                console.log(response.data)
                setFSData(response.data)
                setLoading(true)
             }).catch((error) => {
                 if(error.request) {
                   toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les info du client  </div></>, GConf.TostInternetGonf)   
                    
                   setLoading(true)
                 }
            });

            axios.post(`${GConf.ApiLink}/team`, {
                PID : GConf.PID,
             })
             .then(function (response) {
                let forfaitToListe = [] 
                response.data.map((data,index) => forfaitToListe.push({
                    key: index ,
                    text: data.T_Name,
                    value: data.T_ID
                }))
                setForfaliListe(forfaitToListe)
             }).catch((error) => {
                setForfaliListe([])
             });
    
             axios.post(`${GConf.ApiLink}/eleves`, {
                PID : GConf.PID,
             })
             .then(function (response) {
                setMmebreListe(response.data)
             }).catch((error) => {
                setMmebreListe([])
             });
     
         }, [])
     
     
        /* ############################### Functions ################################*/
        const OpenBottomSheetFunction = (genre) => {
            setActiveIndex(genre)
            setOpenD(!openD)
        }
        const EditAvertissemment = () =>{
            if (!fournisseurData.Code_Fiscale) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
            else if (!fournisseurData.Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
            else if (!fournisseurData.Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
            else if (!fournisseurData.Social_Name) {toast.error("Nom Sociale  Invalide !", GConf.TostErrorGonf)}
            else if (!fournisseurData.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
            else if (!fournisseurData.Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/fournisseur/modifier`, {
                    PID : GConf.PID,
                    fournisseurData : fournisseurData,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        toast.success("Client Modifier !", GConf.TostSuucessGonf)
                         
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                            }
                    }).catch((error) => {
                        if(error.request) {
                        toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier le client  </div></>, GConf.TostInternetGonf) 
                        setLS(false)  
                        }
                    });
                        
            }
        }
        const DeleteFSFunc = () =>{
                setLS(true)
                axios.post(`${GConf.ApiLink}/fournisseur/supprimer`, {
                    PID : GConf.PID,
                    clientId : CLID,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        toast.success("Client Supprimer !", GConf.TostSuucessGonf)
                        setLS(false)
                        setTimeout(() => {  window.location.href = "/S/fs"; }, 500)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                            }
                    }).catch((error) => {
                        if(error.request) {
                        toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de supprimer le client  </div></>, GConf.TostInternetGonf) 
                        setLS(false)  
                        }
                    });
        }
        const OnKeyPressFunc = (e) => {
            if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
                e.preventDefault();
            }   
        }

         /* ############################### Card ################################*/
         const DeleteFS= () =>{
             return(<><h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Ce Camion ?</h3> 
             <div className='row'>
                     <div className='col-9'>
                         <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer Un Client : </b></h5>
                         <ul className="text-info text-left">
                         <li>le Client  ne sera pas visible dans la branche 'Clients'</li>
                         <li>Tous les factures relier a ce client peut s'endomager   </li>
                         <li>vous ne pouver pas passer ni factures ni commandes avec ce clients autremment   </li>
                         </ul>
                     </div>
                     <div className='col-lg-3 d-none d-lg-block align-self-center'>
                         <div className='text-center'>
                                 <img src='https://assets.ansl.tn/Images/usful/delete.svg' width='80%'  height='80px' /> 
                         </div> 
                     </div>
                 </div>
             <div className='text-end'>
                 <button type="submit" name="add" className="btn btn-danger rounded-pill"  onClick={DeleteFSFunc}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </button>
             </div></>)
         }


        return ( <>
                <BreadCrumb links={GConf.BreadCrumb.avertissmentInfo} />
                <br />
                <div className="row">
                    {
                        !loading ? <></>
                        :
                        <>
                            <h5 className='text-start mb-1 text-secondary'><span className='bi bi-person-fill'></span> Prof : {fournisseurData.T_Name} </h5>
                            <h5 className='text-start mb-1 text-secondary'><span className='bi bi-calendar-week'></span> Date : {new Date(fournisseurData.AV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </h5>
                            <h5 className='text-start mb-1 text-secondary'><span className='bi bi-clock'></span> Temps : {fournisseurData.AV_Time} </h5>
                            <h5 className='text-start mb-1 text-secondary'><span className='bi bi-chat-dots'></span> Cause : {fournisseurData.AV_Cause} </h5>
                            <div ><Button  onClick={() => OpenBottomSheetFunction('edit')}>Modifier </Button> <Button  onClick={() => OpenBottomSheetFunction('delete')}> Supprimer  </Button></div>
                            
                        </>
                    }
                            
                </div>
                <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                        <div className='card-body'>
                            { activeIndex =='delete' ?   <DeleteFS /> : <></> }
                            { activeIndex =='edit' ?   <EditAvertisemment membreListe={membreListe} forfaitListe={forfaitListe} EditAvertissemment={EditAvertissemment} fournisseurData={fournisseurData} setFSData={setFSData} loaderState={loaderState} OnKeyPressFunc={OnKeyPressFunc} /> : <></> }
                         
                        </div>
                </BottomSheet>
        </> );
}

export default FournisseurInfo;