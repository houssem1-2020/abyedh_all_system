import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';

const SelectCamion = ({CamionSelected, camionList, camionSelectState, selectedCam, articleNow, setArticleNow, profListe, matiereList, salleList, AddArticleToList}) =>{
    const jourListeLocal = [
        {key : 7 , value :'Dim', text:'Dimanche'},
        {key : 1 , value :'Lun', text:'Lundi'},
        {key : 2 , value :'Mar', text:'Mardie'},
        {key : 3 , value :'Mer', text:'Mercredie'},
        {key : 4 , value :'Jeu', text:'Jeudi'},
        {key : 5 , value :'Ven', text:'Vendredie'},
        {key : 6 , value :'Sam', text:'Samedie'} 
    ]
    const SelectProfFunct = (selectedItem) => {
        const selectedItemData = profListe.find(item => item.value === selectedItem);
        setArticleNow({...articleNow, proff: selectedItem , proffName: selectedItemData.text.props.children[0]})
    }

    const SelectSubjectFunct = (selectedItem) => {
        const selectedItemData = matiereList.find(item => item.value === selectedItem);
        setArticleNow({...articleNow, matiere: selectedItem , matiereName: selectedItemData.text.props.children})
    }

    const SelectSalleFunct = (selectedItem) => {
        const selectedItemData = salleList.find(item => item.value === selectedItem);
        setArticleNow({...articleNow, salle: selectedItem , salleName : selectedItemData.text.props.children[0]})
    }

    
    
    return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Classes  </h5>
                <Dropdown
                    disabled={camionSelectState}
                    search
                    selection
                    wrapSelection={false}
                    options={camionList}
                    placeholder='Selectionnez Client'
                    className='mb-1'
                    onChange={CamionSelected}
                    value={selectedCam}
                />   

                <h5 className='mt-2 mb-0'>Jour</h5> 
                    <Dropdown
                        //search
                        selection
                        wrapSelection={false}
                        options={jourListeLocal}
                        placeholder='Selectionnez Jour'
                        className='mb-1'
                        onChange={(e, { value }) =>  setArticleNow({...articleNow, Jour: value })}
                        value={articleNow.Jour}
                    /> 
                    
                    <div className='row mt-1'>
                        <div className='col-6'>
                            <h5 className='mb-0'>De</h5> 
                            <Input icon='barcode' type='time'  defaultValue={articleNow.de}  onChange={ (e) =>  setArticleNow({...articleNow, de: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0'>Vers</h5> 
                            <Input icon='barcode' type='time' defaultValue={articleNow.vers}  onChange={ (e) =>  setArticleNow({...articleNow, vers: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
                        </div>
                    </div>
                    <h5 className='mb-0 mt-1'>Matiére</h5>
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={matiereList}
                        placeholder='Selectionnez Matiere'
                        className='mb-1'
                        onChange={(e, { value }) => SelectSubjectFunct(value)}
                        value={articleNow.matiere}
                    />
                    <h5 className='mb-0 mt-1'>Prof</h5>
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={profListe}
                        placeholder='Selectionnez Proff'
                        className='mb-1'
                        onChange={(e, { value }) => SelectProfFunct(value)}
                        value={articleNow.proff}
                    />
                    <h5 className='mb-0 mt-1'>Salle</h5>
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={salleList}
                        placeholder='Selectionnez Salle'
                        className='mb-1'
                        onChange={(e, { value }) => SelectSalleFunct(value)}
                        value={articleNow.salle}
                    />
                    <br />
                    <Button  className='rounded-pill bg-system-btn' onClick={() => AddArticleToList()}>  <Icon name='edit outline' /> Ajouter</Button>
                </div>
    </>)
}
 

function AjouterFond() {
   /* ############################### Const ################################*/
    let Today = new Date()
    let [defaultEmploi, setDefaultEmploi] = useState([])
    let [listeToShow, setListeToShow] = useState([])
    let [profListe, setProfList] = useState([]);
    let [salleList, setSalleList] = useState([]);
    let [fullMatiereList, setFullMatiereList] = useState([]);
    let [matiereList, setMatiereList] = useState([]);
    let [articleNow, setArticleNow] = useState({de: new Date().toLocaleTimeString([],{ hourCycle: 'h23'}), vers: new Date().toLocaleTimeString([],{ hourCycle: 'h23'}),}) ; 
    let [camionList, setCamionList] = useState([]); 
    let [selectedCam, setSelectedCam] = useState(); 
    
    let [camionSelectState, setCamionSS] = useState(false); 
    let [saveBtnState, setSaveBtnState] = useState(false) ; 
    let [gettedBonID, setBonID] = useState('');
 
    const [loaderState, setLS] = useState(false)
    const jourListe = [
        {id:0, value :'Dim', text:'Dimanche'},
        {id:1, value :'Lun', text:'Lundi'},
        {id:2, value :'Mar', text:'Mardie'},
        {id:3, value :'Mer', text:'Mercredie'},
        {id:4, value :'Jeu', text:'Jeudi'},
        {id:5, value :'Ven', text:'Vendredie'},
        {id:6, value :'Sam', text:'Samedie'},
        
    ]
 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () =><SelectCamion CamionSelected={CamionSelected} camionList={camionList} camionSelectState={camionSelectState} selectedCam={selectedCam} articleNow={articleNow} setArticleNow={setArticleNow} profListe={profListe} matiereList={matiereList} salleList={salleList} AddArticleToList={AddArticleToList} />,
        },
        {
            menuItem: { key: 'save', icon: 'save outline', content:  'Enregistrer' }, 
            render: () =><FinishSaveCard />,
        },
 
        
    ]
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}

   /* ############################### UseEffect ########################*/
    useEffect(() => {
          //camionList
          axios.post(`${GConf.ApiLink}/classes/emploi/toadd`,{  PID : GConf.PID,})
          .then(function (response) {
             
              let ClientLN = []
              response.data.Data.map( (dta,index) => {ClientLN.push({value : dta.CL_ID, text : <>{dta.CL_Name} : {dta.CL_Niveaux} - {dta.CL_Seasson}</>, key: index})})
              setCamionList(ClientLN)

              let SalleN = []
              response.data.Salle.map( (dta,index) => {SalleN.push({value : dta.Salle_ID, text : <>{dta.Salle_Name} : {dta.Salle_Num} </>, key: index})})
              setSalleList(SalleN)

              let MatiereN = []
              response.data.Matiere.map( (dta,index) => {MatiereN.push({value : dta.Matiere_ID, text : <>{dta.Matiere_Name} </>, key: index})})
              setMatiereList(MatiereN)
              setFullMatiereList(response.data.Matiere)

              let ProfN = []
              response.data.Prof.map( (dta,index) => {ProfN.push({value : dta.T_ID, text : <>{dta.T_Name} : {dta.Poste} </>, key: index})})
              setProfList(ProfN)
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
          });
          
    }, [])


    /* ########################## Functions ############################*/
    const CamionSelected = (e, { value }) =>{
        
        axios.post(`${GConf.ApiLink}/classes/info`, {
            PID : GConf.PID,
            classeID : value
        })
        .then(function (response) {
               //setCamionSS(true)
               setSelectedCam(value)
               setDefaultEmploi(JSON.parse(response.data.Data.CL_Emploi))
               GeneratedTime(JSON.parse(response.data.Data.CL_Emploi))
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les article de camion  </div></>, GConf.TostInternetGonf)   
            }
          });

    }
    const findIdByValue = (value) => {
        const jour = jourListe.find(jour => jour.value === value);
        return jour ? jour.id : null;
    }

    const AddArticleToList = ()=>{
        if (!articleNow.Jour) {toast.error("Date Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.de ) {toast.error("de Invalide  !", GConf.TostErrorGonf)}
        else if (!articleNow.vers ) {toast.error("Vers Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.matiere ) {toast.error("Matiere Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.salle) { toast.error("Salle Invalide !", GConf.TostErrorGonf) }
        else if (!articleNow.proff) { toast.error("Proff Invalide !", GConf.TostErrorGonf) }
        else{
            const searchObject = defaultEmploi.find((article) => article.day == articleNow.Jour);
            if (searchObject) {
                let seanceListe = {de: articleNow.de ,vers: articleNow.vers , matiere: articleNow.matiere , matiereName:articleNow.matiereName, salle: articleNow.salle , salleName: articleNow.salleName, proff: articleNow.proff , proffName: articleNow.proffName , genre: 'normale'}
            
                searchObject.seances.push(seanceListe)
                 
                setArticleNow({Jour: articleNow.Jour , de: articleNow.de, vers: articleNow.vers, proff:'', proffName:'', salle:'', salleName:'', matiere:'', matiereName:'', matiereColor:''})
                GeneratedTime(defaultEmploi)

            } else {
            let arrayToAdd = { day : articleNow.Jour ,   dayOff :false, seances : []}
            let seanceListe = {de: articleNow.de ,vers: articleNow.vers , matiere: articleNow.matiere , matiereName:articleNow.matiereName, salle: articleNow.salle , salleName: articleNow.salleName,  proff: articleNow.proff ,  proffName: articleNow.proffName, genre: 'normale'}
            
            arrayToAdd.seances.push(seanceListe)
            defaultEmploi.push(arrayToAdd)
            setArticleNow({Jour: articleNow.Jour , de: articleNow.de, vers: articleNow.vers, proff:'', proffName:'', salle:'', salleName:'', matiere:'', matiereName:'', matiereColor:''})
            GeneratedTime(defaultEmploi)
        }
        

        }
    }
 
    const SaveFond = () =>{
            if (!defaultEmploi) {toast.error("Client est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                setSaveBtnState(true)
                axios.post(`${GConf.ApiLink}/classes/emploi/edit`, {
                    PID: GConf.PID,
                    classID :selectedCam,
                    defaultEmploi: defaultEmploi,
                })
                .then(function (response) {
                    console.log(response.data)
                    if(response.status = 200) { 
                        toast.success("Fonds enregistreé !", GConf.TostSuucessGonf)
                        //setBonID(response.data.BonID)
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                        setSaveBtnState(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> Le Fond a été enregistrer dans la memoire interne  </div></>, GConf.TostInternetGonf)   
                      setLS(false)
                    }
                  });
            }       
    }
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}

    const GeneratedTimeOLD = () => {
        let curr = new Date()
        let first = curr.getDate() - curr.getDay()
        const TargertDateIs = (dayIndex) => { return new Date(curr.setDate(first + dayIndex)).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}
        const TargertColor = (matiere) => { 
            
            let targetMat = fullMatiereList.find((data) => data.Matiere_Name === matiere)
            if (targetMat) {
                return targetMat.Matiere_Color
            } else{
                return '#7f7f7f'
            }
        }
        let reternedListe = []
        defaultEmploi.map( (getData,index) => (
            getData.seances.map((data) =>  reternedListe.push({ title: `${data.matiere} (${data.salle})`,  start: `${TargertDateIs(index)}T${data.de}` , end: `${TargertDateIs(index)}T${data.vers}`,  className:'border-0 rounded-0 m-0 p-0', backgroundColor:  TargertColor(data.matiere) })) 
        ))         
        return reternedListe
    }
    const GeneratedTime = (listeValue) => {
        let curr = new Date()
        let first = curr.getDate() - curr.getDay()
        const TargertDateIs = (dayIndex) => { return new Date(curr.setDate(first + dayIndex)).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}
        
        const TargertColor = (matiere) => { 
            let targetMat = fullMatiereList.find((data) => data.Matiere_ID === matiere)
            if (targetMat) {
                return targetMat.Matiere_Color
            } else{
                return '#7f7f7f'
            }
        }

        let reternedListe = []
        listeValue.map( (getData,index) => (
            getData.seances.map((data) =>  reternedListe.push({ title: `${data.matiereName} (${data.salleName})`,  start: `${TargertDateIs(findIdByValue(getData.day))}T${data.de}` , end: `${TargertDateIs(findIdByValue(getData.day))}T${data.vers}`,  className:'border-0 rounded-0 m-0 p-0', backgroundColor:  TargertColor(data.matiere), removeID: data, removeIDDay: getData.day })) 
        ))         
        setListeToShow(reternedListe)
        
    }
    const RemoveEvent = (eventId) => {
         
        const userConfirmed = window.confirm('vouler vous vraimment supprimer cette seance : de ' + eventId.extendedProps.removeID.de + ' vers ' + eventId.extendedProps.removeID.vers)
        if (userConfirmed) {
                let targetDay = defaultEmploi.find((item) => item.day == eventId.extendedProps.removeIDDay);
                let emploiTemplate = targetDay.seances.filter(item => 
                    item.de !== eventId.extendedProps.removeID.de || 
                    item.vers !== eventId.extendedProps.removeID.vers
                );
                targetDay.seances = emploiTemplate
                 
                GeneratedTime(defaultEmploi)
        } else {
            
        }
    }
    /* ############################### card ################################*/
 
 
    const FinishSaveCard = () =>{
            return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Buttons</h5>
                    <div className='row mb-2'>
                        <div className='col-6'>
                            <Button disabled={saveBtnState} className='rounded-pill  bg-system-btn'  fluid onClick={SaveFond}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState}  fluid onClick={ (e) => PrintFunction('PrintFond') }><Icon name='print' /> Imprimer</Button>
                        </div>
                        
                    </div>
                </div>
        </>)
    }
 
    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.CamionAddFond} />
            <br />
            <div className='row'>
                <div className='col-12 col-lg-5'>
                    <div className="mb-4 sticky-top" style={{top:'70px', zIndex: 1}}>
                        <Tab menu={{  pointing: true  }} panes={panes} />
                    </div>
                </div>
                <div className='col-12 col-lg-7'>
                        <FullCalendar 
                            plugins={[ timeGridPlugin ]}
                            initialView="timeGridWeek"
                            locale='fr' 
                            dayHeaderFormat = {{weekday: 'short'}}
                            events={listeToShow}
                            eventClick={(clickInfo) => RemoveEvent(clickInfo.event)}
                            headerToolbar='false'
                            height='490px'
                            allDaySlot= {false}
                            slotMinTime = '08:00'  
                            slotMaxTime = '18:00' 
                        /> 
                </div>
            </div>
            <FrameForPrint frameId='PrintFond' src={`/Pr/Camion/Fonds/fondTemp/${gettedBonID}`} />
        </> );
    }

export default AjouterFond;