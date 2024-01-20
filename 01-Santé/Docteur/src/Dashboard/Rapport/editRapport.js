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
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import { useParams } from 'react-router-dom';
import { ContentState, convertFromHTML } from 'draft-js';

const TerminerCard = ({rapportData, setRapportData,allClientList, OnKeyPressFunc}) =>{
    const rapportGenre = [
        {value : 'Medicale Gébérale', text : 'Medicale Gébérale', key: 1},
        {value : 'Hospitalisation', text : 'Hospitalisation', key: 2},
        {value : 'Urgence', text : 'Urgence', key: 3},
        {value : 'Consultation', text : 'Consultation', key: 4},
        {value : 'Evaluation', text : 'Evaluation', key: 5},
        {value : 'Diagnostique', text : 'Diagnostique', key: 6},
        {value : 'Suivie', text : 'Suivie', key: 7},
        {value : 'Recherche Medicale', text : 'Recherche Medicale', key: 8},
        {value : 'Cas Clinique', text : 'Cas Clinique', key: 9},
        {value : 'Medico-Légale', text : 'Medico-Légale', key: 10},
        {value : 'Autopsie', text : 'Autopsie', key: 11},
        {value : 'Sante Publique', text : 'Sante Publique', key: 12},
        {value : 'Autre', text : 'Autre', key: 13},
    ]
    return (<>
             
            <h5 className='mb-1 mt-1'>Titre  </h5>
            <Input icon='text height' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder='Titre' value={rapportData.RA_Titre}  onChange={ (e) => setRapportData({...rapportData, RA_Titre: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />

            <h5 className='mb-1 mt-1'>Sujet </h5>
            <Form>
                <TextArea rows={2} placeholder='Sujet' onKeyPress={event => OnKeyPressFunc(event)} value={rapportData.RA_Sujet} onChange={(e) => setRapportData({...rapportData, RA_Sujet : e.target.value })} />
            </Form>

            <h5 className='mb-1 mt-1'>Date   </h5>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={rapportData.RA_Date} onChange={(e) => setRapportData({...rapportData, RA_Date: e.target.value })}/>
 
            <h5 className='mb-1 mt-1'>Genre  </h5>
            <Dropdown
                fluid
                search
                selection
                wrapSelection={false}
                options={rapportGenre}
                placeholder={rapportData.RA_Genre}
                className='mb-1'
                onChange={(e, { value }) => setRapportData({...rapportData, RA_Genre: value })}
                value={rapportData.RA_Genre}
            /> 

                
 
    </>)
}
 
function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const {RPID} = useParams()
    const [rapportData, setRapportData] = useState({ RA_Content: 'Null', RA_Titre:'', RA_Genre:'', RA_Sujet:'',  RA_Date: Today.toISOString().split('T')[0], RA_State: 'S'  })
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
     
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [articleNow, setArticleNow] = useState([])
    const [articleList] = useGetArticles()
    const [clientList, allClientList] = useGetClients([[{},{}], [{},{}]])
    const [autofocusState, setAutoFocus] = useState(false)
    const [loading , setLoading] = useState(false)
 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Contenue ' }, 
            render: () => <DiagnostiqueCard />,
        },
         
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer' }, 
            render: () =><><div className='row'>
                        <div className='col-12 col-lg-8'><ViewCard /></div>
                        <div className='col-12 col-lg-4'>
                            <div className='card card-body shadow-sm mb-2 border-div'>
                                <div className='row'>
                                    <div className='col-12  '>
                                        <TerminerCard rapportData={rapportData} setRapportData={setRapportData} clientList={clientList} allClientList={allClientList}   OnKeyPressFunc={OnKeyPressFunc} />
                                    </div>
                                    <div className='col-12  '>
                                            <br />
                                            <div className='row mb-2'>
                                                <div className='col-12'>
                                                    <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveRapport}><Icon name='save' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                                                </div>
                                            </div>
                                            <div className='row mb-2'>
                                                <div className='col-12'>
                                                    <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState} fluid onClick={(e) => PrintFunction('printRapport')}><Icon name='print' /> Imprimer Rapport</Button>
                                                </div>
                                            </div>
                                            
                                    </div>
                                </div>
                            </div>    
                        </div> 
                    </div></> ,
        }
        
    ]
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 

    /* ############################### UseEffect ########################*/
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/rapport/info`, {
            PID : GConf.PID,
            RPID: RPID
          })
          .then(function (response) {
            console.log(response.data)
                if(!response.data.PK) {
                    toast.error('Rapport Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/rp"; }, 2000)
                    
                } else {
                    const contentBlocks = convertFromHTML(response.data.RA_Content);
                    const contentState = ContentState.createFromBlockArray(contentBlocks);

                    // Set the converted ContentState to the EditorState
                    const editorState = EditorState.createWithContent(contentState);
                    setDiagnistiqueValue(editorState);

                    setRapportData(response.data)
                    setLoading(true)
                     
                }    
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
              const FactureTarged = Offline.facture.find((facture) => facture.F_ID == RPID);
              setLoading(true)
 
            }
          });
    }, [])

    /*#########################[Function]##################################*/
    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
    }
    const SaveRapport = () =>{
            if (!rapportData.RA_Content ) {toast.error("Diagnostique est Invalide !", GConf.TostErrorGonf)}
            else if (!rapportData.RA_Titre) {toast.error("Patient De est Invalide !", GConf.TostErrorGonf)}
            else if (!rapportData.RA_Sujet) {toast.error("RA_Sujet  est Invalide !", GConf.TostErrorGonf)}
            else if (!rapportData.RA_Date) {toast.error("Date   est Invalide !", GConf.TostErrorGonf)}
            else if (!rapportData.RA_Genre) {toast.error("Genre est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/rapport/modifier`, {
                    PID : GConf.PID,
                    RA_ID : RPID,
                    rapportData: {RA_Titre: rapportData.RA_Titre,  RA_Content: GenerateDiagnostiqueHTml(), RA_Sujet:rapportData.RA_Sujet, Maladie:rapportData.Maladie,  RA_Date: Today.toISOString().split('T')[0] , RA_State: rapportData.RA_State,  RA_Genre: rapportData.RA_Genre,} ,
                })
                .then(function (response) {
                    if(response.status = 200) {
                         
                        setSaveBtnState(true)
                        toast.success("Rapport Modifier !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> La Seance sera enregistrer sur votre ordinateur    </div></>, GConf.TostInternetGonf)   
                      Offline.SeanceToSave.push(rapportData)
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
                <div className='  card-body   mb-4'  >
  
                    <Editor
                        toolbar={{
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            //textAlign: { inDropdown: true },
                            //link: { inDropdown: true },
                            // history: { inDropdown: true },
                            toolbarCustomButtons: { inDropdown: true },
                          }}
                        height = '500px' 
                        placeholder='Ecrivez Ici Votre rapport  | '
                        editorState={diagnostiqueValue}
                        toolbarClassName="toolbarClassName border-div p-3 pb-2 shadow-sm text-dark"
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
  
    const ViewCard = () =>{
        return(<>
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(diagnostiqueValue.getCurrentContent())) }}></div>
            <br />
        </>)
    }
    
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureEdit} />
        <br />
        <Tab menu={{  secondary: true  }} panes={panes} />
        <FrameForPrint frameId='printRapport' src={`/Pr/rapport/info/${RPID}`} />
    </> );
    }

export default AjouterFacture;