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
import { ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // Updated import statement
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';

const TerminerCard = ({seanceData, setSeanceData, profListe, salleListe, matiereListe, OnKeyPressFunc}) =>{
     
    return (<>
             
                <h5 className='mb-1 mt-3' >Date </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.SE_Date} onChange={(e) => setSeanceData({...seanceData, SE_Date: e.target.value })}/>
                
                <div className='row mt-3'>
                    <div className='col-6'>
                        <h5 className='mb-1'>De  </h5>
                        <Input icon='calendar alternate' type='time' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.SE_Time_Start} onChange={(e) => setSeanceData({...seanceData, SE_Time_Start: e.target.value })}/> 
                    </div>
                    <div className='col-6'>
                        <h5 className='mb-1'>Vers  </h5>
                        <Input icon='calendar alternate' type='time' size="small" iconPosition='left'   fluid className='mb-1' value={seanceData.SE_Time_Finish} onChange={(e) => setSeanceData({...seanceData, SE_Time_Finish: e.target.value })}/> 
                    </div>
                </div>

                <h5 className='mb-1 mt-3'>  Prof : </h5>
                <datalist id="profListe">
                        {profListe.map((test,index) =>
                        <option key={index} value={test.T_ID}>{test.T_Name} : {test.Poste}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="profListe" placeholder={seanceData.Proffeseur_ID}   onBlur={ (e) => setSeanceData({...seanceData, Proffeseur_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                        
                <h5 className='mb-1 mt-3'>  Matiére : </h5>
                <datalist id="matiereListe">
                        {matiereListe.map((test,index) =>
                        <option key={index} value={test.Matiere_ID}>{test.Matiere_Name} : {test.Matiere_Genre}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="matiereListe" placeholder={seanceData.Matiere_ID}   onBlur={ (e) => setSeanceData({...seanceData, Matiere_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' /> 

                <h5 className='mb-1 mt-3'>Salle  </h5>
                <datalist id="salleListe">
                        {salleListe.map((test,index) =>
                        <option key={index} value={test.Salle_ID}>{test.Salle_Name} : {test.Salle_Num}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="salleListe" placeholder={seanceData.Salle_ID}   onBlur={ (e) => setSeanceData({...seanceData, Salle_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                
 
    </>)
}

const AddTodoCard = ({OnKeyPressFunc, AddToDoToListFunc, saveBtnState, setTodoNow, todoNow}) =>{
    return (<>
            <div className='card card-body shadow-sm mb-2 border-div'>
                
                <h5>ajouter à la liste TODO</h5> 
                <Form>
                    <TextArea rows={4} placeholder='Exercice ou travaille a la maison ' onKeyPress={event => OnKeyPressFunc(event)} value={todoNow} onChange={(e) => setTodoNow(e.target.value)} />
                </Form>
                
                <br />
                <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={() => AddToDoToListFunc()}>  <Icon name='edit outline' /> Ajouter</Button>
            </div>
    </>)
}

const SelectCamion = ({ClasseIsSelectedFunc, camionList, camionSelectState, selectedCam, eleveListe}) =>{
    return (<>
            <div className='card card-body shadow-sm border-div'>
                <h5 className='text-secondary'> <span className='bi bi-check2-circle'></span> Selectionnez un Classes  </h5>
                <Dropdown
                    disabled={camionSelectState}
                    search
                    selection
                    wrapSelection={false}
                    options={camionList}
                    placeholder='Selectionnez Client'
                    className='mb-1'
                    onChange={ClasseIsSelectedFunc}
                    value={selectedCam}
                />   
                <h5> <span className='bi bi-check2-circle'></span>  Nombre des eleves : {eleveListe.length} </h5>
                 
            </div>
    </>)
}

function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    let {SID} = useParams()
    const [seanceData, setSeanceData] = useState({Classe_ID:'',  SE_Activite: 'Null', Matiere_ID:'',    SE_Date: Today.toISOString().split('T')[0], Salle_ID: '' , SE_Time_Start:new Date().toLocaleTimeString([],{ hourCycle: 'h23'}),  SE_Time_Finish :new Date().toLocaleTimeString([],{ hourCycle: 'h23'}), SE_ToDo: [],   SE_Presence:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [eleveListe, setEleveListe] = useState([])
    const [profListe, setProfListe] = useState([])
    const [matiereListe, setMatiereListe] = useState([])
    const [salleListe, setSalleListe] = useState([]) 
    const [todoNow, setTodoNow] = useState('')
    
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)

    const [clientList, allClientList] = useGetClients()
    const [gettedOrFID, setOrId] = useState('')
    let [selectedCam, setSelectedCam] = useState();
    let [camionList, setCamionList] = useState([]);
    let [camionSelectState, setCamionSS] = useState(false);
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Résumer ' }, 
            render: () => <DiagnostiqueCard />,
        },
        {
            menuItem: { key: 'clidsgent', icon: 'user', content:  'Presence' }, 
            render: () =><PresenceCard  />,
        },
        {
            menuItem: { key: 'client', icon: 'user', content:  'a Faire' }, 
            render: () =>   <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                                        <AddTodoCard OnKeyPressFunc={OnKeyPressFunc} AddToDoToListFunc={AddToDoToListFunc} saveBtnState={saveBtnState} setTodoNow={setTodoNow} todoNow={todoNow} />        
                                    </div>
                                </div>
                                <div className='col-12 col-lg-6'>
                                        <h5>Listes des TODO</h5>    
                                        {seanceData.SE_ToDo.map( (val, index) => <TodoCardListe key={val.id} index={index} dataA={val}/>)}
                                        <br />
                                        
                                </div>
                            </div>,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer' }, 
            render: () =><><div className='card card-body shadow-sm mb-2 border-div'>
                                <div className='row'>
                                    <div className='col-12 col-lg-5 '>
                                            <TerminerCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList}  profListe={profListe} matiereListe={matiereListe}  salleListe={salleListe} OnKeyPressFunc={OnKeyPressFunc} />
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
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
            axios.post(`${GConf.ApiLink}/seances/info`, {
                PID : GConf.PID,
                SID: SID
            })
            .then(function (response) {
 
                if(!response.data[0]) {
                    toast.error('Seance Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/sa"; }, 2000)
                    
                } else {
                    const contentBlocks = convertFromHTML(response.data[0].SE_Activite);
                    const contentState = ContentState.createFromBlockArray(contentBlocks);

                    // Set the converted ContentState to the EditorState
                    const editorState = EditorState.createWithContent(contentState);
                    setDiagnistiqueValue(editorState);

                    setEleveListe(JSON.parse(response.data[0].SE_Presence))
                    setSeanceData((prevSeanceData) => ({
                        ...prevSeanceData,
                        ...response.data[0],
                        SE_ToDo: response.data[0].SE_ToDo !== '[]' ? JSON.parse(response.data[0].SE_ToDo) : prevSeanceData.SE_ToDo,
                      }));
                    //setOrId(response.data[0].Ordonance)
                    //setLoading(false)
                }    
            }).catch((error) => {
            if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
            }
        });

          //camionList
          axios.post(`${GConf.ApiLink}/classes`,{  PID : GConf.PID,})
          .then(function (response) {
             
              let ClientLN = []
              response.data.map( (dta) => {ClientLN.push({value : dta.CL_ID, text : <>{dta.CL_Name} : {dta.CL_Niveaux} - {dta.CL_Seasson}</>, key: dta.PK})})
              setCamionList(ClientLN)

               
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
          });

            axios.post(`${GConf.ApiLink}/team`, {
                PID : GConf.PID,
            })
            .then(function (response) {
                setProfListe(response.data)
            })

            axios.post(`${GConf.ApiLink}/matiere`, {
                PID : GConf.PID,
            })
            .then(function (response) {
                    setMatiereListe(response.data)
            })

            axios.post(`${GConf.ApiLink}/salles`, {
                PID : GConf.PID,
            })
            .then(function (response) {
                    setSalleListe(response.data)
            })

    }, [])

    /*#########################[Function]##################################*/
    const ClasseIsSelectedFunc = (e, { value }) =>{
        setSeanceData({...seanceData, Classe_ID: value })
        axios.post(`${GConf.ApiLink}/seances/classes/eleves`, {
            PID : GConf.PID,
            classeID : value
        })
        .then(function (response) {
               setEleveListe(response.data)
               
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les article de camion  </div></>, GConf.TostInternetGonf)   
            }
          });

    }

    const CheckAllElevePresence = () =>{
            // Check if eleveListe is an array and not empty
            if (!Array.isArray(eleveListe) || eleveListe.length === 0) {
                return false; // Return false if eleveListe is not an array or empty
            }

            // Iterate through each element in eleveListe
            for (const eleve of eleveListe) {
                // Check if presenceState property is missing for any element
                if (!eleve.hasOwnProperty('presenceState')) {
                    return false; // Return false if presenceState property is missing
                }
            }

            return true; // Return true if all elements have presenceState property
    }
    const UpdatePresenceState = (value,state) =>{
        const searchIndex = eleveListe.findIndex((article) => article.EL_ID === value);
        if (searchIndex !== -1) {
            const updatedEleveListe = [...eleveListe]; // Copy the eleveListe array
            updatedEleveListe[searchIndex] = { ...updatedEleveListe[searchIndex], presenceState: state };
            setEleveListe(updatedEleveListe);
        }
    }

    const AddToDoToListFunc = ()=>{
        if (!todoNow) {toast.error("Entreé est  Invalide !", GConf.TostErrorGonf)}
        else {
                let arrayToAdd = {id: seanceData.SE_ToDo.length + 1 ,  Description: todoNow }
                seanceData.SE_ToDo.push(arrayToAdd)
                setTodoNow('')
        }
    }
    const DeleteFromTODOList = (value) =>{
        const searchObject= seanceData.SE_Presence.findIndex((article) => article.EL_ID == value);
        seanceData.SE_Presence.splice(searchObject, 1);
        let resteArticles = seanceData.SE_Presence;
        setSeanceData({...seanceData, SE_Presence: resteArticles })


    }

    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
    }

    const SaveSeance = () =>{
            if (!seanceData.SE_Activite ) {toast.error("Activiteé est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.Classe_ID) {toast.error("Classe  n'est Invalide !", GConf.TostErrorGonf)}
            else if (!CheckAllElevePresence()) {toast.error("Entre le presence de toute les eleves  !", GConf.TostErrorGonf)}
            else if (eleveListe.length == 0 ) {toast.error("SE_Presence list est Invalide !", GConf.TostErrorGonf)}

            else if (seanceData.SE_ToDo.length == 0 ) {toast.error("SE_ToDo list est Invalide !", GConf.TostErrorGonf)}
            
            else if (!seanceData.SE_Date) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.SE_Time_Start) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.SE_Time_Finish) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
                
            else if (!seanceData.Matiere_ID) {toast.error("Matiere_ID  est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.Salle_ID) {toast.error("Salle_ID   est Invalide !", GConf.TostErrorGonf)}
            else if (!seanceData.Proffeseur_ID) {toast.error("Proffeseur_ID   est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/ajouter`, {
                    PID : GConf.PID,
                    seanceData: {SE_Activite: GenerateDiagnostiqueHTml(),  Classe_ID: seanceData.Classe_ID, SE_Presence: eleveListe,  SE_ToDo : seanceData.SE_ToDo  , SE_Date: seanceData.SE_Date , SE_Time_Start : seanceData.SE_Time_Start, SE_Time_Finish : seanceData.SE_Time_Finish ,   Salle_ID: seanceData.Salle_ID ,  Matiere_ID: seanceData.Matiere_ID, Proffeseur_ID : seanceData.Proffeseur_ID } ,
                })
                .then(function (response) {
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
                       
                    }
                  });

            }       
    }

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
                        placeholder='Résumer de la seance  Ici'
                    />
                    <br />
                    <br />
                    <br />
                    {/* <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={() => GenerateDiagnostiqueHTml()}>  <Icon name='edit outline' /> Ajouter</Button> */}
                </div>
        </>)
    }

    const PresenceListeCard = (props) =>{
        const StateCard = ({ status }) => {
            const statusCard = React.useCallback(() => {
              switch(status) {
                case 'P': return <span className='bi bi-check-circle-fill text-success'></span>;  
                case 'A': return <span className='bi bi-x-circle-fill text-danger'></span> ;
                default:  return '';    
              }
            }, [status]);
          
            return (
              <span>
                {statusCard()}
              </span>
            );
        };
        
        return(<>
                    <Ripples className='d-block p-0 mb-1 rounded-pill' >   
                    <div className='card shadow-sm p-2  rounded-pill ps-4' style={{backgroundColor : props.dataA.presenceState ? '#f5e4e4' : ''}}>
                        <div className='row'>
                            <div className='col-1 align-self-center'><b>{props.index +1 }</b></div>
                            <div className='col-4 text-start align-self-center'>
                                <div>{props.dataA.EL_ID}</div> 
                            </div>
                            <div className='col-5 align-self-center'><b><StateCard status={props.dataA.presenceState} /> {props.dataA.EL_Name}    </b></div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger'  onClick={() => UpdatePresenceState(props.dataA.EL_ID,'A')}></Button></div>
                            <div className='col-1 align-self-center'><Button icon="check" className='rounded-circle p-2 text-white bg-success'  onClick={() => UpdatePresenceState(props.dataA.EL_ID,'P')}></Button></div>
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
    const PresenceCard = () =>{
        return(<>
                <div className='row'>
                    <div className='col-12 col-lg-5'>
                        <div className="mb-4 sticky-top" style={{top:'70px'}}>
                        <SelectCamion ClasseIsSelectedFunc={ClasseIsSelectedFunc} eleveListe={eleveListe} camionList={camionList} camionSelectState={camionSelectState} selectedCam={selectedCam} />
                        </div>
                    </div>
                    <div className='col-12 col-lg-7'>
                            <h5>Listes des Medicamment</h5>    
                            {eleveListe.map( (val,index) => <PresenceListeCard key={index} index={index} dataA={val}/>)}
                            <br />
                            
                    </div>
                </div>
            </>)
    }

    const TodoCardListe = (props) =>{
        return(<>
                    <Ripples className='d-block p-0 mb-1 rounded-pill' >   
                    <div className='card shadow-sm p-2   rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-1 align-self-center'><b>{props.index + 1 }</b></div>
                            <div className='col-10 text-start align-self-center'>
                                <div>{props.dataA.Description}</div> 
                            </div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' disabled={saveBtnState} onClick={() => DeleteFromTODOList(props.dataA.EL_ID)}></Button></div>
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
 
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.addSeance} />
        <br />
        <Tab menu={{ widths: panes.length, secondary: true  }} panes={panes} />
        
    </> );
    }

export default AjouterFacture;