import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';
import SubNav from '../Assets/subNav';
import GoBtn from '../Assets/goBtn';
import TableImage from '../Assets/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';


function RequestPage() {
    /*#########################[Const]##################################*/
    let [commandeList, setCommandeList] = useState([SKLT.TableSlt]); 
    const navigate = useNavigate();
   /*#########################[UseEfeect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/commande`, {
           tag: GConf.SystemTag,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
            let commandeContainer = []
            response.data.map( (commandeDate) => commandeContainer.push([          
                _(<TableImage image='facture.jpg' />),
                commandeDate.C_ID,
                commandeDate.Client,
                new Date(commandeDate.Date_Passe).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                new Date(commandeDate.Date_Volu).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                commandeDate.Totale.toFixed(3),
                _(<StateCard status={commandeDate.State} />),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/info/${commandeDate.C_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                // _(<GoBtn link={`rq/info/${commandeDate.C_ID}`} />)
            ],))
            setCommandeList(commandeContainer)
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, GConf.TostInternetGonf)   
            setCommandeList([])
          }
        });
    }, [])
    
   /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    /*#########################[Card]##################################*/
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'W': return <StateCard color='warning' text='En Attent' />;  
            case 'A': return <StateCard color='success' text='Acepteé' /> ;
            case 'R': return <StateCard color='danger' text='Refuseé' />;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
  
    return (<>
        <SubNav dataForNav={GConf.SubNavs.Commande} />
        <br />
        <Fade>
          <TableGrid tableData={commandeList} columns={GConf.TableHead.request} />
        </Fade>
    </>);
}

export default RequestPage;