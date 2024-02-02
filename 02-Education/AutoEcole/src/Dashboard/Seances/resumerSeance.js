import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Icon, Input, Loader } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import { _ } from 'gridjs-react';
import { useNavigate} from 'react-router-dom';
import TableImage from '../../AssetsM/Cards/tableImg';

const InputDatCard = ({targetDate, setTargetDate, FetchTargetFactures,PrintFunction, loaderState}) => {
    return(<>
        <div className='card card-body shadow-sm mb-2  border-div'>
            <h5>Entrer Une Periode   </h5>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.start}  onChange={(e) => setTargetDate({...targetDate, start: e.target.value })}/>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.end}  onChange={(e) => setTargetDate({...targetDate, end: e.target.value })}/>
            <div className='mt-3'>
                <Button  className='rounded-pill bg-system-btn' onClick={FetchTargetFactures} fluid><Icon name='search' /> Rechercher <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
            </div>
            {/* <div className='mt-3'>
                <Button  className='rounded-pill btn-imprimer' onClick={(e) => PrintFunction('printResumer')} fluid><Icon name='print' /> Imprimer </Button>
            </div> */}
            
            
        </div>
    </>)
}

function ResumerFactures() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    const Today = new Date()
    const [factureList, setFactureList] = useState([])
    const [targetDate, setTargetDate] = useState({start: Today.toISOString().split('T')[0], end: Today.toISOString().split('T')[0]})
    const [loaderState, setLS] = useState(false)
    const [modalS, setModalS] = useState(false)

    /*#########################[Function ]##################################*/
    const FetchTargetFactures = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/seances/resumer`, {
            PID : GConf.PID,
            targetDate: targetDate,
        })
        .then(function (response) {
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
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sa/info/${getData.SE_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)

             setLS(false)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les factures   </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
        });
    }
    const CalculateTVA =  (value) =>{
        const facteur_p = (100 / (GConf.DefaultTva + 100));
        return (parseFloat(value) * facteur_p).toFixed(3) 
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId) }
     const NavigateFunction = (link) => {  navigate(link) }

    /*#########################[Card]##################################*/
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

    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.factureResumer} />
        <br />
        <div className='row'>
            <div className='col-12 col-lg-3'>
                <div className="mb-4 sticky-top" style={{top:'70px'}}>
                    <InputDatCard PrintFunction={PrintFunction} targetDate={targetDate} setTargetDate={setTargetDate} FetchTargetFactures={FetchTargetFactures} loaderState={loaderState} />
                </div>
            </div>
            <div className='col-12 col-lg-9'>
                <TableGrid tableData={factureList} columns={['*','ID','Abonn.','Genre','Permis','Date','Temps','Pos.','Voir']} />                        
            </div>
        </div>
        <FrameForPrint frameId='printResumer' src={`/Pr/Facture/resumer/${targetDate.start}/${targetDate.end}`} />
    </> );
}

export default ResumerFactures;