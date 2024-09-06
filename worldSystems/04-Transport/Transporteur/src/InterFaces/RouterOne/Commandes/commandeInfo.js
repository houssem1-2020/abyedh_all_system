import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { NavLink, useParams } from 'react-router-dom';
import { Button,  Icon, Popup} from 'semantic-ui-react';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import GConf from '../../../AssetsM/generalConf';
import BreadCrumb from '../../../AssetsM/Cards/breadCrumb'
import { toast } from 'react-toastify';
import FrameForPrint from '../../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../../AssetsM/Hooks/printFunction';
import { Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';

function FactureInfo() {
    /*#########################[Const]##################################*/
    const {OPID} = useParams()
    const navigate = useNavigate();
    const [articleL, setArticleL] = useState([])
    const [factureData, setFactData] = useState([])
    const [client, setClient] = useState('Passager')
    const [loading , setLoading] = useState(false)
    const [stockState , setStockState] = useState(false)
    const [toUpdatedList, setTUpList] = useState([])
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/operations/info`, {
            PID : GConf.PID,
            OPID: OPID
          })
          .then(function (response) {
                if(!response.data[0]) {
                    toast.error('Ordonance Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/or"; }, 2000)
                    
                } else {
                    setArticleL(JSON.parse(response.data[0].OP_Articles))
                    setFactData(response.data[0])
                    setLoading(true)
                }    
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
              const FactureTarged = Offline.facture.find((facture) => facture.F_ID == OPID);
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
    const NavigateFunction = (link) => { navigate(link) }
 
    const DeleteFacture = () =>{
        axios.post(`${GConf.ApiLink}/operations/supprimer`, {
            PID : GConf.PID,
            OP_ID: OPID,
          })
          .then(function (response) {
            if (response.data.affectedRows != 0) {
                toast.error('Ordonance Supprimer  !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/op"; }, 500)
                //setLS(false)
            } else {
                //setLS(false)
            }
             
           
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5>    </div></>, GConf.TostInternetGonf)   
              
            }
          });
    }
    const EditState = (state) =>{
         
        axios.post(`${GConf.ApiLink}/operations/update-state`, {
            PID : GConf.PID,
            state : state,
            OP_ID: OPID,
        })
        .then(function (response) {
            toast.success("Etat Modifiee !", GConf.TostSuucessGonf)
        });     
    }
    /*#########################[Card]##################################*/
    const StateSellCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'LV': return <StateCard color='success' text='Livreé' />;  
            case 'RT': return <StateCard color='danger' text='Retour' /> ;
            case 'EC': return <StateCard color='warning' text='En Cours' /> ;
            case 'T': return <StateCard color='secondary' text='Terminer' /> ;
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
                <h2 className='text-center'>OPERATION INFO </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-secondary'><b>ORDONANCE ID : </b> {factureData.OPID}</div>
                        <div className='text-secondary'><b>CODE ORDONANCE : </b> {OPID}</div>
                        <div className='text-secondary'><b>PATIENT: {factureData.CL_Name} </b> </div>
                        <div className='text-secondary'><b>CAMION: {factureData.CL_Name} </b> </div>
                    
                    </div>
                    <div className='col-6'>
                        <div className='text-danger'><b>Date : </b> {new Date(factureData.OP_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </div>
                        <div className='text-secondary'><b>De: </b> {factureData.OP_De ? JSON.parse(factureData.OP_De).Gouv : ''} - {factureData.OP_De ? JSON.parse(factureData.OP_De).Deleg :''} </div>
                        <div className='text-secondary'><b>Vers: </b> {factureData.OP_Vers ? JSON.parse(factureData.OP_Vers).Gouv : ''} - {factureData.OP_Vers ? JSON.parse(factureData.OP_Vers).Deleg : ''} </div>
 
                    </div>
                </div>
        </>)
    }
 
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5>Controle</h5>
                    <div className='row mb-0'>
                        
                        <div className='col-6'>
                                <Button as='a' onClick={ (e) => NavigateFunction(`/S/op/modifier/${OPID}`)}  animated   className='rounded-pill bg-system-btn'  fluid>
                                    <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                        </div>
                        
                       
                        <div className='col-6 mb-3'>
                            <Button  className='rounded-pill bg-danger text-white' disabled={factureData.Is_Seances}  fluid  onClick={DeleteFacture}><Icon name='trash' /> Supprimer</Button>
                        </div>

                        <div className='col-12 mb-3'>
                            <Button  className='rounded-pill btn-imprimer'  fluid onClick={(e) => PrintFunction('printOrdonance')}><Icon name='print' /> Imprimer Facture </Button>
                        </div>
                        {factureData.Is_Seances ? 
                            <div className='col-12 '>
                                    <Button as='a' onClick={ (e) => NavigateFunction(`/S/sa/info/${factureData.Is_Seances}`)}  animated   className='rounded-pill bg-info'  fluid>
                                        <Button.Content visible><Icon name='eye' /> Voir Seance  </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                            </div> 
                        : 
                        <></> }
                        
                    </div>
                    <hr className='mt-1 mb-1' />
                    <h5 className='mt-1 text-secondary '>Modifier l'etat du commande </h5>
                    <div className='row mb-2'>
                        <div className='col-12 mb-3'>
                            <Button  className='rounded-pill bg-basic text-secondary' onClick={() => EditState('EC')} fluid   ><Icon name='clock' /> En Court </Button>
                        </div>
                        <div className='col-12 mb-3'>
                            <Button  className='rounded-pill bg-basic text-secondary' onClick={() => EditState('LV')} fluid   ><Icon name='truck' /> Livreé </Button>
                        </div>
                        <div className='col-12 mb-3'>
                            <Button  className='rounded-pill bg-basic text-secondary' onClick={() => EditState('RT')} fluid   ><Icon name='refresh' /> Retour </Button>
                        </div>
                        <div className='col-12 mb-3'>
                            <Button  className='rounded-pill bg-basic text-secondary' onClick={() => EditState('T')} fluid   ><Icon name='check' /> Terminer </Button>
                        </div>
                    </div> 
                </div>
        </>)
    }

     
    return ( <> 
 
            <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
                <BackCard data={OneGConf.backCard.rt}/>
                <br />
                <div className='container'>
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <h2 className='text-end'><StateSellCard status={factureData.OP_State} /></h2>
                                <FactureHeader />
                                <div className='row '>
                                    <div className='col-12 col-lg-6'>
                                        <h5 className='mb-1 mt-1'>De</h5> 
                                        <MapContainer center={[36.071,9.333]} zoom={7} scrollWheelZoom={false} className="map-height border-div">
                                            <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={factureData.OP_De ? [JSON.parse(factureData.OP_De).Lat, JSON.parse(factureData.OP_De).Lng] :[0,0]}>
                                                <Popup>De</Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                    <div className='col-12 col-lg-6'>
                                        <h5 className='mb-1 mt-1'>Vers</h5>
                                        <MapContainer center={[36.071,9.333]} zoom={7} scrollWheelZoom={false} className="map-height border-div">
                                            <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={factureData.OP_Vers ? [JSON.parse(factureData.OP_Vers).Lat, JSON.parse(factureData.OP_Vers).Lng] :[0,0]}>
                                                <Popup>Vers</Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <h5 className='mb-1 mt-1'>Objet & Articles</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Poid</th>
                                        <th scope="col">Quantite</th>
                                    
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {loading ?  
                                        <>
                                        {articleL.map( (artData, index) => 
                                            <tr key={index +1 }>
                                                <th scope="row">{index +1 }</th>
                                                <td>{artData.Name}</td>
                                                <td>{artData.Description}</td>
                                                <td>{artData.Qte }</td>
                                                
                                            </tr>
                                        )}
                                        
                                        </>
                                        : SKLT.FactureList }                        
                                        
                                    </tbody>
                                </table>
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
                </div>
            </div>

        
        <FrameForPrint frameId='printOrdonance' src={`/Pr/operations/info/${OPID}`} />
    </> );
}


export default FactureInfo;