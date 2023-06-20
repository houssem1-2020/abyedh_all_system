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

const TerminerCard = ({seanceData, setSeanceData,allClientList, OnKeyPressFunc}) =>{
    const StateDegree = [
        {value : 'Ganger', text : 'Dangereur', key: 1},
        {value : 'Ganger', text : 'Assey Normale', key: 2},
        {value : 'Ganger', text : 'Normale', key: 3},
        {value : 'Ganger', text : 'Bien', key: 4},
    ]
    return (<>
             
            <h5>Date & Patient  </h5>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.S_Date} onChange={(e) => setSeanceData({...seanceData, S_Date: e.target.value })}/>
            <datalist id="clientList">
                    {allClientList.map((test,index) =>
                    <option key={index} value={test.PA_ID}>{test.PA_Name} : {test.Phone}</option>
                    )}
            </datalist>
            <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={seanceData.S_Patient}   onBlur={ (e) => setSeanceData({...seanceData, S_Patient: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
            <h5>Danger  </h5>
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
 
                
 
    </>)
}
 
function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [seanceData, setSeanceData] = useState({S_Patient:'PASSAGER',  Diagnostic: 'Null', Resultat:'', Maladie:'',  S_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [gettedOrFID, setOrId] = useState('')
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [articleNow, setArticleNow] = useState([])
    const [articleList] = useGetArticles()
    const [clientList, allClientList] = useGetClients([[{},{}], [{},{}]])
    const [autofocusState, setAutoFocus] = useState(false)
    
 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Contenue ' }, 
            render: () => <DiagnostiqueCard />,
        },
         
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer' }, 
            render: () =><><FinishCard /></> ,
        }
        
    ]
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
          
          //console.log(articleList)
            // //camionList
            // axios.post(`${GConf.ApiLink}/camions`,{PID :GConf.PID})
            // .then(function (response) {
            //     let ClientLN = []
            //     response.data.map( (dta) => {ClientLN.push({value : dta.Cam_ID, text : <>{dta.Cam_Name} : {dta.Matricule} - {dta.Chauffeur}</>, key: dta.PK})})
            //     setCamionList(ClientLN)
            // }).catch((error) => {
            // if(error.request) {
            //     toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            // }
            // });
    }, [])

    /*#########################[Function]##################################*/
    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
    }
    const SaveSeance = () =>{
            if (!seanceData.Diagnostic ) {toast.error("Diagnostique est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.S_Patient) {toast.error("Patient De est Invalide !", GConf.TostErrorGonf)}
            // else if (!seanceData.Maladie) {toast.error("Maladie vers est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.Resultat) {toast.error("Resultat  est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.State_Degre) {toast.error("Dnager   est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.S_Date) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.ordonance ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/ajouter`, {
                    PID : GConf.PID,
                    seanceData: {S_Patient: seanceData.S_Patient,  Diagnostic: GenerateDiagnostiqueHTml(), Resultat:seanceData.Resultat, Maladie:seanceData.Maladie,  S_Date: Today.toISOString().split('T')[0], State_Degre: seanceData.State_Degre , ordonance:seanceData.ordonance} ,
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
                    <h5>Rapport  </h5>
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
    const FinishCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-12  '>
                            <TerminerCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList} allClientList={allClientList}   OnKeyPressFunc={OnKeyPressFunc} />
                        </div>
                        <div className='col-12  '>
                                <br />
                                <div className='row mb-2'>
                                    <div className='col-12'>
                                        <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveSeance}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-12'>
                                        <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState} fluid onClick={(e) => PrintFunction('printFacture')}><Icon name='print' /> Imprimer Ordonance</Button>
                                    </div>
                                </div>
                                 
                        </div>
                    </div>
                </div>
                <br />
                <br />
        </>)
    }
 
    
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
        
        <div className='row'>
            <div className='col-12 col-lg-8'><DiagnostiqueCard /></div>
            <div className='col-12 col-lg-4'><FinishCard /></div> 
        </div>
        {/* <FrameForPrint frameId='printFacture' src={`/Pr/facture/info/${gettedOrFID}`} /> */}
    </> );
    }

export default AjouterFacture;