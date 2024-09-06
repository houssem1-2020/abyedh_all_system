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
                response.data.Commandes.map( (commandeDate) => commandeContainer.push([          
                  _(<TableImage forStock image='order.png' />),
                  commandeDate.R_ID,
                  commandeDate.Name,
                  new Date(commandeDate.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                  commandeDate.Table_Num,
                  _(<StateCard status={commandeDate.State} />),
                  _( <a  className='data-link-modal'  onClick={() => openEditModal(commandeDate,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
                  _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/info/${commandeDate.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setReservationList(commandeContainer)
            setReservationListTwo(response.data.Commandes)
            
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
            _(<TableImage forStock image='order.png' />),
            commandeDate.R_ID,
            commandeDate.Name,
            new Date(commandeDate.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            commandeDate.Table_Num,
            // commandeDate.Totale,
            _(<StateCard status={commandeDate.State} />),
            _( <a  className='data-link-modal'  onClick={() => openEditModal(commandeDate,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/info/${commandeDate.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
        ],))
        setReservationList(commandeContainer)
      setActiveIndex(tabIndex)
    }
    const openEditModal = (event,selected) =>{

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
            case 'EC': return <StateCard color='info' text='En Cours' />;
            case 'LV': return <StateCard color='dark' text='Livreé' />;
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
                    <Menu.Item active={activeIndex == 6} className='rounded-pill' onClick={ () => FetchByGenreReserv('EC',6)}>
                      <span className='text-warning'>
                        <b>
                          <span className='bi bi-clock'></span> En Cours
                        </b>
                      </span>
                    </Menu.Item>
                    <Menu.Item active={activeIndex == 5} className='rounded-pill' onClick={ () => FetchByGenreReserv('LV',5)}>
                      <span className='text-info'>
                        <b>
                          <span className='bi bi-truck'></span> Livree
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
           
        </div>
      </>)
    }
    return (<>
            
        <Fade>
          <CustomTabs  /> 
          <TableGrid tableData={reservationList} columns={GConf.TableHead.request} />
        </Fade>
        <Modal
              size='small'
              open={modalS}
              closeIcon
              onClose={() => setModalS(false)}
              onOpen={() => setModalS(true)}
          >
              <Modal.Header><h4> Liste des Ordres </h4></Modal.Header>
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
                              selectedArticle.length != 0 ? 
                              <>
                              {
                                  JSON.parse(selectedArticle.C_Articles).map( (data,index) => 
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
                          {/* <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/rq/info/${selectedArticle.C_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button> */}
              </Modal.Actions>
        </Modal>
    </>);
}

export default RequestPage;