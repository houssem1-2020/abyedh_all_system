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
    const Mainpanes = [
      {
        menuItem: { key: 'attent',  content: <span className='text-secondary border-secondary'><b><span className='bi bi-calendar2-week'></span> Inscription</b></span>  },
        render: () => <><CustomTabs  /> 
                        <Tab menu={{ secondary: true }} activeIndex={activeIndex} panes={panesRes}  className='no-menu-tabs mt-2' />
                        </>,
      },
      {
        menuItem: { key: 'accept',  content: <span className='text-secondary border-secondary'><b><span className='bi bi-cart-dash'></span> Souscription</b></span> ,  },
        render: () => <Tab menu={{ secondary: true }} panes={panes} />,
      },
    ]
    const panes = [
      {
        menuItem: { key: 'attent',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
        render: () => <TableGrid tableData={FetchByGenre('W')} columns={GConf.TableHead.request} />,
      },
      {
        menuItem: { key: 'attent',  content: <span className='text-primary'><b><span className='bi bi-eye-fill'></span> Vu</b></span> , className:'rounded-pill'},
        render: () => <TableGrid tableData={FetchByGenre('S')} columns={GConf.TableHead.request} />,
      },
      {
        menuItem: { key: 'accept',  content: <span className='text-success'><b><span className='bi bi-check-square-fill'></span> Accepteé</b></span> , className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenre('A')} columns={GConf.TableHead.request} />,
      },
      {
        menuItem: { key: 'refuse',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenre('R')} columns={GConf.TableHead.request} />,
      },
      {
        menuItem: { key: 'refuse',  content: <span className='text-secondary'><b><span className='bi bi-slash-square-fill'></span> Termineé</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenre('F')} columns={GConf.TableHead.request} />,
      },
    ]
    const panesRes = [
      {
        menuItem: { key: 'attent',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
        render: () => <TableGrid tableData={FetchByGenreReserv('W')} columns={GConf.TableHead.reservation} />,
      },
      {
        menuItem: { key: 'attent',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
        render: () => <TableGrid tableData={FetchByGenreReserv('S')} columns={GConf.TableHead.reservation} />,
      },
      {
        menuItem: { key: 'accept',  content: <span className='text-success'><b><span className='bi bi-check-square-fill'></span> Accepteé</b></span> , className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('A')} columns={GConf.TableHead.reservation} />,
      },
      {
        menuItem: { key: 'refuse',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('R')} columns={GConf.TableHead.reservation} />,
      },
      {
        menuItem: { key: 'refuse',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('F')} columns={GConf.TableHead.reservation} />,
      },
    ]

   /*#########################[UseEfeect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/request`, {
           PID : GConf.PID,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
            let commandeContainer = []
            response.data.Inscription.map( (commandeDate) => commandeContainer.push([          
              _(<TableImage forStock image='souscription.png' />),
            commandeDate.R_ID,
            commandeDate.EL_Name,
            commandeDate.EL_Genre,
            _(commandeDate.Gouv, commandeDate.Deleg),
            new Date(commandeDate.EL_Naissance).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            commandeDate.EL_Pere_Nom,
            commandeDate.EL_Mere_Nom,
            _(<StateCard status={commandeDate.State} />),
              _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/info/${commandeDate.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
        ],))
        setReservationList(commandeContainer)
        setReservationListTwo(response.data.Inscription)

  
            
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

    const FetchByGenre = (genre) =>{  
          let found = commandeList.filter(element => element.State === genre)
          let commandeContainer = []
              found.map( (commandeDate) => commandeContainer.push([          
                _(<TableImage forStock image='souscription.png' />),
                commandeDate.R_ID,
                commandeDate.Name,
                new Date(commandeDate.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                commandeDate.Table_Num,
                _(<StateCard status={commandeDate.State} />),
                _( <a  className='data-link-modal'  onClick={() => openEditModal(commandeDate,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/cm/info/${commandeDate.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
        return(commandeContainer)
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
            commandeDate.EL_Genre,
            _(commandeDate.Gouv, commandeDate.Deleg),
            new Date(commandeDate.EL_Naissance).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            commandeDate.EL_Pere_Nom,
            commandeDate.EL_Mere_Nom,
            _(<StateCard status={commandeDate.State} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/info/${commandeDate.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
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
            case 'IN': return <StateCard color='rederecter' text='Incomplet' />;
            case 'T': return <StateCard color='secondary' text='Termineé' />;
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
                      <Menu.Item active={activeIndex == 1} className='rounded-pill' onClick={ () => FetchByGenreReserv('S',1)}>
                        <span className='text-primary'>
                          <b>
                            <span className='bi bi-eye-fill'></span> Vu
                          </b>
                        </span>
                      </Menu.Item>
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
                      <Menu.Item active={activeIndex == 5} className='rounded-pill' onClick={ () => FetchByGenreReserv('IN',5)}>
                        <span className='text-info'>
                          <b>
                            <span className='bi bi-book-half'></span> Incomplet
                          </b>
                        </span>
                      </Menu.Item>
                      <Menu.Item active={activeIndex == 4} className='rounded-pill' onClick={ () => FetchByGenreReserv('T',4)}>
                        <span className='text-secondary'>
                          <b>
                            <span className='bi bi-slash-square-fill'></span> Termineé
                          </b>
                        </span>
                      </Menu.Item>
                  </Menu>
              </div>
          </div>
          <div className='col-12 col-lg-2 align-self-center text-end'>
              <MainSubNavCard avCard text='Souscription' link='rq/souscription' icon='folder2-open' />
          </div>
        </div>
      </>)
    }
    return (<>
            
        <Fade>
         
          <CustomTabs  /> 
          <TableGrid tableData={reservationList} columns={GConf.TableHead.request} />
        </Fade>
 
    </>);
}

export default RequestPage;