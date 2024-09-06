import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../../AssetsM/Cards/breadCrumb';
import GConf from '../../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab, Form, TextArea, Placeholder, Segment} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../../AssetsM/Hooks/fetchClient';
import useGetArticles from '../../../AssetsM/Hooks/fetchArticles';
import usePrintFunction from '../../../AssetsM/Hooks/printFunction';
import Ripples from 'react-ripples'
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // Updated import statement
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';
import OneGConf from '../Assets/OneGConf';
import BackCard from '../Assets/Cards/backCard';



function FactureInfo() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    let {SID} = useParams()
    const [seanceData, setSeanceData] = useState({S_Patient:'PASSAGER',  SE_Activite: 'Null', Resultat:'', Maladie:'',  S_Date: Today.toISOString().split('T')[0], State_Degre: '' , SE_Presence:[], SE_ToDo:[], ordonance:[]})
    const [presenceListe, setPresenceData] = useState([])
    const [todoListe, setToDoListData] = useState([])
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loading, setLoading] = useState(true)
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Resumeé ' }, 
            render: () => <DiagnostiqueCard />,
        },
        {
            menuItem: { key: 'client', icon: 'user', content:  'A Faire' }, 
            render: () =><ToDoListeCard  />,
        },
        {
            menuItem: { key: 'clidsgent', icon: 'user', content:  'Presence' }, 
            render: () =><PresenceCard  />,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Info' }, 
            render: () =><><InfoCard /></> ,
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
                        setSeanceData(response.data[0])
                        
                        
                        if (response.data[0].SE_Presence != '[]') {
                            setPresenceData(JSON.parse(response.data[0].SE_Presence))
                        }

                        if (response.data[0].SE_ToDo != '[]') {
                            setToDoListData(JSON.parse(response.data[0].SE_ToDo))
                        }

                        setLoading(false)
                    }    
                }).catch((error) => {
                if(error.request) {
                    toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
                }
                });
    }, [])

    /*#########################[Function]##################################*/
    const DeleteFromUpdateList = (value) =>{
        const searchObject= seanceData.ordonance.findIndex((article) => article.PK == value);
        seanceData.ordonance.splice(searchObject, 1);
        let resteArticles = seanceData.ordonance;
        setSeanceData({...seanceData, ordonance: resteArticles })


    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}

   /*#########################[Card]##################################*/
    const DiagnostiqueCard = () =>{
        return (<>
                <div className='card card-body shadow-sm border-div '>
                    <h5 className='text-secondary'> <span className='bi bi-chat-right-quote-fill'></span> Resumeé de la Seance :   </h5>
                    <div dangerouslySetInnerHTML={{ __html: seanceData.SE_Activite }}></div>
                    <br />
                </div>
        </>)
    }
    
    const PresenceItemListe = (props) =>{
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
                    <div className='card shadow-sm p-2 mb-2  rounded-pill'>
                        <div className='row'>
                            <div className='col-1 text-center align-self-center'>
                                <div className=''>{props.id + 1 }</div> 
                            </div>
                            <div className='col-9 align-self-center'><b>{props.data.EL_Name}</b></div>
                            <div className='col-2 align-self-center'><StateCard status={props.data.presenceState} /></div>
                        </div>
                    </div>
                </>)
    }
    const PresenceCard = () =>{
        return(<>
                <div className='row'>
                    <div className='col-8'>
                            <h5 className='text-secondary'> <span className='bi bi-child'></span> Presnce des Eléves : </h5>    
                                {presenceListe.map( (data,index) => <PresenceItemListe key={index} id={index} data={data}/>)}
                            <br />
                    </div>
                    <div className='col-4 align-self-center '>
                        <div className='card card-body shadow-sm h-100 border-div align-self-center'>
                            Presence : 
                            <br />
                            Absence : 
                        </div>
                    </div>
                </div>
            </>)
    }

    const TodoItemListe = (props) =>{
        return(<>  
                    <div className='ps-4'>
                        <div className='row'>
                            <div className='col-1 align-self-center'><b>{props.dataA.id} - </b></div>
                            <div className='col-11 text-start align-self-center'>
                                <div>{props.dataA.Description}</div> 
                            </div>
                            
                        </div>
                    </div>
                </>)
    }
    const ToDoListeCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className='col-12  '>
                        <h5 className='text-secondary'> <span className='bi bi-child'></span> ToDo Liste : </h5>    
                            {todoListe.map( (val) => <TodoItemListe key={val.id} dataA={val}/>)}
                        <br />
                    </div> 
                </div>
        </>)
    }
    const InfoCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                        <table className='table mt-2 table-striped table-bordered border-div'>
                            <tbody>
                                <tr>
                                    <td><span className='bi bi-calendar'></span> Date & Heure  :</td>
                                    <td>{new Date(seanceData.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}  </td>
                                </tr> 
                                <tr>
                                    <td><span className='bi bi-clock'></span> De - Vers   :</td>
                                    <td>{seanceData.SE_Time_Start} - {seanceData.SE_Time_Finish}</td>
                                </tr> 
                                <tr>
                                    <td><span className='bi bi-bandaid'></span> Matiére :</td>
                                    <td>{seanceData.Matiere_Name} <span  className='rounded-circle' style={{backgroundColor: seanceData.Matiere_Color, display: 'inline-block', width:'10px', height:'10px'}} ></span></td>
                                </tr>
                                 
                                <tr>
                                    <td><span className='bi bi-person-check'></span> Prof :</td>
                                    <td>{seanceData.T_Name}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-person-fill'></span> Salle  :</td>
                                    <td>{seanceData.Salle_Name} : {seanceData.Salle_Name}</td>
                                </tr>
                                 
                            </tbody>
                        </table>
                </div>
                <br />
                <br />
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
                            <Button as='a' href={`/${OneGConf.routerName}/L/jr/edit/${SID}`} animated   className='rounded-pill bg-system-btn'  fluid>
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

            <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
                <BackCard data={OneGConf.backCard.rt}/>
                <br />
                <div className='container'>
                        <BreadCrumb links={GConf.BreadCrumb.seanceInfo} />
                        <br />
                        <div className='row'>
                            <div className='col-12 col-lg-8'>
                                    {loading ? <LoadingCard /> : <Tab menu={{ pointing: true  , className: 'custom-tab-menu'  }} panes={panes} />}  
                            </div>
                            <div className='col-12 col-lg-4'>
                                <div className="sticky-top" style={{top:'70px'}}>
                                    <BtnsCard />
                                </div> 
                            </div>
                </div>
                </div>
            </div>

        
        
        
    </> );
    }

export default FactureInfo;