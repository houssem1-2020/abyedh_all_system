import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GConf from '../../../AssetsM/generalConf';
import axios from 'axios';
import { Popup } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import { Icon, Input , Loader } from 'semantic-ui-react';
import { _ } from 'gridjs-react';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import { Statistic } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import { useNavigate} from 'react-router-dom';
import Ripples from 'react-ripples'
import FrameForPrint from '../../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../../AssetsM/Hooks/printFunction';
import { Modal } from 'semantic-ui-react';
//import { io } from "socket.io-client";
import { QrReader } from 'react-qr-reader';

const SearchModalCard = ({modalS,setModalS,rechercheList,saveBtnState,rechercheKey,setRechercheKey,RechercheFunction,GetArticleDataByAID}) => {
    const RechercheListeCard = (props) =>{
        return(<>
            <div className='card p-3 mb-2 shadow-sm '>
                <div className='row'>
                    <div className='col-3 text-danger'>{props.data.P_Code}</div>
                    <div className='col-6 '><b>{props.data.Name}</b></div>
                    <div className='col-2'>{(props.data.Prix_vente).toFixed(3)}</div>
                    <div className='col-1'><Button   icon   className='rounded-circle p-2 bg-system-btn' onClick={()=> GetArticleDataByAID(props.data.P_Code)}>  <Icon name='plus' /></Button></div>
                </div>
            </div> 
        </>)
    }
    return(
            <Modal
                size='large'
                open={modalS}
                closeIcon
                dimmer = 'blurring'
                onClose={() => setModalS(false)}
                onOpen={() => setModalS(true)}
            >
                <Modal.Header>
                    <h4>Selectionner Un Article</h4>
                    <div className='row'>
                            <div className='col-9'>
                                <Input  size='small'  type='text'  icon='braille' onBlur={ (e) => setRechercheKey(e.target.value)}   iconPosition='left' placeholder=' '  fluid className='mb-1' />
                            </div>
                            <div className='col-3 align-self-center'><Button disabled={saveBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn' onClick={() => RechercheFunction()}>  <Icon name='save' /> Recherche </Button></div>
                    </div>
                </Modal.Header>
                <Modal.Content scrolling className='spesific-commp'>
                        <div className='p-1'>
                            {rechercheList.map((data,index) => <RechercheListeCard key={index} data={data} />)}
                        </div>  
                </Modal.Content>
                <Modal.Actions>
                            <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                </Modal.Actions>
            </Modal>
        )
}

const SelectModalCard = ({modalT,setModaT,fastArticleList,saveBtnState,rechercheKey,setRechercheKey,RechercheFunction,GetArticleDataByAID}) => {
    const SelectedListeCard = (props) =>{
        return(<>
            <div className='col-4'>
                <div className='card p-3 mb-2 shadow-sm '>
                    <div className='row'>
                        <div className='col-10'>
                            <div>{props.data.P_Code}</div>
                            <b>{props.data.Name}</b>
                        </div>
                        <div className='col-2 align-self-center'><Button   icon   className='rounded-circle p-2 bg-system-btn' onClick={()=> GetArticleDataByAID(props.data.P_Code)}>  <Icon name='plus' /></Button></div>
                    </div>
                </div> 
            </div> 
        </>)
    }
    return(
            <Modal
                size='large'
                open={modalT}
                closeIcon
                dimmer = 'blurring'
                onClose={() => setModaT(false)}
                onOpen={() => setModaT(true)}
            >   
                <Modal.Header>
                    <h4>Liste des Articles avce Code Facile</h4>
                </Modal.Header>
                <Modal.Content scrolling className='spesific-commp'>
                        <div className='row'>
                            {fastArticleList.map((data,index) => <SelectedListeCard key={index} data={data} />)}
                        </div>  
                </Modal.Content>
                <Modal.Actions>
                            <Button className='rounded-pill' negative onClick={ () => setModaT(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                </Modal.Actions>
            </Modal>
        )
}

const SelectClientFideliteCard = ({clientFidele, setClientFidelle ,clientList}) =>{
    const SetClientFidelite = (e) =>{
        if (e.which == 13) {
            setClientFidelle(clientList.find(obj => obj.CL_ID == e.target.value))
        } else {
            
        }
        
    }
    return (<>
            <div className='ccard-body mb-2'>
                {/* <datalist id="clientList">
                            {clientList.map((test) =>
                            <option key={test.PK} value={test.CL_ID}>{test.Phone} - {test.CL_Name}</option>
                            )}
                </datalist> */}
                <Input icon='star' list="clientList" size='large' onKeyPress={(e) => SetClientFidelite(e)}    iconPosition='left' placeholder='Client Fidelite'  fluid className='mb-1' />
                {/* <Input icon='user' list="clientList" size='large'   onChange={(e, { value }) => setClientFidelle(clientList.find(obj => obj.CL_ID == value))}  iconPosition='left' placeholder='Client'  fluid className='mb-1' /> */}
            </div>
    </>)
}


function ReglemmentClient() {
     /*#########################[Const]##################################*/
     const {CID} = useParams()
     const inputRef = useRef(null);
    const Today = new Date()
    let Offline = JSON.parse(localStorage.getItem(`${OneGConf.routerTagName}_Offline`));
    let caisseData = OneGConf.forPID
    const CaisseID = caisseData.C_ID;
    const [qrData, setQRData] = useState("Not Found")
    //const [stopStream, setStopStram] = useState(false)
    
    /*1- Ajouter Article */
    const [loading , setLoading] = useState(false)
    const [articleL, setArticleL] = useState([])
    const [factureD, setFactureD] = useState({client:'PASSAGER', Caisse : CaisseID , jour: Today.toISOString().split('T')[0], totale: 0 , State:'' , Espece:'', Paye_Bons:'' , articles:[]})
    const [articleNow, setArticleNow] = useState([])
    const [articleList, setArticleList] = useState([])
    const [selectedArticleList, setSelectedArticleList] = useState([])
    const [genreListe, setGenreList] = useState([])
    const [fastArticleList, setFastArticleList] = useState([])
    const [autofocusState, setAutoFocus] = useState(true)
    const [loadingPage, setLoadingP] = useState(true)

    const [keyBordI, setKeyBoedI] = useState('')
    const [floatOpen, setFloatOpen] = useState(false)
    const [peseState, setPeseState] = useState(false)

    let [rechercheKey, setRechercheKey] = useState('')
    const [rechercheList, setRechercheListe] = useState([])
    const [modalS, setModalS] = useState(false)
    const [modalT, setModaT] = useState(false)
    const [modalPS, setModaPS] = useState(false)

    const [gettedFID, setFID] = useState('5555')
    const [toPrintFID, setToPrintFOD] = useState('5555')
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [showKeyBoerd, sethowKeyBord] = useState(false)

    /*2- Paymment */
    const [keyaPaymment, setKeyPaymment] = useState('')
    const [payBtnState, setPayBtnState] = useState(false)

    /*3- Bons */
    const [selectedBon, setSelectedBon] = useState(1)
    const [keyBonsValue, setKeyBonsValue] = useState('')
    const [selectedPoucentage, setSelectedPourcentage] = useState(0)

    /*4- Clients */
    const [clientList, setClientList] = useState([])
    const [clientCredit, setClientCredit ] = useState()
    const [clientFidele, setClientFidelle ] = useState()
    const [fideliteState, setFideliteState ] = useState()
    const [scanResult, setScanResult] = useState(false);
    const [scanResultCommande, setScanResultCommande] = useState(false);
    
    /*4- Autres */
    const [factureOffline, setFactureOL] = useState(false)
    const panes = [
            {
                menuItem: { key: 'plats', icon: 'food', content: 'Plats ', className:`p-4 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' } ` }, 
                render: () => <Tab.Pane attached={false} className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' }`}> <PlatsListe /> </Tab.Pane>,
            },
            {
                menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ', className:`p-4 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' } ` }, 
                render: () => <Tab.Pane attached={false} className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' }`}> <AddArticles /> </Tab.Pane>,
            },
            {
                menuItem: { key: 'articles', icon: 'bitcoin', content: 'Paymment ' , className:`p-4 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' } `  }, 
                render: () => <Tab.Pane attached={false} className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' }`}> <PaymmentCard />  </Tab.Pane>,
            },
            {
                menuItem: { key: 'bons', icon: 'ticket', content: 'Calcuer Bons ' , className:`p-4 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' } ` }, 
                render: () => <Tab.Pane attached={false} className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' }`}> <CalculerBons />  </Tab.Pane>,
            },
            {
                menuItem: { key: 'client', icon: 'user', content: 'Client ' , className:`p-4 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' } ` }, 
                render: () => <Tab.Pane attached={false} className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' }`}> <CreditClient />  </Tab.Pane>,
            },       
    ]
    const panesRigth = [
        
        {
            menuItem: { key: 'articles', icon: 'gift', content:  'Commande' ,  className:`p-4 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' } `}, 
            render: () => <CommandeListCard/>,
        },
        {
            menuItem: { key: 'start', icon: 'list', content: 'Liste ' ,  className:`p-4 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' } `}, 
            render: () => <>
                    <TotaleCard /> 
                        <div className='spesific-commp' style={{height: '70vh', overflow: 'scroll', overflowX:'hidden'}}>
                            {factureD.articles.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                            <br />
                        </div>
            </>,
        }
        
    ]

    /*#########################[Use Effect]##################################*/
    useEffect(() => {
        
        axios.post(`${GConf.ApiRouterOneLink}/nv/stock`, {
            forPID: GConf.PID,
            factureD: factureD,
        })
        .then(function (response) {
            setArticleList(response.data)
            GenerateGenreListe(response.data)
            setSelectedArticleList(response.data.filter(article => article.Genre == response.data[0].Genre))
            setLoadingP(false)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> </div></>, GConf.TostInternetGonf)   
            }
        });
        
        axios.post(`${GConf.ApiLink}/commande/info`, {
            PID : GConf.PID,
            CID: CID
          })
          .then(function (response) {
                if (!response.data[0]) {
                    toast.error('Commande Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/rq"; }, 2000)
                } else {
                    setArticleL(JSON.parse(response.data[0].C_Articles))
                    setLoading(true)
                }  
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
              setLoading(true)
            }
          });

        setClientList(Offline.client)
        
        // const request = indexedDB.open('${OneGConf.routerTagName}_DB');

        // request.onsuccess = (event) => {
        // const db = event.target.result;
        // const transaction = db.transaction('Stock', 'readonly');
        // const objectStore = transaction.objectStore('Stock');

        // const getAllRequest = objectStore.getAll();

        // getAllRequest.onsuccess = (event) => {
        //     setArticleList(event.target.result)
        //     const selectedListe =  event.target.result.filter(article => article.Fast_Input == 'true')
        //     setFastArticleList(selectedListe)
        //     setLoadingP(false)
            
        // };
        // };

        

    }, [])


    /*#########################[Functions]##################################*/
    /*1- Ajouter Article */
    const SearchForCommande = (commandeID) =>{
        if (!commandeID) {toast.error("Commande ID Invalide !", GConf.TostErrorGonf)}
        else {
            setLoadingP(true)
            axios.post(`${GConf.ApiRouterOneLink}/commande/search`, {
                forPID: OneGConf.forPID.PID,
                FID: commandeID,
                
            })
            .then(function (response) {              
                setFactureD({...factureD, totale: MakeSum(), articles: JSON.parse(response.data.Articles) })
                setLoadingP(false)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> La facture sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)   
                  setLoadingP(false)
                }
            });

        } 
    }
    const GenerateGenreListe = (listeTarget) =>{
        const distinctNames = [...new Set(listeTarget.map(obj => obj.Genre))];
        setGenreList(distinctNames)
    }
    const SetSelectedListeFunc = (selectedGenre) =>{
        const selectedListe =  articleList.filter(article => article.Genre == selectedGenre)
        setSelectedArticleList(selectedListe)
    }
    const AddArticleToList = ()=>{
        if (!articleNow.P_Code) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Name || articleNow.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Qte || articleNow.Qte == '') {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
        else{
            const searchObject = factureD.articles.find((article) => article.P_Code == articleNow.P_Code);
            if (searchObject) {
                let IndexOfArticle = factureD.articles.findIndex((article) => article.P_Code == articleNow.P_Code)
                factureD.articles[IndexOfArticle].Qte = factureD.articles[IndexOfArticle].Qte + parseInt(articleNow.Qte)
                factureD.articles[IndexOfArticle].PU = ((factureD.articles[IndexOfArticle].Qte) * factureD.articles[IndexOfArticle].Prix ).toFixed(3) 
                setArticleNow([{}])

                setFactureD({...factureD, totale: MakeSum() })
                setAutoFocus(false)
                
            } else {
                let prix_u = (articleNow.Qte * articleNow.Prix_piece).toFixed(3)
                let arrayToAdd = {id: factureD.articles.length+1 , P_Code: articleNow.P_Code, Name: articleNow.Name, Prix: articleNow.Prix_piece, Qte: parseInt(articleNow.Qte), PU: prix_u}
                factureD.articles.push(arrayToAdd)
                setArticleNow([])

                setFactureD({...factureD, totale: MakeSum() })
                setAutoFocus(false)    
            }
        }        
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= factureD.articles.findIndex((article) => article.P_Code == value);
        factureD.articles.splice(searchObject, 1);
        let resteArticles = factureD.articles;
        setFactureD({...factureD, articles: resteArticles })
    }
    const GetArticleData = (value) =>{
        const searchObject= articleList.find((article) => article.P_Code == value);
        let Prix_piece = (searchObject.Prix_vente / searchObject.Groupage)
        searchObject.Prix_piece = Prix_piece.toFixed(3)
        setArticleNow(searchObject);
        setAutoFocus(true)
        
    }
    const MakeSum = () => {
        let tot = 0
        factureD.articles.map( (art) => { 
            tot = tot +  parseFloat(art.PU)
        })
        return (tot.toFixed(3))
    }
    const SaveFacture = () =>{
        if (!factureD.client) {toast.error("Client est Invalide !", GConf.TostErrorGonf)}
        else if (!factureD.jour ) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
        else if (!factureD.totale) {toast.error("totale est Invalide !", GConf.TostErrorGonf)}
        else if (!factureD.articles || factureD.articles.length == 0) {toast.error("article list est Invalide !", GConf.TostErrorGonf)}
        else {
            setLoadingP(true)
            setLS(true)
            setSaveBtnState(true)
            axios.post(`${GConf.ApiRouterOneLink}/nv/ajouter`, {
                forPID: OneGConf.forPID.PID,
                factureD: factureD,
            })
            .then(function (response) {
                if(response.status = 200) {
                    setSaveBtnState(true)
                    setFID(response.data.FID)
                    toast.success("Facture Enregistreé !", GConf.TostSuucessGonf)
                    setLS(false)
                    setLoadingP(false)
                    
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                    setSaveBtnState(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> La facture sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)   
                  Offline.factureToSave.push(factureD)
                  setFID( Offline.factureToSave.length -1 )
                  localStorage.setItem(`${OneGConf.routerTagName}_Offline`,  JSON.stringify(Offline));
                  setLS(false)
                }
            });

        }       
    }
    const BtnClicked = (value) =>{
        //socket.emit('cmd-saved', {message: value})
        if (value === 'C') { 
            setKeyBoedI('') 
            //alert(inputRef.current.value)
            inputRef.current.value = ''
            inputRef.current.focus()
        } 
        else if (value === '.' ) { 
            //setKeyBoedI(parseFloat(keyBordI)) 
            //alert(parseFloat(keyBordI))
            setFloatOpen(true)
        } 
        else {
            //setKeyBoedI(Number(keyBordI+value)) 
             
            if (floatOpen) {
                setKeyBoedI(prevInput => prevInput + '.' + parseFloat(value))
                setFloatOpen(false)
            } else {
                setKeyBoedI(prevInput => prevInput + parseFloat(value))
            }
        }
    }
    const EnterKyPressed = (e) =>{
        if (e.which == 13) {
            // if (e.getModifierState('CapsLock')) {
            //     //setKeyBoedI(e.target.value)
                
            // } else {
            //     toast.error(<>
            //         <div className='card-body w-100 text-center'>
            //             <span className='bi bi-keyboard-fill bi-lg'></span> 
            //             <h3 className='text-white'>Activer Majuscule</h3> 
            //         </div>
            //         </>, GConf.TostCaisseGonf)
                    
            // }
            GetArticleDataByAID(e.target.value)
         }  
         else if (e.which == 32) {
            if (factureD.articles.length != 0) {
                const lastElement = factureD.articles[factureD.articles.length - 1]
                AddMoreQte(lastElement.P_Code,e.target.value)
            }
         }
         else {
             //console.log(e.which)
         } 
            
    }
    const GetArticleDataByAID = (barCodeValue) =>{
        if (peseState) {
            let barreCode = barCodeValue.toString().substring(0, 7)
            let qte = (barCodeValue.toString().substring(7) / 10000).toFixed(3)
            const searchObjectFirst= articleList.find((article) => article.P_Code == barreCode);
            if (searchObjectFirst) {
                const searchObject = factureD.articles.find((article) => article.P_Code == barreCode);
                if (searchObject) {
                    let IndexOfArticle = factureD.articles.findIndex((article) => article.P_Code == barreCode)
                    factureD.articles[IndexOfArticle].Qte = (parseFloat(factureD.articles[IndexOfArticle].Qte) + parseFloat(qte)).toFixed(3)
                    factureD.articles[IndexOfArticle].PU = ((factureD.articles[IndexOfArticle].Qte) * factureD.articles[IndexOfArticle].Prix ).toFixed(3) 
                    setArticleNow([{}])

                    setFactureD({...factureD, totale: MakeSum() })
                    setAutoFocus(false)
                    setKeyBoedI('')

                    setPeseState(false)
                    
                } else {
                    let arrayToAdd = {id: factureD.articles.length+1 , P_Code: barreCode, Name: searchObjectFirst.Name, Prix: searchObjectFirst.Prix_vente, Qte: qte, PU: (searchObjectFirst.Prix_vente * qte)}
                    factureD.articles.push(arrayToAdd)
                    setArticleNow([])

                    setFactureD({...factureD, totale: MakeSum() })
                    setAutoFocus(false)   
                    setKeyBoedI('')

                    setPeseState(false)
                }

            } else {
                toast.error(<>
                            <div className='card-body w-100 text-center'>
                                <span className='bi bi-box-seam bi-lg'></span> 
                                <h3 className='text-white'>Pas D'article</h3> 
                            </div>
                            </>, GConf.TostCaisseGonf)
            } 
        } else {
            const searchObjectFirst= articleList.find((article) => article.P_Code == barCodeValue);
            if (searchObjectFirst) {
                const searchObject = factureD.articles.find((article) => article.P_Code == barCodeValue);
                if (searchObject) {
                    let IndexOfArticle = factureD.articles.findIndex((article) => article.P_Code == barCodeValue)
                    factureD.articles[IndexOfArticle].Qte = factureD.articles[IndexOfArticle].Qte + 1
                    factureD.articles[IndexOfArticle].PU = ((factureD.articles[IndexOfArticle].Qte) * factureD.articles[IndexOfArticle].Prix ).toFixed(3) 
                    setArticleNow([{}])

                    setFactureD({...factureD, totale: MakeSum() })
                    setAutoFocus(false)
                    setKeyBoedI('')
                    
                    
                } else {
                    let arrayToAdd = {id: factureD.articles.length+1 , P_Code: barCodeValue, Name: searchObjectFirst.Name, Prix: searchObjectFirst.Prix_vente, Qte: 1, PU: searchObjectFirst.Prix_vente}
                    factureD.articles.push(arrayToAdd)
                    setArticleNow([])

                    setFactureD({...factureD, totale: MakeSum() })
                    setAutoFocus(false)   
                    setKeyBoedI('') 
                    
                }

            } else {
                toast.error(<>
                            <div className='card-body w-100 text-center'>
                                <span className='bi bi-box-seam bi-lg'></span> 
                                <h3 className='text-white'>Pas D'article</h3> 
                            </div>
                            </>, GConf.TostCaisseGonf)
                            
            }    
        }
    }
    const ActivateCapLock = () => {
        var event = new KeyboardEvent('keydown', {'keyCode': 20, 'which': 20});
        document.dispatchEvent(event);
        alert('gg')
    }
    const FireKeyPosBtn = () => {
       
    }
    const AddMoreQte = (valueCode, qte) =>{
        let IndexOfArticle = factureD.articles.findIndex((article) => article.P_Code == valueCode)
        factureD.articles[IndexOfArticle].Qte =  qte
        factureD.articles[IndexOfArticle].PU = ((factureD.articles[IndexOfArticle].Qte) * factureD.articles[IndexOfArticle].Prix ).toFixed(3) 
        setArticleNow([{}])

        setFactureD({...factureD, totale: MakeSum() })
        setAutoFocus(false)
        setKeyBoedI('')
    }
    const RechercheFunction = () => {
        let values = articleList.filter(element => element.Name.toLowerCase().includes(rechercheKey.toLowerCase()));
        setRechercheListe(values)
    }
    const NewTicket = () =>{
        // setLoadingP(true)
        // setTimeout(() => {
        //     setLoadingP(false);
        // }, 500);
        // setFactureD({client:'PASSAGER', Caisse : CaisseID , jour: Today.toISOString().split('T')[0], totale: 0 , articles:[]})
        // setArticleNow([])
        // setAutoFocus(true)
        // setKeyBoedI('')
        // setFloatOpen(false)
        // setPeseState(false)
        // setRechercheKey('')
        // setRechercheListe([])
        // setModalS(false)
        // setModaT(false)
        // setFID('')
        // setSaveBtnState(false)
        // setLS(false)
        // setKeyPaymment(0)
        // setSelectedBon(1)
        window.location.reload()
        
    }

    /*2- Paymment */
    const PaymmentBtnClicked = (value) =>{
        if (value === 'C') { 
            setKeyPaymment('') 
        } 
        else if (value === '.' ) { 
            setFloatOpen(true)
        } 
        else {             
            if (floatOpen) {
                setKeyPaymment(prevInput => prevInput + '.' + parseFloat(value))
                setFloatOpen(false)
            } else {
                setKeyPaymment(prevInput => prevInput + parseFloat(value))
            }
        }
    }
    const SavePaymmentCache = () =>{

        if (!gettedFID || gettedFID == '') {toast.error("Une Erreur s'est Produit !", GConf.TostErrorGonf)}
        else if (keyaPaymment == '') {toast.error("Solde Insufisante !", GConf.TostErrorGonf)}
        else if (JSON.parse(factureD.totale) > JSON.parse(keyaPaymment)) {toast.error("Solde Insufisante !", GConf.TostErrorGonf)}
        else {
            setLoadingP(true)
            axios.post(`${GConf.ApiRouterOneLink}/nv/payee/espece`, {
                forPID: CaisseID,
                espece: keyaPaymment,
                fid : gettedFID
            })
            .then(function (response) {
                if(response.status = 200) {
                    setPayBtnState(true)
                    toast.success("Facture Payeé !", GConf.TostSuucessGonf)
                    setLoadingP(false)
                    setToPrintFOD(gettedFID)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLoadingP(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Paymment à été enregistre localmment   </div></>, GConf.TostInternetGonf)   
                   Offline.factureToSave[gettedFID].Espece = keyaPaymment
                   Offline.factureToSave[gettedFID].State = 'Payee'
                   localStorage.setItem(`${OneGConf.routerTagName}_Offline`,  JSON.stringify(Offline));
                  setLoadingP(false)
                }
            });

        }
    }

    /*3- Bons */
    const BonsBtnClicked = (value) =>{
        if (value === 'C') { 
            setKeyBonsValue('') 
        } 
        else if (value === '.' ) { 
            setFloatOpen(true)
        } 
        else {             
            if (floatOpen) {
                setKeyBonsValue(prevInput => prevInput + '.' + parseFloat(value))
                setFloatOpen(false)
            } else {
                setKeyBonsValue(prevInput => prevInput + parseFloat(value))
            }
        }
    }
    const BonSlected= (value) =>{
        setSelectedBon(value)
    }
    const CalculateBons = (genre) => {
        if (genre == 'Plus') {
            return {qte : Math.trunc(factureD.totale / selectedBon) +1 , valeur : selectedBon}
        } else {
            return {qte : Math.trunc(factureD.totale / selectedBon) , valeur : selectedBon}
        }
    }
    const SavePaymmentBons = (genre) =>{

        if (!gettedFID || gettedFID == '') {toast.error("Une Erreur s'est Produit !", GConf.TostErrorGonf)}
        else if (selectedBon == '') {toast.error("Solde Insufisante !", GConf.TostErrorGonf)}
        // else if (JSON.parse(factureD.totale) > JSON.parse(keyaPaymment)) {toast.error("Solde Insufisante !", GConf.TostErrorGonf)}
        else {
            setLoadingP(true)
            axios.post(`${GConf.ApiRouterOneLink}/nv/payee/bons`, {
                forPID: CaisseID,
                bons: CalculateBons(genre),
                fid : gettedFID
            })
            .then(function (response) {
                if(response.status = 200) {
                    setPayBtnState(true)
                    toast.success("Facture Payeé !", GConf.TostSuucessGonf)
                    setLoadingP(false)
                    setToPrintFOD(gettedFID)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLoadingP(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Paymment à été enregistre localmment  </div></>, GConf.TostInternetGonf)   
                  Offline.factureToSave[gettedFID].Paye_Bons = JSON.stringify(CalculateBons(genre))
                  Offline.factureToSave[gettedFID].State = 'Payee'
                  localStorage.setItem(`${OneGConf.routerTagName}_Offline`,  JSON.stringify(Offline));
                  setLoadingP(false)
                }
            });

        }
    }

    /*4- Clients */
    const SaveClientCredit = (genre) =>{

        if (!gettedFID || gettedFID == '') {toast.error("Une Erreur s'est Produit !", GConf.TostErrorGonf)}
        else if (clientCredit == '') {toast.error("Solde Insufisante !", GConf.TostErrorGonf)}
        else {
            setLoadingP(true)
            axios.post(`${GConf.ApiRouterOneLink}/nv/client/credit`, {
                forPID: CaisseID,
                clientId: clientCredit.CL_ID,
                fid : gettedFID
            })
            .then(function (response) {
                if(response.status = 200) {
                    setPayBtnState(true)
                    toast.success("Crédit Enregistrer !", GConf.TostSuucessGonf)
                    setLoadingP(false)
                    setToPrintFOD(gettedFID)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLoadingP(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> La facture sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)   
                  Offline.factureToSave[gettedFID].Client = clientCredit.CL_ID
                  Offline.factureToSave[gettedFID].State = 'Credit'
                  localStorage.setItem(`${OneGConf.routerTagName}_Offline`,  JSON.stringify(Offline));
                  setLoadingP(false)
                }
            });

        }
    }
    const SaveClientFidelle = () =>{

        if (!gettedFID || gettedFID == '') {toast.error("Une Erreur s'est Produit !", GConf.TostErrorGonf)}
        else if (clientFidele == '') {toast.error("Solde Insufisante !", GConf.TostErrorGonf)}
        else {
            setLoadingP(true)
            axios.post(`${GConf.ApiRouterOneLink}/nv/client/fidelite`, {
                forPID: CaisseID,
                clientId: clientFidele.CL_ID,
                fid : gettedFID
            })
            .then(function (response) {
                if(response.status = 200) {
                    setFideliteState(true)
                    toast.success("Crédit Enregistrer !", GConf.TostSuucessGonf)
                    setLoadingP(false)

                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLoadingP(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> La facture sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)   
                  Offline.factureToSave[gettedFID].Client = clientCredit.CL_ID
                  Offline.factureToSave[gettedFID].State = 'Payee'
                  localStorage.setItem(`${OneGConf.routerTagName}_Offline`,  JSON.stringify(Offline));
                  setLoadingP(false)
                }
            });

        }
    }

    /* Autres */
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
    const ThisSelected = (ind) =>{
        articleL.at(ind).selected = true
        setArticleL([ ...articleL])
    }

    /*#########################[Component]##################################*/ 
    const ProgressLoadingBar = (props) =>{
        return(<>
            <div className={`progress-bar-loading ${props.display == true ? '': 'd-none'}`} style={{marginTop:'1px'}}>
                    <div className="progress-bar-loading-value bg-danger"></div>
                </div>
            </>)
    }
    // const BarreCodeReader = () =>{
    //     return(<>
    //     <BarcodeScannerComponent
    //         width={'100%'}
    //         height={250}
    //         stopStream = {stopStream}
    //         onUpdate={(err, result) => {
    //         if (result) 
    //             {setQRData(result.text); 
    //             setStopStram(true);
    //         } 
    //         //else {console.log("Not Found");}
    //         }}
    //     />
    //     </>)

    // }

    /*1- Ajouter Article */
    const AddArticles = ({}) =>{
        return (<>
                <div className='row mb-0'>
                        <div className='col-4'><Button disabled={saveBtnState} fluid style={{height:'50px'}} className='border-div bg-system-btn' onClick={() => SearchForCommande(keyBordI)}>  <Icon name='check' /> Rechercher </Button></div> 
                        <div className='col-8'><Button disabled={saveBtnState} fluid style={{height:'50px'}} className='rounded-pill bg-system-btn' onClick={() => SaveFacture()}>  <Icon name='save' /> Valideé Pour PASSAGER <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button></div>
                        <div className='col-3 d-none'><Button disabled={saveBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() => setModaT(true)}>  <Icon name='search' /> Trouver  </Button></div>
                </div>
                <div className='row mt-0'>
                    <div className='col-12 col-md-5'>
                        <div className='mb-2'>
                        {scanResultCommande ? 
                            (
                            <QrReader
                                    constraints={{  facingMode: 'environment' }}
                                    scanDelay={500}
                                    onResult={(result, error) => {
                                    if (!!result) {  SearchForCommande(result.text); setScanResultCommande(false) }
                                    if (!!error) { console.log(error);  }
                                    }}
                                    style={{  width: "150px",height: "150px" }}
                            />
                            ) : (
                                <div className='text-center mt-4'>
                                    <Button onClick={() => setScanResultCommande(true)}>Cliquer Pour Scanner</Button>
                                </div>
                            )}

                            
                            
                            {/* <Input type='number' inputRef={inputRef}  size='massive'  icon='barcode'   onKeyPress={(e) => EnterKyPressed(e)}  autoFocus={true}   iconPosition='left' placeholder=' '  fluid className='mb-1' /> */}
                            {/* <input type='text' className='form-control form-control-lg'  ref={inputRef} onKeyPress={(e) => EnterKyPressed(e)} autoFocus={true} /> */}
                            <br />
                            
                            
                        </div>
                    </div>
                    <div className='col-12 col-md-7 align-self-center'> 
                        <h2><span className='bi bi-keyboard'></span>  : {keyBordI}</h2>
                        <ClavierCard /> 
                    </div>
                </div> 
                
        </>)
    }
    const ArticleListCard = (props) =>{
        return(<>
                    <div className={`card shadow-sm p-2 mb-1 me-1 rounded-pill  ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-4 text-white' : 'bg-ligth-theme-4' } `} >
                        <div className='row p-0'>
                            <div className='col-1 align-self-center text-start'><Button disabled={saveBtnState} onClick={() => DeleteFromUpdateList(props.dataA.P_Code)} icon="times" className='rounded-circle p-2 text-white bg-danger'></Button></div>
                            <div className='col-9 text-start align-self-center ps-4'>
                                <div>{props.dataA.Name}</div>
                                <b className='text-blod'>{props.dataA.Qte}</b> x {props.dataA.Prix.toFixed(3)} = <span className='text-warning'>{parseFloat(props.dataA.PU).toFixed(3)}</span>
                            </div>
                            <div className='col-2 align-self-center m-0'><Button disabled={saveBtnState} onClick={() => AddMoreQte(props.dataA.P_Code,keyBordI)} icon="plus cart" className='rounded-circle p-2 text-white bg-info'></Button></div>
                        </div>
                    </div>
                </>)
    }
    const TotaleCard = () =>{
        return(<>
                <div className={`card card-body shadow-sm mb-2 sticky-top border-div ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-3 text-white' : 'bg-ligth-theme-3' } `} style={{top:'70px'}}>
                    <div className='row'>
                        <div className='col-9 align-self-center text-start'><h1>Totale : {factureD.totale}</h1></div>
                        <div className='col-3 align-self-center text-center'><h5 className='mb-0'>{factureD.articles.length}</h5> articles</div>
                    </div>
                    
                   
                </div>
            </>)
    }
    const ClavierCard = () =>{
        const BtnCard = (props) =>{
            return(<>
                <Button className={`shadow-sm ${props.bg == true ? 'bg-danger text-white ' : OneGConf.themeMode == 'dark' ? 'bg-dark-theme-3 text-white border-dark' : 'bg-white' } border mb-1 border-div `} style={{width:'100%', height:'60px', backgroundColor:'red'}} onClick={(e) => BtnClicked(props.value) } ><h2>{props.value}</h2></Button>
            </>)
        }
        return(<>
            <div className='row '>
                <div className='col-4 p-2'><BtnCard value='1' /></div>
                <div className='col-4 p-2'><BtnCard value='2' /></div>
                <div className='col-4 p-2'><BtnCard value='3' /></div>
                <div className='col-4 p-2'><BtnCard value='4' /></div>
                <div className='col-4 p-2'><BtnCard value='5' /></div>
                <div className='col-4 p-2'><BtnCard value='6' /></div>
                <div className='col-4 p-2'><BtnCard value='7' /></div>
                <div className='col-4 p-2'><BtnCard value='8' /></div>
                <div className='col-4 p-2'><BtnCard value='9' /></div>
                <div className='col-4 p-2'><BtnCard value='0' /></div>
                <div className='col-4 p-2'><BtnCard value='.' bg={floatOpen} /></div>
                <div className='col-4 p-2'><BtnCard value='C' /></div>
            </div>
        </>)
    }
    const PlatsListe = () =>{
        const GenreListeCard = (props) =>{
            return(<>
                <div className={`card card-body mb-1  text-danger text-center btn ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-3 text-white' : 'bg-ligth-theme-3' }`} onClick={() => SetSelectedListeFunc(props.text)}> <h3> {props.text} </h3></div>
            </>)
        }
        const ArticleItemCard = (props) =>{
            return(<>
                <div className='col-6 col-lg-3 mb-1'>
                    <div className={`card p-3 text-secondary h-100 btn ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-4 text-white' : ' ' }`} onClick={() => GetArticleDataByAID(props.data.P_Code)}>
                        <div className='row'>
                            <div className='col-12 text-end'><b>{props.data.Prix_vente.toFixed(3)}</b></div>
                            <div className='col-12'><b><img src={`https://cdn.abyedh.tn/images/system/Resto/${props.data.Photo_Path}`} width='60px' height='60px' /></b></div>
                            <div className='col-12'><h6>{props.data.Name}</h6></div>
                        </div>
                        
                    </div>
                </div>
            </>)
        }
        return(<>
            <div className='row'>
                    <div className='col-4'><Button disabled={saveBtnState && !payBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={()=> NewTicket()}>  <Icon name='redo' /> N. Ticket</Button></div> 
                    <div className='col-2'><Button  fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() =>PrintFunction('openCaisse')}>  <Icon name='lock open' /> </Button></div> 
                    <div className='col-5'><Button disabled={saveBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn' onClick={() => SaveFacture()}>  <Icon name='save' /> Valideé Pour PASSAGER <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button></div>
                    <div className='col-1'><Button icon className={` ${showKeyBoerd  ? 'bg-warning text-danger' : OneGConf.themeMode == 'dark' ? 'bg-dark-theme-3 text-white' : 'bg-ligth-theme-3' } }`} onClick={() => sethowKeyBord(!showKeyBoerd)}> <Icon name='keyboard' /> </Button></div>
                    <div className='col-3 d-none'><Button disabled={saveBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() => setModaT(true)}>  <Icon name='search' /> Trouver  </Button></div>
            </div>
            <div className='row'>
                <div className='col-12 col-lg-3 spesific-commp-2' style={{height: '58vh', overflow: 'scroll', overflowX:'hidden'}}>
                    {
                        genreListe.map((data,index) => <GenreListeCard key={index} text={data} /> )
                    }

                </div>
                <div className='col-12 col-lg-9'>
                    <div className='row'>
                        {
                            showKeyBoerd ? 
                            <>
                                <h2><span className='bi bi-keyboard'></span>  : {keyBordI}</h2>
                                <ClavierCard />
                            </>
                            :
                            <>{selectedArticleList.map((data,index) => <ArticleItemCard key={index} data={data} />)}</> 
                             
                        }
                    </div>
                    
                </div>
            </div>
        </>)
    }

    /*2- Paymment */
    const ClavierPaymmentCard = () =>{
        const BtnCard = (props) =>{
            return(<>
                <Button className={`shadow-sm ${props.bg == true ? 'bg-danger text-white ' : OneGConf.themeMode == 'dark' ? 'bg-dark-theme-3 text-white border-dark' : 'bg-white' } border mb-1 border-div `} style={{width:'100%', height:'60px'}} onClick={(e) => PaymmentBtnClicked(props.value) } ><h2>{props.value}</h2></Button>
            </>)
        }
        return(<>
            <div className='row '>
                <div className='col-4 p-2'><BtnCard value='1' /></div>
                <div className='col-4 p-2'><BtnCard value='2' /></div>
                <div className='col-4 p-2'><BtnCard value='3' /></div>
                <div className='col-4 p-2'><BtnCard value='4' /></div>
                <div className='col-4 p-2'><BtnCard value='5' /></div>
                <div className='col-4 p-2'><BtnCard value='6' /></div>
                <div className='col-4 p-2'><BtnCard value='7' /></div>
                <div className='col-4 p-2'><BtnCard value='8' /></div>
                <div className='col-4 p-2'><BtnCard value='9' /></div>
                <div className='col-4 p-2'><BtnCard value='0' /></div>
                <div className='col-4 p-2'><BtnCard value='.'  bg={floatOpen} /></div>
                <div className='col-4 p-2'><BtnCard value='00' /></div>
                <div className='col-4 p-2'><BtnCard value='10' /></div>
                <div className='col-4 p-2'><BtnCard value='20' /></div>
                <div className='col-4 p-2'><BtnCard value='50' /></div>
            </div>
        </>)
    }
    const PaymmentCard = ({}) =>{
        return (<>
                <div className='row'>
                    <div className='col-12 col-md-7 align-self-center'>
                        <ClavierPaymmentCard /> 
                    </div>
                    <div className='col-12 col-md-5'>
                        <div className='mb-2'>
                        <Button disabled={saveBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() => setModaPS(true)}>  <Icon name='search' /> Sahcet & Carte de Recharge </Button>
  
                            <h3 className='mb-2'>Totale : {factureD.totale}</h3> 
                            <h3 className='mb-2 mt-1'>Reste : {(keyaPaymment - factureD.totale).toFixed(3)}</h3> 
                                <div className='row'>
                                    <div className='col-9'><Input type='number' size='huge'  icon='money' value={keyaPaymment} onKeyPress={(e) => EnterKyPressed(e)} autoFocus={true} onChange={ (e) => {setKeyPaymment(Number(e.target.value)) }}   iconPosition='left' placeholder=' '  fluid className='mb-1' /></div>
                                    <div className='col-3 ms-0 me-0'> <Button disabled={false} fluid className='border-div   text-white' style={{height:'50px', backgroundColor : OneGConf.themeMode == 'dark' ? '#96999e': '#343536'}} onClick={() => setKeyPaymment('')}> <h2>C</h2> </Button> </div>
                                    
                                </div>
                                
                            <br />
                            <div className='row'>
                                <div className='col-12'>
                                    <Button disabled={payBtnState || !saveBtnState} fluid style={{height:'50px'}} className='border-div bg-system-btn' onClick={() => SavePaymmentCache()}>  <Icon name='check' /> Payeé</Button>
                                </div>
                            </div>
                            <h5>Imprimer</h5> 
                            <div className='row'>
                                <div className='col-9'><Button disabled={!saveBtnState || !payBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() =>PrintFunction('printFacture')}>  <Icon name='print' /> Imprimer </Button></div>
                                <div className='col-3 text-center'><Button  fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() =>PrintFunction('openCaisse')}>  <Icon name='lock open' /> </Button></div> 
                            </div>
                            
                        </div>
                    </div>
                </div> 
                
        </>)
    }

    /*3- Bons */
    const ClavierBonsCard = () =>{
        const BtnCard = (props) =>{
            return(<>
                <Button className={`shadow-sm ${props.bg == true ? 'bg-danger text-white ' : OneGConf.themeMode == 'dark' ? 'bg-dark-theme-3 text-white border-dark' : 'bg-white' } border mb-1 border-div `} style={{width:'100%', height:'60px'}} onClick={(e) => BonsBtnClicked(props.value) } ><h2>{props.value}</h2></Button>
            </>)
        }
        return(<>
            <div className='row'>
                <div className='col'><Button fluid className={`shadow-sm  border mb-1 border-div ${selectedPoucentage == 5 ? 'bg-warning border-0 text-danger' : ''}`} style={{  height:'60px'}} onClick={(e) => BonSlected(0) } ><h5><span className='bi bi-gift-fill'></span></h5></Button></div>
                {/* <div className='col'><Button fluid className={`shadow-sm  border mb-1 border-div ${selectedPoucentage == 5 ? 'bg-warning border-0 text-danger' : ''}`} style={{  height:'60px'}} onClick={(e) => BonSlected(5) } ><h5>5%</h5></Button></div> */}
                <div className='col'><Button fluid className={`shadow-sm  border mb-1 border-div ${selectedPoucentage == 8 ? 'bg-warning border-0 text-danger' : ''} `} style={{  height:'60px'}} onClick={(e) => BonSlected(8) } ><h5>8%</h5></Button></div>
                <div className='col'><Button fluid className={`shadow-sm  border mb-1 border-div ${selectedPoucentage == 10 ? 'bg-warning border-0 text-danger' : ''} `} style={{  height:'60px'}} onClick={(e) => BonSlected(10) } ><h5>10%</h5></Button></div>
                <div className='col'><Button fluid className={`shadow-sm  border mb-1 border-div ${selectedPoucentage == 12 ? 'bg-warning border-0 text-danger' : ''} `} style={{  height:'60px'}} onClick={(e) => BonSlected(12) } ><h5>12%</h5></Button></div>
                <div className='col'><Button fluid className={`shadow-sm  border mb-1 border-div ${selectedPoucentage == 15 ? 'bg-warning border-0 text-danger' : ''} `} style={{  height:'60px'}} onClick={(e) => BonSlected(15) } ><h5>15%</h5></Button></div>
            </div>
            <div className='row '>
                <div className='col-4 p-2'><BtnCard value='1' /></div>
                <div className='col-4 p-2'><BtnCard value='2' /></div>
                <div className='col-4 p-2'><BtnCard value='3' /></div>
                <div className='col-4 p-2'><BtnCard value='4' /></div>
                <div className='col-4 p-2'><BtnCard value='5' /></div>
                <div className='col-4 p-2'><BtnCard value='6' /></div>
                <div className='col-4 p-2'><BtnCard value='7' /></div>
                <div className='col-4 p-2'><BtnCard value='8' /></div>
                <div className='col-4 p-2'><BtnCard value='9' /></div>
                <div className='col-4 p-2'><BtnCard value='0' /></div>
                <div className='col-4 p-2'><BtnCard value='.'  bg={floatOpen} /></div>
                <div className='col-4 p-2'><BtnCard value='00' /></div>
                <div className='col-4 p-2'><BtnCard value='10' /></div>
                <div className='col-4 p-2'><BtnCard value='20' /></div>
                <div className='col-4 p-2'><BtnCard value='50' /></div>
            </div>
        </>)
    }
    const ListeDesBonsCard = () =>{
        const BtnCard = (props) =>{
            return(<>
                <Button className={`shadow-sm   border mb-1 border-div ${selectedBon == props.value ? 'bg-danger text-white border-0' : OneGConf.themeMode == 'dark' ? 'bg-dark-theme-3 text-white border-dark' : 'bg-ligth-theme-3' }`} style={{width:'100%', height:'60px'}} onClick={(e) => BonSlected(props.value) } ><h2 className='mb-0'>{props.text}</h2> <small className='mt-0'>{props.value.toFixed(3)}</small></Button>
            </>)
        }
        return(<>
            <div className='row  spesific-commp-2' style={{height: '70vh', overflow: 'scroll', overflowX:'hidden'}}>
                {OneGConf.listeDesBons.map((data,index) => <div key={index} className='col-4 p-2'><BtnCard value={data.value * (1 - data.pourcentage)} text={data.text} /></div>)}
            </div>
            </>)
    }
    const CalculerBons = () =>{
        return(<>
        
                <div className='row'>
                    <div className='col-12 col-md-7 align-self-center'>
                        <ClavierBonsCard /> 
                    </div>
                    <div className='col-12 col-md-5'>
                        <div className='row mb-3'>
                            <div className='col-9 align-self-center'><h2><span className='bi bi-keyboard'></span>  : {keyBonsValue == '' ? '0' : parseFloat(keyBonsValue).toFixed(3)} <span className='bi bi-arrow-left-right'></span> {selectedBon == 1 ? '0' : selectedBon.toFixed(3)} </h2>  </div>
                            <div className='col-3 ms-0 me-0'> <Button disabled={false} fluid className='border-div   text-white' style={{height:'50px', backgroundColor : OneGConf.themeMode == 'dark' ? '#96999e': '#343536'}} onClick={() => {setKeyBonsValue(''); setSelectedBon(1) ; setSelectedPourcentage(0)}}> <h2>C</h2> </Button> </div>   
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                    <div className='mb-2'>
                                        <h5 className='text-success'>Avec Reste</h5> 
                                        <h3 className='mb-2'>Nombre : {Math.trunc(factureD.totale / selectedBon) +1 }</h3> 
                                        <h3 className='mb-2 mt-1'>Tot: {((Math.trunc(factureD.totale / selectedBon) +1) * selectedBon).toFixed(3)}</h3> 
                                        <h3 className='mb-2 mt-1'>R : {(((Math.trunc(factureD.totale / selectedBon) +1) * selectedBon).toFixed(3) - factureD.totale).toFixed(3)}</h3> 
                                        <br />
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Button disabled={payBtnState ||!saveBtnState} fluid style={{height:'50px'}} className='border-div bg-success text-white' onClick={() => SavePaymmentBons('Plus')}>  <Icon name='check' /> Payeé</Button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className='col-6'>
                                    <div className='mb-2'>
                                        <h5 className='text-danger'>Sans Reste</h5> 
                                        <h3 className='mb-2'>Nombre : {Math.trunc(factureD.totale / selectedBon)}</h3> 
                                        <h3 className='mb-2 mt-1'>Tot: {((Math.trunc(factureD.totale / selectedBon)) * selectedBon).toFixed(3)}</h3> 
                                        <h3 className='mb-2 mt-1'>T : {(((Math.trunc(factureD.totale / selectedBon)) * selectedBon).toFixed(3) - factureD.totale).toFixed(3)}</h3> 
                                        <br />
                                        <div className='row'>
                                            <div className='col-12'>
                                                <Button disabled={payBtnState ||!saveBtnState} fluid style={{height:'50px'}} className='border-div bg-danger text-white' onClick={() => SavePaymmentBons('Moins')}>  <Icon name='check' /> Payeé</Button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className='col-12'>
                                    <h5>Imprimer</h5> 
                                    <div className='row'>
                                        <div className='col-9'><Button disabled={!saveBtnState || !payBtnState} fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() =>PrintFunction('printFacture')}>  <Icon name='print' /> Imprimer </Button></div>
                                        <div className='col-3 text-center'><Button  fluid style={{height:'40px'}} className='rounded-pill bg-system-btn mb-3' onClick={() =>PrintFunction('openCaisse')}>  <Icon name='lock open' /> </Button></div> 
                                    </div>
                            </div>
                        </div>  
                    </div> 
                </div> 
        </>)
    }

    /*4- Clients */
    const SelectClientCard = () =>{
        const ClientCardList = (props) =>{
            return(<>
                <div className='card p-3 mb-2 shadow-sm rounded' onClick={() => setClientFidelle(props.data)}>
                    <div className='row'>
                            <div className='col-4'>{props.data.CL_ID}</div> 
                            <div className='col-6'>{props.data.CL_Name}</div> 
                            <div className='col-2 align-self-center'><Button icon className='p-2 btn-system-bg' ><Icon name='check' /></Button></div> 
                    </div>
                </div>
            </>)
        }
        return(<>
            <div className='row'>
                <div className='col-3'>
                    <Modal
                        size='small'
                        closeIcon
                        dimmer='blurring'
                        trigger={<Button className=" bg-white border" size='large' fluid> <Icon name='list alternate outline' />  </Button>}
                        >
                        <Modal.Content scrolling className='d-block spesific-commp' style={{height: '100vh',}}>
                            <div className='p-2 text-start'>
                                {clientList.map((data, index) => <ClientCardList key={index} data={data} /> )}
                            </div>
                        </Modal.Content>
                    </Modal>
                </div>  
                <div className='col-9'><SelectClientFideliteCard clientFidele={clientFidele} setClientFidelle={setClientFidelle} clientList={clientList}/></div>  
                {/* <div className='col-9'><SelectClientCreditCard clientCredit={clientCredit} setClientCredit={setClientCredit} clientList={clientList}/></div>   */}
            </div>
            
        </>)
    }
    const CreditClient = () =>{
        return (<>
                <div className='row mb-2'>
                        
                        <div className='col-12 col-lg-6 mb-3 d-none'>
                            <h3>Credit</h3> 
                            <SelectClientCard />
                            <div className='mt-4'>
                                <h5>Client Info : </h5>
                                <div>Nom :  {clientCredit ? clientCredit.CL_Name : '' } </div>
                                <div>Phone :  {clientCredit ? clientCredit.Phone : '' } </div>
                                <div>ID :  {clientCredit ? clientCredit.CL_ID : '' } </div>
                            </div>
                            <h5>Enregistrer</h5>
                            <Button disabled={payBtnState ||!saveBtnState || !clientCredit} className='rounded-pill bg-system-btn mb-3' fluid style={{height:'50px',}} onClick={() => SaveClientCredit()}><Icon name='save' /> Enregistrer Credit<Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                            {/* <Button disabled={!payBtnState ||!saveBtnState} className='rounded-pill btn-imprimer' onClick={(e) => PrintFunction('printFacture')} fluid><Icon name='print' /> Imprimer</Button> */}
                        </div>

                        <div className='col-12 col-lg-6'>
                            {scanResult ?
                            (
                            <QrReader
                                    constraints={{ facingMode: 'environment' }}
                                    scanDelay={500}
                                    onResult={(result, error) => {
                                    if (!!result) {  setClientFidelle(clientList.find(obj => obj.CL_ID == result.text)) ; setScanResult(false) }
                                    if (!!error) { console.log(error); }
                                    }}
                                    style={{  width: "150px",height: "150px" }}
                            />
                            ) : (
                                <div className='text-center mt-4'>
                                    <Button onClick={() => setScanResult(true)}>Cliquer Pour Scanner</Button>
                                </div>
                            )}
                        </div> 

                        <div className='col-12 col-lg-6'>
                            <h3>Fidelité</h3> 
                            <SelectClientCard />
                            {/* <SelectClientFideliteCard clientFidele={clientFidele} setClientFidelle={setClientFidelle} clientList={clientList}/> */}
                            <div className='mt-4'>
                                <h5>Client Info : </h5>
                                <div>Nom :  {clientFidele ? clientFidele.CL_Name : '' } </div>
                                <div>Phone :  {clientFidele ? clientFidele.Phone : '' } </div>
                                <div>ID :  {clientFidele ? clientFidele.CL_ID : '' } </div>
                            </div>
                            <h5>Enregistrer</h5>
                            <Button disabled={!payBtnState ||!saveBtnState || !clientFidele || fideliteState} className='rounded-pill bg-system-btn mb-3' fluid style={{height:'50px',}} onClick={() => SaveClientFidelle()}><Icon name='save' /> Enregistrer Fidelité<Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                            {/* <Button  className='rounded-pill btn-imprimer' onClick={() => setClientFidelle()} fluid><Icon name='print' /> Nouveaux </Button> */}
                        </div>

                    </div>
        </>)
    }
    
    const CommandeListCard = () =>{
        return(<>
            <div className="card-body">
                <div className="table-responsive">
                    <table className= {`table ${OneGConf.themeMode == 'dark' ? '  text-white' : 'bg-ligth-theme-1' } `}   >
                        <thead>
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Designiation</th>
                            <th scope="col">Qté</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {loading ?  
                            <>
                            {articleL.map( (artData, index) => 
                                <tr key={index} className={artData.selected ? 'text-decoration-line-through' : '' } >
                                    <th scope="row">{index + 1}</th>
                                    <td>{artData.Name}</td>
                                    <td>{artData.Qte}</td>
                                    <td><Button size='mini' disabled={artData.selected} className='p-1' onClick={() => ThisSelected(index)} icon='check'/> </td>     
                                </tr>
                            )}
                            </>
                            : SKLT.FactureList }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>)
    }
    
    return (  <>
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : 'bg-ligth-theme-2' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard  data={OneGConf.backCard.nv}/>
            <ProgressLoadingBar  display={loadingPage} />
            <br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-md-4'>
                        <Tab menu={{  secondary: true, pointing: true  , className: OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' }} panes={panesRigth} />
                        
                    </div>
                    <div className='col-12 col-md-8'>
                        <Tab menu={{ widths: panes.length , pointing: true  ,  className: OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-white' : 'bg-ligth-theme-1' }} panes={panes} />
                    </div>
                </div>
            </div>
        </div>
        <SearchModalCard modalS={modalS} setModalS={setModalS} rechercheList={rechercheList} saveBtnState={saveBtnState} rechercheKey={rechercheKey} setRechercheKey={setRechercheKey} RechercheFunction={RechercheFunction} GetArticleDataByAID={GetArticleDataByAID} />
        <SelectModalCard modalT={modalT} setModaT={setModaT} fastArticleList={fastArticleList} saveBtnState={saveBtnState} rechercheKey={rechercheKey} setRechercheKey={setRechercheKey} RechercheFunction={RechercheFunction} GetArticleDataByAID={GetArticleDataByAID} />
        <Modal
                size='small'
                open={modalPS}
                closeIcon
                dimmer = 'blurring'
                onClose={() => setModaPS(false)}
                onOpen={() => setModaPS(true)}
            >
                <Modal.Content scrolling>
                    <h5>Totale avec Sahcet & Carte de recharge </h5>
                    <div className='row'>
                        <div className='col-7'>

                        </div>
                        <div className='col-5'>

                        </div>
                    </div> 
                </Modal.Content>
                <Modal.Actions>
                            <Button className='rounded-pill' negative onClick={ () => setModaPS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                </Modal.Actions>
        </Modal>
        <FrameForPrint frameId='printFacture' src={`/Pr/caisse/facture/${toPrintFID}`} />
        <FrameForPrint frameId='openCaisse' src={`/Pr/caisse/open`} />
        
    </>);
}


export default ReglemmentClient