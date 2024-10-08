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
            <div className='row'>
                <div className='col-3 align-self-center'><Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.start}  onChange={(e) => setTargetDate({...targetDate, start: e.target.value })}/></div>
                <div className='col-3 align-self-center'><Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.end}  onChange={(e) => setTargetDate({...targetDate, end: e.target.value })}/></div>
                <div className='col-3 align-self-center'>
                    <div className=''>
                        <Button  className='rounded-pill bg-system-btn' onClick={FetchTargetFactures} fluid><Icon name='search' /> Rechercher <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
                    </div>
                </div>
                <div className='col-3 align-self-center'>
                    <div className=''>
                        <Button  className='rounded-pill btn-imprimer' onClick={(e) => PrintFunction('printResumer')} fluid><Icon name='print' /> Imprimer </Button>
                    </div>

                </div>
            </div>
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
        axios.post(`${GConf.ApiLink}/operations/resumer`, {
            PID : GConf.PID,
            targetDate: targetDate,
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
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/op/info/${getData.OP_ID}`)}><span className='d-none d-lg-inline'> </span><Icon  name='angle right' /></Button>)
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

    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.factureResumer} />
        <br />
        <div className='row'>
            <div className='col-12 col-lg-12'>
                <div className="mb-4 sticky-top" style={{top:'70px'}}>
                    <InputDatCard PrintFunction={PrintFunction} targetDate={targetDate} setTargetDate={setTargetDate} FetchTargetFactures={FetchTargetFactures} loaderState={loaderState} />
                </div>
            </div>
            <div className='col-12 col-lg-12'>
                <TableGrid tableData={factureList} columns={['*','ID','Client','Camion','Date','De','Vers', 'Totale', 'Voir']} />                        
            </div>
        </div>
        <FrameForPrint frameId='printResumer' src={`/Pr/Facture/resumer/${targetDate.start}/${targetDate.end}`} />
    </> );
}

export default ResumerFactures;