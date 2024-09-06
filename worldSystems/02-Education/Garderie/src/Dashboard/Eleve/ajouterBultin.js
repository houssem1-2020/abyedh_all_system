import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Tab} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';


const SelectCamion = ({ClassSelectedFunc, classListe, elevesListe, OnKeyPressFunc,  bultainData, setBultainData, EleveSelectedFunc}) =>{
        
    return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Classes  </h5>
                    <Dropdown 
                        search
                        selection
                        wrapSelection={false}
                        options={classListe}
                        placeholder='Selectionnez Client'
                        className='mb-1'
                        onChange={(e, { value }) =>  setBultainData({...bultainData, Classes_ID: value })}
                        value={bultainData.Classes_ID}
                    />   

                    <div className='row mt-1'>
                        <div className='col-6'>
                            <h5 className='mb-0'>De</h5> 
                            <Input icon='barcode' type='date'  defaultValue={bultainData.de}  onChange={ (e) =>  setBultainData({...bultainData, de: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0'>Vers</h5> 
                            <Input icon='barcode' type='date' defaultValue={bultainData.vers}  onChange={ (e) =>  setBultainData({...bultainData, vers: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
                        </div>
                    </div>
                    
                    {
                        elevesListe.length == 0 ? <></> 
                        :
                        <>
                        
                        <h5 className='mb-1 mt-3'>  Eleves : </h5>
                        <datalist id="elevesListes">
                                {elevesListe.map((test,index) =>
                                <option key={index} value={test.EL_ID}>{test.EL_Name} : {test.EL_Pere_Nom}</option>
                                )}
                        </datalist>
                        <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="elevesListes" placeholder={bultainData.EL_ID}   onBlur={ (e) => EleveSelectedFunc(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1' />
                        
                        </>
                    }
                  

                    <br />
                    <Button  className='rounded-pill bg-system-btn' onClick={() => ClassSelectedFunc()}>  <Icon name='search' /> Chercher </Button>
                </div>
    </>)
}
 

function AjouterFond() {
   /* ############################### Const ################################*/
    let Today = new Date()
   
    let [elevesListe, setElevesListe] = useState([])
    let [examsListe, setExamsListe] = useState([])

    let [bultainData, setBultainData] = useState({Classes_ID : '', Eleve_ID : '', BU_Content: [] ,de: new Date().toISOString().split('T')[0], vers: new Date().toISOString().split('T')[0],}) ; 
    
    let [classListe, setClassListe] = useState([]); 
    
    let [saveBtnState, setSaveBtnState] = useState(false) ; 
    let [gettedBonID, setBonID] = useState('');
 
    const [loaderState, setLS] = useState(false)
 
    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Entrer ' }, 
            render: () =><SelectCamion ClassSelectedFunc={ClassSelectedFunc} classListe={classListe} elevesListe={elevesListe} OnKeyPressFunc={OnKeyPressFunc}    bultainData={bultainData} setBultainData={setBultainData} EleveSelectedFunc={EleveSelectedFunc} />,
        },
        {
            menuItem: { key: 'save', icon: 'save outline', content:  'Enregistrer' }, 
            render: () =><FinishSaveCard />,
        },
 
        
    ]
    

   /* ############################### UseEffect ########################*/
    useEffect(() => {
          //classListe
          axios.post(`${GConf.ApiLink}/classes`,{  PID : GConf.PID,})
          .then(function (response) {
             
              let ClientLN = []
              response.data.map( (dta,index) => {ClientLN.push({value : dta.CL_ID, text : <>{dta.CL_Name} : {dta.CL_Niveaux} - {dta.CL_Seasson}</>, key: index})})
              setClassListe(ClientLN)

              
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les camion n'ont pas été chargeé </div></>, GConf.TostInternetGonf)   
            }
          });
          
    }, [])


    /* ########################## Functions ############################*/
    const ClassSelectedFunc = () =>{
        axios.post(`${GConf.ApiLink}/examain/bultin`, {
            PID : GConf.PID,
            classeID : bultainData.Classes_ID,
            de : bultainData.de,
            vers : bultainData.vers
        })
        .then(function (response) {
            console.log(response.data)
            setElevesListe(response.data.Eleves)
            setExamsListe(response.data.Exams)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les article de camion  </div></>, GConf.TostInternetGonf)   
            }
          });

    }
    const EleveSelectedFunc = (value) =>{
         
        setBultainData({...bultainData, Eleve_ID: value , BU_Content: examsListe})
    }

    const CheckPresence = (eleveId, examainId) => {

        const searchExam = examsListe.find((exam) => exam.EX_ID == examainId);

        const searchEleve = JSON.parse(searchExam.EX_Presence).find((eleve) => eleve.EL_ID == eleveId);
        if (searchEleve) {
            return(searchEleve.presenceState)
        }
        else {
            return(<span className='bi bi-question-circle-fill'></span>)
        }
        
    }
    const GeteNote = (eleveId, examainId) => {
        const searchExam = examsListe.find((exam) => exam.EX_ID == examainId);

        const searchEleve = JSON.parse(searchExam.EX_Notes).find((eleve) => eleve.EleveID == eleveId);
        if (searchEleve) {
            return(searchEleve.Note)
        }
        else {
            return('--')
        }
    }

    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }

    
    const SaveBultin = () =>{
            if (!bultainData) {toast.error("Client est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                setSaveBtnState(true)
                axios.post(`${GConf.ApiLink}/examain/bultin/ajouter`, {
                    PID: GConf.PID,
                    bultainData: bultainData,
                })
                .then(function (response) {
                    console.log(response.data)
                    if(response.status = 200) { 
                        toast.success("Bultin enregistreé !", GConf.TostSuucessGonf)
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

    /* ############################### card ################################*/
 
 
    const FinishSaveCard = () =>{
            return (<>
                <div className='card card-body shadow-sm mb-2'>
                    <h5>Buttons</h5>
                    <div className='row mb-2'>
                        <div className='col-12'>
                            <h5>Trimestre ? : </h5>
                        </div>
                        <div className='col-12'>
                            <h5>Resultat : </h5>
                        </div>
                        <div className='col-6'>
                            <Button disabled={saveBtnState} className='rounded-pill  bg-system-btn'  fluid onClick={SaveBultin}><Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                        <div className='col-6'>
                            <Button  className='rounded-pill btn-imprimer' disabled={!saveBtnState}  fluid onClick={ (e) => PrintFunction('PrintFond') }><Icon name='print' /> Imprimer</Button>
                        </div>
                        
                    </div>
                </div>
        </>)
    }

    const MatiereNoteCard = (props) => {
        return(<>
            <div className='card card-body mb-2 shadow-sm border-div'>
                <div className='row'>
                    <div className='col-2 align-self-center'>{props.data.EX_Genre}</div>
                    <div className='col-6 align-self-center'>{new Date(props.data.EX_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>
                    <div className='col-2 align-self-center'>{CheckPresence(bultainData.Eleve_ID, props.data.EX_ID)}</div>
                    <div className='col-2 align-self-center'>{GeteNote(bultainData.Eleve_ID, props.data.EX_ID)}</div>
                </div>
            </div>
        </>)
    }
    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.CamionAddFond} />
            <br />
            <div className='row'>
                <div className='col-12 col-lg-5'>
                    <div className="mb-4 sticky-top" style={{top:'70px', zIndex : 2}}>
                        <Tab menu={{  pointing: true  }} panes={panes} />
                    </div>
                </div>
                <div className='col-12 col-lg-7'>
                        {bultainData.BU_Content.map((data,index) => <MatiereNoteCard key={index} data={data}  />)}
                </div>
            </div>
            <FrameForPrint frameId='PrintFond' src={`/Pr/Camion/Fonds/fondTemp/${gettedBonID}`} />
        </> );
    }

export default AjouterFond;