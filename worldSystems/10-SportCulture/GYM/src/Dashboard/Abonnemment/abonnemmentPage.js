import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import TableImage from '../../AssetsM/Cards/tableImg';
import GoBtn from '../../AssetsM/Cards/goBtn';
import { toast } from 'react-toastify';
import { Button , Icon, Modal} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


function FacturePage() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    const [facturesList, setFactureList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])

     /*#########################[UseEffect]##################################*/
     useEffect(() => {
        axios.post(`${GConf.ApiLink}/abonnement`, {
            PID : GConf.PID,
        })
        .then(function (response) {
 
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='abonnemment.png' />),
            getData.AB_ID,
            getData.ME_Name,
            getData.F_Name,
            new Date(getData.AB_Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.AB_Saisson,
            getData.Tarif,
            _(<StateCard status={CheckPaymmentOfMonth(getData.AB_Paymment)} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ab/info/${getData.AB_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les Donnée importeé sont les ancien donneé</div></>, GConf.TostInternetGonf) 
              let factureListContainer = []
                 Offline.facture.map( (getData) => factureListContainer.push([
                _(<TableImage image='abonnemment.png' />),
                getData.AB_ID,
                getData.Name,
                new Date(getData.T_Date).toLocaleDateString('fr-FR'),
                new Date(getData.T_Date).toLocaleDateString('fr-FR'),
                getData.Tarif,
                getData.Cam_Name,

                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ab/info/${getData.AB_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setFactureList(factureListContainer)
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
            case 'Payee': return <StateCard color='success' text='Payeé' />;  
            case 'NonPayee': return <StateCard color='danger' text='Non Payeé' /> ;
            case 'EnAttent': return <StateCard color='secondary' text='En Court' /> ;
            default:  return <StateCard color='warninf' text='Indefinie' />;    
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
        <Fade>
            
            <div className='row'>
                <div className='col-12 col-lg-8'><SubNav dataForNav={GConf.SubNavs.facture}/></div>
                <div className='col-12 col-lg-4 text-end align-self-center'><MainSubNavCard text='Offres' link='of' icon='bounding-box-circles' />  </div>
            </div>
            <br />
            <TableGrid tableData={facturesList} columns={GConf.TableHead.abonnemment} />
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
                            <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/ab/info/${selectedArticle.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                </Modal.Actions>
        </Modal>
    </>);
}

export default FacturePage;