import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab, Form, TextArea} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../AssetsM/Hooks/fetchClient';
import Ripples from 'react-ripples'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';

const TerminerCard = ({examainData, setExamainData, profListe, salleListe, matiereListe, OnKeyPressFunc}) =>{
     useEffect(()=>{

     },[])
    const ExamGenre = [
        {id:1, text:'Controle', value:'DC'},
        {id:1, text:'Synthése', value:'DS'},
    ]
    return (<>
             
                <h5 className='mb-1 mt-3' >Date </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={examainData.EX_Date} onChange={(e) => setExamainData({...examainData, EX_Date: e.target.value })}/>
                
                <div className='row mt-3'>
                    <div className='col-6'>
                        <h5 className='mb-1'>De  </h5>
                        <Input icon='calendar alternate' type='time' size="small" iconPosition='left'   fluid className='mb-1' value={examainData.EX_Time_Depart} onChange={(e) => setExamainData({...examainData, EX_Time_Depart: e.target.value })}/> 
                    </div>
                    <div className='col-6'>
                        <h5 className='mb-1'>Vers  </h5>
                        <Input icon='calendar alternate' type='time' size="small" iconPosition='left'   fluid className='mb-1' value={examainData.EX_Time_Depart} onChange={(e) => setExamainData({...examainData, EX_Time_Depart: e.target.value })}/> 
                    </div>
                </div>
                <h5 className='mb-1 mt-3'>  Genre : </h5>
                <Dropdown
                    search
                    selection
                    fluid
                    wrapSelection={false}
                    options={ExamGenre}
                    placeholder='Selectionnez Genre'
                    className='mb-1'
                    onChange={(e, { value }) => setExamainData({...examainData, EX_Genre: value })}
                    value={examainData.EX_Genre}
                />

                {/* <h5 className='mb-1 mt-3'>  Prof : </h5>
                <datalist id="profListe">
                        {profListe.map((test,index) =>
                        <option key={index} value={test.T_ID}>{test.T_Name} : {test.Poste}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="profListe" placeholder={examainData.Proffeseur_ID}   onBlur={ (e) => setExamainData({...examainData, Proffeseur_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' /> */}
                        
                <h5 className='mb-1 mt-3'>  Matiére : </h5>
                <datalist id="matiereListe">
                        {matiereListe.map((test,index) =>
                        <option key={index} value={test.Matiere_ID}>{test.Matiere_Name} : {test.Matiere_Genre}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="matiereListe" placeholder={examainData.Matiere_ID}   onBlur={ (e) => setExamainData({...examainData, Matiere_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' /> 

                <h5 className='mb-1 mt-3'>Salle  </h5>
                <datalist id="salleListe">
                        {salleListe.map((test,index) =>
                        <option key={index} value={test.Salle_ID}>{test.Salle_Name} : {test.Salle_Num}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="salleListe" placeholder={examainData.Salle_ID}   onBlur={ (e) => setExamainData({...examainData, Salle_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                
 
    </>)
}

const AddNotesCard = ({OnKeyPressFunc,  AddToDoToListFunc, eleveNow, setEleveNow, eleveListe, saveBtnState}) =>{
    const SelectClasseFunction = (value) => {
        if (value) {
            let filtedClient = eleveListe.find((data) => data.EL_ID == value)
            setEleveNow(filtedClient)
        }
       
    }
    return (<>
            <div className='card card-body shadow-sm mb-2 border-div'>
                
                <h5>ajouter à la liste TODO</h5> 
                <datalist id="clientList">
                    {eleveListe.map((test) =>
                    <option key={test.EL_ID} value={test.EL_ID}>{test.EL_Name} : {test.CL_Niveaux}</option>
                    )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" value={eleveNow.EL_ID}   onBlur={ (e) => SelectClasseFunction(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                <div className='card-body border-div mb-4 mt-4 mb-3 bg-gray'>
                    <div className='row '>
                        <div className='col-6 '> <span className='bi bi-person-fill'></span> Eleve :  {eleveNow.EL_Name  ? eleveNow.EL_Name  : ''}</div>
                        <div className='col-6 '> <span className='bi bi-box'></span> Classe : {eleveNow.CL_Niveaux  ? eleveNow.CL_Niveaux  : ''} </div>
                    </div>
                </div>

                <Input icon='add user' type='number'   value={eleveNow.Note}   onChange={ (e) => setEleveNow({...eleveNow, Note : e.target.value })} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />

                <br />
                <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={() => AddToDoToListFunc({})}>  <Icon name='edit outline' /> Ajouter</Button>
            </div>
    </>)
}


function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    let {EID} = useParams()
    const [examainData, setExamainData] = useState({Classe_ID:'',  SE_Activite: 'Null', Matiere_ID:'',    SE_Date: Today.toISOString().split('T')[0], Salle_ID: '' , SE_Time_Start:new Date().toLocaleTimeString([],{ hourCycle: 'h23'}),  SE_Time_Finish :new Date().toLocaleTimeString([],{ hourCycle: 'h23'}), SE_ToDo: [],   SE_Presence:[]})
    const [eleveListe, setEleveListe] = useState([])
    const [notesListe, setNotesListe] = useState([])
    const [profListe, setProfListe] = useState([])
    const [matiereListe, setMatiereListe] = useState([])
    const [salleListe, setSalleListe] = useState([]) 

    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clientList, allClientList] = useGetClients()
    const [eleveNow, setEleveNow] = useState({})
     
    const panes = [
        {
            menuItem: { key: 'clidsgent', icon: 'user', content:  'Presence' }, 
            render: () =><PresenceCard  />,
        },
        {
            menuItem: { key: 'client', icon: 'user', content:  'Notes' }, 
            render: () =>   <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                                        <AddNotesCard OnKeyPressFunc={OnKeyPressFunc}   eleveNow={eleveNow}  AddToDoToListFunc={AddToDoToListFunc} setEleveNow={setEleveNow} eleveListe={eleveListe} examainData={examainData} saveBtnState={saveBtnState}  />        
                                    </div>
                                </div>
                                <div className='col-12 col-lg-6'>
                                        <h5>Listes des Notes</h5>    
                                            {notesListe.map( (val, index) => <NotesListeCard key={val.id} index={index} dataA={val}/>)}
                                        <br />
                                        
                                </div>
                            </div> ,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'INFO' }, 
            render: () =>  <FinishCard  /> ,
        }
        
    ]
     
    /* ############################### UseEffect ########################*/
    useEffect(() => {
            axios.post(`${GConf.ApiLink}/examain/info/edit`, {
                PID : GConf.PID,
                EID: EID
            })
            .then(function (response) {
 
                if(!response.data.Data) {
                    toast.error('Seance Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/ex"; }, 2000)
                    
                } else {
                    //setCamionList([{value : response.data.Data.CL_ID, text : <>{response.data.Data.CL_Name} : {response.data.Data.CL_Niveaux} - {response.data.Data.CL_Seasson}</>, key: response.data.Data.PK}])
                    setExamainData(response.data.Data)
                    
                    if (response.data.Data.EX_Presence != '[]') {
                        setEleveListe(JSON.parse(response.data.Data.EX_Presence))
                    } else {
                        setEleveListe(response.data.Eleves)
                    }
                    if (response.data.Data.EX_Notes !== '[]') {setNotesListe(JSON.parse(response.data.Data.EX_Notes))}
                    setLoading(false)


                    // setExamainData((prevexamainData) => ({
                    //     ...prevexamainData,
                    //     ...response.data.Data,
                    //     SE_ToDo: response.data.Data.SE_ToDo !== '[]' ? JSON.parse(response.data.Data.SE_ToDo) : prevexamainData.SE_ToDo,
                    //   }));
                    //setOrId(response.data.Data.Ordonance)
                    
                }    
            }).catch((error) => {
            if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
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
    const DeleteFromTODOList = (value) =>{
        const searchObject= examainData.SE_Presence.findIndex((article) => article.EL_ID == value);
        examainData.SE_Presence.splice(searchObject, 1);
        let resteArticles = examainData.SE_Presence;
        setExamainData({...examainData, SE_Presence: resteArticles })


    }
    
    const AddToDoToListFunc = () => {
         
        if (!eleveNow) {toast.error("Entreé est  Invalide !", GConf.TostErrorGonf)}
        else {

            const searchObject = notesListe.find((article) => article.EleveID == eleveNow.EL_ID);
            if (searchObject) {
                let IndexOfArticle = notesListe.findIndex((article) => article.EleveID == eleveNow.EL_ID)
                notesListe[IndexOfArticle].Note =  eleveNow.Note
                setEleveNow({})
                setNotesListe(notesListe)
            } 
            else {
                    let arrayToAdd = {id: notesListe.length + 1  ,  EleveID: eleveNow.EL_ID,  Eleve: eleveNow.EL_Name,   Note: eleveNow.Note }
                    notesListe.push(arrayToAdd)
                    console.log(notesListe)
                    //setNotesListe(notesListe)
                    setEleveNow({})
            }
        }
    }
    const SaveEditExam = () =>{
            if (!examainData.EX_ID ) {toast.error("Activiteé est Invalide !", GConf.TostErrorGonf)}
            else if (!examainData.Classes_ID) {toast.error("Classe  n'est pas Invalide !", GConf.TostErrorGonf)}
            else if (!examainData.Matiere_ID) {toast.error("Matiére  n'est pas  Invalide !", GConf.TostErrorGonf)}
            else if (!examainData.EX_Genre) {toast.error("Genre  n'est pas Invalide !", GConf.TostErrorGonf)}
            else if (!examainData.EX_Date) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!examainData.EX_Time_Depart) {toast.error("Depart est Invalide !", GConf.TostErrorGonf)}
            else if (!examainData.EX_Time_Finish) {toast.error("Termine  est Invalide !", GConf.TostErrorGonf)}
             

            else if (eleveListe.length == 0 ) {toast.error("Presence list est Invalide !", GConf.TostErrorGonf)}
            else if (notesListe.length == 0 ) {toast.error("Notes list est Invalide !", GConf.TostErrorGonf)}
        
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/examain/modifier`, {
                    PID : GConf.PID,
                    examainData:  examainData ,
                    eleveListe:  eleveListe ,
                    notesListe:  notesListe ,
                })
                .then(function (response) {
                    console.log(response.data)
                    if(response.data.affectedRows) {
                        setSaveBtnState(true)
                        toast.success("Examain Enregistreé !", GConf.TostSuucessGonf)
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
    
    const PresenceCard = () =>{
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

        return(<>
                <div className='row'>
                     
                    <div className='col-12 col-lg-8'>
                            <h5>Listes des Eleves </h5>    
                                {eleveListe.map( (val,index) => <PresenceListeCard key={index} index={index} dataA={val}/>)}
                            <br /> 
                    </div>
                    <div className='col-12 col-lg-4 align-self-center'>
                            <div className='card card-body shadow-sm h-100 border-div align-self-center'>
                                Presence : 
                                <br />
                                Absence : 
                            </div>
                    </div>
                </div>
            </>)
    }
    const NotesListeCard = (props) =>{
        return(<>
                    <Ripples className='d-block p-0 mb-1 rounded-pill' >   
                    <div className='card shadow-sm p-2   rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-1 align-self-center'><b>{props.index + 1 }</b></div>
                            <div className='col-10 text-start align-self-center'>
                                <div>{props.dataA.Eleve} : {props.dataA.Note}</div> 
                            </div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' disabled={saveBtnState} onClick={() => DeleteFromTODOList(props.dataA.EL_ID)}></Button></div>
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
    const FinishCard = () => {
        return(<><div className='card card-body shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-12 col-lg-7 '>
                            <div className='row'>
                                <div className='col-6'>
                                    <h5>Presence </h5>
                                    <div className='' style={{height: '70vh', overflow: 'scroll', overflowX:'hidden'}}>
                                        <ul>
                                            {eleveListe.map((data,index) => <li>bla bla </li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <h5>Notes </h5>
                                    <div className='' style={{height: '70vh', overflow: 'scroll', overflowX:'hidden'}}>
                                        <ul>
                                            {notesListe.map((data,index) => <li>bla bla </li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-5 '>
                                <TerminerCard examainData={examainData} setExamainData={setExamainData} clientList={clientList}  profListe={profListe} matiereListe={matiereListe}  salleListe={salleListe} OnKeyPressFunc={OnKeyPressFunc} />
                                <br />
                                <div className='row mb-2'>
                                    <div className='col-12'>
                                        <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveEditExam}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                                    </div>
                                </div>
                        </div>
            </div>
        </div></>)
    }


    return (<>
        <BreadCrumb links={GConf.BreadCrumb.addSeance} />
        <br />
        
        <div className='d-none d-lg-block'><Tab menu={{widths: panes.length ,  pointing: true  }} panes={panes} /></div>
        <div className='d-lg-none '><Tab menu={{  pointing: true , className: 'custom-tab-menu'   }} panes={panes} /></div>
        
    </> );
    }

export default AjouterFacture;