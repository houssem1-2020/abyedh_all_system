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
        axios.post(`${GConf.ApiLink}/sujets`, {
            PID : GConf.PID,
        })
        .then(function (response) {
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='sujet.png' />),
            getData.SJ_ID,
            getData.CL_Name,
            getData.SJ_Title,
            new Date(getData.SJ_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.SJ_Tribunal,
            getData.SJ_Phase,
            _(<StateCard status={getData.SJ_Etat} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sj/info/${getData.SJ_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
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
            case 'En Court': return <StateCard color='warning' text='En Court' />;  
            case 'Suspendu': return <StateCard color='danger' text='Suspendu' /> ;
            case 'Active': return <StateCard color='success' text='Active' /> ;
            case 'Termineé': return <StateCard color='secondary' text='Termineé' /> ;
            default:  return <StateCard color='dark' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
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
            
            <SubNav dataForNav={GConf.SubNavs.sujets}/>
            <br />
            <TableGrid tableData={facturesList} columns={GConf.TableHead.sujets} />
        </Fade>
         
    </>);
}

export default FacturePage;