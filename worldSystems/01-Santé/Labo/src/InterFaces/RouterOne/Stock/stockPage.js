import React, {useEffect,useState}  from 'react';
import GConf from '../../../AssetsM/generalConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import TableImage from '../../../AssetsM/Cards/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Tab} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import OneGConf from '../Assets/OneGConf';
import BackCard from '../Assets/Cards/backCard';
import { useTranslation, Trans } from 'react-i18next';

function RequestPage() {
    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
    let [reservationList, setReservationList] = useState([SKLT.TableSlt]); 
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    let  [acceptedResForCalendar, setAcceptedResForCalendar] = useState([]); 
    const navigate = useNavigate();
    const panesRes = [
      {
        menuItem: { key: 'attent',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
        render: () => <TableGrid tableData={FetchByGenreReserv('W')} columns={t(`TableHead.reservation`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
      },
      {
        menuItem: { key: 'vu',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
        render: () => <TableGrid tableData={FetchByGenreReserv('S')} columns={t(`TableHead.reservation`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
      },
      {
        menuItem: { key: 'accept',  content: <span className='text-success'><b><span className='bi bi-check-square-fill'></span> Accepteé</b></span> , className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('A')} columns={t(`TableHead.reservation`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
      },
      {
        menuItem: { key: 'refuse',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('R')} columns={t(`TableHead.reservation`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
      },
      {
        menuItem: { key: 'terminer',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Retardeé</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('T')} columns={t(`TableHead.reservation`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
      },
      {
        menuItem: { key: 'retarde',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Redirecte</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('RT')} columns={t(`TableHead.reservation`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
      },
      {
        menuItem: { key: 'redirecte',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
        render: () => <TableGrid tableData={FetchByGenreReserv('RD')} columns={t(`TableHead.reservation`).split(/,[\s]*'/).map(item => item.replace(/'/g, '')).filter(Boolean)} />,
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
  
            setReservationList(response.data)
            
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, GConf.TostInternetGonf)   
            setReservationList([])
          }
        });
        console.log(t(`menuTabs.rdvPage.tableHeaderItems`).split(/',\s*'/).map(item => item.replace(/'/g, '')))
    }, [])
    
   /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }

    const RemplirCalendarEvent = () => {
        let found = reservationList.filter(element => element.State === 'A')
        let calendarData = []
        found.map( (getData) => calendarData.push( { title: getData.Name , date: new Date(getData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}))
        setAcceptedResForCalendar(calendarData)
    }
    const FetchByGenreReserv = (genre) =>{  
      let found = reservationList.filter(element => element.State === genre)
      let commandeContainer = []
          found.map( (commandeDate) => commandeContainer.push([          
            _(<TableImage forStock image='rendyvous.png' />),
            commandeDate.R_ID,
            commandeDate.Name,
            new Date(commandeDate.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            new Date(commandeDate.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            commandeDate.RDV_Time,
            _(<StateCard status={commandeDate.State} />),
            _(CheckIsPatientCard(commandeDate.Releted_UID)),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/C/L/rdv/info/${commandeDate.R_ID}`)}><span className='d-none d-lg-inline'> {t('menuTabs.rdvPage.infoBtn')} </span><Icon  name='angle right' /></Button>)
        ],))
      return(commandeContainer)
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
            case 'W': return <StateCard color='warning' text={t(`menuTabs.rdvPage.tabsTtems.attent`)} />;  
            case 'S': return <StateCard color='info' text={t(`menuTabs.rdvPage.tabsTtems.seen`)} />;  
            case 'A': return <StateCard color='success' text={t(`menuTabs.rdvPage.tabsTtems.accepte`)} /> ;
            case 'R': return <StateCard color='danger' text={t(`menuTabs.rdvPage.tabsTtems.refuse`)} />;
            case 'RT': return <StateCard color='retarder' text={t(`menuTabs.rdvPage.tabsTtems.retarde`)} />;
            case 'RD': return <StateCard color='rederecter' text={t(`menuTabs.rdvPage.tabsTtems.redirecte`)} />;
            case 'T': return <StateCard color='secondary' text={t(`menuTabs.rdvPage.tabsTtems.termine`)} />;
            default:  return <StateCard color='dark' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const CheckIsPatientCard = (relatedId) => {
      if (relatedId == null) {  return <span className='bi bi-x-circle-fill bi-xlsm text-danger'></span> } else {  return <span className='bi bi-check-circle-fill bi-xlsm text-success'></span>  }
       
  }; 
    const CustomTabs = () => {
      return(<>
        <div className='row mb-3'>
          <div className='col-8'>
              <Menu secondary >
                  <Menu.Item active={activeIndex == 0} className='rounded-pill' onClick={ () => setActiveIndex(0)}>
                    <span className='text-warning'>
                      <b>
                        <span className='bi bi-hourglass-split'></span> {t(`menuTabs.rdvPage.tabsTtems.attent`)} 
                      </b>
                    </span>
                  </Menu.Item>
                  <Menu.Item active={activeIndex == 1} className='rounded-pill' onClick={ () => setActiveIndex(1)}>
                    <span className='text-primary'>
                      <b>
                        <span className='bi bi-eye-fill'></span> {t(`menuTabs.rdvPage.tabsTtems.seen`)} 
                      </b>
                    </span>
                  </Menu.Item>
                  <Menu.Item active={activeIndex == 2} className='rounded-pill' onClick={ () => setActiveIndex(2)}>
                    <span className='text-success'>
                      <b>
                        <span className='bi bi-check-square-fill'></span> {t(`menuTabs.rdvPage.tabsTtems.accepte`)} 
                      </b>
                    </span>
                  </Menu.Item>
                  <Menu.Item active={activeIndex == 3} className='rounded-pill' onClick={ () => setActiveIndex(3)}>
                    <span className='text-danger'>
                      <b>
                        <span className='bi bi-x-square-fill'></span> {t(`menuTabs.rdvPage.tabsTtems.refuse`)} 
                      </b>
                    </span>
                  </Menu.Item>
                  <Menu.Item active={activeIndex == 5} className='rounded-pill' onClick={ () => setActiveIndex(5)}>
                    <span style={{color:'#ab009d'}}>
                      <b>
                        <span className='bi bi-arrow-clockwise'></span>  {t(`menuTabs.rdvPage.tabsTtems.retarde`)} 
                      </b>
                    </span>
                  </Menu.Item>
                  <Menu.Item active={activeIndex == 6} className='rounded-pill' onClick={ () => setActiveIndex(6)}>
                    <span style={{color:'#92ab03'}}>
                      <b>
                        <span className='bi bi-compass-fill'></span>  {t(`menuTabs.rdvPage.tabsTtems.redirecte`)} 
                      </b>
                    </span>
                  </Menu.Item>
                  <Menu.Item active={activeIndex == 4} className='rounded-pill' onClick={ () => setActiveIndex(4)}>
                    <span className='text-secondary'>
                      <b>
                        <span className='bi bi-slash-square-fill'></span> {t(`menuTabs.rdvPage.tabsTtems.termine`)} 
                      </b>
                    </span>
                  </Menu.Item>
              </Menu>
          </div>
          <div className='col-4 text-end'>
              {/* <Button icon='calendar alternate' className='rounded-pill bg-system-btn me-4' onClick={() => openEditModal('justOpen',true)} /> */}
              <MainSubNavCard text={t(`menuTabs.rdvPage.calendarLink`)} link='rq/calendrier' icon='calendar-week' />
          </div>
        </div>
      </>)
    }
    const MainSubNavCard = (props) =>{
      return(<>
         <NavLink exact='true' to={`/S/${props.link}`} className='card card-body mb-1 rounded-pill shadow-sm d-inline-block ' >
           <h4 style={{color : GConf.themeColor}}> <span className={`bi bi-${props.icon} me-1 `}></span>{props.text}</h4>
         </NavLink> 
      </>) 
   }

    return (<>
         <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh'}}>
        <BackCard data={OneGConf.backCard.sk}/>   
        <br />
        <div className='container'>
                  <CustomTabs  /> 
                  <Tab menu={{ secondary: true }} activeIndex={activeIndex} panes={panesRes}  className='no-menu-tabs mt-2' />
        </div>
        <Modal
              size='small'
              open={modalS}
              closeIcon
              onClose={() => setModalS(false)}
              onOpen={() => setModalS(true)}
          >
              <Modal.Header><h4> Calendrier des reservation </h4></Modal.Header>
              <Modal.Content scrolling>
                          <FullCalendar 
                              plugins={[ dayGridPlugin ]}
                              initialView="dayGridMonth"
                              locale='fr' 
                              events={acceptedResForCalendar}
                              height='450px'
                              navLinks ={true}
                          />

              </Modal.Content>
              <Modal.Actions>
                          <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
              </Modal.Actions>
        </Modal>
        <Modal
              size='small'
              open={false}
              closeIcon
              onClose={() => setModalS(false)}
              onOpen={() => setModalS(true)}
          >
              <Modal.Header><h4> Calendrier des reservation </h4></Modal.Header>
              <Modal.Content scrolling>

                      <table className='table table-striped'>
                          <thead>
                              <tr>
                              <th scope="col">No</th>
                              <th scope="col">Designiation</th>
                              <th scope="col">Qté</th>
                              <th scope="col">PUHT</th>
                              <th scope="col">PUTTC</th>
                              <th scope="col">Prix Net</th>
                              </tr>
                          </thead>
                          <tbody>
                          {
                              selectedArticle.Articles ? 
                              <>
                              {
                                  JSON.parse(selectedArticle.Articles).map( (data,index) => 
                                      <tr key={index +1 }>
                                          <th scope="row">{index +1 }</th>
                                          <td>{data.Name}</td>
                                          <td>{data.Qte}</td>
                                          <td>{GConf.DefaultTva} %</td>
                                          <td>{data.Prix ? data.Prix.toFixed(3) : ''}</td>
                                          <td>{data.PU}</td>
                                      </tr>
                                  )
                              }
                              </>
                              :
                              <>
                              </>
                          }
                          </tbody>
                      </table> 
              </Modal.Content>
              <Modal.Actions>
                          <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                          <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/rq/info/${selectedArticle.C_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
              </Modal.Actions>
        </Modal>
        </div>
    </>);
}

export default RequestPage;