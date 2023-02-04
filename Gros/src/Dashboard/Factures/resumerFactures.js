import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Icon, Input, Loader } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb';
import FrameForPrint from '../Assets/frameForPrint';
import usePrintFunction from '../Assets/Hooks/printFunction';
import TableGrid from '../Assets/tableGrid';
import { _ } from "gridjs-react";
import { useNavigate} from 'react-router-dom';

const InputDatCard = ({targetDate, setTargetDate, FetchTargetFactures,PrintFunction, loaderState}) => {
    return(<>
        <div className='card card-body shadow-sm mb-2  border-div'>
            <h5>Entrer Une Periode   </h5>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.start}  onChange={(e) => setTargetDate({...targetDate, start: e.target.value })}/>
            <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={targetDate.end}  onChange={(e) => setTargetDate({...targetDate, end: e.target.value })}/>
            <div className='mt-3'>
                <Button  className='rounded-pill bg-system-btn' onClick={FetchTargetFactures} fluid><Icon name='search' /> Rechercher <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
            </div>
            <div className='mt-3'>
                <Button  className='rounded-pill btn-imprimer' onClick={(e) => PrintFunction('printResumer')} fluid><Icon name='print' /> Imprimer </Button>
            </div>
            
            
        </div>
    </>)
}

function ResumerFactures() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const navigate = useNavigate();
    const [facturesList, setFactureList] = useState([])
    const [targetDate, setTargetDate] = useState({start: Today.toISOString().split('T')[0], end: Today.toISOString().split('T')[0]})
    const [loaderState, setLS] = useState(false)

    /*#########################[Function ]##################################*/
    const FetchTargetFactures = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/facture/resumer`, {
            PID : GConf.PID,
            targetDate: targetDate,
        })
        .then(function (response) {
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            getData.F_ID,
            getData.Name,
            new Date(getData.Cre_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.Tota,
            _(<SDF state={getData.SDF} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ft/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)
            setLS(false)

             //setFactureList(response.data)
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
    const FactureListCard = (props) =>{
        return(<>
                <div className='card shadow-sm p-2 mb-1 rounded-pill ps-4'>
                    <div className='row'>
                        <div className='col-1 align-self-center'>{props.dataF.PK}</div>
                        <div className='col-4 text-start align-self-center'> {props.dataF.Name }</div>
                        {/* <div className='col-2 align-self-center'>{props.dataF.F_ID}</div> */}
                        <div className='col align-self-center'>{new Date(props.dataF.Cre_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>
                        <div className='col align-self-center'>{CalculateTVA(props.dataF.Tota)}</div>
                        <div className='col align-self-center'>{(props.dataF.Tota - CalculateTVA(props.dataF.Tota)).toFixed(3)}</div>
                        <div className='col align-self-center'>{props.dataF.Tota}</div>
                    </div>
                </div>
        </>)
    }
    const SDF = (props)=>{
        return(<>
           <div className='text-center'><span className={`bi bi-${props.state == "true" ? 'check-circle-fill text-success': 'x-circle-fill text-danger'}`}></span> </div>
        </>)
      }

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
                <h5>Listes des Factures</h5>    
                    {/* {factureList.map( (val) => <FactureListCard key={val.F_ID} dataF={val}/>)} */}
                    <TableGrid tableData={facturesList} columns={['ID','Client','Date','Totale','SDF','Voir']} />
                <br />
                    
            </div>
        </div>
        <FrameForPrint frameId='printResumer' src={`/Pr/Facture/resumer/${targetDate.start}/${targetDate.end}`} />
    </> );
}

export default ResumerFactures;