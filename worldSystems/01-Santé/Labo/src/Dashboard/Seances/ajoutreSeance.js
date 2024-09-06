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
import { useTranslation, Trans } from 'react-i18next';

const TerminerCard = ({seanceData, setSeanceData,allClientList,offresListe ,OnKeyPressFunc}) =>{
    const { t, i18n } = useTranslation();
    const StateDegree = [
        {value : 'En Bonne État', text : t(`menuTabs.seancePage.maladieStateItems.Bonne`), key: 1},
        {value : 'Malade', text : t(`menuTabs.seancePage.maladieStateItems.Malade`) , key: 2},
        {value : 'En Réanimation', text : t(`menuTabs.seancePage.maladieStateItems.Reanimation`) , key: 3},
        {value : 'En Soins Palliatifs', text : t(`menuTabs.seancePage.maladieStateItems.Palliatifs`) , key: 4},
        {value : 'En Quarantaine', text : t(`menuTabs.seancePage.maladieStateItems.Quarantaine`), key: 5},
        {value : 'En Observation',text : t(`menuTabs.seancePage.maladieStateItems.Observation`) , key: 6},
    ]
    return (<>
             
                <h5 className='mb-1'><span className='bi bi-calendar-week'></span> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.date')}   </h5>
                <Input   icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.S_Date} onChange={(e) => setSeanceData({...seanceData, S_Date: e.target.value })}/>

                <h5 className='mb-1'><span className='bi bi-thermometer-half'></span> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.degre')}   </h5>
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
                <h5 className='mb-1'><span className='bi bi-ui-checks-grid'></span> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.genre')}   </h5>
                {offresListe.length == 0 ? <small> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.pasGenre.one')} , <NavLink to='/S/of'>{t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.pasGenre.two')} </NavLink>{t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.pasGenre.three')}  </small> : ''} 
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
    const { t, i18n } = useTranslation();
    return (<> 
                <h5 className='mb-1'><span className='bi bi-person-wheelchair'></span> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.maladie')}   </h5>
                <Input onKeyPress={event => OnKeyPressFunc(event)} icon='wheelchair' type='text' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.Maladie} onChange={(e) => setSeanceData({...seanceData, Maladie: e.target.value })}/>
                <h5 className='mb-1'><span className='bi bi-chat-dots'></span> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.resultat')}   </h5>
                <Form>
                    <TextArea rows={10} placeholder={t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.resultatPlch')} onKeyPress={event => OnKeyPressFunc(event)} value={seanceData.Resultat} onChange={(e) => setSeanceData({...seanceData, Resultat : e.target.value })} />
                </Form>
                <br /> 
             
            
    </>)
}
function AjouterFacture() {
    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
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
            menuItem: { key: 'client', icon: 'user',  content:  t('menuTabs.seancePage.addSeanceInfo.tabsName.selectPat') }, 
            render: () =><PatientCard />,
        },
        {
            menuItem: { key: 'start', icon: 'add circle', content: t('menuTabs.seancePage.addSeanceInfo.tabsName.diagnostique') }, 
            render: () => <DiagnostiqueCard />,
        },
        {
            menuItem: { key: 'anaslyse', icon: 'chart bar', content:  t('menuTabs.seancePage.addSeanceInfo.tabsName.analyse') }, 
            render: () =><AnalysesCard  />,
        },
        {
            menuItem: { key: 'clidsgent', icon: 'list alternate outline', content:  t('menuTabs.seancePage.addSeanceInfo.tabsName.ordonance') }, 
            render: () =><OrdonanceCard  />,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  t('menuTabs.seancePage.addSeanceInfo.tabsName.terminer') }, 
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
                                                    <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveSeance}><Icon name='save' /> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.saveBtn')}  <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className='col-12'>
                                                    <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState} fluid onClick={(e) => PrintFunction('printOrdonance')}><Icon name='print' /> {t('menuTabs.seancePage.addSeanceInfo.terminerTabsData.printBtn')} </Button>
                                                </div>
                                            </div>
                                            
                                    </div>
                                </div>
                            </div></> ,
        }
        
    ]
    const patientPanes = [
        {
            menuItem: { key: 'start',   content: t('menuTabs.seancePage.addSeanceInfo.selectTabsData.leftTabs.seance') }, 
            render: () =>  <TableGrid notCard tableData={patientSeanceListe} columns={t(`menuTabs.seancePage.addSeanceInfo.selectTabsData.leftTabs.tableHearder`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} /> ,
        },
        {
            menuItem: { key: 'anaslyse',  content:  t('menuTabs.seancePage.addSeanceInfo.selectTabsData.leftTabs.rdv') }, 
            render: () =><TableGrid notCard tableData={patientRDVListe} columns={t(`menuTabs.seancePage.addSeanceInfo.selectTabsData.leftTabs.tableHearder`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
        },
        {
            menuItem: { key: 'clidsgent',   content:  t('menuTabs.seancePage.addSeanceInfo.selectTabsData.leftTabs.ordonance') }, 
            render: () =><TableGrid notCard tableData={patientOrdonanceListe} columns={t(`menuTabs.seancePage.addSeanceInfo.selectTabsData.leftTabs.tableHearder`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
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
                let arrayToAdd = {id: seanceData.ordonance.length + 1 , PK: articleNow.PK, Nom: articleNow.Nom, Dosage: articleNow.Dosage,  DCI: articleNow.DCI, Forme: articleNow.Forme, Presentation: articleNow.Presentation, Emploi_Mode: articleNow.Emploi_Mode}
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
        const widthPercentage = 0.60; // 80%
        const heightPercentage = 0.75; // 75%
        
        const width = window.screen.width * widthPercentage;
        const height = 600;
        const url = `https://doctor.system.abyedh.com${link}`;
    
        // Calculate the position to center the window
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);
        
        // Open the link in a new window with custom width, height, and centered position
        window.open(url, '_blank', `width=${width}, height=${height}, top=${top}, left=${left}`);
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
                    <h5> {t('menuTabs.seancePage.addSeanceInfo.diagnosqtiqueTabsData.title')}  </h5>
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
                    <h5>{t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.title')} </h5> 
                    <datalist id="articlesList">
                            {articleList.map((test,index) =>
                            <option key={index} value={test.PK}>{test.Nom} : {test.DCI} - {test.Dosage} - {test.Forme} - {test.Presentation}  </option>
                            )}
                    </datalist>
                    <Input icon='pin' list="articlesList" onKeyPress={event => OnKeyPressFunc(event)}  placeholder={t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.addPlch')}  onBlur={ (e) => GetMedicammentData(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1' /> 
                    <div className='m-2 mb-0 text-secondary'><b> <span className='bi bi-upc '></span> {t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.code')}  {articleNow.PK} </b></div>
                    <div className='m-2 mb-0 text-danger'><b><span className='bi bi-star-fill '></span> {t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.Nom')}  {articleNow.Nom} </b></div> 
                    <div className='m-2 mb-0 text-secondary'><b><span className='bi bi-star-fill '></span> {t('menuTabs.ordonancePage.addOrdoPage.enterCard.Generic')}  {articleNow.DCI} </b></div> 
                    <div className='m-2 mb-0 text-info'><b><span className='bi bi-star-fill '></span> {t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.Dosage')}  {articleNow.Dosage} </b></div> 
                    <div className='m-2 mb-0 text-primary'><b><span className='bi bi-star-fill '></span> {t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.Forme')}  {articleNow.Forme} </b></div> 
                    <div className='m-2 mb-2 text-warning'><b><span className='bi bi-star-fill '></span> {t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.Presentation')}  {articleNow.Presentation} </b></div> 
                     
                    <div className='row'>
                       <div className='col-12'>  <Input icon='dropbox' onKeyPress={event => OnKeyPressFunc(event)} type='text' value={articleNow.Emploi_Mode} autoFocus={autofocusState} onChange={ (e) => {articleNow.Emploi_Mode = e.target.value}} size="small" iconPosition='left' placeholder={t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.modePlch')}  fluid className='mb-1' /> </div> 
                    </div>
                    
                    <br />
                    <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddMedicammentToListe}>  <Icon name='edit outline' /> {t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.btnText')} </Button>
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
                            <h5>{t('menuTabs.seancePage.addSeanceInfo.ordonanceTabsData.listeText')}</h5>    
                            {seanceData.ordonance.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                            <br />
                            
                    </div>
                </div>
            </>)
    }

    const AddAnalyse = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5> {t('menuTabs.seancePage.addSeanceInfo.analyseTabsData.title')}</h5> 
                    <Input icon='pin' onKeyPress={event => OnKeyPressFunc(event)}  placeholder={t('menuTabs.seancePage.addSeanceInfo.analyseTabsData.grandeurPlch')}  value={analyseNow.Grandeur}  onChange={ (e) => {analyseNow.Grandeur = e.target.value}} size="small" iconPosition='left'   fluid className='mb-1' />                     
                    <Input icon='dropbox' onKeyPress={event => OnKeyPressFunc(event)} type='text' placeholder={t('menuTabs.seancePage.addSeanceInfo.analyseTabsData.valeurPlch')} value={analyseNow.valeur} autoFocus={autofocusState}  onChange={ (e) => {analyseNow.Valeur = e.target.value}}  size="small" iconPosition='left'   fluid className='mb-1' />
                    
                    <br />
                    <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddAnalyseToListe}>  <Icon name='edit outline' /> {t('menuTabs.seancePage.addSeanceInfo.analyseTabsData.btnText')} </Button>
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
                            <h5>{t('menuTabs.seancePage.addSeanceInfo.analyseTabsData.listeText')}</h5>    
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
            <h5>{t('menuTabs.seancePage.addSeanceInfo.selectTabsData.patientCardTitle')} </h5> 
            <div className='row'>
                <div className='col-9 align-self-center'>
                    <datalist id="clientList">
                            {allClientList.map((test,index) =>
                            <option key={index} value={test.PA_ID}>{test.PA_Name} : {test.Phone}</option>
                            )}
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={seanceData.S_Patient}   onBlur={ (e) => SelectClientFunction(e.target.value) } size="small" iconPosition='left'   fluid className='mb-1' />
                </div>
                <div className='col align-self-center text-start'><Icon className='system-color cursor-pointer ' name='user' onClick={() => setAddUserWay('UID')} />  </div>
                <div className='col align-self-center text-start'><Icon className='system-color cursor-pointer' name='calendar alternate'  onClick={() => setAddUserWay('RID')}/>   </div>
            </div>
            
            <h4 className='mb-1 text-secondary'> <span className='bi bi-person'></span> {t('menuTabs.seancePage.addSeanceInfo.selectTabsData.patientInfo.Nom')} : {selectedClient.PA_Name  ? selectedClient.PA_Name  : ''}</h4>
            <h4 className='mb-1 text-secondary mt-1'> <span className='bi bi-phone'></span> {t('menuTabs.seancePage.addSeanceInfo.selectTabsData.patientInfo.phone')} :{selectedClient.Phone  ? selectedClient.Phone  : ''}</h4>
            <h4 className='mt-1 mb-1 text-secondary'> <span className='bi bi-map'></span> {t('menuTabs.seancePage.addSeanceInfo.selectTabsData.patientInfo.adress')} : {selectedClient.Adress  ? selectedClient.Adress  : ''} </h4>
            <h4 className='mt-1 mb-1 text-secondary'> <span className='bi bi-clock'></span> {t('menuTabs.seancePage.addSeanceInfo.selectTabsData.patientInfo.nbSeance')} : {patientSeanceListe.length} </h4>
            <h4 className='mt-1 mb-1 text-secondary'> <span className='bi bi-calendar-week'></span> {t('menuTabs.seancePage.addSeanceInfo.selectTabsData.patientInfo.nbRDV')} : {patientRDVListe.length} </h4>
            <h4 className='mt-1 mb-1 text-secondary'> <span className='bi bi-receipt-cutoff'></span> {t('menuTabs.seancePage.addSeanceInfo.selectTabsData.patientInfo.nbOrdo')} : {patientOrdonanceListe.length} </h4>
             
            <StateCard status={addUserWay} />
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
                        <div className='card card-body md-3 shadow-sm border-div  '>
                            <SelectPatientCard />
                        </div>
                    </div>
                    <div className='col-12 col-md-8 '>  
                        <div className='card card-body shadow-sm mb-4 border-div h-100'>
                            <Tab menu={{ secondary: true, pointing: true  }} panes={patientPanes} />
                        </div>
                    </div>
            </div>
        </>)
    }
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} bcTag='factureAjouter' />
        <br />
 
        <div className='d-none d-lg-block'><Tab menu={{widths: panes.length ,  pointing: true  }} panes={panes} /></div>
        <div className='d-lg-none '><Tab menu={{  pointing: true , className: 'custom-tab-menu'   }} panes={panes} /></div>
        
        <FrameForPrint frameId='printOrdonance' src={`/Pr/ordonance/info/${gettedOrFID}`} />
        <div>

        </div>
    </> );
    }

export default AjouterFacture;