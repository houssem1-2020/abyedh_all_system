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
        axios.post(`${GConf.ApiLink}/examain`, {
            PID : GConf.PID,
        })
        .then(function (response) {
            console.log(response.data)
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='examain.png' />),
            getData.EX_ID,
            getData.CL_Name,
            getData.Matiere_Name,
            getData.Salle_Name,
            new Date(getData.EX_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.EX_Time_Depart,
            getData.EX_Time_Finish,
            _(<CompareDates status={getData.EX_Date} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ex/info/${getData.EX_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
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
            case 'A': return <StateCard color='success' text='Payeé' />;  
            case 'R': return <StateCard color='danger' text='Credit' /> ;
            case 'W': return <StateCard color='warning' text='En Attend' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const CompareDates = (props) => {
      let EX_Date = props.status
      const today = new Date();
      const exDate = new Date(EX_Date); // Ensure EX_Date is a Date object
    
      if (exDate < today) { return <span className={`badge bg-danger`}> passed </span> ; } 
      else if (exDate.toDateString() === today.toDateString()) { return <span className={`badge bg-warning`}> Aujourd'hui </span>   } 
      else {
        const differenceInTime = exDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        return <span className={`badge bg-success`}> {`reste ${differenceInDays} jour`} </span> ;
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
                <div className='col-12 col-lg-8'><SubNav dataForNav={GConf.SubNavs.examain}/></div>
                <div className='col-12 col-lg-4 text-end align-self-center'><MainSubNavCard text='Matiére' link='mt' icon='box-seam-fill' />  </div>
            </div>
            <br />
            <TableGrid tableData={facturesList} columns={GConf.TableHead.examain} />
        </Fade>

    </>);
}

export default FacturePage;