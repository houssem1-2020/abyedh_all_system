import React, {useEffect,useState}  from 'react';
import axios from 'axios';
import GConf from '../../../AssetsM/generalConf';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import { toast } from 'react-toastify';
import { Segment , Icon, Input, Button, Loader, Dropdown, Dimmer} from 'semantic-ui-react';
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useSaveNotification from '../../../AssetsM/Hooks/saveNotifFunction';
import FrameForPrint from '../../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../../AssetsM/Hooks/printFunction';
import { useTranslation, Trans } from 'react-i18next';

function UpdatePage() {
    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
    const [isDisabled , setIsDisabled] = useState(false)
    let [commandeList, setSouscription] = useState([]); 
    let [stockList, setSeances] = useState([]); 
    let [familleList, setOffres] = useState([]); 
    let [facturesList, setAbonnemment] = useState([]); 
    let [camionList, setEquipemment] = useState([]); 
    let [clientList, setMemebres] = useState([]); 
    const [FID, setFID] = useState(0)
    const [loadingPage, setLoadingP] = useState(true)
    let [Offline, setOffline] = useState(JSON.parse(localStorage.getItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`))); 
    const [loaderState, setLS] = useState(false)
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    const Genres = [
        { allT: commandeList, whT: [] },
        { allT: stockList, whT: [] },
        { allT: facturesList, whT: []},
        { allT: camionList, whT: [] },
        { allT: clientList, whT: [] },
        { allT: familleList, whT: [] },
    ]
    /*#########################[UseEffect]##################################*/
    // useEffect(() => {
    //     axios.post(`${GConf.ApiLink}/update`, {
    //         PID: GConf.PID,
    //     }).then(function (response) {
    //         setSouscription(response.data[0].commande)
    //         setSeances(response.data[0].stock)
    //         setOffres(response.data[0].stockFamille)
    //         setAbonnemment(response.data[0].facture)
    //         setEquipemment(response.data[0].camion)
    //         setMemebres(response.data[0].client)
    //         setLoadingP(false)
    //         console.log(caches)
    //     }).catch((error) => {
    //         if(error.request) {
    //           toast.error(<><div><h5>Probleme de Connextion</h5> Vous ne pouver pas mettre à jour vos donneé maintenant</div></>, GConf.TostInternetGonf) 
    //           setSeances([])
    //           setAbonnemment([])
    //           setIsDisabled(true)
    //           setLoadingP(false)
    //         }
    //     });
    //   }, [])
    
    /*#########################[Functions]#############################*/
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
    const UpdateItem = (allTable, whTableTag) =>{
            Offline[whTableTag] = allTable
            localStorage.setItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`, JSON.stringify(Offline));
            setOffline(JSON.parse(localStorage.getItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`)))
    }
    const UpdateAllItem = () =>{
        for (let index = 0; index < Genres.length; index++) {
            const allT = Genres[index].allT;
            const whtTag = Genres[index].whtTag;
            UpdateItem(allT,whtTag)
            console.log(allT,whtTag)
        }
}
    const GetPourcentageValue = (allTable, whTable) => {
            let all = allTable.length
            let weHave = whTable.length
            let value = (((all - (all - weHave)) / all ) * 100 )
            return isFinite(value) ? parseInt(value) : 0.0;
    }
    const DeleteFromOffline = (targetTable, targetElm) =>{
        console.log(Offline[targetTable][targetElm])
        Offline[targetTable].splice(targetElm,1)
        localStorage.setItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`,  JSON.stringify(Offline));
    }
    const SaveFactureFunc = (targetIndex) => {
        setLS(true)
        let factureSelected = Offline.factureToSave[targetIndex]
        console.log(factureSelected)
        axios.post(`${GConf.ApiLink}/operations/ajouter`, {
            PID: GConf.PID,
            factD: factureSelected,
        })
        .then(function (response) {
            if(response.status = 200) {
                toast.success("Facture Enregistreé !", GConf.TostSuucessGonf)
                setLS(false)
                SaveNotification('factureAjouter',GConf.PID, factureSelected)
                Offline.factureToSave.splice(targetIndex,1)
                localStorage.setItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`,  JSON.stringify(Offline));
            }
            else{
                toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)  
              setLS(false) 
            }
          });
        
    }
    const PrintFactureFunc = (targetIndex) =>{
        setFID(targetIndex)
        PrintFunction('printFacture')
    }
    const SaveArticleFunc = (targetIndex) => {
        setLS(true)
        let ArticleSelected = Offline.articleToSave[targetIndex]
        axios.post(`${GConf.ApiLink}/forfait/ajouter`, {
            Tag : GConf.PID,
            articleD : ArticleSelected,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Article Enregistreé !", GConf.TostSuucessGonf)
                setLS(false)
                SaveNotification('stockSaveArticle',GConf.PID, ArticleSelected)
                Offline.articleToSave.splice(targetIndex,1)
                localStorage.setItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`,  JSON.stringify(Offline));
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)  
              setLS(false) 
            }
          });
        
    }
    const SaveClientFunc = (targetIndex) => {
        setLS(true)
        let clientSelected = Offline.clientToSave[targetIndex]
        axios.post(`${GConf.ApiLink}/clients/ajouter`, {
            tag : GConf.PID,
            clientD : clientSelected,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Client Ajouter !", GConf.TostSuucessGonf)
                SaveNotification('clientAjouter',GConf.PID, clientSelected)
                setLS(false)
                Offline.clientToSave.splice(targetIndex,1)
                localStorage.setItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`,  JSON.stringify(Offline));
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
                }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)  
              setLS(false) 
            }
          });
        
    }
    const SaveCamionFunc = (targetIndex) => {
        setLS(true)
        let CamionSelected = Offline.camionToSave[targetIndex]
        axios.post(`${GConf.ApiLink}/camions/ajouter`, {
            tag : GConf.PID,
            camionD : CamionSelected,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Camion Ajouteé !", GConf.TostSuucessGonf)
                setLS(false)
                SaveNotification('camionAjouter',GConf.PID, CamionSelected)
                Offline.camionToSave.splice(targetIndex,1)
                localStorage.setItem(`${localStorage.getItem('PID')}_${GConf.systemTag}_Offline`,  JSON.stringify(Offline));
            }
            else {
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5>   </div></>, GConf.TostInternetGonf)  
              setLS(false) 
            }
          });
        
    }

    /*#########################[Card]##################################*/
    const OfflineItem = (props) =>{
        return(<>
        <div className='col-12 col-lg'>
            <div className='card card-body shadow-sm mb-2 border-div'>
                
                <div className='align-self-center mb-0'>
                    <div style={{ width: 100, height: 100 , textAlign:'center'}}>
                        <CircularProgressbar className='text-center' strokeWidth={2}  value={GetPourcentageValue(props.genre.allT,props.genre.whT)} maxValue={100} minValue={0} text={`${GetPourcentageValue(props.genre.allT,props.genre.whT)}%`} />
                    </div> 
                    <div className='text-center mt-2 text-danger'>
                        <b>  {t(`communUsed.sysncroPage.itemsList.${props.data.id}`)} </b>
                    </div>
                </div>
            </div> 
        </div>
        </>)
    }
    const PasDeResult = (props) =>{
        return(<>
            <div className='card-body'>
                <div className='row'>
                <div className='col-12 text-center align-self-center'> <img src='https://assets.ansl.tn/Images/usful/empty-logo.svg' width='50%'  height='100px' /></div>
                    <div className='col-12 text-center align-self-center text-secondary'><b>Il y'a Pas de {props.genre} a enregistreé </b></div>
                </div>
                
            </div>
        </>)
    }
    const ArticleTosave = (props) =>{
        return(<>
            <div className='card p-2 mb-3 shadow-sm border-div'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-6 col-lg-2 align-self-center'>Code à barre :  {props.data.A_Code}</div>
                            <div className='col-6 col-lg-3 align-self-center'>Nom :  {props.data.Name}</div>
                            <div className='col-6 col-lg-2 align-self-center'>Famille:  {props.data.Genre} </div>
                            <div className='col-6 col-lg-2 align-self-center'>N articles :  {props.data.PrixV} <small>articles</small> </div>
                            <div className='col-6 col-lg-2 text-end'> <Button size='tiny'    className=' rounded-pill bg-system-btn' icon onClick={(e) => SaveArticleFunc(props.offIndex)}>  <Icon name='save' /> Enregistré </Button> </div>
                            <div className='col-6 col-lg-1 text-end'> <Button size='tiny'    className=' rounded-pill bg-danger text-white' icon onClick={(e) => DeleteFromOffline('articleToSave', props.offIndex)}>  <Icon name='save' /></Button> </div>
                        </div> 
                    </div>
                </div>  
            </div>
        </>)
    }
    const FactureTosaveCard = (props) =>{
        return(<>
            <div className='col-12 col-lg-6'>
                <div className='card p-3 mb-3 shadow-sm border-div'>
                    <div className='row'>
                        <div className='col-6 col-lg-6 align-self-center'> <b className='text-primary'>client :  {props.data.client}</b></div>
                        <div className='col-6 col-lg-6 align-self-center'><b className='text-secondary'> Totale:  {props.data.totale} </b></div>
                        <div className='col-6 col-lg-6 align-self-center'><b className='text-secondary'> Camion :  {props.data.Fournisseurs}  </b></div>
                        <div className='col-6 col-lg-6 align-self-center'><b className='text-secondary'> Chauffeur :  {props.data.Chauffeur}  </b></div>
                        <div className='col-6 col-lg-6 align-self-center'><b className='text-secondary'> N articles :  {props.data.articles.length} </b> <small>articles</small> </div>
                        <div className='col-6 col-lg-6 align-self-center'><b className='text-secondary'> Date : {props.data.jour} </b></div>
                        <div className='col-12 col-lg-12 text-end'>
                           <div className='row mt-3'>
                                <div className='col-6 text-center'>
                                    <Button size='tiny'  className=' rounded-pill btn-imprimer text-white' icon onClick={(e) => PrintFactureFunc(props.offIndex)}>  <Icon name='print' /></Button> 
                                    <Button size='tiny'  className=' rounded-pill btn-imprimer text-white' icon onClick={(e) => PrintFactureFunc(props.offIndex)}>  BL</Button> 
                                    <Button size='tiny'  className=' rounded-pill btn-imprimer text-white' icon onClick={(e) => PrintFactureFunc(props.offIndex)}>  BS</Button> 
                                </div>
                                <div className='col-6 text-end'>
                                    <Button size='tiny'  className=' rounded-pill bg-system-btn' icon onClick={ (e) => SaveFactureFunc(props.offIndex)}>  <Icon name='save' /> </Button>
                                    <Button size='tiny'  className=' rounded-pill bg-danger text-white' icon onClick={(e) => DeleteFromOffline('factureToSave', props.offIndex)}>  <Icon name='trash alternate outline' /></Button> 
                                </div>
                           </div>

                                    
                        </div>
                    </div>  
                </div>
            </div> 
        </>)
    }
    const CamionTosave = (props) =>{
        return(<>
            <div className='card p-2 mb-3 shadow-sm border-div'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-6 col-lg-3 align-self-center'>client :  {props.data.Matricule}</div>
                            <div className='col-6 col-lg-2 align-self-center'>Totale:  {props.data.Cam_Name} </div>
                            <div className='col-6 col-lg-2 align-self-center'>N articles :  {props.data.Chauffeur} <small>articles</small> </div>
                            <div className='col-6 col-lg-2 align-self-center'> </div>
                            <div className='col-6 col-lg-2 text-end'> <Button size='tiny'    className=' rounded-pill bg-system-btn' icon onClick={(e) => SaveCamionFunc(props.offIndex)}>  <Icon name='save' /> Enregistré </Button> </div>
                            <div className='col-6 col-lg-1 text-end'> <Button size='tiny'    className=' rounded-pill bg-danger text-white' icon onClick={(e) => DeleteFromOffline('camionToSave', props.offIndex)}>  <Icon name='save' /></Button> </div>
                        </div> 
                    </div>
                </div>  
            </div>
        </>)
    }
    const ClientTosave = (props) =>{
        return(<>
            <div className='card p-2 mb-3 shadow-sm border-div'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-6 col-lg-2 align-self-center'>Matricule :  {props.data.Code_Fiscale}</div>
                            <div className='col-6 col-lg-3 align-self-center'>Nom:  {props.data.Name} </div>
                            <div className='col-6 col-lg-2 align-self-center'>Tel :  {props.data.Phone} </div>
                            <div className='col-6 col-lg-2 align-self-center'>Adresse ; {props.data.Adress} </div>
                            <div className='col-6 col-lg-2 text-end'> <Button size='tiny'   className=' rounded-pill bg-system-btn' icon onClick={(e) => SaveClientFunc(props.offIndex)}>  <Icon name='save' /> Enregistré </Button> </div>
                            <div className='col-6 col-lg-1 text-end'> <Button size='tiny'    className=' rounded-pill bg-danger text-white' icon onClick={(e) => DeleteFromOffline('clientToSave', props.offIndex)}>  <Icon name='save' /></Button> </div>
                        </div> 
                    </div>
                </div>  
            </div>
        </>)
    }

    return ( <>
            <Dimmer active={loaderState} page inverted style={{minHeight:'100% !important'}}>
                <Loader inverted>{t('communUsed.sysncroPage.savingModal')} </Loader>
            </Dimmer>
            <h5><span className="bi bi-arrow-repeat"></span> {t('communUsed.sysncroPage.title')} </h5>
            <br />
            <div className='row'>
                <div className='col-12 mb-3'>
                    <div className='card card-body shadow-sm'>
                        <div className='row'>
                            <div className='col-4 col-lg-1 align-self-center text-center'><img src='https://assets.ansl.tn/Images/usful/upload.svg' width='auto'  height='50px' /> </div>
                            <div className='col-8 col-lg-8'>
                                <h5 className='text-info mb-1'>{t('communUsed.sysncroPage.mainCard.topText')} </h5>
                                <small> {t('communUsed.sysncroPage.mainCard.bottomText')} </small>
                            </div>
                            <div className='col-12 col-lg-3 align-self-center'><Button size='tiny' disabled={isDisabled} fluid className=' rounded-pill bg-system-btn' icon onClick={(e) => UpdateAllItem()}>  <Icon name='retweet' /> {t('communUsed.sysncroPage.mainCard.btnText')} </Button></div>
                        </div>
                    </div>
                </div>
                {
                    GConf.Syncroniser.map((data,index) => <OfflineItem key={index} data={data} genre={Genres[index]}/>)
                }
                
            </div>
            <br />
            <br />
            <div className='p-2'>
                {/* <h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-receipt-cutoff'></span> Abonnemment à enregistreé : </h5> */}
                <div className='row'>
                    {/* {Offline.factureToSave.length != 0 ? Offline.factureToSave.map( (data, index) => <FactureTosaveCard key={index} data={data} offIndex={index} />) : <PasDeResult genre='Abonnemment' />}   */}
                </div>

                {/* <h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-upc-scan'></span> Seances à enregistreé : </h5> */}
                {/* {Offline.articleToSave.length != 0 ? Offline.articleToSave.map( (data, index) => <ArticleTosave key={index} data={data} offIndex={index}/>) : <PasDeResult genre='Seances' />} */}

                 {/*<h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-truck'></span> Camion à enregistreé : </h5>
                {Offline.camionToSave.length != 0 ? Offline.camionToSave.map( (data, index) => <CamionTosave key={index} data={data}  offIndex={index}/>) : <PasDeResult genre='Camion' />} 

                <h5>Fond à enregistreé : </h5>
                {Offline.fondCamionToSave.length != 0 ? Offline.fondCamionToSave.map( (data, index) => <ArticleTosave key={index} data={data} />) : <PasDeResult genre='factures' />} 

                <h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-person'></span> Client à enregistreé : </h5>
                {Offline.clientToSave.length != 0 ? Offline.clientToSave.map( (data, index) => <ClientTosave key={index} data={data} offIndex={index}/>) : <PasDeResult genre='Clients' />} */}
            </div>

            <FrameForPrint frameId='printFacture' src={`/Pr/Facture/offline/info/${FID}`} />
    </> );
}

export default UpdatePage;