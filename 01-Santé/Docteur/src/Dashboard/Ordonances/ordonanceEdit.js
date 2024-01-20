import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../AssetsM/Hooks/fetchClient';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import Ripples from 'react-ripples'
import { useParams } from 'react-router-dom';

const MainDataCard = ({ordonanceD, setOrdonanceD,allClientList, OnKeyPressFunc}) =>{
    const [clientNow, setClientNow] = useState({})
    const SelectClientFunction = (value) => {
        if (value) {
            setOrdonanceD({...ordonanceD, OR_Patient: value })
            let filtedClient = allClientList.find((data) => data.PA_ID == value)
            setClientNow(filtedClient)
        }
    }
    return (<>
            <div className='card card-body shadow-sm mb-2'>
                <h5>Date & Client  </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={new Date(ordonanceD.OR_Date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })} onChange={(e) => setOrdonanceD({...ordonanceD, OR_Date: e.target.value })}/>
                <datalist id="clientList">
                        {allClientList.map((test) =>
                        <option key={test.key} value={test.PA_ID}>{test.PA_Name} : {test.Phone}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={ordonanceD.OR_Patient} defaultValue={ordonanceD.OR_Patient}   onBlur={ (e) => SelectClientFunction(e.target.value) } size="small" iconPosition='left'   fluid className='mb-1' />
                <h4 className='mb-1 mt-1'>Nom: {clientNow.PA_Name  ? clientNow.PA_Name  : ''}</h4>
                <h4 className='mt-1 mb-1'>Adresse : {clientNow.Adress  ? clientNow.Adress  : ''} </h4>
         
            </div>
    </>)
}

function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const {ORID} = useParams()
    const [ordonanceD, setOrdonanceD] = useState({client:'PASSAGER', de:'Sidi Bourouis', vers:'', Fournisseurs:'INDEFENIE', Chauffeur:'', jour: Today.toISOString().split('T')[0], totale: 0 , articles:[]})
    const [articleNow, setArticleNow] = useState([])
 
    const [factureLink, setFactureLink] = useState('*')
    const [saveBtnState, setSaveBtnState] = useState(false)
 
    const [loaderState, setLS] = useState(false)
    const [loadingPage, setLoadingState] = useState(true)
    const [clientNow, setClientNow] = useState({})
    const [gettedFID, setFID] = useState('')
    const [client, allClientList] = useGetClients()
    const [autofocusState, setAutoFocus] = useState(false)
    const [articleList] = useGetArticles()
    const [loading , setLoading] = useState(false)

    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () => <AddArticles />,
        },
        {
            menuItem: { key: 'client', icon: 'user', content:  'Date & Client' }, 
            render: () =><MainDataCard ordonanceD={ordonanceD} setOrdonanceD={setOrdonanceD} SelectClientFunction={SelectClientFunction}   allClientList={allClientList}   OnKeyPressFunc={OnKeyPressFunc} clientNow={clientNow} />,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Enregistrer' }, 
            render: () => <ButtonsCard />,
        }
        
    ]
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/ordonance/info`, {
            PID : GConf.PID,
            OR_ID: ORID
          })
          .then(function (response) {
                if(!response.data[0]) {
                    toast.error('Ordonance Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/or"; }, 2000)
                    
                } else {
 
                    SelectClientFunction(response.data[0].OR_Patient)
                    setOrdonanceD({ OR_Patient: response.data[0].OR_Patient , OR_Date: response.data[0].OR_Date ,    articles:JSON.parse(response.data[0].OR_Articles)})
                    
                    setLoading(true)
                    
                }    
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)   
               
            }
          });
    }, [])

    useEffect(() => {
        if (articleList && articleList.length > 0) {
            // Data is rendered, set loadingState to false
            setLoadingState(false);
        }
        
    }, [articleList])

    /*#########################[Function]##################################*/
    const GetMedicammentData = (value) =>{
        const searchObject = articleList.find((article) => article.PK == value);
        if (searchObject) {
            setArticleNow(searchObject);
            setAutoFocus(true)
            
        }else{
            toast.error('Article Indéfine ', GConf.TostSuucessGonf)
        }
    }
    const AddMedicammentToListe = ()=>{
        if (!articleNow.PK) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Nom || articleNow.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Emploi_Mode || articleNow.Emploi_Mode == '') {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
        else{
                let arrayToAdd = {id: ordonanceD.articles.length + 1 , PK: articleNow.PK, Nom: articleNow.Nom, Dosage: articleNow.Dosage, Forme: articleNow.Forme, Presentation: articleNow.Presentation, Emploi_Mode: articleNow.Emploi_Mode}
                ordonanceD.articles.push(arrayToAdd)
                setArticleNow([])
        }
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= ordonanceD.articles.findIndex((article) => article.PK == value);
        ordonanceD.articles.splice(searchObject, 1);
        let resteArticles = ordonanceD.articles;
        setOrdonanceD({...ordonanceD, ordonance: resteArticles })


    } 
    const SelectClientFunction = (value) => {
        if (value) {
            setOrdonanceD({...ordonanceD, OR_Patient: value })
            let filtedClient = allClientList.find((data) => data.PA_ID == value)
            setClientNow(filtedClient)
        }
    }
    const EditOrdonance = () =>{
            if (!ordonanceD.OR_Date ) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!ordonanceD.OR_Patient) {toast.error("Patient De est Invalide !", GConf.TostErrorGonf)}
            else if (!ordonanceD.articles || ordonanceD.articles.length == 0) {toast.error("article list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/ordonance/modifier`, {
                    PID : GConf.PID,
                    ordonanceData: ordonanceD,
                    OR_ID: ORID,
                })
                .then(function (response) {
                    if(response.status = 200) {
 
                        setSaveBtnState(true)
                        toast.success("Ordonance Modifiee !", GConf.TostSuucessGonf)
 
                        setLS(false)
 
 
                    }
                    else{
                        toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> La Facture sera enregistrer sur votre ordinateur    </div></>, GConf.TostInternetGonf)   
                      Offline.factureToSave.push(ordonanceD)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)
                    }
                  });

            }       
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
 
    const CheckClientValidite = (clientId) =>{
        const exist = allClientList.find((client) => client.CL_ID == clientId);
        if (exist) { return true  } else { return false}
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
   /*#########################[Card]##################################*/
   const ProgressLoadingBar = (props) =>{
        return(<>
            <div className={`progress-bar-loading ${props.display == true ? '': 'd-none'}`}>
                    <div className="progress-bar-loading-value"></div>
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
                <ProgressLoadingBar display={loadingPage} />
                <Input icon='pin' list="articlesList" placeholder='Entre Medicamment'  onBlur={ (e) => GetMedicammentData(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1' /> 
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
                            <div className='col-6 text-start align-self-center'>
                                <div>{props.dataA.Nom}*{props.dataA.Dosage}</div> 
                                <small>{props.dataA.Forme}</small>
                            </div>
                            <div className='col-5 align-self-center'><b>{props.dataA.Emploi_Mode}</b></div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' disabled={saveBtnState} onClick={() => DeleteFromUpdateList(props.dataA.PK)}></Button></div>
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
    const ButtonsCard = () =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5>Buttons</h5>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={EditOrdonance}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState} fluid onClick={(e) => PrintFunction('printOrdonance')}><Icon name='print' /> Imprimer</Button>
                        </div>
                        
                    </div>
                     
                </div>
        </>)
    }
 
    
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
        <div className='row'>
            <div className='col-12 col-lg-5'>
                <div className="mb-4 sticky-top" style={{top:'70px'}}>
                    <Tab menu={{widths: panes.length , pointing: true  }} panes={panes} />        
                </div>
            </div>
            <div className='col-12 col-lg-7'>
                 
                <h5>Listes des Medicamment</h5>    
                    {ordonanceD.articles.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                    <br />
                    
            </div>
        </div>
 
        <FrameForPrint frameId='printOrdonance' src={`/Pr/ordonance/info/${ORID}`} />
    </> );
    }

export default AjouterFacture;