import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import SubNav from '../../AssetsM/Cards/subNav';
import GoBtn from '../../AssetsM/Cards/goBtn';
import TableImage from '../../AssetsM/Cards/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Tab} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
function RequestPage() {
    /*#########################[Const]##################################*/
    let [commandeList, setCommandeList] = useState([SKLT.TableSlt]); 
    let [reservationList, setReservationList] = useState([SKLT.TableSlt]); 
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    let [reservationListTwo, setReservationListTwo] = useState([SKLT.TableSlt]); 
    const [activeIndex, setActiveIndex] = useState(10)
    let  [acceptedResForCalendar, setAcceptedResForCalendar] = useState([]); 
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
   /*#########################[UseEfeect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/request`, {
           PID : GConf.PID,
        })
        .then(function (response) {
          console.log(response.data)
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
            let commandeContainer = []
            response.data.Souscription.map( (commandeDate) => commandeContainer.push([          
              _(<TableImage forStock image='souscription.png' />),
            commandeDate.R_ID,
            commandeDate.EL_Name,
            commandeDate.CL_Name,
            _(<StateCard status={commandeDate.State} />),
            _(<Button className='rounded-pill bg-success text-white' size='mini' onClick={ () =>  UpdateRequestState('A',false,false,true,false,commandeDate, commandeDate.R_ID)}><span className='d-none d-lg-inline'> Accepter </span><Icon  name='check' /></Button>),
            _(<Button className='rounded-pill bg-danger text-white' size='mini' onClick={ () =>  UpdateRequestState('R',false,false,true,false,commandeDate, commandeDate.R_ID)}><span className='d-none d-lg-inline'> Refuseé </span><Icon  name='times' /></Button>)
        ],))
        setReservationList(commandeContainer)
        setReservationListTwo(response.data.Souscription)

  
            
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, GConf.TostInternetGonf)   
            setCommandeList([])
            setReservationList([])
          }
        });
    }, [])
    
   /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const UpdateRequestState = (stateBtn,dataGenre,selectedData,saveNotif,actionName,requestData,CID) =>{
      
        axios.post(`${GConf.SharedApi}/request/controle`, {
            PID : GConf.PID,
            UID : requestData.UID,
            TAG : 'garderie',
            RID: CID,
            genreTag : 'garderie_souscription',
            state: stateBtn,
            data: selectedData,
            dataGenre: dataGenre,
            saveNotif : saveNotif,
            actionName : `garderie_${actionName}`,
          })
          .then(function (response) { 
             
            if (stateBtn == 'S') { console.log('Vu') } else { toast.success(<><div> C'est Fait   </div></>, GConf.TostInternetGonf)   }
            if(requestData.Notif_TID != '') { SendNotification(stateBtn,requestData) }
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier L'etat du commande  </div></>, GConf.TostInternetGonf)   
              
            }
          });
    }
    const SendNotification = (stateBtn,requestData) =>{
        axios.post(`https://api.abyedh.com/api/application/Search/request/firbase-notif`, {
            token : requestData.Notif_TID,
            message : {
                title: requestData.R_ID,
                body: t(`menuTabs.rdvPage.rdvInfoCardData.sendMessageBox.stateActionText.${stateBtn}`) ,
                url: `https://abyedh.com/Profile/L/sv/${requestData.R_ID}`, 
                photo: `https://cdn.abyedh.com/Images/Search/CIconsS/${GConf.systemTag}.gif`
            },
        }).then(function (response) {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }
    const RemplirCalendarEvent = () => {
        let found = reservationList.filter(element => element.State === 'A')
        let calendarData = []
        found.map( (getData) => calendarData.push( { title: getData.Name , date: new Date(getData.Wanted_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}))
        setAcceptedResForCalendar(calendarData)
    }
    const FetchByGenreReserv = (genre,tabIndex) =>{  
      let found = reservationListTwo.filter(element => element.State === genre)
      let commandeContainer = []
          found.map( (commandeDate) => commandeContainer.push([          
            _(<TableImage forStock image='souscription.png' />),
            commandeDate.R_ID,
            commandeDate.EL_Name,
            commandeDate.CL_Name,
            _(<StateCard status={commandeDate.State} />),
            _(<Button className='rounded-pill bg-success text-white' size='mini' onClick={ () =>  UpdateRequestState('A',false,false,true,false,commandeDate, commandeDate.R_ID)}><span className='d-none d-lg-inline'> Accepter </span><Icon  name='check' /></Button>),
            _(<Button className='rounded-pill bg-danger text-white' size='mini' onClick={ () =>  UpdateRequestState('R',false,false,true,false,commandeDate, commandeDate.R_ID)}><span className='d-none d-lg-inline'> Refuseé </span><Icon  name='times' /></Button>)
        ],))
        setReservationList(commandeContainer)
        setActiveIndex(tabIndex)
    }
 
    const openEditModal = (event,selected) =>{
        RemplirCalendarEvent()
        setSelectedArticle(event)
        setModalS(true)
    }

    /*#########################[Card]##################################*/
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'W': return <StateCard color='warning' text='En Attent' />;  
            case 'S': return <StateCard color='info' text='Vu' />;  
            case 'A': return <StateCard color='success' text='Acepteé' /> ;
            case 'R': return <StateCard color='danger' text='Refuseé' />;
            case 'F': return <StateCard color='secondary' text='Termineé' />;
            default:  return <StateCard color='dark' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const MainSubNavCard = (props) =>{
      return(<>
         <NavLink exact='true' to={`/S/${props.link}`} className='card card-body mb-1 rounded-pill shadow-sm d-inline-block ' >
           <h4 style={{color : GConf.themeColor}}> <span className={`bi bi-${props.icon} me-1 `}></span>{props.text}</h4>
         </NavLink> 
      </>) 
   }
    const CustomTabs = () => {
      return(<>
        <div className='row mb-3'>
            <div className='col-12 col-lg-10 align-self-center' >
              <div style={{width:'100%', overflowX: 'auto', overflowY : 'hidden',  whiteSpace:'nowrap'}}>
                  <Menu secondary >
                      <Menu.Item active={activeIndex == 0} className='rounded-pill' onClick={ () => FetchByGenreReserv('W',0)}>
                        <span className='text-warning'>
                          <b>
                            <span className='bi bi-hourglass-split'></span> En Attent
                          </b>
                        </span>
                      </Menu.Item>
                      {/* <Menu.Item active={activeIndex == 1} className='rounded-pill' onClick={ () => FetchByGenreReserv('S',1)}>
                        <span className='text-primary'>
                          <b>
                            <span className='bi bi-eye-fill'></span> Vu
                          </b>
                        </span>
                      </Menu.Item> */}
                      <Menu.Item active={activeIndex == 2} className='rounded-pill' onClick={ () => FetchByGenreReserv('A',2)}>
                        <span className='text-success'>
                          <b>
                            <span className='bi bi-check-square-fill'></span> Accepteé
                          </b>
                        </span>
                      </Menu.Item>
                      <Menu.Item active={activeIndex == 3} className='rounded-pill' onClick={ () => FetchByGenreReserv('R',3)}>
                        <span className='text-danger'>
                          <b>
                            <span className='bi bi-x-square-fill'></span> Refuseé
                          </b>
                        </span>
                      </Menu.Item>
                      <Menu.Item active={activeIndex == 5} className='rounded-pill' onClick={ () => FetchByGenreReserv('CF',5)}>
                        <span className='text-info'>
                          <b>
                            <span className='bi bi-file-earmark-check'></span> Confirmeé
                          </b>
                        </span>
                      </Menu.Item>
                      {/* <Menu.Item active={activeIndex == 4} className='rounded-pill' onClick={ () => FetchByGenreReserv('T',4)}>
                        <span className='text-secondary'>
                          <b>
                            <span className='bi bi-slash-square-fill'></span> Termineé
                          </b>
                        </span>
                      </Menu.Item> */}
                  </Menu>
              </div>
          </div>
           
        </div>
      </>)
    }
    return (<>
            
        <Fade>
         
          <CustomTabs  /> 
          <TableGrid tableData={reservationList} columns={GConf.TableHead.souscription} />
        </Fade>
 
    </>);
}

export default RequestPage;