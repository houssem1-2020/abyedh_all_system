import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { NavLink, useParams } from 'react-router-dom';
import { Button,  Icon, Modal, Placeholder, Popup} from 'semantic-ui-react';
import SKLT from '../../AssetsM/Cards/usedSlk';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { toast } from 'react-toastify';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import { Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function FactureInfo() {
    /*#########################[Const]##################################*/
    const {RPID} = useParams()
    const navigate = useNavigate();
    const [articleL, setArticleL] = useState([])
    const [factureData, setFactData] = useState([])
    const [client, setClient] = useState('Passager')
    const [loading , setLoading] = useState(true)
    const [stockState , setStockState] = useState(false)
    const [toUpdatedList, setTUpList] = useState([])
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)

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
                    setLoading(false)
                    // if(response.data[0].SDF == 'true'){setStockState(true)}
                }    
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
              const FactureTarged = Offline.facture.find((facture) => facture.F_ID == RPID);
              setLoading(false)
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
        axios.post(`${GConf.ApiLink}/rapport/supprimer`, {
            PID : GConf.PID,
            RPID: RPID,
          })
          .then(function (response) {
            if (response.data.affectedRows != 0) {
                toast.error('Rapport Supprimer  !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/rp"; }, 500)
            } else {
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
                <h2 className='text-center'>RAPPORT </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-secondary'><b>RAPPORT ID : </b> {RPID}</div>
                        <div className='text-secondary'><b>TITRE : </b> {factureData.RA_Titre}</div>
                        <div className='text-secondary'><b>SUJET: {factureData.RA_Sujet} </b> 
                    </div>
                    </div>
                    <div className='col-6'>
                        <div className='text-danger'><b>DATE : </b> {new Date(factureData.RA_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </div>
                        <div className='text-secondary'><b>GENRE: </b> {factureData.RA_Genre} </div>
 
                    </div>
                </div>
        </>)
    }
 
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body border-div shadow-sm mb-2'>
                    <h5>Controle</h5>
                    <div className='row mb-2'>
                        <div className='col-6'>
                                <Button as='a' onClick={ (e) => NavigateFunction(`/S/rp/modifier/${RPID}`)} animated   className='rounded-pill bg-system-btn'  fluid>
                                    <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                        </div>
                        <div className='col-6 mb-3'>
                            <Button  className='rounded-pill btn-imprimer'  fluid onClick={(e) => PrintFunction('printRapport')}><Icon name='print' /> Imprimer</Button>
                        </div>
                        <div className='col-12 '>
                            <Button  className='rounded-pill bg-danger text-white'  fluid  onClick={() => setModalS(true)}><Icon name='trash' /> Supprimer</Button>
                        </div>

                    </div>
                    

                </div>
        </>)
    }
    const LoadingCard = () =>{
        const SimpleLoadinCard = (props) =>{
            return(<>
                <Placeholder fluid className='border-div w-100' style={{ height: props.fullHeight ? 180 : 40}}>
                    <Placeholder.Image />
                </Placeholder>
            </>)
        }
        return(<>
            <div className='row'>
                <div className='col-5 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-12'> <SimpleLoadinCard  fullHeight/> </div>
            </div>
        </>)
    }

    return ( <> 
        <BreadCrumb links={GConf.BreadCrumb.factureInfo} />
        <br />
        <div className="row">
            <div className="col-12 col-lg-8">
                <h2 className='text-end'><span className={`badge bg-secondary`}> {factureData.RA_Genre} </span> </h2>
                {loading ? 
                <LoadingCard /> 
                : 
                <>
                    <FactureHeader />
                    <br />
                    <br />
                    <div dangerouslySetInnerHTML={{ __html: factureData.RA_Content }}></div>
                    <br />
                </>
                 }
            </div>
            <div className="col-12 col-lg-4">
            <Bounce bottom>
                <div className="sticky-top" style={{top:'70px' , zIndex: 14}}>
                    <BtnsCard />
                </div>
            </Bounce>
            </div>
        </div>
        <FrameForPrint frameId='printRapport' src={`/Pr/rapport/info/${RPID}`} />
        <Modal
              size='tiny'
              open={modalS}
              closeIcon
              onClose={() => setModalS(false)}
              onOpen={() => setModalS(true)}
          >
               
              <Modal.Content scrolling>
                    <h5 className='text-secondary'>Voulez Vous Vraimment Supprimer Ce Rapoort</h5>
                    <Button className='rounded-pill' negative onClick={ () => DeleteFacture()}> <span className='bi bi-treash' ></span> Supprimer</Button>
              </Modal.Content>
               
        </Modal>
    </> );
}


export default FactureInfo;