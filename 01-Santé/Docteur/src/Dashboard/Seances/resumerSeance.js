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
 
            //getData.S_ID,
            getData.PA_Name,
            getData.Maladie,
            _(<StateCard status={getData.State_Degre} />),
            new Date(getData.S_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.S_Time,
            _(CheckAnlyseOrdoCard(JSON.parse(getData.Analyses).length),'analyse'),
            _(CheckAnlyseOrdoCard(getData.Ordonance, 'ordonance')),
            // _(<CheckAnlyseOrdoCard status={JSON.parse().lenght} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sa/info/${getData.S_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)

             setLS(false)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les factures   </div></>, GConf.TostInternetGonf)   
              setFactureList([])
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
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'En Bonne État': return <StateCard color='success' text='En Bonne État' />;  
            case 'Malade': return <StateCard color='danger' text='Malade' /> ;
            case 'En Réanimation': return <StateCard color='warning' text='En Réanimation' /> ;
            case 'En Soins Palliatifs': return <StateCard color='dark' text='En Soins Palliatifs' /> ;
            case 'En Quarantaine': return <StateCard color='primary' text='En Quarantaine' /> ;
            case 'En Observation': return <StateCard color='info' text='En Observation' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
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
            <div className='col-12 col-lg-4'>
                <div className="mb-4 sticky-top" style={{top:'70px'}}>
                    <InputDatCard PrintFunction={PrintFunction} targetDate={targetDate} setTargetDate={setTargetDate} FetchTargetFactures={FetchTargetFactures} loaderState={loaderState} />
                </div>
            </div>
            <div className='col-12 col-lg-8'>
                <TableGrid tableData={factureList} columns={['Patient','Maldaie','Degreé','Jour','Temps','Analyse','Ordonance','Voir']} />                        
            </div>
        </div>
        <FrameForPrint frameId='printResumer' src={`/Pr/Facture/resumer/${targetDate.start}/${targetDate.end}`} />
    </> );
}

export default ResumerFactures;