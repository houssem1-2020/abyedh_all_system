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

const TerminerCard = ({sujetData, setSujetData,sujetListe, OnKeyPressFunc}) =>{
     
    return (<>
                <h5 className='mb-1 mt-3'> Titre & Sujet : </h5>
                <Input icon='file' placeholder='Titre & Suje'  size="small" iconPosition='left'   fluid className='mb-1' value={sujetData.SE_Titre} onChange={(e) => setSujetData({...sujetData,  SE_Titre: e.target.value })}/>
                

                <h5 className='mb-1 mt-3'> Date  :  </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={sujetData.SE_Date} onChange={(e) => setSujetData({...sujetData, SE_Date: e.target.value })}/>
                
                <h5 className='mb-1 mt-3'> Sujet Relatif   </h5>
                <datalist id="clientList">
                        {sujetListe.map((test) =>
                        <option key={test.key} value={test.SJ_ID}>{test.SJ_Title} : {test.CL_Name}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={sujetData.SE_Sujet}   onBlur={ (e) => setSujetData({...sujetData, SE_Sujet: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                
    </>)
}
 
function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [sujetData, setSujetData] = useState({SE_Sujet:'PASSAGER',  SE_Content: 'Null', Resultat:'', Maladie:'',  SE_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [gettedOrFID, setOrId] = useState('')
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [sujetListe, setSujetListe] = useState(false)
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
                                    <TerminerCard sujetData={sujetData} setSujetData={setSujetData} clientList={clientList} sujetListe={sujetListe}   OnKeyPressFunc={OnKeyPressFunc} />
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
            axios.post(`${GConf.ApiLink}/sujets`,{PID :GConf.PID})
            .then(function (response) {
                setSujetListe(response.data)
            }) 
    }, [])

    /*#########################[Function]##################################*/
    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
    }
 
    const SaveSeance = () =>{
            if (!sujetData.SE_Content ) {toast.error("Diagnostique est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SE_Sujet) {toast.error("Patient De est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SE_Titre) {toast.error("Resultat  est Invalide !", GConf.TostErrorGonf)}
            else if (!sujetData.SE_Date ) {toast.error("Ordonance list est Invalide !", GConf.TostErrorGonf)} 
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/seance/ajouter`, {
                    PID : GConf.PID,
                    seanceData: {SE_Sujet: sujetData.SE_Sujet,  SE_Content: GenerateDiagnostiqueHTml(), SE_Titre:sujetData.SE_Titre, SE_Sujet:sujetData.SE_Sujet,  SE_Date: Today.toISOString().split('T')[0], SE_Genre: sujetData.SE_Genre , SE_Phase:sujetData.SE_Phase, SE_Tribunal:sujetData.SE_Tribunal, SE_Adversaire:sujetData.SE_Adversaire, SE_State:sujetData.SE_State} ,
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