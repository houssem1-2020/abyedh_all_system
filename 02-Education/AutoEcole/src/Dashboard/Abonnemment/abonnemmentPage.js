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
import moment from 'moment/moment';


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
            getData.CD_Name,
            getData.F_Name,
            _(<StatePermisCard status={getData.AB_Permis} />),
            new Date(getData.AB_Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.AB_Genre,
             
            _(<StateCard status={getData.AB_Resultat} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ab/info/${getData.AB_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
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
            <h4 style={{color : GConf.themeColor}}> <span className={`bi bi-${props.icon} me-1 `}></span>{props.text}</h4>
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
         
    </>);
}

export default FacturePage;