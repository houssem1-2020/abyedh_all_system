import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Dropdown, Icon, Input, Loader, Statistic } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Tab } from 'semantic-ui-react';
import axios from 'axios';
import { _ } from "gridjs-react";
import { useParams } from 'react-router-dom';
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import { toast } from 'react-toastify';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { useNavigate} from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const EditCamionCard = ({camionD, setCamionD, EditCamion, GenrateKey, loaderState}) =>{
    const { t, i18n } = useTranslation();
    return(<>
            <div className='p-1 mb-2'>
            <h5 className='mb-1'>Matricule:</h5>
                 <Input icon='key' disabled iconPosition='left' placeholder='Matricule' className='w-100 border-0 shadow-sm rounded mb-1'  value={camionD.Matricule} onChange={(e) => setCamionD({...camionD, Matricule: e.target.value })}/>
            </div>
            <div className='p-1  mb-2'>
            <h5 className='mb-1'>Nom:</h5>
                 <Input icon='truck' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' value={camionD.Cam_Name} onChange={(e) => setCamionD({...camionD, Cam_Name: e.target.value })} />
            </div>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'>Marque:</h5>
                <Input icon='star' iconPosition='left' placeholder='Marque' className='w-100 border-0 shadow-sm rounded mb-1' value={camionD.Detail} onChange={(e) => setCamionD({...camionD, Detail: e.target.value })} />
            </div>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'> Chauffeur:</h5>
                <Input icon='user' iconPosition='left' placeholder='Chauffeur' className='w-100 border-0 shadow-sm rounded mb-1' value={camionD.Chauffeur} onChange={(e) => setCamionD({...camionD, Chauffeur: e.target.value })}/>
            </div>
            <div className='row mb-3'>
                    <div className='col-12 col-lg-6'>
                        <h5 className='mb-1'>Identifiant:</h5>
                        <Input icon='linkify' iconPosition='left' placeholder='identifiant'  className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Identifiant} onChange={(e) => setCamionD({...camionD, Identifiant: e.target.value })} />
                    </div>
                    <div className='col-9 col-lg-5'>
                        <h5 className='mb-1'>Mot De Pass: </h5>
                        <Input icon='eye' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Password} onChange={(e) => setCamionD({...camionD, Pasword: e.target.value })}/>
                    </div>
                    <div className='col-3 col-lg-1 align-self-center'>
                        <Button onClick={GenrateKey} className="rounded-pill " icon='random'></Button>
                    </div>
            </div> 
            <div className='p-1 mb-2'>
                <h5 className='mb-1'> {t('menuTabs.teamPage.teamInfoPage.caissePWDData.smartID')} {camionD.Now_Login_ID}</h5>
            </div>
            <div className='text-end mb-5'>
                <Button  onClick={EditCamion}  className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
            </div>

    </>)
}

function CamionInfo() {
    /* ############################### Const ################################*/
    const Today = new Date().toISOString().split('T')[0]
    const {CID} = useParams()
    const [position, setPosition] = useState([36.17720,9.12337])
    const [stocktable, setStockTable] = useState([]);
    const [camionData, setCamionD] = useState([]);
    const [camionFondRecett, setCamionFR] = useState({Fond:'0.000', Recette: '0.000'});
    const [factureCamion, setFactureCamion] = useState([]); 
    const [fondListCamion, setFonfListCamion] = useState([]); 
    const [venteDate, setVenteDate] = useState({start:Today, end:Today}); 
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    const panes = [
        {
            menuItem: { key: 'control', icon: 'th', content: 'Control' }, 
            render: () =><><Tab.Pane className='border-div' attached={false}><FastControl /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'stock', icon: 'boxes', content: 'Stock' }, 
            render: () =><CamionStock />,
        },
        {
            menuItem: { key: 'box', icon: 'trash alternate', content: 'Fond' }, 
            render: () => <><CamionFonds/><br /></>,
        },
        {
            menuItem: { key: 'fond', icon: 'file text', content: 'Facture' }, 
            render: () => <><CamionFactures /><br /></>,
        },
        {
            menuItem: { key: 'comd', icon: 'calendar check', content: 'Commandes' }, 
            render: () => <><CamionCommandes /><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><EditCamionCard camionD={camionData}  setCamionD={setCamionD} GenrateKey={GenrateKey} EditCamion={EditCamion} loaderState={loaderState} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supp' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><DeleteCamion /></Tab.Pane><br /></>,
        },
        
    ]
    const panesLeft = [
        {
            menuItem: { key: 'control', icon: 'folder open', content: 'Info' }, 
            render: () =><ArticleCard  dataC={camionData} camionFondRecett={camionFondRecett}/>,
        },
        {
            menuItem: { key: 'stock', icon: 'map marker', content: 'Position GPS ' }, 
            render: () =><PositionCard />,
        }
    ]
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon);
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    const navigate = useNavigate();
    const NavigateFunction = (link) => {  navigate(link) }

    /* ############################### UseEffect ################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camions/info`, {
            PID : GConf.PID,
            camId : CID
        })
        .then(function (response) {
            console.log(response.data[0])
            if(response.data[0].Data.length === 0) {
                toast.error('Camion Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/cm"; }, 2000)
                
            } else {
                setCamionFR({Fond: response.data[0].Fond, Recette : response.data[0].Recette})
                setCamionD(response.data[0].Data[0])
                setPosition([response.data[0].Position.lat,response.data[0].Position.lng])
                setLoading(true)
                let stockTable = []
                response.data[0].Stock.map( (getData) => stockTable.push([ getData.A_Code, getData.Name, getData.Genre, getData.Qte, getData.Prix_vente,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cm/info/stock/${CID}/${getData.A_Code}`)}><Icon  name='angle right' /></Button>)
                    // _(<h6><a href={`stock/${CID}/${getData.A_Code}`} ><Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ft/info/${getData.F_ID}`)}><Icon  name='angle right' /></Button></a></h6>)
                ],))
                setStockTable(stockTable)

                let factureTable = []
                response.data[0].Facture.map( (getData) => factureTable.push([ getData.F_ID, getData.C_Name, new Date(getData.Cre_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), getData.Tota,
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cm/info/facture/${CID}/${getData.F_ID}`)}><Icon  name='angle right' /></Button>)
                // _(<h6><a href={`facture/${CID}/${getData.F_ID}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
                ],))
                setFactureCamion(factureTable)

                let fondListTable = []
                response.data[0].FondList.map( (getData) => fondListTable.push([ getData.Bon_id,  new Date(getData.Jour).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), getData.Totale,
                _(<SDCF state={getData.SDF} />), 
                _(<SDCF state={getData.SCF} />),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cm/info/fond/${CID}/${getData.Bon_id}`)}><Icon  name='angle right' /></Button>)
                // _(<h6><a href={`fond/${CID}/${getData.Bon_id}`} ><Button className='rounded-pill bg-system-btn' size='mini'><Icon  name='angle right' /></Button></a></h6>)
                ],))
                setFonfListCamion(fondListTable)
            }

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les information du camion </div></>, GConf.TostInternetGonf)   
              setCamionFR({Fond: 0, Recette : 0})
              setCamionD([])
              setPosition([0,0])
              setLoading(true)
              setStockTable([])
              setFactureCamion([])
              setFonfListCamion([])
            }
          });

    }, [])


    /* ############################### Function ################################*/ 
    const GenrateKey = () =>{
        let ID = Math.random().toString(36).slice(2, 8);
        let PWD =  Math.floor(Math.random() * 1000000);
        setCamionD({...camionData, Identifiant: ID , Pasword:PWD})
    }
    const DeleteStockZero = () => {
        axios.post(`${GConf.ApiLink}/camion/info/ztockzero/delete`, {
            PID : GConf.PID,
            camId: CID,
          })
        .then(function (response) {
            if(response.status === 200){
                toast.success("Stock à zero supprimer !", GConf.TostSuucessGonf)
                SaveNotification('camionSupprimerArticleZero',GConf.PID, camionData)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Operation anuuleé </div></>, GConf.TostInternetGonf)   
            }
          });
    }
    const EditCamion = () =>{
        if (!camionData.Matricule) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!camionData.Cam_Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!camionData.Detail) {toast.error("Marque Invalide !", GConf.TostErrorGonf)}
        else if (!camionData.Chauffeur) {toast.error("Chauffeur Invalide !", GConf.TostErrorGonf)}
        else if (!camionData.Identifiant) {toast.error("Identifiant Invalide !", GConf.TostErrorGonf)}
        else if (!camionData.Pasword) {toast.error("Mot De Passe Invalide !", GConf.TostErrorGonf)}
        else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/camions/modifier`, {
                    tag : GConf.PID,
                    camionD : camionData,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        toast.success("Camion Modifier !", GConf.TostSuucessGonf)
                        setLS(false)
                        SaveNotification('camionEdit',GConf.PID, camionData)
                    }
                    else {
                            toast.error('Erreur Lors de la modification', GConf.TostSuucessGonf)
                            setLS(false)
                        }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier le camion </div></>, GConf.TostInternetGonf)   
                    }
                  });
                    
            }
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
    
    /* ############################### Card ################################*/
    const SDCF = (props)=>{
        return(<>
           <div className='text-center'><span className={`bi bi-${props.state == "true" ? 'check-circle-fill text-success': 'x-circle-fill text-danger'}`}></span> </div>
        </>)
      }
    const ArticleCard = (props) =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container">
                            <img src="https://system.anaslouma.tn/Assets/images/camion.jpg" className="rounded-circle" width="80" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.dataC.Cam_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-truck"></span> { props.dataC.Matricule } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-person-heart"></span> { props.dataC.Chauffeur } </>: SKLT.BarreSkl } </h6>
                            <Divider horizontal className='text-secondary mt-4'>Fond</Divider>
                            <div className='row text-center'>
                                <div className='col-12'>    
                                    {loading ?  
                                        <Statistic color='red' size='tiny'>
                                            <Statistic.Value>
                                                {props.camionFondRecett.Fond} 
                                            </Statistic.Value>
                                        </Statistic>
                                    : SKLT.BarreSkl }  
                                    
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>Recette</Divider>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'> 
                                    {loading ?  
                                        <Statistic color='green' size='tiny'>
                                            <Statistic.Value>
                                                {props.camionFondRecett.Recette} 
                                            </Statistic.Value>
                                        </Statistic>
                                    : SKLT.BarreSkl }   
                                </div>
                                
                        </div>
                    </div>
                </div>
        </>);
    }
    const PositionCard = () =>{
        return(<>
                <div className='card card-body shadow-sm  border-div mb-4'>
                        <h5>Location</h5>
                          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="map-height">
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    
                                </Popup>
                            </Marker>
                        </MapContainer>
                        
                </div>
        </>)
    }
    const FastControl = () =>{
        return(<>
                <h5 className='text-danger'>Stock</h5>
                <div className='mb-2 row'>
                    <div className='col-10 col-lg-11 align-self-center'><b>&#8226; Imprimer Le Stock du camion </b></div>
                    <div className='col-2 col-lg-1 align-self-center'><Button  className='rounded-circle bg-system-btn' icon onClick={(e) => PrintFunction('PrintStock')}> <Icon name='print' /> </Button></div>
                </div>
                <div className='mb-2 row'>
                    <div className='col-10 col-lg-11 align-self-center'><b>&#8226; Imprimer Le Stock à 0 </b></div>
                    <div className='col-2 col-lg-1 align-self-center'><Button  className='rounded-circle btn-imprimer' icon onClick={(e) => PrintFunction('PrintStockZero')}> <Icon name='print' /> </Button></div>
                </div>
                <div className='mb-2 row'>
                    <div className='col-10 col-lg-11 align-self-center'><b>&#8226; Supprimer Les Articles à 0</b></div>
                    <div className='col-2 col-lg-1 align-self-center'><Button  className='rounded-circle btn-danger' icon onClick={DeleteStockZero}>  <Icon name='trash alternate' /></Button></div>
                </div>
                <hr />
                <h5 className='text-danger'>Vente</h5>
                <div className='mb-2 row'>
                    <div className='col-12 col-lg-7'><b> &#8226; Imprimer Les Article Vendu Le : </b></div>
                    <div className='col-10 col-lg-4'><Input size='mini' fluid type='date' value={venteDate.start} onChange={(e) => setVenteDate({...venteDate, start: e.target.value , end: e.target.value})}/></div>
                    <div className='col-2 col-lg-1'><Button  className='rounded-circle bg-system-btn' icon onClick={(e) => PrintFunction('ventes')}>  <Icon name='print' /></Button></div>
                </div>
                <div className='mb-2 row'>
                    <div className='col-12 col-lg-7'><b>&#8226; Imprimer La Facture Du :</b></div>
                    <div className='col-10 col-lg-4'><Input size='mini' fluid type='date' value={venteDate.start} onChange={(e) => setVenteDate({...venteDate, start: e.target.value , end: e.target.value})}/></div>
                    <div className='col-2 col-lg-1'><Button  className='rounded-circle btn-imprimer' icon onClick={(e) => PrintFunction('VPDay')}>  <Icon name='print' /></Button></div>
                </div> 
                <div className='mb-2 row'>
                    <div className='col-12 col-lg-5 align-self-center'><b>&#8226; Imprimer Les Recette entre :</b></div>
                    <div className='col-5 col-lg-3'><Input size='mini' fluid  type='date' value={venteDate.start} onChange={(e) => setVenteDate({...venteDate, start: e.target.value })}/></div>
                    <div className='col-5 col-lg-3'><Input size='mini' fluid  type='date' value={venteDate.end} onChange={(e) => setVenteDate({...venteDate, end: e.target.value })}/></div>
                    <div className='col-2 col-lg-1'><Button  className='rounded-circle btn-imprimer' icon onClick={(e) => PrintFunction('VEPeriode')}>  <Icon name='print' /></Button></div>
                </div>
                <hr />
                <h5 className='text-danger'>Fond</h5>
                <div className='mb-2 row'>
                    <div className='col-12 col-lg-5 align-self-center'><b>&#8226; Imprimer Les Fond entre :</b></div>
                    <div className='col-5 col-lg-3'><Input size='mini' fluid  type='date' value={venteDate.start} onChange={(e) => setVenteDate({...venteDate, start: e.target.value })} /></div>
                    <div className='col-5 col-lg-3'><Input size='mini' fluid  type='date' value={venteDate.end} onChange={(e) => setVenteDate({...venteDate, end: e.target.value })} /></div>
                    <div className='col-2 col-lg-1'><Button  className='rounded-circle btn-imprimer' icon onClick={(e) => PrintFunction('Printfonds')}>  <Icon name='print' /></Button></div>
                </div> 
                
        </>)
    }
    const CamionStock = () =>{
        return(<>

                <TableGrid tableData={stocktable} columns={GConf.TableHead.camionStock} />
        </>)
    }
    const CamionFonds = () =>{
        return(<>
            <TableGrid tableData={fondListCamion} columns={GConf.TableHead.camionFond} />
        </>)
    }
    const CamionFactures = () =>{
        return(<>
                <TableGrid tableData={factureCamion} columns={GConf.TableHead.camionFacture} />
        </>)
    }
    const CamionCommandes = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
                <div className='mb-2'>
                    <Input size='large' fluid type='date' value={venteDate.start} onChange={(e) => setVenteDate({...venteDate, start: e.target.value , end: e.target.value})}/>
                </div>
                <div className='mb-2'>
                <h5>Totale & Resumer</h5> 
                <br /> 
                    
                </div>
                <div className='mb-2'>
                    <div className='row'>
                        <div className='col-12 col-lg-3'><Button  className='rounded-pill btn-imprimer' disabled={!true}  fluid onClick={(e) => PrintFunction('commandeGroupRes')}><Icon name='print' /> Resumeé</Button></div>
                        <div className='col-12 col-lg-3'><Button  className='rounded-pill btn-imprimer' disabled={!true}  fluid onClick={(e) => PrintFunction('commandeGroupF')}><Icon name='print' /> Factures</Button></div>
                        <div className='col-12 col-lg-3'><Button  className='rounded-pill btn-imprimer' disabled={!true}  fluid onClick={(e) => PrintFunction('commandeGroupBS')}><Icon name='print' /> B. Sortie</Button></div>
                        <div className='col-12 col-lg-3'><Button  className='rounded-pill btn-imprimer' disabled={!true}  fluid onClick={(e) => PrintFunction('commandeGroupBL')}><Icon name='print' /> B. Livraison</Button></div>
                    </div>
                </div>
            </div>
        </>)
    }
    const DeleteCamion = () =>{
        return(<>
        <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Ce Camion ?</h3> 
            <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer Le Camion : </b></h5>
            <ul className="text-info text-left">
            <li>L'article ne sera pas visible dans la branche 'Stock'</li>
            <li>Tous les article avec son code a barre se suppriment </li>
            <li>L'article Soit visible seulemment dans les facture  </li>
            </ul>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill" ><span className="bi bi-check"></span> Oui, Supprimer</button>
            </div>
        </>)
    }

    return ( <> 
         <BreadCrumb links={GConf.BreadCrumb.CamionInfo} />
         <br />
        <div className="row">
                <div className="col-12 col-lg-4">
                    {/* <ArticleCard  dataC={camionData} camionFondRecett={camionFondRecett}/>  */}
                    <div className="sticky-top" style={{top:'70px'}}>
                        <Tab menu={{ secondary: true }} panes={panesLeft} />
                    </div>
                    

                </div>
                <div className="col-12 col-lg-8">
                     <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                </div>
        </div>
        <FrameForPrint frameId='PrintStock' src={`/Pr/Camion/info/stock/${CID}`} />
        <FrameForPrint frameId='PrintStockZero' src={`/Pr/Camion/info/stock-z/${CID}`} />
        <FrameForPrint frameId='ventes' src={`/Pr/Camion/info/vente/articles/${CID}/${venteDate.start}`} />
        <FrameForPrint frameId='VPDay' src={`/Pr/Camion/info/vente/factures/${CID}/${venteDate.start}`} />
        <FrameForPrint frameId='VEPeriode' src={`/Pr/Camion/info/vente/recette/${CID}/${venteDate.start}/${venteDate.end}`} />
        <FrameForPrint frameId='Printfonds' src={`/Pr/Camion/info/fond/${CID}/${venteDate.start}/${venteDate.end}`} />
        <FrameForPrint frameId='resumerFactures' src={`/Pr/Camion/info/vente/articles/${CID}/${venteDate.start}`} />
        <FrameForPrint frameId='commandeGroupBL' src={`/Pr/Camion/commandes/BL/${CID}/${venteDate.start}`} />
        <FrameForPrint frameId='commandeGroupBS' src={`/Pr/Camion/commandes/BS/${CID}/${venteDate.start}`} />
        <FrameForPrint frameId='commandeGroupF' src={`/Pr/Camion/commandes/Facture/${CID}/${venteDate.start}`} />
        <FrameForPrint frameId='commandeGroupRes' src={`/Pr/Camion/commandes/Resumer/${CID}/${venteDate.start}`} />
     </> );
}

export default CamionInfo;