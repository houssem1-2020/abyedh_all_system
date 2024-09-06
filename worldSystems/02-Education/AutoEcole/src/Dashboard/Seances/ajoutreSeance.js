import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab, Form, TextArea} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../AssetsM/Hooks/fetchClient';
import Ripples from 'react-ripples'
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // Updated import statement
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { NavLink, useLocation } from 'react-router-dom';
import { _ } from 'gridjs-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const TerminerCard = ({seanceData, setSeanceData,offresListe , voitureListe, moniteurListe, OnKeyPressFunc}) =>{
    const [condidatNow, setCondidatNow] = useState([])
    const [carNow, setCarNow] = useState([])
    const [moniteurNow, setMoniteurNow] = useState([])
    
    const StateDegree = [
        {id:1, value :'Theorique', text:'Theorique'},
        {id:2, value :'Pratique', text:'Pratique'},
    ]

    const SelectCondidatFunction = (value) => {
        if (value) {
            setSeanceData({...seanceData, SE_Abonnemment: value })
            let filtedClient = offresListe.find((data) => data.AB_ID == value)
            setCondidatNow(filtedClient)
        }
    }

    const SelectCarFunction = (value) => {
        if (value) {
            setSeanceData({...seanceData, Voiture_ID: value })
            let filtedClient = voitureListe.find((data) => data.VO_ID == value)
            setCarNow(filtedClient)
        }
    }
    const SelectMoniteurFunction = (value) => {
        if (value) {
            setSeanceData({...seanceData, Moniteur_ID: value })
            let filtedClient = moniteurListe.find((data) => data.T_ID == value)
            setMoniteurNow(filtedClient)
        }
    }

    return (<>

                <h5 className='mb-1'><span className='bi bi-calendar-week'></span> Date   </h5>
                <Input   icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.SE_Date} onChange={(e) => setSeanceData({...seanceData, SE_Date: e.target.value })}/>

                <h5 className='mb-1'><span className='bi bi-thermometer-half'></span> Genre de Seance  </h5>
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={StateDegree}
                    placeholder={seanceData.SE_Genre}
                    className='mb-1'
                    onChange={(e, { value }) => setSeanceData({...seanceData, SE_Genre: value })}
                    value={seanceData.SE_Genre}
                    
                />
                <h5 className='mb-1'><span className='bi bi-ui-checks-grid'></span> Abonnemment  </h5>
                {offresListe.length == 0 ? <small> Pas des Abonnemment Enregistreé , <NavLink to='/S/ab/ajouter'>Cliquer Ici</NavLink> Pour le faire </small> : ''} 
                <datalist id="abonnemmentListe">
                    {offresListe.map((test,index) =>
                        <option key={index} value={test.AB_ID}>{test.CD_Name} : {test.AB_Permis} -  {test.F_Name}</option>
                    )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="abonnemmentListe" placeholder={seanceData.SE_Abonnemment}   onBlur={ (e) => SelectCondidatFunction(e.target.value) } size="small" iconPosition='left'   fluid className='mb-1' />
                        <div className='p-2  rounded mb-4 mt-0 mb-3 bg-gray'>
                            <div className='row '>
                                <div className='col-4 '> <span className='bi bi-card-text'></span> Permis  :  {condidatNow.AB_Permis  ? condidatNow.AB_Permis  : ''}</div>
                                <div className='col-8 '> <span className='bi bi-person-fill'></span> Condidat : {condidatNow.CD_Name  ? condidatNow.CD_Name  : ''} </div>
                            </div>
                        </div>


                <h5 className='mb-1'><span className='bi bi-car-front'></span> Voiture  </h5>
                {voitureListe.length == 0 ? <small> Pas des Voiture Enregistreé , <NavLink to='/S/vo/ajouter'>Cliquer Ici</NavLink> Pour le faire </small> : ''} 
                <datalist id="voitureListe">
                    {voitureListe.map((test,index) =>
                        <option key={index} value={test.VO_ID}>{test.VO_Name} : {test.VO_Matricule} -  {test.VO_Genre}</option>
                    )}
                </datalist>
                <Input icon='car' onKeyPress={event => OnKeyPressFunc(event)} list="voitureListe" placeholder={seanceData.Voiture_ID}   onBlur={ (e) => SelectCarFunction(e.target.value) } size="small" iconPosition='left'   fluid className='mb-1' />
                        <div className='p-2  rounded mb-4 mt-0 mb-3 bg-gray'>
                            <div className='row '>
                                <div className='col-6 '> <span className='bi bi-car-front'></span> Voiture  :  {carNow.VO_Name  ? carNow.VO_Name  : ''}</div>
                                <div className='col-6 '> <span className='bi bi-textarea-t'></span> Matricule : {carNow.VO_Matricule  ? carNow.VO_Matricule  : ''} </div>
                            </div> 
                        </div>   

                <h5 className='mb-1'><span className='bi bi-people'></span> Moniteur   </h5>
                {moniteurListe.length == 0 ? <small> Pas des Moniteur Enregistreé , <NavLink to='/S/tm/ajouter'>Cliquer Ici</NavLink> Pour le faire </small> : ''} 
                <datalist id="moniteurListe">
                    {moniteurListe.map((test,index) =>
                        <option key={index} value={test.T_ID}>{test.T_Name} : {test.T_Phone} -  {test.Poste}</option>
                    )}
                </datalist>
                <Input icon='group' onKeyPress={event => OnKeyPressFunc(event)} list="moniteurListe" placeholder={seanceData.Moniteur_ID}   onBlur={ (e) => SelectMoniteurFunction(e.target.value) } size="small" iconPosition='left'   fluid className='mb-1' />
                        <div className='p-2  rounded mb-4 mt-0 mb-3 bg-gray'>
                            <div className='row '>
                                <div className='col-6 '> <span className='bi bi-person-fill'></span> Moniteur  :  {moniteurNow.T_Name  ? moniteurNow.T_Name  : ''}</div>
                                <div className='col-6 '> <span className='bi bi-star-fill'></span> Poste : {moniteurNow.Poste  ? moniteurNow.Poste  : ''} </div>
                            </div>
                        </div>
    </>)
}
function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [seanceData, setSeanceData] = useState({SE_Condidat:'PASSAGER',  Remarques: 'Null', SE_Abonnemment:'', SE_Genre:'',  Moniteur_ID:'', SE_Date: Today.toISOString().split('T')[0], 	Voiture_ID: '' , trajetListe:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [clientList, allClientList] = useGetClients()
    const [offresListe, setOffreListe] = useState([]);
    const [moniteurListe, setMoniteurListe] = useState([]);
    const [voitureListe, setVoitureListe] = useState([]);
    const [positions, setPositions] = useState([]);
    const [recording, setRecording] = useState(false);
    const [analyseNow, setAnalyseNow] = useState([])
    const [autofocusState, setAutoFocus] = useState(false)
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
    const panes = [        
        {
            menuItem: { key: 'anaslyse', icon: 'chart bar', content:  'Enreg. Positions' }, 
            render: () =><RecordMapCard  />,
        },
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrez Remarques' }, 
            render: () => <DiagnostiqueCard />,
        },
        // {
        //     menuItem: { key: 'anaslyse', icon: 'chart bar', content:  'Code Activite' }, 
        //     render: () =><CodeActiviteCard  />,
        // },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer ' }, 
            render: () =><><div className='card card-body shadow-sm mb-2 border-div'>
                                <div className='row'>
                                    <div className='col-12 col-lg-5 '>
                                            <TerminerCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList} offresListe={offresListe} voitureListe={voitureListe} moniteurListe={moniteurListe}  OnKeyPressFunc={OnKeyPressFunc} />
                                            <br />
                                            <div className='row mb-2'>
                                                <div className='col-12'>
                                                    <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveSeance}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                                                </div>
                                            </div>
                                    </div>
                                    <div className='col-12 col-lg-7 '>
                                        <div className='p-2'>
                                            <h5 className='mb-1'><span className='bi bi-calendar-week'></span> Remarque    </h5>
                                            <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(diagnostiqueValue.getCurrentContent())) }}></div>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div></> ,
        }
        
    ]
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/abonnement`,{
            PID :GConf.PID,
        })
        .then(function (response) {
            setOffreListe(response.data)
        }).catch((error) => {
        if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)   
        }
        });

        axios.post(`${GConf.ApiLink}/voitures`,{
            PID :GConf.PID,
        })
        .then(function (response) {
            setVoitureListe(response.data)
        }).catch((error) => {
        if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)   
        }
        });

        axios.post(`${GConf.ApiLink}/team`,{
            PID :GConf.PID,
        })
        .then(function (response) {
            setMoniteurListe(response.data)
        }).catch((error) => {
        if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)   
        }
        });
    }, [])

    /*#########################[Function]##################################*/
    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
    }
    const SaveSeance = () =>{
            if (!seanceData.Remarques ) {toast.error("Diagnostique est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.SE_Condidat) {toast.error("Patient De est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.SE_Genre) {toast.error("SE_Genre vers est Invalide !", GConf.TostErrorGonf)}
 
            else if (!seanceData.SE_Abonnemment) {toast.error("Dnager   est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.SE_Date) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/ajouter`, {
                    PID : GConf.PID,
                    seanceData: {Moniteur_ID: seanceData.Moniteur_ID,  SE_Activite: GenerateDiagnostiqueHTml(),  SE_Genre:seanceData.SE_Genre,  SE_Abonnemment:seanceData.SE_Abonnemment,  SE_Date: seanceData.SE_Date ,  Moniteur_ID:seanceData.Moniteur_ID,	Voiture_ID: seanceData.Voiture_ID ,  trajetListe:positions} ,
                })
                .then(function (response) {
                    console.log(response.data)
                    if(response.status = 200) {
                         
                        setSaveBtnState(true)
                        toast.success("Seance Enregistreé !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> La Seance sera enregistrer sur votre ordinateur    </div></>, GConf.TostInternetGonf)   
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
    const AddCodeActiviteToListe = ()=>{
        if (!analyseNow.Grandeur) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!analyseNow.Valeur || analyseNow.Valeur == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else{
                let arrayToAdd = {id: seanceData.analyses.length + 1 , PK: analyseNow.PK, Grandeur: analyseNow.Grandeur, Valeur: analyseNow.Valeur }
                seanceData.analyses.push(arrayToAdd)
                setAnalyseNow([])
        }
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= seanceData.ordonance.findIndex((article) => article.PK == value);
        seanceData.ordonance.splice(searchObject, 1);
        let resteArticles = seanceData.ordonance;
        setSeanceData({...seanceData, ordonance: resteArticles })


    }
    useEffect(() => {
        let intervalId;

        const fetchPosition = () => {
            navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPositions(prevPositions => [
                ...prevPositions,
                {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    targetTime: new Date().toISOString() // Save timestamp
                }
                ]);
                
            },
            (err) => console.error(err)
            );
            
        };

        if (recording) {
            intervalId = setInterval(fetchPosition, 2000);
             
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [recording]);
    
 

   /*#########################[Card]##################################*/
    const DiagnostiqueCard = () =>{
        const AddStar = (textToAdd) => {
            const currentContent = diagnostiqueValue.getCurrentContent();
            const selectionState = diagnostiqueValue.getSelection();
            const contentWithText = Modifier.insertText(
              currentContent,
              selectionState,
              textToAdd
            );
            const newEditorState = EditorState.push(
              diagnostiqueValue,
              contentWithText,
              'insert-characters'
            );
            setDiagnistiqueValue(newEditorState);
          };

        const CustomOption = () =>{
            return(<>
                <div className='bg-white rounded p-1 m-1' onClick={() => AddStar('Poid')}>⭐ Poid</div>
                <div className='bg-white rounded p-1 m-1' onClick={() => AddStar('Diabéte')}>⭐ Poid</div>
            </>)
        }
        return (<>
                <div className='card card-body shadow-sm border-div '>
                    <h5>Diagnostique  </h5>
                    <Editor
                        toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            //textAlign: { inDropdown: true },
                            //link: { inDropdown: true },
                            // history: { inDropdown: true },
                            toolbarCustomButtons: { inDropdown: true },
                          }}
                        editorState={diagnostiqueValue}
                        toolbarClassName="toolbarClassName border-div p-3 pb-2 bg-system text-dark"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setDiagnistiqueValue}
                        // toolbarCustomButtons={[<CustomOption />]}
                    />
                    <br />
                    <br />
                    <br />
                    {/* <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={() => GenerateDiagnostiqueHTml()}>  <Icon name='edit outline' /> Ajouter</Button> */}
                </div>
        </>)
    }
    const MapRcordingButtonCard = () =>{
        return (<>
                    <h5> <span className='bi bi-circle-fill text-danger'></span> Enregistrer Positions</h5> 
                    Nombre de record : {positions.length}
                    <div className='row'>
                        <div className='col-12 col-lg'><Button fluid disabled={saveBtnState} className='rounded-pill bg-success text-white mb-2' onClick={() => setRecording(true)}>  <Icon name='play' /> Commencer </Button></div>
                        <div className='col-12 col-lg'><Button fluid disabled={saveBtnState} className='rounded-pill bg-danger text-white mb-2' onClick={() => setRecording(false)}>  <Icon name='stop' /> Terminer </Button></div>
                        <div className='col-12 col-lg'><Button fluid disabled={saveBtnState} className='rounded-pill bg-secondary text-white mb-2' onClick={() => localStorage.setItem('recordedPositions', JSON.stringify(positions))}>  <Icon name='save' /> Sauvgarder  </Button></div>
                        <div className='col-12 col-lg'><Button fluid disabled={saveBtnState} className='rounded-pill bg-warning text-white mb-2' onClick={() => localStorage.removeItem('recordedPositions')}>  <Icon name='trash' /> Nettoyer  </Button></div>
                        <div className='col-12 col-lg'><Button fluid disabled={recording || !localStorage.getItem('recordedPositions')} className='rounded-pill bg-info text-white' onClick={() => setPositions(JSON.parse(localStorage.getItem('recordedPositions')))}>  <Icon name='save' /> Charger Pos.  </Button></div>
                     </div> 
        </>)
    }
    const RecordMapCard = () =>{
        return(<>
                <div className='card card-body mb-2 shadow-sm border-div'>
                    
                            <MapRcordingButtonCard  /> 
                            <br />          
                            <MapContainer center={positions.length == 0 ? [36.17720,9.12337] : [positions[0].latitude, positions[0].longitude]} zoom={15} scrollWheelZoom={false} className="map-height-lg" >
                                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {positions.map( (cord,i) => <Marker key={i} position={[cord.latitude, cord.longitude]}> <Popup>{cord.targetTime}</Popup></Marker> )}
                            </MapContainer>
                            <br /> 
                            <br /> 
                </div>
            </>)
    }
    const AddCodeActivite = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5>Ajouter Grandeur</h5> 
                    <Input onKeyPress={event => OnKeyPressFunc(event)} icon='pin'   placeholder='Grandeur'  value={analyseNow.Grandeur}  onChange={ (e) => {analyseNow.Grandeur = e.target.value}} size="small" iconPosition='left'   fluid className='mb-1' />                     
                    <Input onKeyPress={event => OnKeyPressFunc(event)} icon='dropbox' type='text' value={analyseNow.valeur} autoFocus={autofocusState}  onChange={ (e) => {analyseNow.Valeur = e.target.value}}  size="small" iconPosition='left' placeholder='Valeur'  fluid className='mb-1' />
                    
                    <br />
                    <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddCodeActiviteToListe}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
        </>)
    }
    const CodeActiviteListeCard = (props) =>{
        return(<>
                    <Ripples className='d-block p-0 mb-1 rounded-pill' >   
                    <div className='card shadow-sm p-2   rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-6 text-start align-self-center'>
                                <div>{props.dataA.Nom}*{props.dataA.Grandeur}</div> 
                                <small>{props.dataA.Forme}</small>
                            </div>
                            <div className='col-5 align-self-center'><b>{props.dataA.Valeur}</b></div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' disabled={saveBtnState} onClick={() => DeleteFromUpdateList(props.dataA.PK)}></Button></div>
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
    const CodeActiviteCard = () =>{
        return(<>
                <div className='row'>
                    <div className='col-12 col-lg-5'>
                        <div className="mb-4 sticky-top" style={{top:'70px'}}>
                            <AddCodeActivite  />        
                        </div>
                    </div>
                    <div className='col-12 col-lg-7'>
                            <h5>Listes des Analyses</h5>    
                            {seanceData.analyses.map( (val) => <CodeActiviteListeCard key={val.id} dataA={val}/>)}
                            <br />
                            
                    </div>
                </div>
            </>)
    }
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
 
        <Tab menu={{secondary: true  }} panes={panes} />
    
    </> );
    }

export default AjouterFacture;