import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Modal, Select, Tab} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import Ripples from 'react-ripples'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Map } from 'leaflet';
import TunMap from '../../AssetsM/tunMap';

const MapEventsHandler = ({ onLocationSelected }) => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelected({ lat, lng });
      },
    });
  
    return null;
};
const AddObjectsCard = ({articleNow, setArticleNow, saveBtnState, AddArticleToList}) =>{
    return (<>
            <div className='card card-body shadow-sm mb-2 border-div'>
                <h5>Ajouter les Object et les Articles </h5> 
                <Input icon='pin'  placeholder='Entre Objet Ou Article' value={articleNow.Name}  onChange={ (e) => setArticleNow({...articleNow, Name : e.target.value})} size="small" iconPosition='left'   fluid className='mb-1' /> 
                <Input icon='comment' value={articleNow.Description} onChange={ (e) => setArticleNow({...articleNow, Description : e.target.value})} size="small" iconPosition='left' placeholder='Poid'  fluid className='mb-1' />
                <Input icon='dropbox' value={articleNow.Qte} onChange={ (e) => setArticleNow({...articleNow, Qte : e.target.value})} size="small" iconPosition='left' placeholder='Quantite'  fluid className='mb-1' />                    
                <br />
                <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddArticleToList}>  <Icon name='edit outline' /> Ajouter</Button>
            </div>
    </>)
}
const SetPositionsCard = ({factureD, setFactureD, OpenModalWithTarget}) =>{
    
    return (<>
            <div className='card card-body shadow-sm mb-2'>                 
                <h5 className='mb-1 text-secondary'>De </h5>
                    <div className='card p-2 shadow-sm border-div'  onClick={() => OpenModalWithTarget('De')}>
                        {factureD.OP_De.Gouv != '' ? <div className='text-center'><div><b>{factureD.OP_De.Gouv}, {factureD.OP_De.Deleg} </b></div><small>{factureD.OP_De.Lat}, {factureD.OP_De.Lng}</small></div> : <div className='text-center'><Icon name='map marker alternate' /></div>}
                    </div>
                     
                <h5 className='mb-1 text-secondary'> Vers </h5>
                <div className='card p-2 shadow-sm border-div'  onClick={() => OpenModalWithTarget('Vers')}>
                        {factureD.OP_Vers.Gouv != '' ? <div className='text-center'><div><b>{factureD.OP_Vers.Gouv}, {factureD.OP_Vers.Deleg} </b></div><small>{factureD.OP_Vers.Lat}, {factureD.OP_Vers.Lng}</small></div> : <div className='text-center'><Icon name='map marker alternate' /></div>}
                    </div>

                
            </div>
    </>)
}
const FinishCatd = ({saveBtnState,SaveFacture,loaderState, factureD, setFactureD, OnKeyPressFunc, clientList, camionList}) =>{
    return (<>
            <div className='card card-body shadow-sm mb-2 border-div'>
                <h5 className='mt-2 mb-1 text-secondary'>Date </h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={factureD.OP_Date} onChange={(e) => setFactureD({...factureD, OP_Date: e.target.value })}/>
                
                
                <h5 className='mt-2 mb-1 text-secondary'>Client</h5>
                <datalist id="clientList">
                        {clientList.map((test) =>
                        <option key={test.key} value={test.CL_ID}>{test.CL_Name} : {test.Gouv} - {test.Deleg}</option>
                        )}
                </datalist>
                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={factureD.OP_Client}   onBlur={ (e) => setFactureD({...factureD, OP_Client: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                
                <h5 className='mt-2 mb-1 text-secondary'>Camion</h5> 
                <Dropdown
                    search
                    selection
                    wrapSelection={false}
                    options={camionList}
                    placeholder={factureD.OP_Camion}
                    onChange={(e, { value }) => setFactureD({...factureD, OP_Camion: value })}
                    value={factureD.OP_Camion}
                /> 
                <h5 className='mt-2 mb-1 text-secondary'>Chauffeur</h5>
                <Input icon='user outline' onKeyPress={event => OnKeyPressFunc(event)} type='text' placeholder='Chauffeur' size="small" iconPosition='left'   fluid className='mb-1' value={factureD.OP_Chauffeur} onChange={(e) => setFactureD({...factureD, OP_Chauffeur: e.target.value })}/>
                

                <div className='row mb-2 mt-3'>
                    <div className='col-12'>
                        <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} fluid onClick={SaveFacture}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                    </div>
                </div>
            </div>
    </>)
}

function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [factureD, setFactureD] = useState({OP_Client:'', OP_De:{Gouv:'', Deleg:'', Lat:'', Lng:''}, OP_Vers:{Gouv:'', Deleg:'', Lat:'', Lng:''}, OP_Camion:'', OP_Chauffeur:'', OP_Date: Today.toISOString().split('T')[0],  OP_Articles:[]})
    const [articleNow, setArticleNow] = useState({})
    /* */
    const [modalOpen, setModalOpen] = useState(false)
    const [delegList ,setDelegList] = useState([])
    const [gouv ,setGouv] = useState('')
    const [deleg ,setDeleg] = useState('')
    const [targetDeVers ,setTragetDeVers] = useState('De')
    const [myPosition, setMyPosition] = useState([36.17720,9.12337])
    const [targetPosition, setTragetPosition] = useState([36.17720,9.12337])
    const [disabledSaveBtn, setDisabledBtn] = useState(false)
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
    /*  */
    const [clientList, setClientList] = useState([]);
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [gettedFID, setFID] = useState('')
    const [camionList, setCamionList] = useState([]);

    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Objet ' }, 
            render: () => <AddObjectsCard articleNow={articleNow} setArticleNow={setArticleNow} saveBtnState={saveBtnState} AddArticleToList={AddArticleToList} />,
        },
        {
            menuItem: { key: 'client', icon: 'user', content:  'Position' }, 
            render: () =><SetPositionsCard factureD={factureD} setFactureD={setFactureD} clientList={clientList}   camionList={camionList} OpenModalWithTarget={OpenModalWithTarget} />,
        },
        {
            menuItem: { key: 'articles', icon: 'save', content:  'Terminer' }, 
            render: () => <FinishCatd saveBtnState={saveBtnState} SaveFacture={SaveFacture} loaderState={loaderState} clientList={clientList}   camionList={camionList} factureD={factureD} setFactureD={setFactureD} OnKeyPressFunc={OnKeyPressFunc}  />,
        }
        
    ]
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}

    /* ############################### UseEffect ########################*/
    useEffect(() => {
            //camionList
            axios.post(`${GConf.ApiLink}/camion`,{PID :GConf.PID})
            .then(function (response) {
                let ClientLN = []
                response.data.map( (dta) => {ClientLN.push({value : dta.CM_ID, text : <>{dta.CM_Name} : {dta.CM_Matricule} - {dta.CM_Genre}</>, key: dta.PK})})
                setCamionList(ClientLN)
            }).catch((error) => {
            if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
            });

            axios.post(`${GConf.ApiLink}/clients`,{PID :GConf.PID})
            .then(function (response) {
                setClientList(response.data)
            }).catch((error) => {
            if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
            });

    }, [])

    /*#########################[Function]##################################*/
    const AddArticleToList = ()=>{
        if (!articleNow.Name) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Description ) {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Qte ) {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
        else{
            let arrayToAdd = {id: factureD.OP_Articles.length + 1 , Name: articleNow.Name, Description: articleNow.Description, Qte: articleNow.Qte}
            factureD.OP_Articles.push(arrayToAdd)
            setArticleNow({})            
        }
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= factureD.OP_Articles.findIndex((article) => article.A_Code == value);
        factureD.OP_Articles.splice(searchObject, 1);

        let resteArticles = factureD.OP_Articles;
   

        setFactureD({...factureD, OP_Articles: resteArticles})


    }

    /*  */
    const OpenModalWithTarget = (positionTraget)  =>{
        setTragetDeVers(positionTraget)
        setModalOpen(true)
    }
    const GetDelegList = (value) =>{
        setGouv(value)
        const found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList(found)
         
    }
    const SelectPosition = () => {
        //setModalOpen(false)
        if (!gouv || gouv == '') {  toast.error("أدخل إسم الولاية    !", GConf.TostErrorGonf) } 
        else if (!gouv || gouv == '') {  toast.error("أدخل إسم المعتمدية    !", GConf.TostErrorGonf) } 
        else if (!targetPosition) {  toast.error("أدخل   الموقع الجغرافي    !", GConf.TostErrorGonf) } 
        else {
            if (targetDeVers == 'De') {
                setFactureD({...factureD, OP_De: {Gouv: gouv, Deleg: deleg, Lat: targetPosition[0], Lng:targetPosition[1]} })
                setModalOpen(false)
            } else {
                setFactureD({...factureD, OP_Vers: {Gouv: gouv, Deleg: deleg, Lat: targetPosition[0], Lng:targetPosition[1]} })
                setModalOpen(false)
            }
        }
    }
    const handleLocationSelected = (location) => {
        setTragetPosition([location.lat , location.lng])
        factureD.targetPosition = {Lat: location.lat , Lng : location.lng}
    };
    /* */

    const SaveFacture = () =>{
            if (!factureD.OP_Date ) {toast.error("Date est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.OP_De) {toast.error("Destination De est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.OP_Vers) {toast.error("Destination vers est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.OP_Client) {toast.error("Camion  est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.OP_Camion) {toast.error("Chauffeur  est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.OP_Chauffeur) {toast.error("totale est Invalide !", GConf.TostErrorGonf)}
            else if (!factureD.OP_Articles || factureD.OP_Articles.length == 0) {toast.error("article list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiLink}/operations/ajouter`, {
                    PID : GConf.PID,
                    operationData: factureD,
                })
                .then(function (response) {
                    if(response.status = 200) {
                        setFID(response.data.FID)
                        setSaveBtnState(true)
                        toast.success("Operation Enregistreé !", GConf.TostSuucessGonf)
                        setLS(false)
                        
                    }
                    else{
                        toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> La Facture sera enregistrer sur votre ordinateur    </div></>, GConf.TostInternetGonf)   
                      Offline.factureToSave.push(factureD)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)
                    }
                  });

            }       
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}

    const CheckClientValidite = (clientId) =>{
        const exist = clientList.find((client) => client.CL_ID == clientId);
        if (exist) { return true  } else { return false}
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
   /*#########################[Card]##################################*/

    const ArticleListCard = (props) =>{
        return(<>
                    <Ripples className='d-block p-0 mb-1 rounded-pill' >   
                    <div className='card shadow-sm p-2   rounded-pill ps-4'>
                        <div className='row'>
                            <div className='col-6 text-start align-self-center'>
                                {props.dataA.Name}
                            </div>
                            <div className='col-5 align-self-center'><b>{props.dataA.Qte}</b> * {props.dataA.Description}</div>
                            <div className='col-1 align-self-center'><Button icon="times" className='rounded-circle p-2 text-white bg-danger' disabled={saveBtnState} onClick={() => DeleteFromUpdateList(props.dataA.A_Code)}></Button></div>
                        </div>
                    </div>
                    </Ripples>
                </>)
    }
    
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
        <div className='row'>
            <div className='col-12 col-lg-5'>
                <div className="mb-4 sticky-top" style={{top:'70px', zIndex:90}}>
                    <Tab menu={{widths: panes.length , pointing: true  }} panes={panes} />        
                </div>
            </div>
            <div className='col-12 col-lg-7'>
                <h5>Listes des Objet & articles </h5>    
                    {factureD.OP_Articles.map( (val) => <ArticleListCard key={val.id} dataA={val}/>)}
                    <br />
                    
            </div>
        </div>
        <FrameForPrint frameId='printFacture' src={`/Pr/facture/info/${gettedFID}`} />
        <Modal
            onClose={() => setModalOpen(false)}
            onOpen={() => setModalOpen(true)}
            open={modalOpen}
            style={{zIndex:150}}
        >
        <Modal.Header className=''>
                <span className='font-droid'> Precisez La Position </span>
                
        </Modal.Header>
        <Modal.Content >
            <div className='row'>
                <div className='col-9'>
                    <MapContainer  center={myPosition} zoom={15} scrollWheelZoom={false} className="map-height cursor-map-crosshair border-div"  >
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapEventsHandler onLocationSelected={handleLocationSelected} />
                        <Marker position={targetPosition}>
                            <Popup>
                                
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className='col-3'>
                    <div className='mb-3 mt-3' >
                        <Select fluid placeholder='Gouvernorat' className='mb-2 shadow-sm' options={TunMap.Gouv} value={gouv} onChange={(e, { value }) => GetDelegList(value)} />
                        <Select fluid placeholder='Delegation' className='shadow-sm' value={deleg} options={delegList} onChange={(e, { value }) => setDeleg(value)} />
                    </div>
                    <div className='mb-3 mt-3' >
                        <Button  fluid className='rounded-pill text-white' style={{backgroundColor: GConf.themeColor}} disabled={disabledSaveBtn}   onClick={() => SelectPosition()}><Icon name='save' className='ms-2' /> تأكيد  </Button>
                    </div>
                </div>
            </div>
                
                
        </Modal.Content>
        </Modal>

    </> );
    }

export default AjouterFacture;