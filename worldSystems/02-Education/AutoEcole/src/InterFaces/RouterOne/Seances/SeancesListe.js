import React, {useEffect,useState}  from 'react';
import GConf from '../../../AssetsM/generalConf';
import SubNav from '../../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import TableImage from '../../../AssetsM/Cards/tableImg';
import GoBtn from '../../../AssetsM/Cards/goBtn';
import { toast } from 'react-toastify';
import { Button , Icon, Modal} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';


function FacturePage() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    const [facturesList, setFactureList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${OneGConf.forPID.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])

     /*#########################[UseEffect]##################################*/
     useEffect(() => {
        axios.post(`${GConf.ApiLink}/seances`, {
            PID : OneGConf.forPID.PID,
        })
        .then(function (response) {
            console.log(response.data)
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='seance.png' />),
            getData.SE_ID,
            getData.CD_Name,
            getData.SE_Genre,
            _(<StatePermisCard status={getData.AB_Permis} />),
            new Date(getData.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.SE_Time,
            _(JSON.parse(getData.SE_Trajets).length + ' Position'),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/${OneGConf.routerName}/L/ms/info/${getData.SE_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les Donnée importeé sont les ancien donneé</div></>, GConf.TostInternetGonf) 
            }
          });
    }, [])

    
    
    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const openEditModal = (event,selected) =>{
        setSelectedArticle(event)
        setModalS(true)
    }
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'En Cours': return <StateCard color='warning' text='En Cours' />;  
            case 'succès': return <StateCard color='success' text='succès' /> ;
            case 'échec': return <StateCard color='danger' text='échec' /> ;
            default:  return <StateCard color='warninf' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const StatePermisCard = ({ status }) => {
      const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
      const statusCard = React.useCallback(() => {
        switch(status) {
          case 'A1': return <StateCard color='info' text='صنف أ1' />;  
          case 'A': return <StateCard color='info' text='صنف أ' />;  
          case 'BH': return <StateCard color='info' text=' صنف ب + هـ' />;  
          case 'G': return <StateCard color='info' text=' صنف ب' />;  
          case 'GH': return <StateCard color='info' text=' صنف ج + هـ' />;  
          case 'D': return <StateCard color='info' text='صنف د' />;  
          case 'DH': return <StateCard color='info' text=' صنف د + هـ' />;  
          case 'D1': return <StateCard color='info' text=' صنف د1' />;  
          case 'K': return <StateCard color='info' text=' صنف ح ' />;  
          
          default:  return <StateCard color='warninf' text='Indefinie' />;    
        }
      }, [status]);
    
      return (
        <div className="container">
          {statusCard()}
        </div>
      );
    };

    const CheckAnlyseOrdoCard = (lenght,genre) => {
        if (genre == 'ordonance') {
            if (lenght == '') {  return <span className='bi bi-x-circle-fill bi-xlsm text-danger'></span> } else {  return <span className='bi bi-check-circle-fill bi-xlsm text-success'></span>  }
        } else {
            if (lenght == 0) {  return <span className='bi bi-x-circle-fill bi-xlsm text-danger'></span> } else {  return <span className='bi bi-check-circle-fill bi-xlsm text-success'></span>  }
        }
         
    };

    /*#########################[Card]##################################*/
    const SDF = (props)=>{
      return(<>
         <div className='text-center'><span className={`bi bi-${props.state == "true" ? 'check-circle-fill text-success': 'x-circle-fill text-danger'}`}></span> </div>
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
        <Fade>
          <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
              <BackCard data={OneGConf.backCard.sa}/>
              <br />
              <div className='container'>
 
                  <TableGrid tableData={facturesList} columns={GConf.TableHead.seance} />
              </div>
          </div>  
            
        </Fade>

        <Modal
                size='small'
                open={modalS}
                closeIcon
                onClose={() => setModalS(false)}
                onOpen={() => setModalS(true)}
            >
                <Modal.Header><h4>{selectedArticle.Name}</h4></Modal.Header>
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
                            <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/sa/info/${selectedArticle.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                </Modal.Actions>
        </Modal>
    </>);
}

export default FacturePage;