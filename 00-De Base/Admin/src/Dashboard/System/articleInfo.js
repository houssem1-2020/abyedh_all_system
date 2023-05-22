import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import useGetFamilleArticle from '../Assets/Hooks/fetchArticlesFamille';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/usedSlk';
import usePrintFunction from '../Assets/Hooks/printFunction';
import FrameForPrint from '../Assets/frameForPrint';
import useSaveNotification from '../Assets/Hooks/saveNotifFunction';
import ReactImageZoom from 'react-image-zoom';
import { Bounce } from 'react-reveal';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { NavLink } from 'react-router-dom';
import ASIL from './systemList'

const EditArticle = ({articleD, setArticleD, checkPrixCompatiblite, familles, EditArticleFunction,loaderState,updateQte}) =>{
    return(<>

                <h5 className='mb-1'>Code à barre:</h5>
                <Input icon='barcode' disabled iconPosition='left' type='number' placeholder='code a barre' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.A_Code} onChange={(e) => setArticleD({...articleD, A_Code: e.target.value })} />
                <div className='row'>
                        <div className='col-12 col-lg-10'>
                            <h5 className='mb-1'>Nom: </h5>
                            <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Name} onChange={(e) => setArticleD({...articleD, Name: e.target.value })}/>
                        </div>
                        <div className='col-12 col-lg-2'>
                            <h5 className='mb-1'>Groupage:</h5>
                            <Input icon='box' iconPosition='left' type='number' placeholder='gpge'  className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Groupage} onChange={(e) => setArticleD({...articleD, Groupage: e.target.value })}/>
                        </div>
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Genre: </h5>
                               <Select placeholder='Selectionez une Categorie' options={familles} className='w-100 shadow-sm rounded mb-3' defaultValue={articleD.Genre} onChange={(e, data) => setArticleD({...articleD, Genre: data.value })} />  
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Fabriquée par: </h5>
                                <Input icon='home' iconPosition='left' placeholder='Socité' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Socite} onChange={(e) => setArticleD({...articleD, Socite: e.target.value })}/>
                            </div>
                </div>
                <div className='row'>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Acaht: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='achat' defaultValue={articleD.Prix_achat} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Prix_achat: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Vente: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='vente' defaultValue={articleD.Prix_vente} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Prix_vente: e.target.value })}/>
                            </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Promo: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='promo' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Prix_gros}  onChange={(e) => setArticleD({...articleD, Prix_gros: e.target.value })}/>
                            </div>
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-5'>
                                <h5 className='mb-1'>Quantité: </h5>
                                <Input icon='dropbox' iconPosition='left' type='number' disabled={true} placeholder='quantité' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Quantite} onChange={(e) => setArticleD({...articleD, Quantite: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-5'>
                                <h5 className='mb-1'>Repture du stock: </h5>
                                <Input icon='angle double down' iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.Repture} onChange={(e) => setArticleD({...articleD, Repture: e.target.value })}/>
                            </div>
                            <div className='col-12 col-lg-2'>
                                <h5 className='mb-1'>TVA: </h5>
                                <Input icon='retweet' iconPosition='left' placeholder='TVA' type='number' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={articleD.TVA} onChange={(e) => setArticleD({...articleD, TVA: e.target.value })}/>
                            </div>
                </div>
                <div className='row'>
                    <h5 className='mb-1'>Description</h5>
                    <Form>
                        <TextArea  rows="3" defaultValue={articleD.Details} className='w-100 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Details: e.target.value })}/>
                    </Form> 
                </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditArticleFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function ArticleInfo() {
     /*#########################[Const]##################################*/
     const {code} = useParams()
     const [rendredData, setRendredData] = useState([])
     const [PieData, setPieData]= useState([])
     const [systemData, setSystemData] = useState([])
     const [facturerData, setFactureData] = useState([])
     const [commandeData, setCommandeD] = useState([])
     
     const [loading , setLoading] = useState(false)
     const [btnState, setBtnState] = useState(false)
 
 
     /*#########################[useEffect]##################################*/ 
     useEffect(() => {
        //  axios.post(`${GConf.ApiLink}/communication/info`, {
        //      PID : GConf.PID,
        //      tableName: code
        //    })
        //    .then(function (response) {
        //      setRendredData(response.data)
        //      setLoading(true)  
        //    }).catch((error) => {
        //      if(error.request) {
        //        toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
        //        setLoading(true) 
        //      }
        //    });
        setSystemData(ASIL[code])
     }, [])
 
     /*#########################[Functions]##################################*/
     const PrintFunction = (frameId) =>{ usePrintFunction(frameId) }
     const RetunTableFunc = ({ data }) => {
         // Get the column names from the object         
         if (data[0]) {
             const columnNames = Object.keys(data[0]);
             return (
                 <table className='table table-bordered'>
                 <thead>
                     <tr>
                     {columnNames.map(columnName => (
                         <th key={columnName}>{columnName}</th>
                     ))}
                     </tr>
                 </thead>
                 {/* <tbody>
                     {Object.values(data).map((rowData, index) => (
                     <tr key={index}>
                         {Object.values(rowData).map((cellData, cellIndex) => (
                         <td key={cellIndex}>{cellData}</td>
                         ))}
                     </tr>
                     ))}
                 </tbody> */}
                 </table>
             );
         } else {
                return(<>Pas de Donneé</>) 
         }
         
     }
 
     const FetchByGenre = (genre) =>{
         let found = rendredData.filter(element => element.State === genre)
         if (found) {
             return(found.length)
         } else {
             return 0
         }
     
  }
 
     const UpdateState = (stateBtn) =>{
         axios.post(`${GConf.ApiLink}/commande/controle`, {
             PID : GConf.PID,
             code: code,
             state: stateBtn
           })
           .then(function (response) {
             setCommandeD({ ...commandeData, State: stateBtn}) 
             setBtnState(true)            
           }).catch((error) => {
             if(error.request) {
               toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier L'etat du commande  </div></>, GConf.TostInternetGonf)   
               setBtnState(true)
             }
           });
     }
     const FacturerCommande = () =>{
         axios.post(`${GConf.ApiLink}/facture/ajouter`, {
             PID : GConf.PID,
             factD: facturerData,
         })
         .then(function (response) { 
             if(response.status = 200) {
                 UpdateState('A')
                 toast.success("Done !", GConf.TostSuucessGonf)
                 setBtnState(true)
             }
             else{
                 toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
             }           
         }).catch((error) => {
             if(error.request) {
               toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Facturer la commande  </div></>, GConf.TostInternetGonf)   
               setBtnState(true)
             }
           });
         
     }
     
     /*#########################[Card]##################################*/
     const StateCard = ({ status }) => {
         const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
         const statusCard = React.useCallback(() => {
           switch(status) {
             case 'W': return <StateCard color='warning' text='En Attent' />;  
             case 'A': return <StateCard color='success' text='Acepteé' /> ;
             case 'R': return <StateCard color='danger' text='Refuseé' />;
             default:  return <StateCard color='secondary' text='Indefinie' />;    
           }
         }, [status]);
       
         return (
           <div className="container">
             {statusCard()}
           </div>
         );
     };
     const TotaleCard = () =>{
         return(<>
                 <div className='card card-body shadow-sm mb-2'>
                     <div className='row'>
                         <div className='col-4 border-end text-center'><h2>{FetchByGenre('W')}</h2><small>En Attent</small></div>
                         <div className='col-4 border-end text-center'><h2>{FetchByGenre('A')}</h2><small>Accepte</small></div>
                         <div className='col-4  text-center'><h2>{FetchByGenre('R')}</h2><small>Refusee</small></div>
                     </div>
                 </div>
         </>)
     }
     const BtnsCard = () =>{
         return(<>
                 <div className='card card-body shadow-sm mb-2'>
                 <PieChartCard data={[{ name: 'En Attent', value: FetchByGenre('W') },{ name: 'Accepte', value: FetchByGenre('A') },{ name: 'Refuse', value: FetchByGenre('R') }]}/>
                 </div>
         </>)
     }
     const PieChartCard =  (props) =>{
         
         const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
         return (
             <PieChart width={300} height={200} >
               <Pie
                 data={props.data}
                 cx={150}
                 cy={100}
                 innerRadius={60}
                 outerRadius={80}
                 fill="#8884d8"
                 paddingAngle={2}
                 dataKey="value"
               >
                 {PieData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Tooltip />
             </PieChart>
           );
     }
     const CommandeHeader = () =>{
         return(<>
                 <h2 className='text-center mb-4'>Commande </h2> 
                 <br />
                 <div className='row'>
                     <div className='col-6'>
                         <div className='text-secondary'><b>CODE COMMANDE : </b> {code}</div>
                         <div className='text-secondary'><b>CLIENT: </b> {loading ? <NavLink  exact='true' to={`/S/cl/info/${commandeData.R_ID}`}> {commandeData.Name } </NavLink> : SKLT.BarreSkl } </div>
                     </div>
                     <div className='col-6'>
                         <div className='text-secondary'><b>Passé Le  : </b> {loading ?  new Date(commandeData.Passed_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) : SKLT.BarreSkl } </div>
                         <div className='text-secondary'><b>Voulu Le : </b> {loading ? new Date(commandeData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )  : SKLT.BarreSkl } </div>
                     </div>
                 </div>
         </>)
     }
     
     return ( <> 
         <BreadCrumb links={GConf.BreadCrumb.RequestInfo} />
         <br />
         <div className="row">
             <div className="col-12 col-lg-8">
                 <h1>{code}</h1>
                 <br />
                 <div className="table-responsive">
                     {loading ? <RetunTableFunc data={rendredData} /> : ''}
                 </div>
                 <br />
                 <br />
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
         {/* <FrameForPrint frameId='framed' src={printLink} /> */}
     </> );
 }

export default ArticleInfo;