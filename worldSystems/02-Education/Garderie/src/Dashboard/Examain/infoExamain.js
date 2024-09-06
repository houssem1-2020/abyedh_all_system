import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button,   Icon,  Placeholder,  Tab } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
 
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import Ripples from 'react-ripples'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';

function FactureInfo() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    let {EID} = useParams()
    const [examData, setExamData] = useState({S_Patient:'PASSAGER',  Diagnostic: 'Null', Resultat:'', Maladie:'',  S_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[]})
    const [presenceListe, setPresenceListe] = useState([])
    const [notesListe, setNotesListe] = useState([])
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loading, setLoading] = useState(true)
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'INFO ' }, 
            render: () => <InfoCard />,
        },
        {
            menuItem: { key: 'client', icon: 'user', content:  'RESULTAT' }, 
            render: () =><ResultCard />,
        },
        {
            menuItem: { key: 'clidsgent', icon: 'user', content:  'PRESENCE' }, 
            render: () =><PresenceCard  />,
        },
         
        
    ]
     
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
          axios.post(`${GConf.ApiLink}/examain/info`, {
                PID : GConf.PID,
                EID: EID
                })
                .then(function (response) {
                    if(!response.data[0]) {
                        toast.error('Facture Introuvable !', GConf.TostSuucessGonf)
                        setTimeout(() => {  window.location.href = "/S/ex"; }, 2000)
                        
                    } else {
                        setExamData(response.data[0])
                        
                        if (response.data[0].EX_Presence != '[]') {
                            setPresenceListe(JSON.parse(response.data[0].EX_Presence))
                        }
                        if (response.data[0].EX_Presence != '[]') {
                            setNotesListe(JSON.parse(response.data[0].EX_Presence))
                        }
                    }   
                    setLoading(false) 
                }).catch((error) => {
                if(error.request) {
                    toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
                }
                });
    }, [])

    /*#########################[Function]##################################*/ 
    const DeleteFromUpdateList = (value) =>{
        const searchObject= examData.ordonance.findIndex((article) => article.PK == value);
        examData.ordonance.splice(searchObject, 1);
        let resteArticles = examData.ordonance;
        setExamData({...examData, ordonance: resteArticles })


    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
 
   /*#########################[Card]##################################*/
    const InfoCard = () =>{
        return (<>
                <div className='card card-body shadow-sm border-div '>
                    <h5>Info de L'examain   </h5>
                    <table className='table mt-2 table-striped table-bordered border-div'>
                            <tbody>
                                <tr>
                                    <td><span className='bi bi-calendar'></span> Date    :</td>
                                    <td>{new Date(examData.EX_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</td>
                                </tr> 
                                <tr>
                                    <td><span className='bi bi-clock'></span> Heure  :</td>
                                    <td> de {examData.EX_Time_Depart} à  {examData.EX_Time_Finish}</td>
                                </tr> 
                                <tr>
                                    <td><span className='bi bi-bandaid'></span> Classe  :</td>
                                    <td>{examData.CL_Name}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-bandaid'></span> Matiére :</td>
                                    <td>{examData.Matiere_Name}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-bandaid'></span> Salle :</td>
                                    <td>{examData.Salle_Name}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-list-nested'></span> Devoir de  :</td>
                                    <td><StateCard status={examData.EX_Genre} /></td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-chat-dots-fill'></span> Corrigeé  :</td>
                                    <td>{examData.EX_Correction  == 'true' ? <span className='bi bi-check-circle-fill text-success'></span> : <span className='bi bi-x-circle-fill text-danger' ></span>}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
        </>)
    }
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge badge-lg bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'DS': return <StateCard color='danger' text='Synthése' />;  
            case 'DC': return <StateCard color='success' text='Controle' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
           <span> {statusCard()} </span>
            
           
        );
    };
    const PresenceListe = (props) =>{
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
    const NotesListe = (props) =>{
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
    const ResultCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-12 col-lg-7'>
                                <h5>Listes des Notes</h5>    
                                {notesListe.map( (val) => <NotesListe key={val.id} dataA={val}/>)}
                                <br />
                                
                        </div>
                    </div> 
                </div>
        </>)
    }
    const PresenceCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-12 col-lg-7'>
                                <h5>Presence</h5>    
                                {presenceListe.map( (val) => <PresenceListe key={val.id} dataA={val}/>)}
                                <br />
                                
                        </div>
                    </div>
                </div>
            </>)
    }
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Controle</h5>
                    <div className='row mb-2'>
                    <div className='col-6'>
                        <Button  className='rounded-pill btn-imprimer'  fluid onClick={(e) => PrintFunction('printFacture')}><Icon name='edit outline' /> Imprimer</Button>
                    </div>
                    <div className='col-6'>
                            <Button as='a' href={`/S/ex/modifier/${EID}`} animated   className='rounded-pill bg-system-btn'  fluid>
                                <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                    </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <Button  className='rounded-pill btn-danger'  fluid><Icon name='edit outline' /> Supprimer</Button>
                        </div>
                         
                    </div>
                     
                </div>
        </>)
    }
    const LoadingCard = () =>{
        const SimpleLoadinCard = (props) =>{
            return(<>
                <Placeholder fluid className='border-div w-100' style={{ height: props.fullHeight ? 180 : 40}}>
                    <Placeholder.Image />
                </Placeholder>
            </>)
        }
        return(<>
            <div className='row'>
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-12'> <SimpleLoadinCard  fullHeight/> </div>
            </div>
        </>)
    }

    return (<>
        <BreadCrumb links={GConf.BreadCrumb.examInfo} />
        <br />
        <div className='row'>
            <div className='col-12 col-lg-8'>
                {loading ? <LoadingCard /> : <Tab menu={{ pointing: true  , className: 'custom-tab-menu'  }} panes={panes} />}
                {/* <Tab menu={{ widths: panes.length, secondary: true  }} panes={panes} /> */}
            </div>
            <div className='col-12 col-lg-4'>
                <div className="sticky-top" style={{top:'70px'}}>
                    <BtnsCard />
                </div> 
            </div>
        </div>
        
    </> );
    }

export default FactureInfo;