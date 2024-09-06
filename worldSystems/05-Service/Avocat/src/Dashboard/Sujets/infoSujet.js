import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab, Form, TextArea, Placeholder} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
 
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
 
import { useParams } from 'react-router-dom';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import { _ } from 'gridjs-react';
import { useNavigate} from 'react-router-dom';

function FactureInfo() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    let {SID} = useParams()
    const [seanceData, setSeanceData] = useState({S_Patient:'PASSAGER',  Diagnostic: 'Null', Resultat:'', Maladie:'',  S_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[]})
    const [seancesListe, setSeancesListe] = useState([])
    const [loading, setLoading] = useState(true)
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Desctiprion ' }, 
            render: () => <DiagnostiqueCard />,
        },
         
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Info' }, 
            render: () =><><FinishCard /></> ,
        },
         
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Seances' }, 
            render: () =><><SenacesCard /></> ,
        }
        
    ]
    const navigate = useNavigate();
    /* ############################### UseEffect ########################*/
    useEffect(() => {
            axios.post(`${GConf.ApiLink}/sujets/info`, {
                PID : GConf.PID,
                SJ_ID: SID
            })
            .then(function (response) {
                if(!response.data) {
                    toast.error('Facture Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/sa"; }, 2000)
                    
                } else {
                    setSeanceData(response.data)
                    setLoading(false)
                }    
            }).catch((error) => {
            if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
            }
            });
            axios.post(`${GConf.ApiLink}/sujets/info/seances`, {
                PID : GConf.PID,
                SJ_ID: SID
            })
            .then(function (response) {
                let factureTable = []
                response.data.Ordonance.map( (getData, index) => factureTable.push([ 
                getData.T_ID,
                getData.CA_Name,
                new Date(getData.T_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                getData.T_Time,
                getData.Final_Value,
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ft/info/${getData.T_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setSeancesListe(factureTable)
            }) 
    }, [])

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
 
   /*#########################[Card]##################################*/
    const DiagnostiqueCard = () =>{
        return (<>
                <div className='card card-body shadow-sm border-div '>
                    <h5>Diagnostique  </h5>
                    {/* <div dangerouslySetInnerHTML={{ __html: seanceData.Diagnostic }}></div> */}
                    <div dangerouslySetInnerHTML={{ __html: seanceData.SJ_Description }}></div>
                    <br />
                </div>
        </>)
    }
    const FinishCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-3 border-div'>
                        <table className='table mt-2 table-striped table-bordered border-div'>
                            <tbody>
                                <tr>
                                    <td><span className='bi bi-calendar'></span> Date & Heure  :</td>
                                    <td>{new Date(seanceData.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} | {seanceData.SE_Time}</td>
                                </tr> 
                                <tr>
                                    <td><span className='bi bi-bandaid'></span> Genre :</td>
                                    <td>{seanceData.SE_Genre}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-list-nested'></span> Permis :</td>
                                    <td> </td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-person-check'></span> Condidat :</td>
                                    <td>{seanceData.CD_Name}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-person-fill'></span> Moniteur  :</td>
                                    <td>{seanceData.T_Name}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-car-front-fill'></span> Voiture  :</td>
                                    <td>{seanceData.VO_Name}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <br />
                <br />
        </>)
    }
    const SenacesCard = () => {
        return (<TableGrid tableData={seancesListe} columns={GConf.TableHead.client} />)
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
                            <Button as='a' href={`/S/sj/modifier/${SID}`} animated   className='rounded-pill bg-system-btn'  fluid>
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
                            <Button  className='rounded-pill  btn-regler'  fluid    ><Icon name='edit outline' /> R. Stock</Button>
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
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-2 mb-2'> <SimpleLoadinCard /> </div>
                <div className='col-12'> <SimpleLoadinCard  fullHeight/> </div>
            </div>
        </>)
    }
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
        <div className='row'>
            <div className='col-12 col-lg-8'>
            {loading ? <LoadingCard /> : <Tab menu={{  pointing: true , widths: panes.length ,  }} panes={panes} />}
                
            </div>
            <div className='col-12 col-lg-4'>
                <div className="sticky-top" style={{top:'70px'}}>
                    <BtnsCard />
                </div> 
            </div>
        </div>
        
        {/* <FrameForPrint frameId='printFacture' src={`/Pr/facture/info/${gettedOrFID}`} /> */}
    </> );
    }

export default FactureInfo;