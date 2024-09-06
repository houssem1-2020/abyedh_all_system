import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Icon, Input } from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';

const FetchOldEventCard = ({setFetchCalendar, fetchCalendar, SearchTargetEventFun}) =>{
    return(<>
    <div className='card card-body border-div mb-3 '>
        <h5 className='mb-1' ><span className='bi bi-search'></span> Recherche ...</h5>
        <div className='row'>
  
            <div className='col-5 align-self-center'>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={fetchCalendar.De_Date} onChange={(e) => setFetchCalendar({...fetchCalendar, De_Date: e.target.value })}/>
            </div>
            <div className='col-5 align-self-center'>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={fetchCalendar.Vers_Date} onChange={(e) => setFetchCalendar({...fetchCalendar, Vers_Date: e.target.value })}/>
            </div>
            <div className='col-2 align-self-center'>
                <Button fluid className='rounded-pill text-secondary btn-imprimer' icon onClick={(e) => SearchTargetEventFun()}><Icon name='search' /> Recherche </Button>
            </div>
        </div>
    </div>
    </>)
}

function CalendarCommandes() {
    /*#########################[Const]##################################*/
    const [articleEvents , setArticleEvents] = useState([])
    const [todayListe , setTodayListe] = useState([])
    const [fetchCalendar , setFetchCalendar] = useState({De_Date : new Date().toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), Vers_Date : new Date().toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )})
    const navigate = useNavigate();

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/condidat/calendrier`, {
          PID : GConf.PID,
        })
        .then(function (response) {
 
            setTodayListe(response.data.filter((data) =>   data.EX_Date ==  new Date().toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )))
            let calendarData = []
            response.data.map( (getData) => calendarData.push( { title: getData.CD_Name , date: new Date(getData.EX_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), url: `/S/cd/info/${getData.Condidat_ID}` }))
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
    /*#########################[Card]##################################*/
    const TodayListeCard = (props) =>{
        return(<>
                <div className='card p-2 border-div mb-2 bg-white shadow-sm'>
                    <div className='row'>
                        <div className='col-9 align-self-center'>{props.data.CD_Name}<br /> <small>{props.data.EX_Genre}</small></div>
                        <div className='col-3 text-end align-self-center'><Button  size='tiny' icon  onClick={ (e) => NavigateFunction(`/S/cd/info/${props.data.Condidat_ID}`)} className='rounded-pill  ' >  <Icon name='arrow right' /> </Button></div>
                    </div> 
                </div>
        </>)
    }
    

    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.RequestCalendar} />
        <br />
        <div className='row'>
           <div className='col-12 col-lg-9'>  
                <FetchOldEventCard setFetchCalendar={setFetchCalendar} fetchCalendar={fetchCalendar} SearchTargetEventFun={SearchTargetEventFun} />  
                <FullCalendar 
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    locale='fr' 
                    events={articleEvents}
                    height='590px'
                    //allDaySlot= {false}
                    navLinks={true}
                    buttonText= {{ today: 'aujourd\'hui', }}
                />
            </div>
            <div className='col-12 col-lg-3'>
                <div className="sticky-top" style={{top:'90px', zIndex:'999'}}>
                    <h5><span className='bi bi-calendar-week'></span> Rendy-vous D'aujourd'hui </h5>
                    <div className='spesific-commp-s' style={{height: '70vh', overflow: 'scroll', overflowX:'hidden'}}>
                        {
                            todayListe.map((data,index) => <TodayListeCard key={index} data={data} /> )
                        }
                    </div>
                    
                </div> 
            </div> 
        </div>
        <br />
        <br />
    </> );
}

export default CalendarCommandes;