import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { NavLink, useParams } from 'react-router-dom';
import { Button,  Icon, Popup} from 'semantic-ui-react';
import SKLT from '../../AssetsM/Cards/usedSlk';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { toast } from 'react-toastify';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import { Input } from 'semantic-ui-react';

function FactureInfo() {
    /*#########################[Const]##################################*/
    const {RPID} = useParams()
    const [articleL, setArticleL] = useState([])
    const [factureData, setFactData] = useState([])
    const [client, setClient] = useState('Passager')
    const [loading , setLoading] = useState(false)
    const [stockState , setStockState] = useState(false)
    const [toUpdatedList, setTUpList] = useState([])
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/rapport/info`, {
            PID : GConf.PID,
            RPID: RPID
          })
          .then(function (response) {
            console.log(response.data)
                if(!response.data.PK) {
                    toast.error('Rapport Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/rp"; }, 2000)
                    
                } else {

                    setFactData(response.data)
                    setLoading(true)
                    // if(response.data[0].SDF == 'true'){setStockState(true)}
                }    
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
              const FactureTarged = Offline.facture.find((facture) => facture.F_ID == RPID);
              setLoading(true)
              setArticleL(JSON.parse(FactureTarged.Articles))
              setStockState(true)
              setFactData(FactureTarged)
              setStockState(true)
            }
          });
    }, [])

    /*#########################[Function]##################################*/
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
 
 
    const DeleteFacture = () =>{
        axios.post(`${GConf.ApiLink}/facture/supprimer`, {
            PID : GConf.PID,
            RPID: RPID,
          })
          .then(function (response) {
            if (response.data.affectedRows != 0) {
                toast.error('Facture Supprimer  !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/ft"; }, 500)
                //setLS(false)
            } else {
                //setLS(false)
            }
            console.log(response.data)
           
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier L'etat du commande  </div></>, GConf.TostInternetGonf)   
              
            }
          });
    }
    /*#########################[Card]##################################*/
    const StateSellCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'Valide': return <StateCard color='success' text='Terminer' />;  
            case 'Annulee': return <StateCard color='danger' text='Annuleé' /> ;
            case 'Waitting': return <StateCard color='warning' text='En Attent' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const FactureHeader = () =>{
        return(<>
                <h2 className='text-center'>ORDONANCE </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-secondary'><b>ORDONANCE ID : </b> {factureData.OR_ID}</div>
                        <div className='text-secondary'><b>CODE ORDONANCE : </b> {RPID}</div>
                        <div className='text-secondary'><b>PATIENT: {factureData.PA_Name} </b> 
                    </div>
                    </div>
                    <div className='col-6'>
                        <div className='text-danger'><b>Date : </b> {new Date(factureData.OR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </div>
                        <div className='text-secondary'><b>Temps: </b> {factureData.OR_Time} </div>
 
                    </div>
                </div>
        </>)
    }
 
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Controle</h5>
                    <div className='row mb-2'>
                        <div className='col-6 mb-3'>
                            <Button  className='rounded-pill btn-imprimer'  fluid onClick={(e) => PrintFunction('printFacture')}><Icon name='print' /> Imprimer</Button>
                        </div>
                        <div className='col-6'>
                                <Button as='a' href={`/S/or/modifier/${RPID}`} animated   className='rounded-pill bg-system-btn'  fluid>
                                    <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                        </div>
                        <div className='col-12 '>
                            <Button  className='rounded-pill bg-danger text-white'  fluid  onClick={DeleteFacture}><Icon name='trash' /> Supprimer</Button>
                        </div>

                    </div>
                    

                </div>
        </>)
    }

    return ( <> 
        <BreadCrumb links={GConf.BreadCrumb.factureInfo} />
        <br />
        <div className="row">
            <div className="col-12 col-lg-8">
                <h2 className='text-end'><StateSellCard status={factureData.OR_State} /></h2>
                <FactureHeader />
                <br />
                <br />
                <div dangerouslySetInnerHTML={{ __html: factureData.RA_Content }}></div>
                <br />
            </div>
            <div className="col-12 col-lg-4">
            <Bounce bottom>
                <div className="sticky-top" style={{top:'70px'}}>
                    <BtnsCard />
                </div>
            </Bounce>
            </div>
        </div>
        {/* <FrameForPrint frameId='printFacture' src={`/Pr/facture/info/${RPID}/${client}`} /> */}
    </> );
}


export default FactureInfo;