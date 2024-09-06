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

const TerminerCard = ({sujetData, setSujetData,allClientList, OnKeyPressFunc}) =>{
    const StateDegree = [
        {value : 'إستئناف', text : 'إستئناف', key: 1},
        {value : 'عليا', text : 'عليا', key: 2},
        {value : 'إدعاء عام' , text : 'إدعاء عام', key: 3},
        {value : 'إبتدائية', text : 'إبتدائية', key: 4},
    ]
    const clientCarec = [
        {value : 'مدعي', text : 'مدعي', key: 1},
        {value : 'مدعي عليه', text : 'مدعي عليه', key: 2},
        {value : 'جاني', text : 'جاني', key: 3},
        {value : 'مجني عليه', text : 'مجني عليه', key: 4},
    ]

    const etatDuSujet = [
        {value : 'En Court', text : 'En Court ', key: 1},
        {value : 'Active', text : 'Active', key: 2},
        {value : 'Suspendu', text : 'Suspendu', key: 3},
        {value : 'Termineé', text : 'Termineé', key: 4},
    ]
    return (<>
                <h5 className='mb-1 mt-3'> Titre & Sujet : </h5>
                <Input icon='file' placeholder='Titre & Suje'  size="small" iconPosition='left'   fluid className='mb-1' value={sujetData.SJ_Title} onChange={(e) => setSujetData({...sujetData,  SJ_Title: e.target.value })}/>
                

                <h5 className='mb-1 mt-3'> Date  :  </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={sujetData.SJ_Date} onChange={(e) => setSujetData({...sujetData, SJ_Date: e.target.value })}/>
                
                <h5 className='mb-1 mt-3'> Client  </h5>
                <datalist id="clientList">
                        {allClientList.map((test) =>
                        <option key={test.key} value={test.CL_ID}>{test.CL_Name} : {test.Phone}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={sujetData.SJ_Client}   onBlur={ (e) => setSujetData({...sujetData, SJ_Client: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                
                <h5 className='mb-1 mt-3'> Caractéristiques du client  </h5>
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={clientCarec}
                    placeholder={sujetData.SJ_Client_Carac}
                    className='mb-1'
                    onChange={(e, { value }) => setSujetData({...sujetData, SJ_Client_Carac: value })}
                    value={sujetData.SJ_Client_Carac}
                /> 
                <h5 className='mb-1 mt-3'> Phase contentieuse  </h5>
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={StateDegree}
                    placeholder={sujetData.SJ_Phase}
                    className='mb-1'
                    onChange={(e, { value }) => setSujetData({...sujetData, SJ_Phase: value })}
                    value={sujetData.SJ_Phase}
                /> 
                <h5 className='mb-1 mt-3'> Etat  </h5>
                <Dropdown
                    fluid
                    search
                    selection
                    wrapSelection={false}
                    options={etatDuSujet}
                    placeholder={sujetData.SJ_Etat}
                    className='mb-1'
                    onChange={(e, { value }) => setSujetData({...sujetData, SJ_Etat: value })}
                    value={sujetData.SJ_Etat}
                /> 
                <h5 className='mb-1 mt-3'> Nom de l'adversaire </h5>
                <Input icon='calendar alternate'   size="small" iconPosition='left'   fluid className='mb-1' value={sujetData.SJ_Adversaire} onChange={(e) => setSujetData({...sujetData, SJ_Adversaire: e.target.value })}/>
                
                <h5 className='mb-1 mt-3'> Tribunal </h5>
                <Input icon='calendar alternate'   size="small" iconPosition='left'   fluid className='mb-1' value={sujetData.SJ_Tribunal} onChange={(e) => setSujetData({...sujetData, SJ_Tribunal: e.target.value })}/>
                
                
 
    </>)
}
 
function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [sujetData, setSujetData] = useState({SJ_Client:'PASSAGER',  SJ_Description: 'Null', Resultat:'', Maladie:'',  SJ_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [gettedOrFID, setOrId] = useState('')
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [clientList, allClientList] = useGetClients()
    const [autofocusState, setAutoFocus] = useState(false)
    
 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Description ' }, 
            render: () => <DiagnostiqueCard />,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer' }, 
            render: () =><><div className='card card-body shadow-sm mb-2 border-div'>
                        <div className='row'>
                            
                            <div className='col-12 col-lg-5 align-self-center'>
                                    <TerminerCard sujetData={sujetData} setSujetData={setSujetData} clientList={clientList} allClientList={allClientList}   OnKeyPressFunc={OnKeyPressFunc} />
                                    <br />
                                    <div className='row mb-2'>
                                        <div className='col-12'>
                                            <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveSeance}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                                        </div>
                                    </div>  
                            </div>
                            <div className='col-12 col-lg-7'>
                                <h5>Description : </h5> 
                                <ViewCard />  
                            </div>
                        </div>
                    </div>
                    <br />
                    <br /></> ,
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
            if (!sujetData.SJ_Description ) {toast.error("Diagnostique est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Client) {toast.error("Patient De est Invalide !", GConf.TostErrorGonf)}
            // else if (!sujetData.Maladie) {toast.error("Maladie vers est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Title) {toast.error("Resultat  est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Client) {toast.error("Dnager   est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Client_Carac) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Phase ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Tribunal ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Date ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Adversaire ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SJ_Etat ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/sujets/ajouter`, {
                    PID : GConf.PID,
                    sujetD: {SJ_Client: sujetData.SJ_Client,  SJ_Description: GenerateDiagnostiqueHTml(), SJ_Title:sujetData.SJ_Title, SJ_Client:sujetData.SJ_Client,  SJ_Date: Today.toISOString().split('T')[0], SJ_Client_Carac: sujetData.SJ_Client_Carac , SJ_Phase:sujetData.SJ_Phase, SJ_Tribunal:sujetData.SJ_Tribunal, SJ_Adversaire:sujetData.SJ_Adversaire, SJ_Etat:sujetData.SJ_Etat} ,
                })
                .then(function (response) {
                    if(response.status = 200) {
                        toast.success("Sujet Enregistreé !", GConf.TostSuucessGonf)
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
                    <h5> Description de Sujet   </h5>
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
                
        </>)
    }
 
    const ViewCard = () =>{
        return(<>
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(diagnostiqueValue.getCurrentContent())) }}></div>
            <br />
        </>)
    }
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
        
        <Tab menu={{  pointing: true , widths: panes.length ,  }} panes={panes} />
        
    </> );
    }

export default AjouterFacture;