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
import { EditorState, convertToRaw, Modifier, convertFromHTML  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // Updated import statement
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';

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
                        {allClientList.map((test) =>
                        <option key={test.key} value={test.PA_ID}>{test.PA_Name} : {test.Phone}</option>
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
const ResultCard = ({seanceData, setSeanceData,OnKeyPressFunc}) =>{
    return (<>
            <div className='card card-body shadow-sm mb-2 border-div'>
                <h5>Resultat  </h5>
                <Form>
                    <TextArea rows={10} placeholder='Maladie' onKeyPress={event => OnKeyPressFunc(event)} value={seanceData.Resultat} onChange={(e) => setSeanceData({...seanceData, Resultat : e.target.value })} />
                </Form>
                <br /> 
                <br /> 
            </div>
    </>)
}
function EditFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    let {FID} = useParams()
    const [seanceData, setSeanceData] = useState({S_Patient:'PASSAGER',  Diagnostic: 'Null', Resultat:'', Maladie:'',  S_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [gettedOrFID, setOrId] = useState('')
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [articleNow, setArticleNow] = useState([])
    const [articleList] = useGetArticles()
    const [clientList, allClientList] = useGetClients()
    const [autofocusState, setAutoFocus] = useState(false)
    
 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Diagnostique ' }, 
            render: () => <DiagnostiqueCard />,
        },
        {
            menuItem: { key: 'client', icon: 'user', content:  'Resultat' }, 
            render: () =><ResultCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList} allClientList={allClientList}  OnKeyPressFunc={OnKeyPressFunc} />,
        },
        {
            menuItem: { key: 'clidsgent', icon: 'user', content:  'Ordonance' }, 
            render: () =><OrdonanceCard  />,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer' }, 
            render: () =><><FinishCard /></> ,
        }
        
    ]
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/seances/select`, {
              PID : GConf.PID,
              SID: FID
              })
              .then(function (response) {
                  if(!response.data[0]) {
                      toast.error('Facture Introuvable !', GConf.TostSuucessGonf)
                      setTimeout(() => {  window.location.href = "/S/sa"; }, 2000)
                      
                  } else {
                      setSeanceData(response.data[0])
                      
                      const initialHtml = "<p>Your HTML content goes here</p>";
                      setDiagnistiqueValue(convertHtmlToEditorState(initialHtml));
                       

                      if (response.data[0].OR_Articles != '[]') {
                          setSeanceData({...seanceData, ordonance: JSON.parse(response.data[0].OR_Articles) })
                      }else{
                          setSeanceData({...seanceData, ordonance: [] })
                      }
                  }    
              }).catch((error) => {
              if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
              }
              });
  }, [])

    /*#########################[Function]##################################*/
    const convertHtmlToEditorState = (html) => {
        const contentBlock = convertFromHTML(html);
        const contentState = contentBlock.contentBlocks
          ? contentState.createWithContent(contentBlock)
          : contentState.createFromText('');
        return EditorState.createWithContent(contentState);
      };

    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
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
                    <Input icon='pin' list="articlesList" placeholder='Entre aarticle'  onBlur={ (e) => GetMedicammentData(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1' /> 
                    <div className='m-2 mb-0 text-secondary'><b> <span className='bi bi-upc '></span> Code a barre : {articleNow.PK} </b></div>
                    <div className='m-2 mb-0 text-danger'><b><span className='bi bi-star-fill '></span> Nom : {articleNow.Nom} </b></div> 
                    <div className='m-2 mb-0 text-info'><b><span className='bi bi-star-fill '></span> Dosage : {articleNow.Dosage} </b></div> 
                    <div className='m-2 mb-0 text-primary'><b><span className='bi bi-star-fill '></span> Forme : {articleNow.Forme} </b></div> 
                    <div className='m-2 mb-2 text-warning'><b><span className='bi bi-star-fill '></span> Presentation : {articleNow.Presentation} </b></div> 
                     
                    <div className='row'>
                       <div className='col-12'>  <Input icon='dropbox' type='text' value={articleNow.Emploi_Mode} autoFocus={autofocusState} onChange={ (e) => {articleNow.Emploi_Mode = e.target.value}} size="small" iconPosition='left' placeholder='Quantite'  fluid className='mb-1' /> </div> 
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
    const FinishCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-12 col-lg-7'>
                            <TerminerCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList} allClientList={allClientList}   OnKeyPressFunc={OnKeyPressFunc} />
                        </div>
                        <div className='col-12 col-lg-5 align-self-center'>
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
    
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
        {/* Hiba State : <div dangerouslySetInnerHTML={{ __html: 'hibaState' }}></div> */}
        <Tab menu={{  secondary: true  }} panes={panes} />
        {/* <FrameForPrint frameId='printFacture' src={`/Pr/facture/info/${gettedOrFID}`} /> */}
    </> );
    }

export default EditFacture;