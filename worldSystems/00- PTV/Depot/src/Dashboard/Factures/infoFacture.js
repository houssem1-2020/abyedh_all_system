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

function FactureInfo() {
    /*#########################[Const]##################################*/
    const {FID} = useParams()
    const [articleL, setArticleL] = useState([])
    const [profileData, setProfileData] = useState([])
    const [factureData, setFactData] = useState([])
    const [loading , setLoading] = useState(false)
    const [stockState , setStockState] = useState(false)
    const [toUpdatedList, setTUpList] = useState([])
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/facture/select`, {
            PID : GConf.PID,
            fid: FID
          })
          .then(function (response) {
            
                if(!response.data[0]) {
                    toast.error('Facture Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/ft"; }, 2000)
                    
                } else {
                    setArticleL(JSON.parse(response.data[0].Articles))
                    let UsedTableNow = []
                    JSON.parse(response.data[0].Articles).map( (article) => {UsedTableNow.push([article.A_Code, article.Qte ])} )
                    setTUpList(UsedTableNow)
                    setFactData(response.data[0])
                    setLoading(true)
                    if(response.data[0].SDF == 'true'){setStockState(true)}
                }    
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
              const FactureTarged = Offline.facture.find((facture) => facture.F_ID == FID);
              setLoading(true)
              setArticleL(JSON.parse(FactureTarged.Articles))
              setStockState(true)
              setFactData(FactureTarged)
              setStockState(true)
            }
          });

          axios.post(`${GConf.ApiLink}/profile/print`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            setProfileData(response.data[0])
            console.log(response.data)
          })

    }, [])

    /*#########################[Function]##################################*/
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
    const UpdateStock = () =>{
        axios.post(`${GConf.ApiLink}/stock/bs`, {
            PID : GConf.PID,
            artList: toUpdatedList,
          })
          .then(function (response) {      
            if(response.data.affectedRows) {
                axios.post(`${GConf.ApiLink}/facture/us`, { PID : GConf.PID,  fid: FID })
                toast.success("Stock Modifier !", GConf.TostSuucessGonf)
                setStockState(true)
                setFactData({ ...factureData, SDF: 'true'})
            }
            else{
                toast.error('Erreur Indéfine ', GConf.TostSuucessGonf)
            }
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Operation Annuleé  </div></>, GConf.TostInternetGonf)   
            }
          });

    }
    const CalculateTVA =  (value) =>{
        const facteur_p = (100 / (GConf.DefaultTva + 100));
        return (parseFloat(value) * facteur_p).toFixed(3) 
    }

    /*#########################[Card]##################################*/
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'false': return <StateCard color='danger' text='Stock Non Regleé' />;  
            case 'true': return <StateCard color='success' text='Stock Regleé' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    }
    const FactureHeader = () =>{
        return(<>
                <h2 className='text-center'>Facture Client </h2> 
                <br />
                
                    {!loading ? <></>
                    :
                        <div className='row'>
                            <div className='col-6'>
                                <div className='text-danger'><b> {profileData.Name} </b></div>
                                <div className='text-secondary'><b>VILLE: </b> {profileData.Adress } </div>
                                <div className='text-secondary'><b>MATRICULE F : </b> {profileData.Matricule_F} </div>
                                <div className='text-secondary'><b>TEL : </b> {profileData.Phone}</div>
                                <div className='text-secondary'><b>Genre : </b> {profileData.Genre}</div>
                            </div>
                            <div className='col-6'>
                                <div className='text-secondary'><b>CODE FACTURE : </b> {FID}</div>
                                <div className='text-secondary'><b>CLIENT: </b> 
                                <Popup
                                        content={<>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className='text-secondary'><b><span className='bi bi-qr-code text-danger'></span> : {factureData.Code_Fiscale}</b></div>   
                                                <div className='text-secondary'><b><span className='bi bi-telephone text-danger'></span> : {factureData.Phone}</b></div>      
                                            </div>
                                            <div className='col-6'>
                                                <div className='text-secondary'><b><span className='bi bi-geo-alt-fill text-danger'></span> : {factureData.Gouv}</b></div>   
                                                <div className='text-secondary'><b><span className='bi bi-geo-alt text-danger'></span> : {factureData.Social_Name}</b></div>   
                                                
                                            </div>
                                            <div className='col-12'>
                                                <div className='text-secondary'><b><span className='bi bi-pin-map text-danger'></span> : {factureData.Adress}</b></div>
                                            </div>
                                            
                                        </div>
                                        </> }
                                        wide='very'
                                        hoverable
                                        key={factureData.Name }
                                        header={<h3><span className='bi bi-person-fill'></span> {factureData.Name} </h3> }
                                        trigger={loading ? <NavLink  exact='true' to={`/S/cl/info/${factureData.CL_ID}`}> {factureData.Name } </NavLink>  : SKLT.BarreSkl }
                                    />
                                    </div>
                                <div className='text-secondary'><b>M.F : </b> {factureData.Code_Fiscale}</div>
                            </div>
                        </div>
                    }
                
        </>)
    }
    const TotaleCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Nette & Totale </h5>
                    <div>Totale hors tax: {loading ? CalculateTVA(factureData.Tota) : SKLT.BarreSkl }</div>
                    <div>TVA: {loading ? (factureData.Tota - CalculateTVA(factureData.Tota)).toFixed(3) : SKLT.BarreSkl }</div>
                    <div>Timbre: 0.600 DT</div>
                    <div className='text-danger'><b>Net A Payee TTC: {loading ? (parseFloat(factureData.Tota) + 0.600).toFixed(3) : SKLT.BarreSkl } </b></div>
                </div>
        </>)
    }
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Controle</h5>
                    <div className='row mb-2'>
                    <div className='col-6'>
                        <Button  className='rounded-pill btn-imprimer'  fluid onClick={(e) => PrintFunction('printFacture')}><Icon name='edit outline' /> Imprimer</Button>
                    </div>
                    <div className='col-6'>
                            <Button as='a' href={`/S/ft/modifier/${FID}`} animated disabled={stockState} className='rounded-pill bg-system-btn'  fluid>
                                <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                    </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <Button  className='rounded-pill btn-danger'  fluid><Icon name='edit outline' /> Supprimer</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-regler'  fluid disabled={stockState} onClick={UpdateStock}><Icon name='edit outline' /> R. Stock</Button>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-imprimer'  fluid onClick={(e) => PrintFunction('printBl')} ><Icon name='edit outline' /> BL</Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill  btn-imprimer'  fluid onClick={(e) => PrintFunction('printBs')}><Icon name='edit outline' /> BS</Button>
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
                <h2 className='text-end'><StateCard status={factureData.SDF} /></h2>
                <FactureHeader />
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Designiation</th>
                        <th scope="col">Qté</th>
                        <th scope="col">PUHT</th>
                        <th scope="col">TVA</th>
                        <th scope="col">PUTTC</th>
                        <th scope="col">Prix Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {loading ?  
                        <>
                        {articleL.map( (artData, index) => 
                            <tr key={index +1 }>
                                <th scope="row">{index +1 }</th>
                                <td>{artData.Name}</td>
                                <td>{artData.Qte}</td>
                                <td>{CalculateTVA(artData.Prix)}</td>
                                <td>{GConf.DefaultTva} %</td>
                                <td>{artData.Prix.toFixed(3)}</td>
                                <td>{artData.PU}</td>
                            </tr>
                        )}
                        
                        </>
                        : SKLT.FactureList }                        
                        
                    </tbody>
                </table>
            </div>
            <div className="col-12 col-lg-4">
            <Bounce bottom>
                <div className="sticky-top" style={{top:'70px'}}>
                    <TotaleCard />
                    <BtnsCard />
                </div>
            </Bounce>
            </div>
        </div>
        <FrameForPrint frameId='printFacture' src={`/Pr/facture/info/${FID}`} />
        <FrameForPrint frameId='printBl' src={`/Pr/facture/bonL/${FID}`} />
        <FrameForPrint frameId='printBs' src={`/Pr/facture/bonS/${FID}`} />
    </> );
}

export default FactureInfo;