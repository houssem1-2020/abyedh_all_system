import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab, Form, TextArea, Placeholder, Modal} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../AssetsM/Hooks/fetchClient';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import Ripples from 'react-ripples'
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'; // Updated import statement
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint'

function FactureInfo() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const navigate = useNavigate();
    let {FID} = useParams()
    const [seanceData, setSeanceData] = useState({S_Patient:'PASSAGER',  Diagnostic: 'Null', Resultat:'', Maladie:'',  S_Date: Today.toISOString().split('T')[0], State_Degre: '' , ordonance:[]})
    const [diagnostiqueValue, setDiagnistiqueValue] = useState(EditorState.createEmpty());
    const [gettedOrFID, setOrId] = useState('')
    const [medicammentListe, setMedicammentListe] = useState([])
    const [analysesListe, setAnalyseListe] = useState([])
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [articleNow, setArticleNow] = useState([])
    const [articleList] = useGetArticles()
    const [clientList, allClientList] = useGetClients()
    const [autofocusState, setAutoFocus] = useState(false)
    const [loading, setLoading] = useState(true)
    const [modalS, setModalS] = useState(false)
 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Diagnostique ' }, 
            render: () => <DiagnostiqueCard />,
        },
        // {
        //     menuItem: { key: 'client', icon: 'user', content:  'Resultat' }, 
        //     render: () =><ResultCard seanceData={seanceData} setSeanceData={setSeanceData} clientList={clientList} allClientList={allClientList}  OnKeyPressFunc={OnKeyPressFunc} />,
        // },
        {
            menuItem: { key: 'sdfgsds', icon: 'chart bar', content:  'Analyses' }, 
            render: () =><AnalyseCard  />,
        },
        {
            menuItem: { key: 'clidsgent', icon: 'list alternate outline', content:  'Ordonance' }, 
            render: () =><OrdonanceCard  />,
        },
        {
            menuItem: { key: 'articles', icon: 'list alternate outline', content:  'Info' }, 
            render: () =><><FinishCard /></> ,
        }
        
    ]
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
          axios.post(`${GConf.ApiLink}/seances/select`, {
                PID : GConf.PID,
                SID: FID
                })
                .then(function (response) {
                     
                    if(!response.data[0]) {
                        toast.error('Seance Introuvable !', GConf.TostSuucessGonf)
                        setTimeout(() => {  window.location.href = "/S/sa"; }, 2000)
                        
                    } else {
                        setSeanceData(response.data[0])
                        if (response.data[0].Analyses != '[]') {
                            setAnalyseListe(JSON.parse(response.data[0].Analyses))
                        }
                        if (response.data[0].OR_Articles != '[]') {
                            setMedicammentListe(JSON.parse(response.data[0].OR_Articles))
                        }
                        setOrId(response.data[0].Ordonance)
                        setLoading(false)
                    }    
                }).catch((error) => {
                if(error.request) {
                    toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger la facture de son source   </div></>, GConf.TostInternetGonf)   
                }
                });
    }, [])

    /*#########################[Function]##################################*/
    const GenerateDiagnostiqueHTml = ()=>{
        const rawContentState = convertToRaw(diagnostiqueValue.getCurrentContent());
        const htmlValue = draftToHtml(rawContentState)
        return(JSON.stringify(htmlValue))
    }
    const AddMedicammentToListe = ()=>{
        if (!articleNow.PK) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Nom || articleNow.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Emploi_Mode || articleNow.Emploi_Mode == '') {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
        else{
                let arrayToAdd = {id: seanceData.ordonance.length + 1 , PK: articleNow.PK, Nom: articleNow.Nom, Dosage: articleNow.Dosage, Forme: articleNow.Forme, Presentation: articleNow.Presentation, Emploi_Mode: articleNow.Emploi_Mode}
                seanceData.ordonance.push(arrayToAdd)
                setArticleNow([])
        }
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= seanceData.ordonance.findIndex((article) => article.PK == value);
        seanceData.ordonance.splice(searchObject, 1);
        let resteArticles = seanceData.ordonance;
        setSeanceData({...seanceData, ordonance: resteArticles })


    }
    const GetMedicammentData = (value) =>{
        const searchObject = articleList.find((article) => article.PK == value);
        if (searchObject) {
            setArticleNow(searchObject);
            setAutoFocus(true)
            
        }else{
            toast.error('Article Indéfine ', GConf.TostSuucessGonf)
        }
    }
    const DeleteSeance = () =>{
 
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/supprimer`, {
                    PID : GConf.PID,
                    FID:  FID
                })
                .then(function (response) {
                    if(response.status = 200) {
                        toast.success("Seance Supprimer !", GConf.TostSuucessGonf)
                        setTimeout(() => {  window.location.href = "/S/sa"; }, 2000)
                    }
                    else{
                        toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5>     </div></>, GConf.TostInternetGonf)   
                       
                      setLS(false)
                    }
                  });

      
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    const NavigateFunction = (link) => { navigate(link) }
   /*#########################[Card]##################################*/
    const DiagnostiqueCard = () =>{
        return (<>
                <div className='card-body   '>
                     
                    <div dangerouslySetInnerHTML={{ __html: seanceData.Diagnostic }}></div>
                    <br />
                </div>
        </>)
    }
    const AddArticles = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5>Ajouter article</h5> 
                    <datalist id="articlesList">
                            {articleList.map((test,index) =>
                            <option key={index} value={test.PK}>{test.Nom} : {test.Dosage} - {test.Forme} - {test.Presentation}  </option>
                            )}
                    </datalist>
                    <Input icon='pin' list="articlesList" placeholder='Entre aarticle'  onBlur={ (e) => GetMedicammentData(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1' /> 
                    <div className='m-2 mb-0 text-secondary'><b> <span className='bi bi-upc '></span> Code a barre : {articleNow.PK} </b></div>
                    <div className='m-2 mb-0 text-danger'><b><span className='bi bi-star-fill '></span> Nom : {articleNow.Nom} </b></div> 
                    <div className='m-2 mb-0 text-info'><b><span className='bi bi-star-fill '></span> Dosage : {articleNow.Dosage} </b></div> 
                    <div className='m-2 mb-0 text-primary'><b><span className='bi bi-star-fill '></span> Forme : {articleNow.Forme} </b></div> 
                    <div className='m-2 mb-2 text-warning'><b><span className='bi bi-star-fill '></span> Presentation : {articleNow.Presentation} </b></div> 
                     
                    <div className='row'>
                       <div className='col-12'>  <Input icon='dropbox' type='text' value={articleNow.Emploi_Mode} autoFocus={autofocusState} onChange={ (e) => {articleNow.Emploi_Mode = e.target.value}} size="small" iconPosition='left' placeholder='Quantite'  fluid className='mb-1' /> </div> 
                    </div>
                    
                    <br />
                    <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddMedicammentToListe}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
        </>)
    }
    const ArticleListCard = (props) =>{
        return(<>
                    <Ripples className='d-block p-0 mb-1 rounded-pill' >   
                    <div className='card shadow-sm p-2   rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-4 text-start align-self-center'>
                                <div>{props.dataA.Nom}*{props.dataA.Dosage}</div> 
                            </div>
                            <div className='col-4 text-start align-self-center'>
                                <small>{props.dataA.Forme}</small>
                            </div>
                            <div className='col-4 align-self-center'><b>{props.dataA.Emploi_Mode}</b></div>
                            {/* <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' disabled={saveBtnState} onClick={() => DeleteFromUpdateList(props.dataA.PK)}></Button></div> */}
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge badge-lg bg-${props.color}`}> {props.text} </span>}
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
           <span> {statusCard()} </span>
            
           
        );
    };

    const FinishCard = () =>{
        return (<>
                <div className='card card-body    border-div'>
                        <table className='table mt-2 table-striped table-bordered border-div'>
                            <tbody>
                                <tr>
                                    <td><span className='bi bi-calendar'></span> Date & Heure  :</td>
                                    <td>{new Date(seanceData.S_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} | {seanceData.S_Time}</td>
                                </tr> 
                                <tr>
                                    <td><span className='bi bi-bandaid'></span> Maladie :</td>
                                    <td>{seanceData.Maladie}</td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-list-nested'></span> Degre de La Maladie :</td>
                                    <td><StateCard status={seanceData.State_Degre} /></td>
                                </tr>
                                <tr>
                                    <td><span className='bi bi-chat-dots-fill'></span> Description de la maladie :</td>
                                    <td>{seanceData.Resultat}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
                <br />
                <br />
        </>)
    }
    const OrdonanceCard = () =>{
        return(<>
                    <div className='  card-body border-div'>
                            <h5>Listes des Medicamment</h5>    
                            {/* {medicammentListe.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                            <br /> */}
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Designiation</th>
                        <th scope="col">Dosage</th>
                        <th scope="col">Forme</th>
                        <th scope="col">Presentation</th>
                        </tr>
                    </thead>
                    <tbody>
 
                        {medicammentListe.map( (artData, index) => 
                            <tr key={index +1 }>
                                <th scope="row">{index +1 }</th>
                                <td>{artData.Nom}</td>
                                <td>{artData.Dosage}</td>
                                <td>{artData.Forme }</td>
                                <td>{artData.Presentation}</td>
                            </tr>
                        )}
                     
                        
                    </tbody>
                </table>   
                    </div>
 
            </>)
    }
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5>Controle</h5>
                    <div className='row mb-2'>
                    <div className='col-6'>
                            <Button as='a' onClick={ (e) => NavigateFunction(`/S/sa/modifier/${FID}`)}  animated   className='rounded-pill bg-system-btn'  fluid>
                                <Button.Content visible><Icon name='edit outline' /> Modifier </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                    </div>
                    <div className='col-6'>
                        <Button  className='rounded-pill bg-danger text-white' onClick={ () => setModalS(true)}  fluid><Icon name='trash' /> Supprimer</Button>
                    </div>

                    
                    </div>
                    <div className='row '> 
                        <div className='col-12  mb-2'>
                            <Button  className='rounded-pill btn-imprimer' disabled={seanceData.Ordonance == ''}  fluid onClick={(e) => PrintFunction('printOrdonance')}><Icon name='edit outline' /> Imprimer Ordonance </Button>
                        </div>
                        {/* <div className='col-12  mb-2'>
                            <Button  className='rounded-pill btn-imprimer'  fluid onClick={(e) => PrintFunction('printFacture')}><Icon name='edit outline' /> Imprimer Un Rapport</Button>
                        </div> */}
                    </div>
                     
                </div>
        </>)
    }
    const AnalyseListCard = (props) =>{
        return(<>
                    <li>
                        <div className='row '>
                            <div className='col-5 text-start align-self-center'>
                                <div>{props.dataA.Grandeur}</div> 
                            </div>
                            <div className='col-5 text-start align-self-center'>
                                <small>{props.dataA.Valeur}</small>
                            </div>
 
                            
                        </div>
                    </li>
                </>)
    }
    const AnalyseCard = () =>{
        return(<>
                <div className=' card-body border-div'>
                        <h5>Listes des Analyse</h5>    
                        {analysesListe.map( (val,index) => <ul  key={index}><AnalyseListCard dataA={val}/></ul>)}
                        <br />
                        
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
                {loading ? <LoadingCard /> : <Tab menu={{widths: panes.length,  secondary: true  }} panes={panes} />}
                
            </div>
            <div className='col-12 col-lg-4'>
                
                    <BtnsCard />
                
            </div>
        </div>
        <Modal
              size='tiny'
              open={modalS}
              closeIcon
              onClose={() => setModalS(false)}
              onOpen={() => setModalS(true)}
          >
               
              <Modal.Content scrolling>
                    <h5 className='text-secondary'>Voulez Vous Vraimment Supprimer Cette Seance</h5>
                    <Button className='rounded-pill' negative onClick={ () => DeleteSeance(false)}> <span className='bi bi-treash' ></span> Supprimer</Button>
              </Modal.Content>
               
        </Modal>
        <FrameForPrint frameId='printOrdonance' src={`/Pr/ordonance/info/${gettedOrFID}`} />
    </> );
    }

export default FactureInfo;