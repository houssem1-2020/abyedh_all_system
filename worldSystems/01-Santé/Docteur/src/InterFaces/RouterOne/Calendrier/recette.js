import React, { useEffect, useState } from 'react';
import GConf from '../../../AssetsM/generalConf';
import BreadCrumb from '../../../AssetsM/Cards/breadCrumb';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input, Modal, TextArea } from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';

const FetchOldEventCard = ({setFetchCalendar, fetchCalendar, SearchTargetEventFun}) =>{
    const { t, i18n } = useTranslation();
    return(<>
    <div className='card card-body border-div mb-3 '>
        <h5 className='mb-1' ><span className='bi bi-search'></span>{t('menuTabs.rdvPage.calendarCardData.searchCardTitle')} </h5>
        <div className='row'>
  
            <div className='col-12 col-lg-5 align-self-center'>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={fetchCalendar.De_Date} onChange={(e) => setFetchCalendar({...fetchCalendar, De_Date: e.target.value })}/>
            </div>
            <div className='col-12 col-lg-5 align-self-center'>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={fetchCalendar.Vers_Date} onChange={(e) => setFetchCalendar({...fetchCalendar, Vers_Date: e.target.value })}/>
            </div>
            <div className='col-12 col-lg-2 align-self-center'>
                <Button fluid className='rounded-pill text-secondary btn-imprimer' icon onClick={(e) => SearchTargetEventFun()}><Icon name='search' /> {t('menuTabs.rdvPage.calendarCardData.searchCardBtn')} </Button>
            </div>
        </div>
    </div>
    </>)
}
const AddEventCard = ({EventData, setEventData,   AddEventFunction , OnKeyPressFunc}) =>{
    const { t, i18n } = useTranslation();
    return<>
         
            <div className='card-body'> 
                <h5 className='mb-1 mt-1'>Titre   </h5>
                <Input icon='text height' type='text'   size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setEventData()}/>
                
                <h5 className='mb-1 mt-1'>Date   </h5>
                <Input icon='calendar' type='date' defaultValue={new Date().toISOString().split('T')[0]} size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setEventData()}/>

                <h5 className='mb-1 mt-3'>Temps   </h5>
                <Input icon='time' defaultValue={new Date().toLocaleTimeString('fr-FR')} type='time' size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setEventData()}/>
                
                <h5 className='mb-1 mt-3'>Description    </h5>
                <Form>
                    <TextArea onKeyPress={event => OnKeyPressFunc(event)} placeholder={t('menuTabs.rdvPage.rdvInfoCardData.sendMessageBox.addResponse')}   className="mb-2 " rows='2' onChange={ (e) => setEventData()}></TextArea>
                </Form>

            </div>
            <div className='text-end mt-3'>
                <Button   fluid className='rounded-pill text-secondary btn-imprimer'  onClick={(e) => AddEventFunction()}><Icon name='time' /> Retarder  </Button>  
            </div>
        
    </>
}
function CalendarCommandes() {
    /*#########################[Const]##################################*/
    const [articleEvents , setArticleEvents] = useState([])
    const [todayListe , setTodayListe] = useState([])
    const [EventData , setEventData] = useState([])
    const [fetchCalendar , setFetchCalendar] = useState({De_Date : new Date().toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), Vers_Date : new Date().toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )})
    const navigate = useNavigate();
    const [modalS, setModalS] = useState(false)
    const { t, i18n } = useTranslation();
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/request`, {
          PID : OneGConf.forPID.PID,
        })
        .then(function (response) {
 
            setTodayListe(response.data.filter((data) => data.State == 'A' && data.RDV_Date ==  new Date().toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )))
            let calendarData = []
            response.data.map( (getData) => calendarData.push( { title: getData.Name , date: new Date(getData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), className: GenerateColor(getData.State)}))
            setArticleEvents(calendarData)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier l'article  </div></>, GConf.TostInternetGonf)   
              setArticleEvents([])
            }
          });
    }, [])

    /*#########################[Functions]#############################*/
    const NavigateFunction = (link) => { navigate(link) }
    const GenerateColor = (genre) => {
        switch (genre) {
            case 'W': return 'border-0 bg-danger';  
            case 'S': return 'border-0 bg-info' ;  
            case 'A': return 'border-0 bg-success';
            case 'R': return 'border-0 bg-danger' ;
            case 'RT': return 'border-0 bg-retarder';
            case 'RD': return 'border-0 bg-rederecter' ;
            case 'F': return 'border-0 bg-secondary';
            default:  return 'border-0 bg-dark';
        }
    }
    const SearchTargetEventFun = () =>{

    }

    const AddEventFunction = () =>{

    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    } 

    /*#########################[Card]##################################*/
    const TodayListeCard = (props) =>{
        return(<>
                <div className='card p-2 border-div mb-2 bg-white shadow-sm'>
                    <div className='row'>
                        <div className='col-6 align-self-center'>{props.data.Name}</div>
                        <div className='col-3 align-self-center text-end'>{props.data.RDV_Time.slice(0,-3)}</div>
                        <div className='col-3 text-end'><Button  size='tiny' icon  onClick={ (e) => NavigateFunction(`/S/rq/rs/info/${props.data.R_ID}`)} className='rounded-pill  ' >  <Icon name='arrow right' /> </Button></div>
                    </div> 
                </div>
        </>)
    }
    

    return ( <>
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.cld}/>
            <br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-lg-9'>  
                        <FetchOldEventCard setFetchCalendar={setFetchCalendar} fetchCalendar={fetchCalendar} SearchTargetEventFun={SearchTargetEventFun} />  
                        <FullCalendar 
                            plugins={[ dayGridPlugin ]}
                            initialView="dayGridMonth"
                            locale={ i18n.language ? i18n.language.split('_')[0] : 'en'}
                            events={articleEvents}
                            height='590px'
                            //allDaySlot= {false}
                            navLinks={true}
                            buttonText= {{ today: 'aujourd\'hui', }}
                        />
                    </div>
                    <div className='col-12 col-lg-3'>
                        <div className="sticky-top" style={{top:'90px', zIndex:'999'}}>
                            <h5><span className='bi bi-calendar-week'></span> {t('menuTabs.rdvPage.calendarCardData.rdvToday')} </h5>
                            <div className='spesific-commp' style={{height: '70vh', overflow: 'scroll', overflowX:'hidden'}}>
                                {
                                    todayListe.map((data,index) => <TodayListeCard key={index} data={data} /> )
                                }
                            </div>
                            <div className="floating-card" style={{zIndex: 10000}} onClick={ () => setModalS(true)}>
                                <i className="bi bi-plus"></i> Ajouter Date 
                            </div>
                        </div> 
                    </div> 
                </div>
                <br />
                <br />
            </div>
        </div>

    
        
        <Modal
            size='mini'
            open={modalS}
            dimmer= 'blurring'
            closeIcon
            onClose={() => setModalS(false)}
            onOpen={() => setModalS(true)}
        >
            <Modal.Header><h4> Ajouter Aux Calendrier  </h4></Modal.Header>
            <Modal.Content  >
                    
                <AddEventCard EventData={EventData} setEventData={setEventData}   AddEventFunction = {AddEventFunction} OnKeyPressFunc={OnKeyPressFunc} />
            </Modal.Content>
                     
        </Modal>
    </> );
}

export default CalendarCommandes;