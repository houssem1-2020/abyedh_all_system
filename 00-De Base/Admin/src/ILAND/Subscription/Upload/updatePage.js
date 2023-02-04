import React, {useEffect,useState}  from 'react';
import axios from 'axios';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
import { toast } from 'react-toastify';
import { Segment , Icon, Input, Button, Loader, Dropdown, Dimmer, Select} from 'semantic-ui-react';
import 'react-circular-progressbar/dist/styles.css';
import GConf from '../../../AssetsM/generalConf';
import { localeData } from 'moment/moment';

function UploadeCamionPage() {

    /*#########################[Const]##################################*/
    const [isDisabled , setIsDisabled] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [loadingPage, setLoadingP] = useState(false)
    const [delegList ,setDelegList] = useState([])
    const [gouv ,setGouv] = useState('')
    const [deleg ,setDeleg] = useState('')
    let camData = JSON.parse(localStorage.getItem(`Admin_Dir_LocalD`));
    let [Offline, setOffline] = useState(JSON.parse(localStorage.getItem(`Admin_Dir_Offline`))); 
 

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        // axios.post(`${GConf.ApiInputLink}/update`, {
        //     forPID : camData.PID,
        //     camId : camId
        // }).then(function (response) {
        //     setStock(response.data[0].stock)
        //     setFactures(response.data[0].facture)
        //     setClients(response.data[0].client)
        //     setLoadingP(false)
        // }).catch((error) => {
        //     if(error.request) {
        //       toast.error(<><div><h5>Probleme de Connextion</h5> Vous ne pouver pas mettre à jour vos donneé maintenant</div></>, GConf.TostInternetGonf) 
        //       setStock([])
        //       setFactures([])
        //       setIsDisabled(true)
        //       setLoadingP(false)
        //     }
        // });
    }, [])

    /*#########################[Functions]##################################*/
    const GetDelegList = (value) =>{
        setGouv(value)
        const found = GConf.abyedhMap.Deleg.filter(element => element.tag === value)
        setDelegList(found)
    }
    const UpdateLocalMap = () =>{
        if (!gouv) {toast.error("Entrer Gouvernorat !", GConf.TostErrorGonf)}
        else if (!deleg) {toast.error("Entrer Delegation  !", GConf.TostErrorGonf)}
        else{
            Offline.localData = [{gouv:gouv, deleg:deleg}]
            localStorage.setItem(`Admin_Dir_Offline`, JSON.stringify(Offline));
            setOffline(JSON.parse(localStorage.getItem(`Admin_Dir_Offline`)))
            toast.success("Modifieé !", GConf.TostSuucessGonf)
        }
        
    }

    const DeleteFromOffline = (targetTable, targetElm) =>{
        console.log(Offline[targetTable][targetElm])
        Offline[targetTable].splice(targetElm,1)
        localStorage.setItem(`Admin_Dir_Offline`,  JSON.stringify(Offline));
    }
    const SaveFactureFunc = (targetIndex) => {
        setLS(true)
        let factureSelected = Offline.ajoutee[targetIndex]
        console.log(factureSelected)
        axios.post(`${GConf.ApiInputLink}/nv/ajouter`, {
            forPID : camData.PID,
            factureD: factureSelected,
        })
        .then(function (response) {
            if(response.status = 200) {
                toast.success("Facture Enregistreé !", GConf.TostSuucessGonf)
                setLS(false)
                Offline.ajoutee.splice(targetIndex,1)
                localStorage.setItem(`Admin_Dir_Offline`,  JSON.stringify(Offline));
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
    const SaveClientFunc = (targetIndex) => {
        setLS(true)
        let clientSelected = Offline.clientToSave[targetIndex]
        axios.post(`${GConf.ApiLink}/client/ajouter`, {
            tag : GConf.SystemTag,
            clientD : clientSelected,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Client Ajouter !", GConf.TostSuucessGonf)
                setLS(false)
                Offline.modifiee.splice(targetIndex,1)
                localStorage.setItem(`Admin_Dir_Offline`,  JSON.stringify(Offline));
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
    const SaveDepenseFunc = (targetIndex) => {
        setLS(true)
        let CamionSelected = Offline.camionToSave[targetIndex]
        axios.post(`${GConf.ApiLink}/camions/ajouter`, {
            tag : GConf.SystemTag,
            camionD : CamionSelected,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Camion Ajouteé !", GConf.TostSuucessGonf)
                setLS(false)
                Offline.camionToSave.splice(targetIndex,1)
                localStorage.setItem(`Admin_Dir_Offline`,  JSON.stringify(Offline));
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
    const SetDefaultData = (props) =>{
        return(<>
        <div className='col-12 col-lg'>
            <div className='card card-body shadow-sm mb-2'>
                <div className='text-left mb-2 text-danger'>
                    <b>Mettre a jour les donneé locale</b>
                </div>

                <Select placeholder='Gouvernorat' className='mb-2 shadow-sm' options={GConf.abyedhMap.Gouv} value={gouv} onChange={(e, { value }) => GetDelegList(value)} />
                <Select placeholder='Delegation ' className='shadow-sm' value={deleg} options={delegList} onChange={(e, { value }) => setDeleg(value)} />
                <br /> 
                <div className='text-center'><Button size='tiny' disabled={isDisabled} fluid className=' rounded-pill bg-system-btn' icon onClick={() => UpdateLocalMap()}>  <Icon name='retweet' /> Mettre à Jour </Button></div> 
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
    const FactureTosave = (props) =>{
        return(<>
            <div className='card p-2 mb-3 shadow-sm'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row d-none'>
                            <div className='col-12 align-self-center'>client :  {props.data.Name}</div>
                            <div className='col-12 align-self-center'>Totale:  {props.data.Phone} </div>
                            <div className='col-12 align-self-center'>N articles :  {props.data.Adress} <small>articles</small> </div>
                            <div className='col-6 col-lg-2 text-start'> <Button size='tiny'   className=' rounded-pill bg-system-btn' icon onClick={(e) => SaveFactureFunc(props.offIndex)}>  <Icon name='save' /> Enregistré </Button> </div>
                            <div className='col-6 col-lg-1 text-end'> <Button size='tiny'    className=' rounded-pill bg-danger text-white' icon onClick={(e) => DeleteFromOffline('factureToSave', props.offIndex)}>  <Icon name='save' /></Button> </div>
                        </div> 
                    </div>
                </div>  
            </div>
        </>)
    }
    const ClientTosave = (props) =>{
        return(<>
            <div className='card p-2 mb-3 shadow-sm rounded-pill'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-2 align-self-center'>client :  {props.data.Code_Fiscale}</div>
                            <div className='col-2 align-self-center'>Totale:  {props.data.Name} </div>
                            <div className='col-2 align-self-center'>N articles :  {props.data.Phone} </div>
                            <div className='col-2 align-self-center'>Gouvernement : {props.data.Gouv} </div>
                            <div className='col-2 align-self-center'>Adresse ; {props.data.Adress} </div>
                            <div className='col-6 col-lg-2 text-start'> <Button size='tiny'   className=' rounded-pill bg-system-btn' icon onClick={(e) => SaveClientFunc(props.offIndex)}>  <Icon name='save' /> Enregistré </Button> </div>
                            <div className='col-6 col-lg-1 text-end'> <Button size='tiny'    className=' rounded-pill bg-danger text-white' icon onClick={(e) => DeleteFromOffline('clientToSave', props.offIndex)}>  <Icon name='save' /></Button> </div>
                        </div> 
                    </div>
                </div>  
            </div>
        </>)
    }
    const DepenseTosave = (props) =>{
        return(<>
            <div className='card p-2 mb-3 shadow-sm'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-12 align-self-center'>Genre :  {props.data.genre}</div>
                            <div className='col-12 align-self-center'>Valeur:  {props.data.valeur} </div>
                            <div className='col-12 align-self-center'></div>
                            <div className='col-12 align-self-center'></div>
                            <div className='col-6 col-lg-2 text-start'> <Button size='tiny'   className=' rounded-pill bg-system-btn' icon onClick={(e) => SaveClientFunc(props.offIndex)}>  <Icon name='save' /> Enregistré </Button> </div>
                            <div className='col-6 col-lg-1 text-end'> <Button size='tiny'    className=' rounded-pill bg-danger text-white' icon onClick={(e) => DeleteFromOffline('clientToSave', props.offIndex)}>  <Icon name='save' /></Button> </div>
                        </div> 
                    </div>
                </div>  
            </div>
        </>)
    }

    return (<>
        <BackCard data={InputLinks.backCard.up}/>
        <br />
        <Dimmer active={loaderState || loadingPage} page inverted style={{minHeight:'100% !important'}}>
            <Loader inverted>{loadingPage == true ? 'Chargemment' : 'Enregistremment'} </Loader>
        </Dimmer>
        <div className='container'>
            <br />
            <div className='row'>
                <SetDefaultData  />
            </div>
            <br />
            <br />
            <div className='p-2'>
               <h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-receipt-cutoff'></span> Entreé à enregistreé : </h5>
               {Offline.ajoutee.length != 0 ? Offline.ajoutee.map( (data, index) => <FactureTosave key={index} data={data} offIndex={index} />) : <PasDeResult />}  

                <h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-receipt-cutoff'></span> Modification à enregistreé : </h5>
               {Offline.modifiee.length != 0 ? Offline.modifiee.map( (data, index) => <ClientTosave key={index} data={data} offIndex={index} />) : <PasDeResult />}

               <h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-receipt-cutoff'></span> Position à enregistreé : </h5>
               {Offline.positions.length != 0 ? Offline.positions.map( (data, index) => <DepenseTosave key={index} data={data} offIndex={index} />) : <PasDeResult />}

               <h5 className='bg-danger d-inline-block p-2 rounded-pill text-white ps-3 pe-3'><span className='bi bi-receipt-cutoff'></span> Horaires à enregistreé : </h5>
               {Offline.horaire.length != 0 ? Offline.horaire.map( (data, index) => <DepenseTosave key={index} data={data} offIndex={index} />) : <PasDeResult />}

            </div>
        </div>
    </>);
}

export default UploadeCamionPage;