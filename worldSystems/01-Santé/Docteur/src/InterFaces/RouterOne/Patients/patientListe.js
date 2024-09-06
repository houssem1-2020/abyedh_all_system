import React, {useEffect,useState}  from 'react';
import GConf from '../../../AssetsM/generalConf';
import SubNav from '../../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../../AssetsM/Cards/usedSlk'
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import TableImage from '../../../AssetsM/Cards/tableImg';
import GoBtn from '../../../AssetsM/Cards/goBtn';
import { Button , Divider, Icon, Label, Loader, Statistic, Tab} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import OneGConf from '../Assets/OneGConf';
import BackCard from '../Assets/Cards/backCard';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

function ClientPage() {
    /*################[Variable]###############*/
    const { t, i18n } = useTranslation();
    const  [clientList, setClientList] = useState([SKLT.TableSlt]); 
    const [openD, setOpenD] = useState(false)
    const [CLID, setCLID] = useState('')
    const navigate = useNavigate();
    let Offline = JSON.parse(localStorage.getItem(`${OneGConf.forPID.PID}_Offline`));
    const colors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
        'black',
    ]

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/patient`,{
            PID: OneGConf.forPID.PID
        })
        .then(function (response) {
            let testTable = []
            response.data.map( (getData) => testTable.push([
            _(<AvatarCard lettre={capitalizeFirstLetter(getData.PA_Name)} />),
            getData.PA_Name,
            new Date(getData.PA_Naissance).toLocaleDateString('fr-FR').split( '/' ).join( '-' ) ,
            getData.Phone,
            _(<>{getData.Gouv} , {getData.Deleg} </>),
            getData.Adress,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => OpenModalOfPatient(getData.PA_ID)}><span className='text-bold'> {t('menuTabs.patientPage.infoText')} </span></Button>)
            ],))
            setClientList(testTable)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
              let testTable = []
            Offline.client.map( (getData) => testTable.push([
            _(<AvatarCard lettre={capitalizeFirstLetter(getData.PA_Name)} />),
            getData.PA_Name,
            new Date(getData.PA_Naissance).toLocaleDateString('fr-FR').split( '/' ).join( '-' ) ,
            getData.Phone,
            _(<>{getData.Gouv} , {getData.Deleg} </>),
            getData.Adress,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => OpenModalOfPatient(getData.PA_ID)}><span className='text-bold'> {t('menuTabs.patientPage.infoText')} </span></Button>)
            ],))
            setClientList(testTable)
            }
          });
    }, [])
    
    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const  capitalizeFirstLetter = (string) =>{
        return (string.charAt(0).toUpperCase() + string.slice(1)).charAt(0);
    }
    const OpenModalOfPatient = (patientID) => {
        setCLID(patientID)
        setOpenD(!openD)
    }
    /*################[Card]###############*/
     const AvatarCard = (props) =>{
            return(<>
                <Label size='massive' circular color={colors[Math.floor(Math.random() * 10)]} key={1}>
                    <h3>{props.lettre}</h3>
                </Label>
                
            </>)
     }
     const GetPatientData = () => {
        const [clientD, setClientD] = useState([])
        const [loadingPD , setLoadingPD] = useState(true)
        const [reservationListe, setReservation] = useState([])
        const [commande, setCommande] = useState([])
        const [factures, setFactures] = useState([])

        const panes = [
            {
                menuItem: { key: 'commande', icon: 'calendar alternate', content: t('menuTabs.patientPage.patientInfo.TabsCardText.seance') }, 
                render: () =><TableGrid tableData={commande} columns={t(`TableHead.clientCommande`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)}  />,
            },
            {
                menuItem: { key: 'home', icon: 'home', content: t('menuTabs.patientPage.patientInfo.TabsCardText.ordonance') }, 
                render: () => <><TableGrid tableData={factures} columns={t(`menuTabs.patientPage.patientInfo.ordoTableaHeders`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} /><br /></>,
            },
            {
                menuItem: { key: 'Reservation', icon: 'calendar alternate', content: t('menuTabs.patientPage.patientInfo.TabsCardText.rdv') }, 
                render: () =><TableGrid tableData={reservationListe} columns={t(`menuTabs.patientPage.patientInfo.rdvTableaHeders`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
            },
            // {
            //     menuItem: { key: 'edit', icon: 'edit', content: t('menuTabs.patientPage.patientInfo.TabsCardText.modifier') }, 
            //     render: () => <><Tab.Pane className='border-div' attached={false}><EditClientCard OnKeyPressFunc={OnKeyPressFunc} clientD={clientD} setClientD={setClientD} EditClient={EditClient} delegList={delegList} gouvList={gouvList} GetDelegList={GetDelegList}  loaderState={loaderState}/></Tab.Pane><br /></>,
            // },
            // {
            //     menuItem: { key: 'verif', icon: 'edit', content: t('menuTabs.patientPage.patientInfo.TabsCardText.verifier') }, 
            //     render: () => <><Tab.Pane className='border-div' attached={false}><FindInDirectory clientD={clientD} RelateToUID={RelateToUID} saveBtnRUIState={saveBtnRUIState} inAbyedhSearch={inAbyedhSearch}  setInAbyedhSearchUID={setInAbyedhSearchUID} FindInDirectoryFunc={FindInDirectoryFunc} loaderState={loaderState} OnKeyPressFunc={OnKeyPressFunc} dataInAbyedh={dataInAbyedh}/></Tab.Pane><br /></>,
            // },
            // {
            //     menuItem: { key: 'delete', icon: 'trash alternate', content: t('menuTabs.patientPage.patientInfo.TabsCardText.supprimer') }, 
            //     render: () => <><Tab.Pane className='border-div' attached={false}><DeleteClient /></Tab.Pane><br /></>,
            // },
        ]
        useEffect(() => {
            //client Info
            axios.post(`${GConf.ApiLink}/patient/info`, {
                PID : OneGConf.forPID.PID,
                patientId : CLID
            }).then(function (response) {
                if(!response.data.Data.PK) {
                    toast.error('Client Introuvable !', GConf.TostSuucessGonf)
                } else {
                    
                    console.log(response.data.Data)
                    setClientD(response.data.Data)
                    
                    let factureTable = []
                    response.data.Ordonance.map( (getData, index) => factureTable.push([ 
                    getData.OR_ID,
                    response.data.Data.PA_Name,
                    new Date(getData.OR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.OR_Time,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/or/info/${getData.OR_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                    ],))
                    setFactures(factureTable)
    
                    let commandeTable = []
                    response.data.Seances.map( (getData, index) => commandeTable.push([ 
                        getData.S_ID,
                        response.data.Data.PA_Name,
                        new Date(getData.S_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                        getData.S_Time,
                        getData.State_Degre,
                        _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sa/info/${getData.S_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                    ],))
                    setCommande(commandeTable)
    
                    let reservationTable = []
                    response.data.RDV.map( (getData, index) => reservationTable.push([ 
                        getData.R_ID,
                        response.data.Data.PA_Name,
                        new Date(getData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                         getData.RDV_Time,
                        _(<StateCard status={getData.State} />),
                        _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/cm/info/${getData.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                    ],))
                    setReservation(reservationTable)
    
                    setLoadingPD(false)
                    
                }
    
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les info du client  </div></>, GConf.TostInternetGonf)   
                  setClientD([])
                  //setPosition([0,0])
                  setLoadingPD(false)
                }
            });
    
            
        }, [])

        const StateCard = ({ status }) => {
            const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
            const statusCard = React.useCallback(() => {
              switch(status) {
                case 'W': return <StateCard color='warning' text='En Attent' />;  
                case 'S': return <StateCard color='info' text='Vu' />;  
                case 'A': return <StateCard color='success' text='Acepteé' /> ;
                case 'R': return <StateCard color='danger' text='Refuseé' />;
                case 'RT': return <StateCard color='retarder' text='Retardeé' />;
                case 'RD': return <StateCard color='rederecter' text='Redirecteé' />;
                case 'F': return <StateCard color='secondary' text='Termineé' />;
                default:  return <StateCard color='secondary' text='Indefinie' />;    
              }
            }, [status]);
          
            return (
              <div className="container">
                {statusCard()}
              </div>
            );
        };

        const ClientCard = () =>{
            return (<>
                <div className="sticky-top" style={{top:'70px'}}>
                    <div className='card card-body shadow-sm mb-2 border-div'>
                        <div className="upper">
                            <div className="mcbg main-big-card"></div>
                        </div>
                        <div className="img-card-container text-center">
                            <div className="card-container">
                                <img src="https://cdn.abyedh.com/images/system/docteur/patient.png" className="rounded-circle" width="80" />                    
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                                <h4 className='mt-2'>{!loadingPD ? clientD.PA_Name : SKLT.BarreSkl } </h4> 
                                <h6 className="text-secondary">  {!loadingPD ? <><span className="bi bi-geo-alt-fill"></span> { clientD.Adress } </>: SKLT.BarreSkl} </h6>
                                <h6 className="text-secondary"> {!loadingPD ? <><span className="bi bi-geo-fill"></span> { clientD.Gouv } , ({ clientD.Deleg })</>: SKLT.BarreSkl } </h6>
                                <h6 className="text-secondary"> {!loadingPD ? <><span className="bi bi-calendar"></span> {  new Date(clientD.PA_Naissance).toLocaleDateString('fr-FR').split( '/' ).join( '-' ) } </>: SKLT.BarreSkl } </h6>
                                <Divider horizontal className='text-secondary mt-4'>{t('menuTabs.patientPage.patientInfo.mainCardText.verification')}</Divider>
                                <div className='row text-center'>
                                    <div className='col-12'>    
                                        {!loadingPD ?  
                                            <Statistic color='red' size='tiny'>
                                                <Statistic.Value>
                                                    {clientD.Releted_UID ? clientD.Releted_UID : t('menuTabs.patientPage.patientInfo.mainCardText.notVerifier')} 
                                                </Statistic.Value>
                                            </Statistic>
                                        : SKLT.BarreSkl }  
                                        
                                    </div>
                                </div>
                                <Divider horizontal className='text-secondary mt-4'>{t('menuTabs.patientPage.patientInfo.mainCardText.telephone')}</Divider>
                                <div className='row text-center'>
                                    <div className='col-12 mb-3'> 
                                        {!loadingPD ?  
                                            <Statistic color='green' size='tiny'>
                                                <Statistic.Value>
                                                    {clientD.Phone} 
                                                </Statistic.Value>
                                            </Statistic>
                                        : SKLT.BarreSkl }   
                                    </div>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </>);
        }
        return(<>
            {loadingPD ? 'LoadingPage' :
            <>
                <div className="container pb-4">
                    <div className="row">
                            <div className="col-12 col-lg-4">
                                <ClientCard /> 
                            </div>
                            <div className="col-12 col-lg-8 ">
                                <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                            </div>
                    </div>
                </div>
            </>}
        </>) 
     }

    return (<>
 
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
	    <BackCard data={OneGConf.backCard.cl}/>
	    <br />
	    <div className='container'>
                <Fade>
                
                <br />
                <TableGrid tableData={clientList} columns={t(`TableHead.client`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)}  />
                </Fade>
	    </div>
	</div>
    <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
            <GetPatientData />
    </BottomSheet>
        
    </>);
}

export default ClientPage;