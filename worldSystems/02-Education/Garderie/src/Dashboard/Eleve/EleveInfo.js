import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import TunMap from '../../AssetsM/tunMap';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Icon, Input, Statistic, Form, Loader, Select, TextArea, Dimmer } from 'semantic-ui-react';
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
import TableImage from '../../AssetsM/Cards/tableImg';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';

const EditClientCard = ({clientD, setClientD, classListe, OnKeyPressFunc, EditClient,delegList,GetDelegList,loaderState}) =>{
    const [classeNow, setClasseNow] = useState([])
    
    const clientSexe = [
        { key: 1 , value: 'male', text: 'Male' },
        { key: 2 , value: 'female', text: 'Female' },
    ]
    const patrantCivileEtat = [
        { key: 1 , value: 'male', text: 'Le père est mort' },
        { key: 2 , value: 'female', text: 'La mére est mort' },
        { key: 3 , value: 'female', text: 'Vivent Ensemble' },
        { key: 4 , value: 'female', text: 'Divorcé' },
        { key: 5 , value: 'female', text: 'Autre' },
    ]
    const etatSanitaire = [
        {value : 'En Bonne État', text : 'En Bonne État', key: 1},
        {value : 'Malade', text : 'Malade ', key: 2},
        {value : 'En Réanimation', text : 'En Réanimation', key: 3},
        {value : 'En Soins Palliatifs', text : 'En Soins Palliatifs', key: 4},
        {value : 'En Quarantaine', text : 'En Quarantaine', key: 5},
        {value : 'En Observation',text : 'En Observation', key: 6},
    ]

    const SelectClasseFunction = (value) => {
        if (value) {
            setClientD({...clientD, EL_Classe: value })
            let filtedClient = classListe.find((data) => data.CL_ID == value)
            setClasseNow(filtedClient)
        }
        
    }
    useEffect(() => {
        SelectClasseFunction(clientD.EL_Classe)
        GetDelegList(clientD.Gouv)
    }, [])

    return(<>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-person '></span> Nom Et Prenon :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.EL_Name} onChange={(e) => setClientD({...clientD, EL_Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-calendar '></span> Naissance:</h5>
                            <Input icon='birthday cake' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={clientD.EL_Naissance} onChange={(e) => setClientD({...clientD, 	EL_Naissance: e.target.value })}/> 
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-gender-male '></span>  Sexe:</h5>
                            <Select placeholder='Choisir Sexe' options={clientSexe}  className='w-100 shadow-sm rounded mb-3' value={clientD.EL_Genre} onChange={(e, data) => setClientD({...clientD, EL_Genre: data.value })} />  
                        </div>

                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-box '></span> Classe:</h5>
                            <datalist id="eleveListe">
                                {classListe.map((test) =>
                                <option key={test.CL_ID} value={test.CL_ID}>{test.CL_Name} : {test.CL_Niveaux}</option>
                                )}
                            </datalist>
                            <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="eleveListe" placeholder={clientD.EL_Classe}   onBlur={ (e) => SelectClasseFunction(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                                <div className='card-body border-div mb-4 mt-4 mb-3 bg-gray'>   
                                    <div className='row'>
                                        <div className='col-6 text-secondary'><span className='bi bi-boxes '></span>  Classe : {classeNow.CL_Name  ? classeNow.CL_Name  : ''}</div>
                                        <div className=' col-6 text-secondary'><span className='bi bi-view-list '></span> Niveaux : {classeNow.CL_Niveaux  ? classeNow.CL_Niveaux  : ''}</div>
                                    </div>
                                </div>
                        </div>
 
                    
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-map '></span> Geolocation</h5>
                            <div className='row'>
                                    <div className='col-12 col-lg-6'><Select placeholder='Selectionnez Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={clientD.Gouv} onChange={(e, { value }) => GetDelegList(value)} /></div>
                                    <div className='col-12 col-lg-6'><Select placeholder='Selectionnez Delegation ' fluid value={clientD.Deleg} options={delegList} onChange={(e, { value }) => setClientD({...clientD, Deleg: value })} /></div>
                            </div>
                        </div>
 
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-geo-alt '></span>  Adresse:</h5>
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='Adresse' className='w-100 shadow-sm rounded mb-3' value={clientD.EL_Adress} onChange={(e) => setClientD({...clientD, EL_Adress: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-heart-pulse '></span>  Etat Sanitaire :</h5>
                            <Select placeholder='Etat Sanitaire' options={etatSanitaire}  className='w-100 shadow-sm rounded mb-3' value={clientD.EL_Etat_Sanitaire} onChange={(e, data) => setClientD({...clientD, EL_Etat_Sanitaire: data.value })} />  
                        </div>
                        <div className='text-end mb-5'>
                            <Button  onClick={EditClient}   className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>


                    <div className='col-lg-5 '>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-person '></span>  Nom Du Pére :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Du Pére' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.EL_Pere_Nom} onChange={(e) => setClientD({...clientD, EL_Pere_Nom: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-star '></span>  Metier Du Pére:</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Metier Du Pére' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.EL_Pere_Metier} onChange={(e) => setClientD({...clientD, EL_Pere_Metier: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-phone '></span> Telephone Du Pére:</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone Du Pére ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.EL_Pere_Phone} onChange={(e) => setClientD({...clientD, EL_Pere_Phone: e.target.value })} />
                        </div>

                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-person '></span>  Nom Du Mére :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Du Mére' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.EL_Mere_Nom} onChange={(e) => setClientD({...clientD, EL_Mere_Nom: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-star '></span>  Metier Du Mére:</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Metier Du Mére' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.EL_Mere_Metier} onChange={(e) => setClientD({...clientD, EL_Mere_Metier: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-phone '></span> Telephone Du Mére:</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone Du Mére ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.EL_Mere_Phone} onChange={(e) => setClientD({...clientD, EL_Mere_Phone: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-people '></span>  Etat civile des parant :</h5>
                            <Select placeholder='Etat civile' options={patrantCivileEtat}  className='w-100 shadow-sm rounded mb-3' value={clientD.EL_Parant_Etat_Civle} onChange={(e, data) => setClientD({...clientD, EL_Parant_Etat_Civle: data.value })} />  
                        </div>

                    </div>
                </div>
    </>)
}
 
const FindInDirectory = ({inAbyedhSearch,saveBtnRUIState,clientD, setInAbyedhSearchUID,FindInDirectoryFunc, loaderState, OnKeyPressFunc,dataInAbyedh, RelateToUID}) =>{

    return(<>
        {clientD.Releted_UID ? 
            <div className='row card-body'>
                <div className='col-9'>
                        <h5 className="text-danger text-left"><b>Ce Patient est Verifier  : </b></h5>
                        <h1 className='display-4'>{clientD.Releted_UID }</h1> 
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
                            <Button disabled={clientD.Releted_UID}  className='bg-system-btn rounded-pill' fluid onClick={() => FindInDirectoryFunc()}>   <Icon name='search' /> Recherche <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>  
                </div>
                <div className='col-6'>
                    <div className='text-center'>
                           {dataInAbyedh.PictureID ? <img src={`https://cdn.abyedh.com/images/p_pic/${dataInAbyedh.PictureID}.gif`} className='rounded-circle' width='40px'  height='40px' /> : <img src={`https://cdn.abyedh.com/images/p_pic/00.gif`} className='rounded-circle' width='40px'  height='40px' />}  
                    </div> 
                    <h5 className='text-secondary mt-1 mb-0'>Nom: {dataInAbyedh.Name}</h5>
                    <h5 className='text-secondary mt-1 mb-0'>Phone: {dataInAbyedh.PhoneNum}</h5>
                    <h5 className='text-secondary mt-1 mb-0'>Gouv: {dataInAbyedh.BirthGouv}</h5>
                    <h5 className='text-secondary mt-1 mb-0'>Deleg: {dataInAbyedh.BirthDeleg}</h5>
                    {/* <h5 className='text-secondary mt-1 mb-0'> Photo: {dataInAbyedh.Name}</h5> */}
                </div>
                <div className='col-12 text-end'>
                    <Button disabled={saveBtnRUIState} className='bg-success text-white rounded-pill' onClick={() => RelateToUID()}>   <Icon name='check' /> Verifieé <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                </div>
            </div>
        }

    </>)
}

const PrintCard = ({PrintFunction,printPageLoaded}) =>{
    const [presenceRange, setPresenceRage] = useState({de:new Date().toISOString().split('T')[0], vers:new Date().toISOString().split('T')[0]})
    const [bultinRange, setBultinRange] = useState({de:new Date().toISOString().split('T')[0], vers:new Date().toISOString().split('T')[0]})
    return(<> 
        <div className=''>
            <Dimmer active={!printPageLoaded} className='border-div' >
                <Loader size='big' > </Loader>
            </Dimmer>
            <h5 className='mb-1 text-secondary '><span className='bi bi-calendar-week'></span> Presence : </h5>
            <div className='row mb-2'>
                <div className='col-12 col-lg-10 align-self-center'> 
                    <div className='row'>
                        <div className='col-6'>
                                <h5 className='mb-0 mt-2 text-secondary '> De  </h5>
                                <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={presenceRange.de} onChange={(e) => setPresenceRage({...presenceRange, de: e.target.value })}/> 
                        </div>
                        <div className='col-6'>
                                <h5 className='mb-0 mt-2 text-secondary '> Vers  </h5>
                                <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={presenceRange.vers} onChange={(e) => setPresenceRage({...presenceRange, vers: e.target.value })}/>  
                        </div>
                        
                    </div>
                </div>
                <div className='col-12 col-lg-2 align-self-center'>
                    <Button  className='rounded-pill btn-imprimer' size='small' fluid onClick={(e) => PrintFunction(`/Pr/Eleve/presence/:de/:vers`,'mainFrame')}><Icon name='print' /> Imprimer </Button>
                </div>
            </div>
            <div className='row mb-2 mt-4'>
                <div className='col-12 col-lg-10'> <h5 className='text-secondary'> Imprimer le presence de la semaine derniére </h5>  </div>
                <div className='col-12 col-lg-2'>
                    <Button  className='rounded-pill btn-imprimer' size='small' fluid onClick={(e) => PrintFunction(`/Pr/Eleve/presence/:de/:vers`,'mainFrame')}><Icon name='print' /> Imprimer </Button>
                </div>
            </div>
            <div className='row mb-2 mt-4'>
                <div className='col-12 col-lg-10'> <h5 className='text-secondary'> Imprimer le presence du mois derniére </h5>   </div>
                <div className='col-12 col-lg-2'>
                    <Button  className='rounded-pill btn-imprimer' size='small' fluid onClick={(e) => PrintFunction(`/Pr/Eleve/presence/:de/:vers`,'mainFrame')}><Icon name='print' /> Imprimer </Button>
                </div>
            </div>

            <h5 className='mb-1 text-secondary '><span className='bi bi-calendar-week'></span> Examain : </h5>
            <div className='row mb-2'>
                <div className='col-12 col-lg-10 align-self-center'> 
                    <div className='row'>
                        <div className='col-6'>
                                <h5 className='mb-0 mt-2 text-secondary '> De  </h5>
                                <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={bultinRange.de} onChange={(e) => setBultinRange({...bultinRange, de: e.target.value })}/> 
                        </div>
                        <div className='col-6'>
                                <h5 className='mb-0 mt-2 text-secondary '> Vers  </h5>
                                <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={bultinRange.vers} onChange={(e) => setBultinRange({...bultinRange, vers: e.target.value })}/>  
                        </div>
                        
                    </div>
                </div>
                <div className='col-12 col-lg-2 align-self-center'>
                    <Button  className='rounded-pill btn-imprimer' size='small' fluid onClick={(e) => PrintFunction(`/Pr/Eleve/bultin/:de/:vers`,'mainFrame')}><Icon name='print' /> Imprimer </Button>
                </div>
            </div>

            <h5 className='mb-1 text-secondary mt-4'><span className='bi bi-calendar-week'></span> Certificat de Presence  : </h5>
            <div className='row mb-2'>
                <div className='col-12 col-lg-10'> <h5 className='text-secondary'> Imprimer Un certificat de presence  </h5></div>
                <div className='col-12 col-lg-2'>
                    <Button  className='rounded-pill bg-info text-white ' size='small' fluid onClick={(e) => PrintFunction(`/Pr/Eleve/certificat/:de/:vers`,'mainFrame')}><Icon name='print' /> Imprimer </Button>
                </div>
            </div>

            <h5 className='mb-1 text-secondary '><span className='bi bi-calendar-week'></span> Dossier Scolaire  : </h5>
            <div className='row mb-2'>
                <div className='col-12 col-lg-10'> <h5 className='text-secondary'> Imprimer Le dossier scolaire du saisson : {GConf.currentSeasson}  </h5> </div>
                <div className='col-12 col-lg-2'>
                    <Button  className='rounded-pill bg-danger text-white ' size='small' fluid onClick={(e) => PrintFunction(`/Pr/Eleve/dossier/:de/:vers`,'mainFrame')}><Icon name='print' /> Imprimer </Button>
                </div>
            </div>

        </div>
    </>)
}

function ClientInfo() {
     /* ############################### Const ################################*/
    const {CLID} = useParams()
    const [clientD, setClientD] = useState([])
    const [position, setPosition] = useState([36.17720,9.12337])
    
    const [seanceListe, setSeanceListe] = useState([])
    const [abonnemmentListe, setAbonnemmentListe] = useState([])
    const [examainListe, setExamainListe] = useState([])

    const [bultinListe, setBultinListe] = useState([])
    const [avertissementListe, setAvertissemmentListe] = useState([])
    const [retenueListe, setRetenueListe] = useState([])

    const [inAbyedhSearch, setInAbyedhSearchUID] = useState();
    const [dataInAbyedh, setDataInAbyedh] = useState([]);
    const [saveBtnRUIState, setSaveBtnRUIState] = useState(true);

    const [loading , setLoading] = useState(false)
    const [printPageLoaded , setPageLoaded] = useState(true)
    const [triggerPrint , setTriggerPrint] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [delegList ,setDelegList] = useState([]) 

    const [classListe, setClasseList] = useState([]);
    const [urlToPrint, setUrlToPrint] = useState('/');
    let [defaultEmploi, setDefaultEmploi] = useState([])
    const navigate = useNavigate();

    const panes = [
        {
            menuItem: { key: 'prence', icon: 'calendar', content: 'Presence' }, 
            render: () => <><CalendarPresence /><br /></>,
        },
        {
            menuItem: { key: 'abonnemment', icon: 'address card outline', content: 'Abon..' }, 
            render: () =><TableGrid tableData={abonnemmentListe} columns={['*','ID','Eleve','Depart','Genre','Seances','Voir']} />,
        },
        {
            menuItem: { key: 'home', icon: 'time', content: 'Seances' }, 
            render: () => <><TableGrid tableData={seanceListe} columns={['*','ID','Matiére','Prof','Date','De -- Vers','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'examain', icon: 'list alternate outline', content: 'Examain' }, 
            render: () =><TableGrid tableData={examainListe} columns={['*','ID','Matire','Genre','Salle','Date','De','Vers','Voir']} />,
        },
        {
            menuItem: { key: 'avertissement', icon: 'exclamation triangle', content: 'Avert..' }, 
            render: () =><TableGrid tableData={avertissementListe} columns={['*','ID','Prof','Jour','Temps','Cause','Voir']} />,
        },
        {
            menuItem: { key: 'retenue', icon: 'copy', content: 'Retenue' }, 
            render: () =><TableGrid tableData={retenueListe} columns={['*','ID','Prof','Matiére','Jour','De -- Vers','Voir']} />,
        },
        {
            menuItem: { key: 'bultin', icon: 'file alternate', content: 'Bultin' }, 
            render: () =><TableGrid tableData={bultinListe} columns={['*','ID','Client','Jour','Temps','Totale','Totale','Voir']} />,
        },
        {
            menuItem: { key: 'edit', icon: 'edit', content: 'Modifier' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><EditClientCard OnKeyPressFunc={OnKeyPressFunc} clientD={clientD} setClientD={setClientD} EditClient={EditClient} delegList={delegList} GetDelegList={GetDelegList} classListe={classListe}  loaderState={loaderState}/></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'verific', icon: 'check', content: 'Verifier' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><FindInDirectory clientD={clientD} RelateToUID={RelateToUID} saveBtnRUIState={saveBtnRUIState} inAbyedhSearch={inAbyedhSearch}  setInAbyedhSearchUID={setInAbyedhSearchUID} FindInDirectoryFunc={FindInDirectoryFunc} loaderState={loaderState} OnKeyPressFunc={OnKeyPressFunc} dataInAbyedh={dataInAbyedh}/></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'print', content: 'Impr.' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><PrintCard PrintFunction={PrintFunction} printPageLoaded={printPageLoaded} /></Tab.Pane><br /></>,
        },
    ]
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    const PrintFunction = (url,frameId) => {
        setPageLoaded(false)
        setUrlToPrint(url);
        
        setTimeout(() => {
            setPageLoaded(true)
        }, 4500);
        usePrintFunction(frameId);
    };
 
    
    /* ############################### UseEffect ################################*/
    useEffect(() => {
        //client Info
        axios.post(`${GConf.ApiLink}/eleve/info`, {
            PID : GConf.PID,
            membreId : CLID
        }).then(function (response) {
            
            if(!response.data.Data.PK) {
                toast.error('Client Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/mb"; }, 2000)
                
            } else {
                
                setClientD(response.data.Data)
                setDefaultEmploi(response.data.Seances)
 
                let seanceTable = []
                response.data.Seances.map( (getData, index) => seanceTable.push([ 
                    _(<TableImage image='seance.png' />),
                    getData.SE_ID,
                    getData.Matiere_Name,
                    getData.T_Name,
                    new Date(getData.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    _(<>{getData.SE_Time_Start} -- {getData.SE_Time_Finish}</>),
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sa/info/${getData.SE_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setSeanceListe(seanceTable)
                 

                let abonnementTable = []
                response.data.Abonnement.map( (getData, index) => abonnementTable.push([ 
                    _(<TableImage image='abonnemment.png' />),
                    getData.AB_ID,
                    response.data.Data.EL_Name,
                    new Date(getData.AB_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.F_Name,
                    getData.Tarif,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ab/info/${getData.AB_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setAbonnemmentListe(abonnementTable)

                let examainTable = []
                response.data.Examain.map( (getData, index) => examainTable.push([ 
                    _(<TableImage image='seance.png' />),
                    getData.EX_ID,
                    getData.Matiere_ID,
                    getData.EX_Genre,
                    getData.Salle_ID,
                    new Date(getData.EX_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.EX_Time_Depart,
                    getData.EX_Time_Finish,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ex/info/${getData.EX_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setExamainListe(examainTable)

                let BultinTable = []
                response.data.Bultin.map( (getData, index) => BultinTable.push([ 
                    _(<TableImage image='abonnemment.png' />),
                    getData.BU_ID,
                    response.data.Data.EL_Name,
                    new Date(getData.BU_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.BU_Time,
                    getData.BU_Saisson,
                    getData.BU_trimestre,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ex/bultain/info/${getData.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setBultinListe(BultinTable)

                let AvertissementTable = []
                response.data.Avertissemnt.map( (getData, index) => AvertissementTable.push([ 
                    _(<TableImage image='seance.png' />),
                    getData.AV_ID,
                    getData.Prof_ID,
                    new Date(getData.AV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.AV_Time,
                    getData.AV_Cause,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/el/avertissemment/info/${getData.AV_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setAvertissemmentListe(AvertissementTable)
                
                let retenueTable = []
                response.data.Retenue.map( (getData, index) => retenueTable.push([ 
                    _(<TableImage image='abonnemment.png' />),
                    getData.RT_ID,
                    getData.T_Name,
                    getData.Matiere_Name,
                    new Date(getData.RT_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    _(<>{getData.RT_Time_De} -- {getData.RT_Time_Vers}</>),
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/el/retenue/info/${getData.RT_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setRetenueListe(retenueTable)


                setLoading(true)
                
            }

        }).catch((error) => {
            if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les info du client  </div></>, GConf.TostInternetGonf)   
            setClientD([])
            setPosition([0,0])
            setLoading(true)
            }
        });

        axios.post(`${GConf.ApiLink}/classes`,{
            PID: GConf.PID
        })
        .then(function (response) {
            setClasseList(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
               
            }
          });

    }, [])


     /* ############################### Functions ################################*/
    const NavigateFunction = (link) => {  navigate(link) }

    const GetDelegList = (value) =>{
        setClientD({...clientD, Gouv: value })
        const found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList(found)
    }
    const EditClient = () =>{
        if (!clientD.EL_Name) {toast.error("Nom et prenon  Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Naissance) {toast.error("Date de naissance Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Genre) {toast.error("Sexe est  Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Classe) {toast.error("Classes est  Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Deleg) {toast.error("Delegation Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Etat_Sanitaire) {toast.error("Etat sanitaire  Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Pere_Nom) {toast.error("Nom du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Pere_Metier) {toast.error("Metier du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Pere_Phone) {toast.error("Phone du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Mere_Nom) {toast.error("Nom du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Mere_Metier) {toast.error("Metier du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Mere_Phone) {toast.error("Phone du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.EL_Parant_Etat_Civle) {toast.error("Etat civile des parant  est Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/eleve/modifier`, {
                PID : GConf.PID,
                clientD : clientD,
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
    const DeleteClientFunc = () =>{
            setLS(true)
            axios.post(`${GConf.ApiLink}/eleve/supprimer`, {
                PID : GConf.PID,
                clientId : CLID,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Client Supprimer !", GConf.TostSuucessGonf)
                    setLS(false)
                    setTimeout(() => {  window.location.href = "/S/cl"; }, 500)
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
    const FindInDirectoryFunc = () =>{
        if (!inAbyedhSearch) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/eleve/checkAbyedhDb`, {
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
            axios.post(`${GConf.ApiLink}/eleve/verification`, {
                PID : GConf.PID,
                UID : inAbyedhSearch,
                EL_ID : CLID,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Client Verifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                    setSaveBtnRUIState(true)
                    setClientD({ ...clientD, Releted_UID: inAbyedhSearch})
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
    const GeneratedTime = () => {
        let curr = new Date()
        let first = curr.getDate() - curr.getDay()
        const TargertDateIs = (dayIndex) => { return new Date(curr.setDate(first + dayIndex)).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}
        const TargertColor = (matiere) => { 
            
            // let targetMat = fullMatiereList.find((data) => data.Matiere_Name === matiere)
            // if (targetMat) {
            //     return targetMat.Matiere_Color
            // } else{
            //     return '#7f7f7f'
            // }
            return '#7f7f7f'
        }
        let reternedListe = []
        //defaultEmploi.map( (getData,index) => (
            defaultEmploi.map((data,index) =>  reternedListe.push({ title: data.SE_Date ,  start: `${TargertDateIs(data.SE_Date)}T${data.SE_Time_Start}` , end: `${TargertDateIs(data.SE_Date)}T${data.SE_Time_Finish}`,  className:'border-0 rounded-0 m-0 p-0', backgroundColor:  TargertColor(data.matiere) })) 
        //))         
        return reternedListe
    }

    /* ############################### Card ################################*/
    const ClientCard = () =>{
        return (<>
            {/* <div className="sticky-top" style={{top:'70px'}}> */}
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-12 col-lg-3  border-end'>
                            <div className="upper">
                                <div className="mcbg-eleve main-big-card"></div>
                            </div>
                            <div className="img-card-container text-center">
                                <div className="card-container-eleve">
                                    <img src="https://cdn.abyedh.com/images/system/garderie/eleve-m.png" className="rounded-circle" width="80" />                    
                                </div>
                            </div>
                            <h4 className='mt-2 text-center'>{loading ? <h3 className='text-danger'>{clientD.EL_Name}</h3> : SKLT.BarreSkl } </h4> 
                        </div>
                        <div className='col-12 col-lg-3 align-self-center border-end'>
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-person-badge"></span> { clientD.EL_ID} </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-calendar-fill"></span> { new Date(clientD.EL_Naissance).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-gender-male"></span> { clientD.EL_Genre} </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-geo-fill"></span> { clientD.Gouv } , ({ clientD.Deleg })</>: SKLT.BarreSkl } </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-collection-fill"></span> { clientD.CL_Name }  </> : SKLT.BarreSkl } </h6>
 
                        </div>
                        <div className='col-12 col-lg-3 align-self-center border-end'>
                            <div className='row text-center'>
                                <div className='col-12'>    
                                    {loading ? 
                                        <div className='text-start'>
                                            <div className='text-secondary'> <span className="bi bi-shield-fill-check"></span> {clientD.Releted_UID ? clientD.Releted_UID : <b className="text-danger">Non Verifie</b>}</div>
                                            <div className='text-secondary'> <span className="bi bi-lungs-fill"></span> {clientD.EL_Etat_Sanitaire}</div>
                                            <div className='text-secondary'> <span className="bi bi-check-circle-fill"></span> {clientD.EL_Resultat}</div>
                                            <div className='text-secondary'> <span className="bi bi-brightness-high"></span> {GConf.currentSeasson}</div>
                                        </div>

                                    : SKLT.BarreSkl }  
                                    
                                </div>
                            </div>

                        </div>
                        <div className='col-12 col-lg-3 align-self-center'>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'> 
                                    {loading ?  
                                        <div className='text-start'>
                                            <div className='text-secondary'> <span className="bi bi-person-fill"></span> {clientD.EL_Pere_Nom}</div>
                                            <div className='text-secondary'> <span className="bi bi-phone"></span> {clientD.EL_Pere_Phone} / {clientD.EL_Pere_Metier}</div>
                                            <div className='text-secondary'> <span className="bi bi-postcard-heart"></span>  {clientD.EL_Pere_Metier}</div>
                                            <div className='text-secondary'> <span className="bi bi-person-fill"></span> {clientD.EL_Mere_Nom}</div>
                                            <div className='text-secondary'> <span className="bi bi-phone"></span> {clientD.EL_Mere_Phone} / {clientD.EL_Mere_Metier}</div>
                                            <div className='text-secondary'> <span className="bi bi-postcard-heart"></span>   {clientD.EL_Mere_Metier}</div>
                                        </div>  
                                    : SKLT.BarreSkl }   
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
 
                </div>
            {/* </div> */}
        </>);
    }
    const PositionCard = () =>{
        return (<>
                    <div className='p-1'>
                            <h5>Location</h5>
                            <MapContainer center={position} zoom={9} scrollWheelZoom={false} className="map-height">
                                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        
                                    </Popup>
                                </Marker>
                            </MapContainer> 
                    </div>
        </>);
    }
    
    const DeleteEleveCard = () =>{
        return(<><h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Ce Camion ?</h3> 
        <div className='row'>
                <div className='col-9'>
                    <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer Un Client : </b></h5>
                    <ul className="text-info text-left">
                    <li>le Client  ne sera pas visible dans la branche 'Clients'</li>
                    <li>Tous les examainListe relier a ce client peut s'endomager   </li>
                    <li>vous ne pouver pas passer ni examainListe ni abonnemmentListes avec ce clients autremment   </li>
                    </ul>
                </div>
                <div className='col-lg-3 d-none d-lg-block align-self-center'>
                    <div className='text-center'>
                            <img src='https://assets.ansl.tn/Images/usful/delete.svg' width='80%'  height='80px' /> 
                    </div> 
                </div>
            </div>
        <div className='text-end'>
            <button type="submit" name="add" className="btn btn-danger rounded-pill"  onClick={DeleteClientFunc}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </button>
        </div></>)
    }
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'W': return <StateCard color='warning' text='En Attent' />;  
            case 'S': return <StateCard color='info' text='Vu' />;  
            case 'A': return <StateCard color='success' text='Acepteé' /> ;
            case 'R': return <StateCard color='danger' text='Refuseé' />;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const CalendarPresence = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
                <h5 className='text-secondary'> <span className='bi bi-calendar-week'></span> Calendrier de Presence </h5>
                <FullCalendar 
                    plugins={[ timeGridPlugin ]}
                    initialView="timeGridWeek"
                    locale='fr' 
                    dayHeaderFormat = {{weekday: 'short'}}
                    events={GeneratedTime()}
                    headerToolbar='false'
                    height='490px'
                    allDaySlot= {false}
                    slotMinTime = '08:00'  
                    slotMaxTime = '18:00' 
                />
            </div> 
        </>)
    }
    return ( <> 
        
         <BreadCrumb links={GConf.BreadCrumb.ClientInfo} />
         <br />
        <div className="row ">
                <div className="col-12 ">
                    <ClientCard /> 
                </div>
                <div className="col-12">
                     <br /> 
                     <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                </div>
        </div>
        <FrameForPrint frameId='mainFrame'  src={urlToPrint} />
        
         

        
     </> );
}

export default ClientInfo;