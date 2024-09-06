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
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])

     /*#########################[UseEffect]##################################*/
     useEffect(() => {
        axios.post(`${GConf.ApiLink}/operations`, {
            PID : GConf.PID,
        })
        .then(function (response) {
 
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='commande.png' />),
            getData.OP_ID,
            getData.CL_Name,
            getData.CM_Name,
            new Date(getData.OP_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            _(<>{JSON.parse(getData.OP_De).Gouv} <br /> {JSON.parse(getData.OP_De).Deleg} </>),
            _(<>{JSON.parse(getData.OP_Vers).Gouv} <br /> {JSON.parse(getData.OP_Vers).Deleg} </>),
            _(JSON.parse(getData.OP_Articles).length),
            _(<StateCard status={getData.OP_State} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/${OneGConf.routerName}/L/cmd/info/${getData.OP_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les Donnée importeé sont les ancien donneé</div></>, GConf.TostInternetGonf) 
              setFactureList([])
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
            case 'LV': return <StateCard color='success' text='Livreé' />;  
            case 'RT': return <StateCard color='danger' text='Retour' /> ;
            case 'EC': return <StateCard color='warning' text='En Cours' /> ;
            case 'T': return <StateCard color='secondary' text='Terminer' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };

    const CheckPaymmentOfMonth = (value) =>{
        let searchForMonth = JSON.parse(value).find((data) => data.mois == (new Date()).getMonth() + 1)
        if (searchForMonth) {
            return 'Payee'
        } else {
            return 'NonPayee'
        }
    }
    /*#########################[Card]##################################*/
    const SDF = (props)=>{
      return(<>
         <div className='text-center'><span className={`bi bi-${props.state == "true" ? 'check-circle-fill text-success': 'x-circle-fill text-danger'}`}></span> </div>
      </>)
    }
    
    const MainSubNavCard = (props) =>{
        return(<>
           <NavLink exact='true' to={`/S/${props.link}`} className='card card-body mb-1 rounded-pill shadow-sm d-inline-block ' >
            <h4 style={{color : GConf.themeColor}}> <spn className={`bi bi-${props.icon} me-1 `}></spn>{props.text}</h4>
          </NavLink>
        </>) 
    }

    return (<>
        
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.rt}/>
            <br />
            <div className='container'>
                <Fade>
                    <br />
                    <TableGrid tableData={facturesList} columns={GConf.TableHead.abonnemment} />
                </Fade>
            </div>
        </div>

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
                            <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/ab/info/${selectedArticle.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                </Modal.Actions>
        </Modal>
    </>);
}

export default FacturePage;