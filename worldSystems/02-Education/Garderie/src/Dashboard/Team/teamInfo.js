import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import TunMap from '../../AssetsM/tunMap';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Icon, Input, Statistic, Form, Loader, Select, TextArea, Modal } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { _ } from "gridjs-react";
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import { toast } from 'react-toastify';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { useNavigate} from 'react-router-dom';
import useGetPostes from '../../AssetsM/Hooks/fetchPostes'
import { useTranslation, Trans } from 'react-i18next';


const EditTeamCard = ({teamData, setTeamData, OnKeyPressFunc, EditTeam,delegList, Postes, GetDelegList,loaderState}) =>{
    const { t, i18n } = useTranslation();
    return(<>
            <div className='p-1'>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>CIN:</h5>
                            <Input icon='key' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Matricule Fiscale' className='w-100 border-0 shadow-sm rounded mb-1'   value={teamData.T_CIN}  onChange={(e) => setTeamData({...teamData, T_CIN: e.target.value })}/>
                        </div>
                        <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Nom Et Prenon :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={teamData.T_Name} onChange={(e) => setTeamData({...teamData, T_Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Telephone :</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' value={teamData.T_Phone} onChange={(e) => setTeamData({...teamData, T_Phone: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Poste:</h5>
                            <Select placeholder='Choisir Uu Poste' options={Postes}  className='w-100 shadow-sm rounded mb-3' value={teamData.Poste} onChange={(e, data) => setTeamData({...teamData, Poste: data.value })} />  

                            {/* <h5 className='mb-1'> Nom Sociale:</h5>
                            <Input icon='home' iconPosition='left' placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={teamData.Poste}  onChange={(e) => setTeamData({...teamData, Poste: e.target.value })}/> */}
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Geolocation</h5>
                            <Select placeholder='Selectionnez Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={teamData.T_Gouv} onChange={(e, { value }) => GetDelegList(value)} />
                            <Select placeholder='Selectionnez Delegation ' fluid value={teamData.T_Deleg} options={delegList} onChange={(e, { value }) => setTeamData({...teamData, T_Deleg: value })} />
                        </div>
                        {/* <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Map:</h5>
                            <Select placeholder='Choisir Une Region' options={clientMap}  className='w-100 shadow-sm rounded mb-3' value={teamData.Gouv} onChange={(e, data) => setTeamData({...teamData, Gouv: data.value })} />  
                           
                        </div> */}
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Adresse:</h5>
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' value={teamData.T_Adress} onChange={(e) => setTeamData({...teamData, T_Adress: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> {t('menuTabs.teamPage.teamInfoPage.caissePWDData.smartID')} {teamData.Now_Login_ID}</h5>
                        </div>
                        <div className='text-end mb-5'>
                            <Button  onClick={EditTeam}  className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
                        </div>
                    </div>
    </>)
}
const PasswordCard = ({teamData, setTeamData, OnKeyPressFunc, EditTeamPassword ,delegList, Postes, GetDelegList,loaderState}) =>{
    return(<>
            <div className='p-1'>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Identifiant:</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Identifiant' className='w-100 border-0 shadow-sm rounded mb-1'   value={teamData.Identifiant}  onChange={(e) => setTeamData({...teamData, Identifiant: e.target.value })}/>
                        </div>
                        <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Mode de Passe :</h5>
                            <Input icon='key' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Mode de Passe ' className='w-100 border-0 shadow-sm rounded mb-1' value={teamData.Password} onChange={(e) => setTeamData({...teamData, Password: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Smart ID  : {teamData.Now_Login_ID}</h5>
                            
                        </div>
                         
                         
                        <div className='text-end mb-5'>
                            <Button  onClick={() => EditTeamPassword()}  className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
                        </div>
                    </div>
    </>)
}

const FindInDirectory = ({inAbyedhSearch,saveBtnRUIState,teamData, setInAbyedhSearchUID,FindInDirectoryFunc, loaderState, OnKeyPressFunc,dataInAbyedh, RelateToUID}) =>{

    return(<>
        {teamData.Releted_UID ? 
            <div className='row card-body'>
                <div className='col-9'>
                        <h5 className="text-danger text-left"><b>Ce Client est Verifier  : </b></h5>
                        <h1 className='display-4'>{teamData.Releted_UID }</h1> 
                </div>
                <div className='col-lg-3 d-none d-lg-block align-self-center'>
                    <div className='text-center'>
                            <img src='https://assets.ansl.tn/Images/usful/clientVerifier.svg' width='100%'  height='100px' /> 
                    </div> 
                </div>
            </div>
            :
            <div className='row'>
                <div className='col-6'>
                    <div className='card card-body border'>
                        <h5>Recherche Dans La Base Abyedh </h5>
                        <Input className='mb-4' placeholder='UID' onKeyPress={event => OnKeyPressFunc(event)} value={inAbyedhSearch} onChange={(e) => setInAbyedhSearchUID(e.target.value)} />
                        <div className='text-end'>
                            <Button disabled={teamData.Releted_UID}  className='bg-system-btn rounded-pill' fluid onClick={() => FindInDirectoryFunc()}>   <Icon name='search' /> Recherche <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>  
                </div>
                <div className='col-6'>
                    <h5 className='text-secondary mt-1 mb-0'>Nom: {dataInAbyedh.Name}</h5>
                    <h5 className='text-secondary mt-1 mb-0'>Phone: {dataInAbyedh.PhoneNum}</h5>
                    <h5 className='text-secondary mt-1 mb-0'>Gouv: {dataInAbyedh.BirthGouv}</h5>
                    <h5 className='text-secondary mt-1 mb-0'>Deleg: {dataInAbyedh.BirthDeleg}</h5>
                    <h5 className='text-secondary mt-1 mb-0'> Photo: {dataInAbyedh.Name}</h5>
                </div>
                <div className='col-12 text-end'>
                    <Button disabled={saveBtnRUIState} className='bg-success text-white rounded-pill' onClick={() => RelateToUID()}>   <Icon name='check' /> Verifieé <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                </div>
            </div>
        }

    </>)
}
const DeleteModal = ({setDeleteModalS,DeletePresence,editAvanceD,deletemodalS}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={deletemodalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setDeleteModalS(false)}
                    onOpen={() => setDeleteModalS(true)}
                    
                >
                    <Modal.Header><h4>Supprimer Avance</h4></Modal.Header>
                    <Modal.Content>
                            Voulez-Vous Vraimment Supprimer Cette Avance 
                            <br />
                            <br />
                            <div className='mb-0 p-0'><h5> Date : {editAvanceD.Date}</h5></div>         
                            <div><h5> Key : {editAvanceD.PK} </h5></div>
                    </Modal.Content>
                    <Modal.Actions>
                                {/* <Button className='rounded-pill' negative onClick={ () => setDeleteModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                                <Button negative className='rounded-pill' onClick={() => DeletePresence()}>  <Icon name='trash' /> Supprimer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}

function TeamInfo() {
        /* ############################### Const ################################*/
        const {TID} = useParams()
        const [teamData, setTeamData] = useState([])
        const [position, setPosition] = useState([36.17720,9.12337])

        const [inAbyedhSearch, setInAbyedhSearchUID] = useState();
        const [dataInAbyedh, setDataInAbyedh] = useState([]);
        const [saveBtnRUIState, setSaveBtnRUIState] = useState(true);

        const [inDirArticle, setInDirA] = useState();
        const [fromDirectory, setFromDir] = useState([]);
        const [presence, setPresence] = useState([])
        const [avances, setAvances] = useState([])
        const [loading , setLoading] = useState(false)
        const [loaderState, setLS] = useState(false)
        const [delegList ,setDelegList] = useState([]) 

        const [deletemodalS, setDeleteModalS] = useState(false)
        const [editAvanceD, setEditAvanceD] = useState([])

        const panes = [
            {
                menuItem: { key: 'fffgg', icon: 'file text', content: 'Presence' }, 
                render: () =><><TableGrid tableData={presence} columns={['*','Nom','Jour','Description','X']} /> </> ,
            },
            {
                menuItem: { key: 'test', icon: 'file text', content: 'Avances' }, 
                render: () =><><TableGrid tableData={avances} columns={['*','Nom', 'Valeur','Jour','Voir']} /> </> ,
            },
            {
                menuItem: { key: 'edit', icon: 'edit', content: 'Modifier' }, 
                render: () => <><Tab.Pane className='border-div' attached={false}><EditTeamCard OnKeyPressFunc={OnKeyPressFunc} teamData={teamData} setTeamData={setTeamData} EditTeam={EditTeam} delegList={delegList} GetDelegList={GetDelegList} Postes={Postes}  loaderState={loaderState}/></Tab.Pane><br /></>,
            },
            {
                menuItem: { key: 'caisse', icon: 'edit', content: 'Caisse PWD' }, 
                render: () => <><Tab.Pane className='border-div' attached={false}><PasswordCard OnKeyPressFunc={OnKeyPressFunc} teamData={teamData} setTeamData={setTeamData} EditTeamPassword={EditTeamPassword} delegList={delegList} GetDelegList={GetDelegList} Postes={Postes}  loaderState={loaderState}/></Tab.Pane><br /></>,
                },
            {
                menuItem: { key: 'verif', icon: 'edit', content: 'Verification' }, 
                render: () => <><Tab.Pane className='border-div' attached={false}><FindInDirectory teamData={teamData} RelateToUID={RelateToUID} saveBtnRUIState={saveBtnRUIState} inAbyedhSearch={inAbyedhSearch}  setInAbyedhSearchUID={setInAbyedhSearchUID} FindInDirectoryFunc={FindInDirectoryFunc} loaderState={loaderState} OnKeyPressFunc={OnKeyPressFunc} dataInAbyedh={dataInAbyedh}/></Tab.Pane><br /></>,
            },
            {
                menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
                render: () => <><Tab.Pane className='border-div' attached={false}><DeleteTeam /></Tab.Pane><br /></>,
            },
        ]
        L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
        const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
        const [Postes] = useGetPostes() 
        let navigate = useNavigate();
    /* ############################### UseEffect ################################*/
    useEffect(() => {
        //client Info
        axios.post(`${GConf.ApiLink}/team/info`, {
            PID:  GConf.PID,
            Team_ID : TID
        }).then(function (response) {
            console.log(response.data)
            if(!response.data.Data.length == 0) {
                toast.error('Membre Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/tm"; }, 2000)
                
            } else {
                setTeamData(response.data.Data)
                setLoading(true)
                
                let presenceTable = []
                response.data.Presence.map( (getData, index) => presenceTable.push([ 
                getData.PK,
                response.data.Data.T_Name,  
                new Date(getData.PR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), 
                'Absence',
                _(<Button className='rounded-pill bg-danger text-white ' icon size='mini' onClick={() => openEditModal(getData,false)}> <Icon name='trash alternate' /> </Button>)
                ],))
                setPresence(presenceTable)

                let avancesTable = []
                response.data.Avances.map( (getData,index) => avancesTable.push([ 
                    getData.PK,
                    response.data.Data.T_Name,
                    parseFloat(getData.Valeur).toFixed(3),
                    new Date(getData.AV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/tm/avances`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                    ],))
                setAvances(avancesTable)

            }

        }).catch((error) => {
            if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les info du client  </div></>, GConf.TostInternetGonf)   
            setTeamData([])
            setPosition([0,0])
            setLoading(true)
            }
        });

    }, [])
     
     
    /* ############################### Functions ################################*/
    const GetDelegList = (value) =>{
        setTeamData({...teamData, T_Gouv: value })
        const found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList(found)
    }
    const EditTeam = () =>{
        if (!teamData.T_CIN) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!teamData.T_Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!teamData.T_Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
        else if (!teamData.Poste) {toast.error("Nom Sociale  Invalide !", GConf.TostErrorGonf)}
        else if (!teamData.T_Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
        else if (!teamData.T_Deleg) {toast.error("Delegation Invalide !", GConf.TostErrorGonf)}
        else if (!teamData.T_Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/team/modifier`, {
                PID : GConf.PID,
                teamData : teamData,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Client Modifier !", GConf.TostSuucessGonf)
                    SaveNotification('clientEdit',GConf.PID, teamData)
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
    const EditTeamPassword = () =>{
        if (!teamData.Identifiant) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!teamData.Password) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/team/pwd/modifier`, {
                PID : GConf.PID,
                teamData : teamData,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Mot de Passe  Modifier !", GConf.TostSuucessGonf)
                     
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
    const DeleteTeamFunc = () =>{
            setLS(true)
            axios.post(`${GConf.ApiLink}/fournisseur/supprimer`, {
                tag : GConf.PID,
                clientId : TID,
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
    const NavigateFunction = (link) => {  navigate(link) }
    const FindInDirectoryFunc = () =>{
        if (!inAbyedhSearch) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/membres/checkAbyedhDb`, {
                UID : inAbyedhSearch,
            }).then(function (response) {
                if(response.data.length  != 0) {
                    toast.success("Client Existe !", GConf.TostSuucessGonf)
                    setLS(false)
                    setSaveBtnRUIState(false)
                    setDataInAbyedh(response.data)
                    
                }
                else{
                    toast.error('Pas De Clients ', GConf.TostSuucessGonf)
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
    const RelateToUID = () =>{
        if (!inAbyedhSearch) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/team/verification`, {
                PID : GConf.PID,
                UID : inAbyedhSearch,
                T_ID : TID,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Mmebre Verifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                    setSaveBtnRUIState(true)
                    setTeamData({ ...teamData, Releted_UID: inAbyedhSearch})
                }
                else{
                    toast.error('Pas De Clients ', GConf.TostSuucessGonf)
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
    const DeletePresence = () =>{
        if (!editAvanceD.PK) { toast.error("Avance Invalide !", GConf.TostErrorGonf) } 
        else {
            axios.post(`${GConf.ApiLink}/team/presence/supprimer`, {
                PID :  GConf.PID ,
                PK : editAvanceD.PK
              })
              .then(function (response) {
                toast.success("Presence Supprimer  !", GConf.TostSuucessGonf)   
                setDeleteModalS(false)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Mmebre  </div></>, GConf.TostInternetGonf)   
                }
              });
        }
    }
    const openEditModal = (event,selected) =>{
        setEditAvanceD({PK: event.PK , Date:new Date(event.PR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), T_Name:event.T_Name})
        setDeleteModalS(true)
    }

    /* ############################### Card ################################*/
    const TeamCard = () =>{
            return (<>
                <div className="sticky-top" style={{top:'70px'}}>
                    <div className='card card-body shadow-sm mb-2 border-div'>
                        <div className="upper">
                            <div className="mcbg main-big-card"></div>
                        </div>
                        <div className="img-card-container text-center">
                            <div className="card-container">
                                <img src="https://cdn.abyedh.com/images/system/profile.png" className="rounded-circle" width="80" />                    
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                                <h4 className='mt-2'>{loading ? teamData.T_Name : SKLT.BarreSkl } </h4> 
                                <h6 className="text-secondary">  {loading ? <><span className="bi bi-star-fill"></span> { teamData.Poste } </>: SKLT.BarreSkl} </h6>
                                <h6 className="text-secondary"> {loading ? <><span className="bi bi-person-badge"></span> { teamData.T_CIN } </>: SKLT.BarreSkl } </h6>
                                <Divider horizontal className='text-secondary mt-4'>Verification</Divider>
                                <div className='row text-center'>
                                    <div className='col-12'>    
                                        {loading ?  
                                            <Statistic color='red' size='tiny'>
                                                <Statistic.Value>
                                                    {teamData.Releted_UID ? teamData.Releted_UID : 'Non Verifieé'} 
                                                </Statistic.Value>
                                            </Statistic>
                                        : SKLT.BarreSkl }  
                                        
                                    </div>
                                </div>
                                <Divider horizontal className='text-secondary mt-4'>Telephone</Divider>
                                <div className='row text-center'>
                                    <div className='col-12 mb-3'> 
                                        {loading ?  
                                            <Statistic color='green' size='tiny'>
                                                <Statistic.Value>
                                                    {teamData.T_Phone} 
                                                </Statistic.Value>
                                            </Statistic>
                                        : SKLT.BarreSkl }   
                                    </div>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }
    const DeleteTeam= () =>{
            return(<><h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Ce Mmebre ?</h3> 
            <div className='row'>
                    <div className='col-9'>
                        <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer Un Membre : </b></h5>
                        <ul className="text-info text-left">
                        <li>le Membre  ne sera pas visible dans la branche 'Membres'</li>
                        <li>Tous les operation relier a ce Membre peut s'endomager   </li>
                        
                        </ul>
                    </div>
                    <div className='col-lg-3 d-none d-lg-block align-self-center'>
                        <div className='text-center'>
                                <img src='https://assets.ansl.tn/Images/usful/delete.svg' width='80%'  height='80px' /> 
                        </div> 
                    </div>
                </div>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill"  onClick={DeleteTeamFunc}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </button>
            </div></>)
    }
    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.FournisseurAdd} />
            <br />
            <div className="row">
                    <div className="col-12 col-lg-4">
                        <TeamCard /> 
                    </div>
                    <div className="col-12 col-lg-8 ">
                        <Tab  menu={{secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>
            </div>
            <DeleteModal setDeleteModalS={setDeleteModalS} DeletePresence={DeletePresence} editAvanceD={editAvanceD}  setEditAvanceD={setEditAvanceD} deletemodalS={deletemodalS} />
    </> );
}

export default TeamInfo;