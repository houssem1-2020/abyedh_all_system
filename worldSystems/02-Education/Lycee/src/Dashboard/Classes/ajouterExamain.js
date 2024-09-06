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
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const EnterExamDataCard = ({ClassIsSelectedFunc, saveBtnState, classListe, matiereList, profListe, salleList, SaveExamFunc, examData, setExamData }) =>{
    const ExamGenre = [
        {id:1, text:'Controle', value:'DC'},
        {id:1, text:'Synthése', value:'DS'},
    ]
    return (<>
                <h5>Classes  </h5>
                <Dropdown
                    search
                    selection
                    wrapSelection={false}
                    options={classListe}
                    placeholder='Selectionnez Client'
                    className='mb-1'
                    onChange={ClassIsSelectedFunc}
                    value={examData.Classes_ID}
                />   
                <h5 className='mt-2 mb-0'>Jour</h5>
                <Input icon='barcode' type='date'  defaultValue={examData.EX_Date}  onChange={ (e) =>  setExamData({...examData, EX_Date: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
                    
                    <div className='row mt-1'>
                        <div className='col-6'>
                            <h5 className='mb-0'>De</h5> 
                            <Input icon='barcode' type='time'  defaultValue={examData.EX_Time_Depart}  onChange={ (e) =>  setExamData({...examData, EX_Time_Depart: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0'>Vers</h5> 
                            <Input icon='barcode' type='time' defaultValue={examData.EX_Time_Finish}  onChange={ (e) =>  setExamData({...examData, EX_Time_Finish: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
                        </div>
                    </div>
                    <h5 className='mb-0 mt-1'>Genre</h5>
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={ExamGenre}
                        placeholder='Selectionnez Genre'
                        className='mb-1'
                        onChange={(e, { value }) => setExamData({...examData, EX_Genre: value })}
                        value={examData.EX_Genre}
                    />
                    <h5 className='mb-0 mt-1'>Matiére</h5>
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={matiereList}
                        placeholder='Selectionnez Matiere'
                        className='mb-1'
                        onChange={(e, { value }) => setExamData({...examData, Matiere_ID: value })}
                        value={examData.Matiere_ID}
                    />
                    <h5 className='mb-0 mt-1'>Prof</h5>
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={profListe}
                        placeholder='Selectionnez Proff'
                        className='mb-1'
                        onChange={(e, { value }) => setExamData({...examData, Proff_ID: value })}
                        value={examData.Proff_ID}
                    />
                    <h5 className='mb-0 mt-1'>Salle</h5>
                    <Dropdown
                        search
                        selection
                        wrapSelection={false}
                        options={salleList}
                        placeholder='Selectionnez Salle'
                        className='mb-1'
                        onChange={(e, { value }) => setExamData({...examData, Salle_ID: value })}
                        value={examData.Salle_ID}
                    />
                    <br />
                    <Button  className='rounded-pill bg-system-btn' disabled={saveBtnState} onClick={() => SaveExamFunc()}>  <Icon name='edit outline' /> Ajouter</Button>

      
    </>)
}
 

function AjouterFond() {
   /* ############################### Const ################################*/
    let Today = new Date()
    let [defaultEmploi, setDefaultEmploi] = useState([])
    let [profListe, setProfList] = useState([]);
    let [salleList, setSalleList] = useState([]);
    let [fullMatiereList, setFullMatiereList] = useState([]);
    let [matiereList, setMatiereList] = useState([]);
    let [examData, setExamData] = useState({Classes_ID:'',  EX_Date: Today.toISOString().split('T')[0],  EX_Time_Depart : new Date().toLocaleTimeString([],{ hourCycle: 'h23'}), EX_Time_Finish : new Date().toLocaleTimeString([],{ hourCycle: 'h23'}), Matiere_ID:'', Salle_ID:'', EX_Genre:''})
    let [classListe, setClassListe] = useState([]); 
    let [loader, setLS] = useState(false); 
    let [saveBtnState, setSaveBtnState] = useState(false); 

 
 

   /* ############################### UseEffect ########################*/
    useEffect(() => {
          //classListe
          axios.post(`${GConf.ApiLink}/classes/emploi/toadd`,{  PID : GConf.PID,})
          .then(function (response) {
             
              let ClientLN = []
              response.data.Data.map( (dta) => {ClientLN.push({value : dta.CL_ID, text : <>{dta.CL_Name} : {dta.CL_Niveaux} - {dta.CL_Seasson}</>, key: dta.PK})})
              setClassListe(ClientLN)

              let SalleN = []
              response.data.Salle.map( (dta) => {SalleN.push({value : dta.Salle_ID, text : <>{dta.Salle_Name} : {dta.Salle_Num} </>, key: dta.PK})})
              setSalleList(SalleN)

              let MatiereN = []
              response.data.Matiere.map( (dta) => {MatiereN.push({value : dta.Matiere_ID, text : <>{dta.Matiere_Name}</>, key: dta.PK})})
              setMatiereList(MatiereN)
              setFullMatiereList(response.data.Matiere)

              let ProfN = []
              response.data.Prof.map( (dta) => {ProfN.push({value : dta.T_ID, text : <>{dta.T_Name} : {dta.Poste} </>, key: dta.PK})})
              setProfList(ProfN)
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les classes n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
          });
          
    }, [])


    /* ########################## Functions ############################*/
    const ClassIsSelectedFunc = (e, { value }) =>{
        setExamData({...examData, Classes_ID: value })
        axios.post(`${GConf.ApiLink}/examain/select/classe`, {
            PID : GConf.PID,
            classeID : value
        })
        .then(function (response) {
               let classesListeContainer = []
               response.data.map( (getData) => classesListeContainer.push( { title:  getData.Matiere_Name ,  date: getData.EX_Date,  className:'border-0 rounded-0 m-0 p-0' }))
               setDefaultEmploi(classesListeContainer) 
               
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les article de camion  </div></>, GConf.TostInternetGonf)   
            }
          });

    }    
    const SaveExamFunc = () =>{
        if (!examData.Classes_ID) {toast.error("Client est Invalide !", GConf.TostErrorGonf)}
        else if (!examData.Matiere_ID) {toast.error("de Invalide  !", GConf.TostErrorGonf)}
        else if (!examData.Salle_ID) {toast.error("Vers Invalide !", GConf.TostErrorGonf)}
        else if (!examData.EX_Genre ) {toast.error("Matiere Invalide !", GConf.TostErrorGonf)}
        else if (!examData.EX_Date) { toast.error("Salle Invalide !", GConf.TostErrorGonf) }
        else if (!examData.EX_Time_Depart) { toast.error("Proff Invalide !", GConf.TostErrorGonf) }
        else if (!examData.EX_Time_Finish) { toast.error("Proff Invalide !", GConf.TostErrorGonf) }
        else {
            setLS(true)
            setSaveBtnState(true)
            axios.post(`${GConf.ApiLink}/examain/ajouter`, {
                PID: GConf.PID,
                examainData: examData //examainToAddListe,
            })
            .then(function (response) {
                if(response.status = 200) { 
                    toast.success("Examain Enregistreé !", GConf.TostSuucessGonf)
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
 
    /* ############################### card ################################*/
 
 
 
 
    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.CamionAddFond} />
            <br />
            <div className='row'>
                <div className='col-12 col-lg-5'>
                    <div className="mb-4 sticky-top" style={{top:'70px', zIndex :2}}>
                        <div className='card card-body shadow-sm mb-2 border-div'>
                            <EnterExamDataCard ClassIsSelectedFunc={ClassIsSelectedFunc} classListe={classListe}   examData={examData} setExamData={setExamData} saveBtnState={saveBtnState} matiereList={matiereList} profListe={profListe} salleList={salleList} SaveExamFunc={SaveExamFunc} />
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-7'>
                        <FullCalendar 
                            plugins={[ dayGridPlugin ]}
                            //initialView="dayGridMonth"
                            locale='fr' 
                            events={defaultEmploi}
                            height='490px'
                            navLinks ={true}
                        />
                </div>
            </div>
             
        </> );
    }

export default AjouterFond;