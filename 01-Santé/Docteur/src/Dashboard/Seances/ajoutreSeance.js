import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab, Form, TextArea} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../AssetsM/Hooks/fetchClient';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import Ripples from 'react-ripples'
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // Updated import statement
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import { QrReader } from 'react-qr-reader';
import { NavLink, useLocation } from 'react-router-dom';
import { _ } from 'gridjs-react';
import { useNavigate} from 'react-router-dom';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint'
import TableImage from '../../AssetsM/Cards/tableImg';

const TerminerCard = ({seanceData, setSeanceData,allClientList,offresListe ,OnKeyPressFunc}) =>{
    const StateDegree = [
        {value : 'En Bonne État', text : 'En Bonne État', key: 1},
        {value : 'Malade', text : 'Malade ', key: 2},
        {value : 'En Réanimation', text : 'En Réanimation', key: 3},
        {value : 'En Soins Palliatifs', text : 'En Soins Palliatifs', key: 4},
        {value : 'En Quarantaine', text : 'En Quarantaine', key: 5},
        {value : 'En Observation',text : 'En Observation', key: 6},
    ]

    const SeanceGenre = [
        {value : 'En Bonne État', text : 'En Bonne État', key: 1},
        {value : 'Malade', text : 'Malade ', key: 2},
        {value : 'En Réanimation', text : 'En Réanimation', key: 3},
        {value : 'En Soins Palliatifs', text : 'En Soins Palliatifs', key: 4},
        {value : 'En Quarantaine', text : 'En Quarantaine', key: 5},
        {value : 'En Observation',text : 'En Observation', key: 6},
    ]
    return (<>
             
                <h5 className='mb-1'><span className='bi bi-calendar-week'></span> Date   </h5>
                <Input   icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.S_Date} onChange={(e) => setSeanceData({...seanceData, S_Date: e.target.value })}/>

                <h5 className='mb-1'><span className='bi bi-thermometer-half'></span> Degreé de Danger  </h5>
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={StateDegree}
                    placeholder={seanceData.State_Degre}
                    className='mb-1'
                    onChange={(e, { value }) => setSeanceData({...seanceData, State_Degre: value })}
                    value={seanceData.State_Degre}
                    
                />
                <h5 className='mb-1'><span className='bi bi-ui-checks-grid'></span> Genre de Seance  </h5>
                {offresListe.length == 0 ? <small> Pas des Genres Enregistreé , <NavLink to='/S/of'>Cliquer Ici</NavLink> Pour le faire </small> : ''} 
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={offresListe}
                    placeholder={seanceData.Forfait_ID}
                    className='mb-1'
                    onChange={(e, { value }) => setSeanceData({...seanceData, Forfait_ID: value })}
                    value={seanceData.Forfait_ID}
                />
 
                
 
    </>)
}
const ResultCard = ({seanceData, setSeanceData,OnKeyPressFunc}) =>{
    return (<> 
                <h5 className='mb-1'><span className='bi bi-person-wheelchair'></span> Maladie   </h5>
                <Input onKeyPress={event => OnKeyPressFunc(event)} icon='wheelchair' type='text' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.Maladie} onChange={(e) => setSeanceData({...seanceData, Maladie: e.target.value })}/>
                <h5 className='mb-1'><span className='bi bi-chat-dots'></span> Resultat : maladie </h5>
                <Form>
                    <TextArea rows={10} placeholder='Maladie' onKeyPress={event => OnKeyPressFunc(event)} value={seanceData.Resultat} onChange={(e) => setSeanceData({...seanceData, Resultat : e.target.value })} />
                </Form>
                <br /> 
             
            
    </>)
}
function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const navigate = useNavigate();
    const isRendyVous = new URLSearchParams(useLocation().search).get('CID')
    const [seanceData, setSeanceData] = useState({S_Patient:'PASSAGER',  Diagnostic: 'Null', Resultat:'', Maladie:'',  Forfait_ID:'', S_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[], analyses:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [gettedOrFID, setOrId] = useState('')
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [analyseNow, setAnalyseNow] = useState([])
    const [articleNow, setArticleNow] = useState([])
    const [articleList] = useGetArticles()
    const [clientList, allClientList] = useGetClients()
    
    const [selectedClient, setSelectedClient] = useState({})
    const [patientRDVListe, setPatientRDVListe] = useState([])
    const [patientSeanceListe, setPatientSeanceListe] = useState([])
    const [patientOrdonanceListe, setPatientOrdonanceListe] = useState([])
    const [autofocusState, setAutoFocus] = useState(false)
    const [scanResultSeance, setScanResultSeance] = useState(false);

    const [commandeData, setCommandeData] = useState(false);
    const [offresListe, setOffreListe] = useState([]);
    const [addUserWay, setAddUserWay] = useState('')
    const panes = [
        {
            menuItem: { key: 'client', icon: 'user', content:  'Selectionnez Patient' }, 
            render: () =><PatientCard />,
        },
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrez Diagnostique' }, 
            render: () => <DiagnostiqueCard />,
        },
        {
            menuItem: { key: 'anaslyse', icon: 'chart bar', content:  'Faire Analyses' }, 
            render: () =><AnalysesCard  />,
        },
        {
            menuItem: { key: 'clidsgent', icon: 'list alternate outline', content:  'Ecrire Ordonance' }, 
            render: () =><OrdonanceCard  />,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer Le  Resultat' }, 
            render: () =><><div className='card card-body shadow-sm mb-2 border-div'>
                                <div className='row'>
                                    <div className='col-12 col-lg-7'>
                                        <ResultCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList} allClientList={allClientList}  OnKeyPressFunc={OnKeyPressFunc} />
                                        
                                    </div>
                                    <div className='col-12 col-lg-5 align-self-center'>
                                            <TerminerCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList} offresListe={offresListe} allClientList={allClientList}   OnKeyPressFunc={OnKeyPressFunc} />
                                            <br />
                                            <div className='row mb-2'>
                                                <div className='col-12'>
                                                    <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveSeance}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className='col-12'>
                                                    <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState} fluid onClick={(e) => PrintFunction('printOrdonance')}><Icon name='print' /> Imprimer Ordonance</Button>
                                                </div>
                                            </div>
                                            
                                    </div>
                                </div>
                            </div></> ,
        }
        
    ]
    const patientPanes = [
        {
            menuItem: { key: 'start',   content: 'Seances ' }, 
            render: () =>  <TableGrid tableData={patientSeanceListe} columns={["*","ID ","Date","Temps","Info"]} /> ,
        },
        {
            menuItem: { key: 'anaslyse',  content:  'RendyVous' }, 
            render: () =><TableGrid tableData={patientRDVListe} columns={["*","ID ","Date","Temps","Info"]} />,
        },
        {
            menuItem: { key: 'clidsgent',   content:  'Ordonance' }, 
            render: () =><TableGrid tableData={patientOrdonanceListe} columns={["*","ID ","Date","Temps","Info"]} />,
        },
 
        
    ]
    const selectMainPanes = [
        {
            menuItem: { key: 'Pa',   content: <><span className='bi bi-person'></span></> }, 
            render: () =>  <SelectPatientCard /> ,
        },
        {
            menuItem: { key: 'vsdsd',  content:  <><span className='bi bi-qr-code'></span></>  }, 
            render: () =><SelectPatientBYQRCard />,
        },
        {
            menuItem: { key: 'sdsd',   content:  <><span className='bi bi-calendar'></span></>  }, 
            render: () =><SelectRDVCard />,
        },
 
        
    ]
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
        if (isRendyVous) {
            axios.post(`${GConf.ApiLink}/request/info`,{
                PID :GConf.PID,
                CID: isRendyVous
            })
            .then(function (response) {
                 
                setCommandeData(response.data[0])
            }).catch((error) => {
            if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
            });
        }
        axios.post(`${GConf.ApiLink}/forfait`,{
            PID :GConf.PID,
             
        })
        .then(function (response) {
            let TableNow = []
            response.data.map( (dta) => {TableNow.push({text : dta.Tarif_Name, value : dta.Tarif_ID, key: dta.PK})})
            setOffreListe(TableNow)
        }).catch((error) => {
        if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)   
        }
        });
    }, [])

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
    }
    const AddAnalyseToListe = ()=>{
        if (!analyseNow.Grandeur) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!analyseNow.Valeur || analyseNow.Valeur == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else{
                let arrayToAdd = {id: seanceData.analyses.length + 1 , PK: analyseNow.PK, Grandeur: analyseNow.Grandeur, Valeur: analyseNow.Valeur }
                seanceData.analyses.push(arrayToAdd)
                setAnalyseNow([])
        }
    }
    const AddMedicammentToListe = ()=>{
        if (!articleNow.PK) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Nom || articleNow.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Emploi_Mode || articleNow.Emploi_Mode == '') {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
        else{
                let arrayToAdd = {id: seanceData.ordonance.length + 1 , PK: articleNow.PK, Nom: articleNow.Nom, Dosage: articleNow.Dosage, Forme: articleNow.Forme, Presentation: articleNow.Presentation, Emploi_Mode: articleNow.Emploi_Mode}
                seanceData.ordonance.push(arrayToAdd)
                setArticleNow([])
        }
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= seanceData.ordonance.findIndex((article) => article.PK == value);
        seanceData.ordonance.splice(searchObject, 1);
        let resteArticles = seanceData.ordonance;
        setSeanceData({...seanceData, ordonance: resteArticles })


    }
    const GetMedicammentData = (value) =>{
        const searchObject = articleList.find((article) => article.PK == value);
        if (searchObject) {
            setArticleNow(searchObject);
            setAutoFocus(true)
            
        }else{
            toast.error('Article Indéfine ', GConf.TostSuucessGonf)
        }
    }
    const SaveSeance = () =>{
            if (!seanceData.Diagnostic ) {toast.error("Diagnostique est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.S_Patient) {toast.error("Patient De est Invalide !", GConf.TostErrorGonf)}
            // else if (!seanceData.Maladie) {toast.error("Maladie vers est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.Resultat) {toast.error("Resultat  est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.State_Degre) {toast.error("Dnager   est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.S_Date) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.ordonance  ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/ajouter`, {
                    PID : GConf.PID,
                    seanceData: {S_Patient: seanceData.S_Patient, Forfait_ID: seanceData.Forfait_ID,  Diagnostic: GenerateDiagnostiqueHTml(), Resultat:seanceData.Resultat, Maladie:seanceData.Maladie,  S_Date: seanceData.S_Date , State_Degre: seanceData.State_Degre , ordonance:seanceData.ordonance, analyses:seanceData.analyses} ,
                })
                .then(function (response) {
                    if(response.status = 200) {
                        setOrId(response.data.FID)
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
                      Offline.SeanceToSave.push(seanceData)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)
                    }
                  });

            }       
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    const SelectClientFunction = (value) => {
        if (value) {
            setSeanceData({...seanceData, S_Patient: value })
            let filtedClient = allClientList.find((data) => data.PA_ID == value)
            setSelectedClient(filtedClient)
            
            axios.post(`${GConf.ApiLink}/patient/info`,{PID :GConf.PID, patientId: value})
            .then(function (response) {
                console.log(response.data.Seances)
                let seanceCont = []
                response.data.Seances.map( (getData) => {seanceCont.push([
                    _(<TableImage image='seance.png' />),
                    getData.S_ID,
                    new Date(getData.S_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.S_Time,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' icon onClick={ (e) => openCustomWindow(`/S/sa/info/${getData.S_ID}`)}><span className='d-none d-lg-inline'></span><Icon  name='arrows alternate' /></Button>)
                    ],)})
                setPatientSeanceListe(seanceCont)

                let rdvCont = []
                response.data.RDV.map( (getData) => {rdvCont.push([
                    _(<TableImage image='rendyvous.png' />),
                    getData.R_ID,
                    new Date(getData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.RDV_Time,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' icon onClick={ (e) => openCustomWindow(`/S/rq/rs/info/${getData.R_ID}`)}><span className='d-none d-lg-inline'></span><Icon  name='arrows alternate' /></Button>)
                    ],)})
                setPatientRDVListe(rdvCont)

                let ordonanceCont = []
                response.data.Ordonance.map( (getData) => {ordonanceCont.push([
                    _(<TableImage image='ordonance.png' />),
                    getData.OR_ID,
                    new Date(getData.OR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.OR_Time,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' icon onClick={ (e) => openCustomWindow(`/S/or/info/${getData.OR_ID}`)}><span className='d-none d-lg-inline'></span><Icon  name='arrows alternate' /></Button>)
                    ],)})
                setPatientOrdonanceListe(ordonanceCont)

            }).catch((error) => {
            if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
            });
        }
    }
    const openCustomWindow = (link) => {
        const width = 800;
        const height = 600;
        const url = `https://docteur.system.abyedh.tn${link}`;
    
        // Open the link in a new window with custom width and height
        window.open(url, '_blank', `width=${width}, height=${height}`);
      }

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

    const AddArticles = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5>Ajouter article</h5> 
                    <datalist id="articlesList">
                            {articleList.map((test,index) =>
                            <option key={index} value={test.PK}>{test.Nom} : {test.Dosage} - {test.Forme} - {test.Presentation}  </option>
                            )}
                    </datalist>
                    <Input icon='pin' list="articlesList" onKeyPress={event => OnKeyPressFunc(event)}  placeholder='Entre Medicamment'  onBlur={ (e) => GetMedicammentData(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1' /> 
                    <div className='m-2 mb-0 text-secondary'><b> <span className='bi bi-upc '></span> Code a barre : {articleNow.PK} </b></div>
                    <div className='m-2 mb-0 text-danger'><b><span className='bi bi-star-fill '></span> Nom : {articleNow.Nom} </b></div> 
                    <div className='m-2 mb-0 text-info'><b><span className='bi bi-star-fill '></span> Dosage : {articleNow.Dosage} </b></div> 
                    <div className='m-2 mb-0 text-primary'><b><span className='bi bi-star-fill '></span> Forme : {articleNow.Forme} </b></div> 
                    <div className='m-2 mb-2 text-warning'><b><span className='bi bi-star-fill '></span> Presentation : {articleNow.Presentation} </b></div> 
                     
                    <div className='row'>
                       <div className='col-12'>  <Input icon='dropbox' onKeyPress={event => OnKeyPressFunc(event)} type='text' value={articleNow.Emploi_Mode} autoFocus={autofocusState} onChange={ (e) => {articleNow.Emploi_Mode = e.target.value}} size="small" iconPosition='left' placeholder={`Mode d'emploi`}  fluid className='mb-1' /> </div> 
                    </div>
                    
                    <br />
                    <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddMedicammentToListe}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
        </>)
    }
    const ArticleListCard = (props) =>{
        return(<>
                    <Ripples className='d-block p-0 mb-1 rounded-pill' >   
                    <div className='card shadow-sm p-2   rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-6 text-start align-self-center'>
                                <div>{props.dataA.Nom}*{props.dataA.Dosage}</div> 
                                <small>{props.dataA.Forme}</small>
                            </div>
                            <div className='col-5 align-self-center'><b>{props.dataA.Emploi_Mode}</b></div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' disabled={saveBtnState} onClick={() => DeleteFromUpdateList(props.dataA.PK)}></Button></div>
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
    const OrdonanceCard = () =>{
        return(<>
                <div className='row'>
                    <div className='col-12 col-lg-5'>
                        <div className="mb-4 sticky-top" style={{top:'70px'}}>
                            <AddArticles  />        
                        </div>
                    </div>
                    <div className='col-12 col-lg-7'>
                            <h5>Listes des Medicamment</h5>    
                            {seanceData.ordonance.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                            <br />
                            
                    </div>
                </div>
            </>)
    }

    const AddAnalyse = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5>Ajouter Grandeur</h5> 
                    <Input icon='pin' onKeyPress={event => OnKeyPressFunc(event)}  placeholder='Grandeur'  value={analyseNow.Grandeur}  onChange={ (e) => {analyseNow.Grandeur = e.target.value}} size="small" iconPosition='left'   fluid className='mb-1' />                     
                    <Input icon='dropbox' onKeyPress={event => OnKeyPressFunc(event)} type='text' value={analyseNow.valeur} autoFocus={autofocusState}  onChange={ (e) => {analyseNow.Valeur = e.target.value}}  size="small" iconPosition='left' placeholder='Valeur'  fluid className='mb-1' />
                    
                    <br />
                    <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddAnalyseToListe}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
        </>)
    }
    const AnalyseListCard = (props) =>{
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
    const AnalysesCard = () =>{
        return(<>
                <div className='row'>
                    <div className='col-12 col-lg-5'>
                        <div className="mb-4 sticky-top" style={{top:'70px'}}>
                            <AddAnalyse  />        
                        </div>
                    </div>
                    <div className='col-12 col-lg-7'>
                            <h5>Listes des Analyses</h5>    
                            {seanceData.analyses.map( (val) => <AnalyseListCard key={val.id} dataA={val}/>)}
                            <br />
                            
                    </div>
                </div>
            </>)
    }
    const StateCard = ({ status }) => {
        
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'UID': return <SelectPatientBYQRCard />;  
            case 'RID': return <SelectRDVCard />;  
             
            default:  return <></>;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    }

    const SelectPatientCard = () => {
        return(<>
            <h5>Patient </h5> 
            <datalist id="clientList">
                    {allClientList.map((test,index) =>
                    <option key={index} value={test.PA_ID}>{test.PA_Name} : {test.Phone}</option>
                    )}
            </datalist>
            <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={seanceData.S_Patient}   onBlur={ (e) => SelectClientFunction(e.target.value) } size="small" iconPosition='left'   fluid className='mb-1' />
            <div className='row mt-2'>
                <div className='col-6'><Button fluid onClick={() => setAddUserWay('UID')}><span className='bi bi-qr-code-scan'></span> Patient UID</Button></div>
                <div className='col-6'><Button fluid onClick={() => setAddUserWay('RID')}><span className='bi bi-qr-code'></span> Rendy-Vous </Button></div>
                <div className='col-12'>
                    <StateCard status={addUserWay} />
                </div>
            </div>
            <h4 className='mb-1'>Nom: {selectedClient.PA_Name  ? selectedClient.PA_Name  : ''}</h4>
            <h4 className='mb-1 mt-1'>Phone: {selectedClient.Phone  ? selectedClient.Phone  : ''}</h4>
            <h4 className='mt-1 mb-1'>Adresse : {selectedClient.Adress  ? selectedClient.Adress  : ''} </h4>
            <h4 className='mt-1 mb-1'>Nombre de Seance  : {patientSeanceListe.length} </h4>
             
            
        </>)
    }
    const SelectPatientBYQRCard = () => {
        return(<>
            <h5 className='mt-2 mb-0 text-center text-secondary'>Scannez Le UID du Patient</h5>
            <QrReader
                constraints={{  facingMode: 'environment' }}
                scanDelay={500}
                onResult={(result, error) => {
                if (!!result) {  SelectClientFunction(result.text); setScanResultSeance(false) }
                if (!!error) { console.log(error);  }
                }}
                style={{  width: "150px",height: "150px" }}
            />

        </>)
    }
    const SelectRDVCard = () => {
        return(<>
            <h5 className='mt-2 mb-0 text-center text-secondary' >Scannez Le Code du Rendy-Vous</h5>
            <QrReader
                    constraints={{  facingMode: 'environment' }}
                    scanDelay={500}
                    onResult={(result, error) => {
                    if (!!result) {  SelectClientFunction(result.text); setScanResultSeance(false) }
                    if (!!error) { console.log(error);  }
                    }}
                    style={{  width: "150px",height: "150px" }}
            />
                
        </>)
    }
    const PatientCard = () => {
        return(<>
        
            <div className='row mb-4'>
                    <div className='col-12 col-md-4'>
                        
                        <div className='card card-body md-3 shadow-sm border-div'>
                            <SelectPatientCard />
                            
                        </div>
                    </div>
                    <div className='col-12 col-md-8'>  
                        <Tab menu={{ secondary: true, pointing: true  }} panes={patientPanes} />
                    </div>
            </div>
        </>)
    }
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
 
        <Tab menu={{widths: panes.length,  secondary: true  }} panes={panes} />
        
        <FrameForPrint frameId='printOrdonance' src={`/Pr/ordonance/info/${gettedOrFID}`} />
    </> );
    }

export default AjouterFacture;