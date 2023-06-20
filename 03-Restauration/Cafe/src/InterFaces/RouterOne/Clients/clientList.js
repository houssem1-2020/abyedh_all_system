import React, {useEffect,useState}  from 'react';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';
import GConf from '../../../AssetsM/generalConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import TableImage from '../../../AssetsM/Cards/tableImg';
import GoBtn from '../../../AssetsM/Cards/goBtn';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import { Label } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';

function ClientList() {
    /*################[Variable]###############*/
    const  [clientList, setClientList] = useState([SKLT.STableSlt]); 
    const navigate = useNavigate();
    const colors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
        'black',
    ]

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.post(`${GConf.ApiRouterOneLink}/commande/verifier`,{
            forPID: OneGConf.forPID.PID,
        })
        .then(function (response) {
            let testTable = []
            response.data.map( (getData) => testTable.push([
                _(<TableImage forStock image='order.png' />),
                getData.R_ID,
                getData.Name,
                new Date(getData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                getData.Table_Num,
                _(<StateCard status={getData.State} />),
                // _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/C/L/cmdv/info/${getData.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setClientList(testTable)
        })
    }, [])

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const  capitalizeFirstLetter = (string) =>{
        return (string.charAt(0).toUpperCase() + string.slice(1)).charAt(0);
    }


    /*################[Card]###############*/
    const AvatarCard = (props) =>{
        return(<>
                <Label size='massive' circular color={colors[Math.floor(Math.random() * 10)]} key={1}>
                    <h3>{props.lettre}</h3>
                </Label>
                
            </>)
    }

    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'W': return <StateCard color='warning' text='En Attent' />;  
            case 'S': return <StateCard color='info' text='Vu' />;  
            case 'A': return <StateCard color='success' text='Acepteé' /> ;
            case 'R': return <StateCard color='danger' text='Refuseé' />;
            case 'F': return <StateCard color='secondary' text='Termineé' />;
            default:  return <StateCard color='dark' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };

    return ( <>
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.clList}/>
            <br />
            <div className='container'>
                <TableGrid dark={true} tableData={clientList} columns={['*','ID','Client', 'Date','Table','Etat', 'Voir']} />
            </div>
        </div>
        </> );
}

export default ClientList