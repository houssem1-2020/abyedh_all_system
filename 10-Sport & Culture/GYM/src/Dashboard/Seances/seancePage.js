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
    const Today = new Date()
    const navigate = useNavigate();
    const [seanceListe, setSeanceListe] = useState([SKLT.TableSlt]); 
     
     

     /*#########################[UseEffect]##################################*/
     useEffect(() => {
        axios.post(`${GConf.ApiLink}/seances`, {
            PID : GConf.PID,
        })
        .then(function (response) {
            //console.log(response.data)
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='seance.jpg' />),
            getData.SE_ID,
            getData.F_Name ,
            getData.ME_Name,
            new Date(getData.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.SE_Time,
            _(FindSeanceState(getData.SE_Date,getData.SE_Time)),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sa/info/${getData.SE_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setSeanceListe(factureListContainer)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les Donnée importeé sont les ancien donneé</div></>, GConf.TostInternetGonf) 
              setSeanceListe([])
            }
          });
     }, [])
    
    
    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }

    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'C': return <StateCard color='warning' text='En Cours' />;  
            case 'P': return <StateCard color='secondary' text='Pas Encore' /> ;
            case 'T': return <StateCard color='success' text='Termineé' /> ;
            case 'PA': return <StateCard color='info' text='Aujourd hui' /> ;
            default:  return <StateCard color='primary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };

    const FindSeanceState = (date,time) => {
      var currentTime = new Date('2000-01-01T' + time + 'Z');
      currentTime.setTime(currentTime.getTime() + (2 * 60 * 60 * 1000));

      if (Today.toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) < new Date(date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )) { return <StateCard status={'P'} />} 
      else if (Today.toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) > new Date(date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )) { return <StateCard status={'T'} />}
      else {
        if ( new Date().toLocaleTimeString([],{ hourCycle: 'h23'}) > time ) { return <StateCard status={'PA'} /> } 
        else if (new Date().toLocaleTimeString([],{ hourCycle: 'h23'}) > currentTime.toTimeString().slice(0, 8)) { return <StateCard status={'T'} />}
        else { return <StateCard status={'C'} /> }
      }
    }
    /*#########################[Card]##################################*/
   
    const MainSubNavCard = (props) =>{
        return(<>
           <NavLink exact='true' target='c_blanck' to={`/S/${props.link}`} className='card card-body mb-1 rounded-pill shadow-sm d-inline-block ' >
            <h4 style={{color : GConf.themeColor}}> <span className={`bi bi-${props.icon} me-1 `}></span>{props.text}</h4>
          </NavLink>
        </>) 
    }

    return (<>
        <Fade>
            
          <div className='row'>
                <div className='col-12 col-lg-8'><SubNav dataForNav={GConf.SubNavs.camion} /></div>
                <div className='col-12 col-lg-4 text-end align-self-center'><MainSubNavCard text='Interface Caisse' link='../C' icon='window-dock' />  </div>
            </div>
            <br />
            <TableGrid tableData={seanceListe} columns={GConf.TableHead.seances} />
        </Fade>

    </>);
}

export default FacturePage;