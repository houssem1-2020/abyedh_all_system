import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Form, TextArea} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../AssetsM/Hooks/fetchClient';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import Ripples from 'react-ripples'
import { Bounce } from 'react-reveal';

 

function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [abonnemmentData, setAbonnemmentData] = useState({RT_Date: Today.toISOString().split('T')[0] ,   RT_Time_De : new Date().toLocaleTimeString([],{ hourCycle: 'h23'}),   RT_Time_Vers : new Date().toLocaleTimeString([],{ hourCycle: 'h23'})})
    const [forfaitListe , setForfaliListe] = useState([])
    const [profListe , setProfListe] = useState([])
    const [membreListe ,setMmebreListe] = useState([])
    const [loaderState, setLS] = useState(false)
    const [btnState, setSaveBtnState] = useState(false)
    const [classeNow, setClasseNow] = useState([])
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/team`, {
            PID : GConf.PID,
         })
         .then(function (response) {
            let forfaitToListe = [] 
            response.data.map((data,index) => forfaitToListe.push({
                key: index ,
                text: data.T_Name,
                value: data.T_ID
            }))
            setProfListe(forfaitToListe)
         }).catch((error) => {
            setProfListe([])
         });

         axios.post(`${GConf.ApiLink}/matiere`, {
            PID : GConf.PID,
         })
         .then(function (response) {
            let forfaitToListe = [] 
            response.data.map((data,index) => forfaitToListe.push({
                key: index ,
                text: data.Matiere_Name,
                value: data.Matiere_ID
            }))
            setForfaliListe(forfaitToListe)
         }).catch((error) => {
            setForfaliListe([])
         });

         axios.post(`${GConf.ApiLink}/eleves`, {
            PID : GConf.PID,
         })
         .then(function (response) {
            setMmebreListe(response.data)
         }).catch((error) => {
            setMmebreListe([])
         });

    }, [])

    /*#########################[Function]##################################*/
    const SaveAbonnementFunc = () =>{
        if (!abonnemmentData.Eleve_ID ) {toast.error("Eleve  est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.Matiere_ID ) {toast.error("Prof est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.RT_Date ) {toast.error("Data est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.RT_Time_De ) {toast.error("Temps  est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.RT_Time_Vers ) {toast.error("Cause  est Invalide !", GConf.TostErrorGonf)}
        else {
            setLS(true)
            axios.post(`${GConf.ApiLink}/eleve/retenue/ajouter`, {
                PID : GConf.PID,
                avertiD: abonnemmentData,
            })
            .then(function (response) {
                if(response.status = 200) {
                    setSaveBtnState(true)
                    toast.success("Avertissement Enregistreé !", GConf.TostSuucessGonf)
                    setLS(false)     
                }
                else{
                    toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> La Abonnemment sera enregistrer sur votre ordinateur    </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
              });

        }       
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }

    const SelectClasseFunction = (value) => {
        if (value) {
            setAbonnemmentData({...abonnemmentData, Eleve_ID: value })
            let filtedClient = membreListe.find((data) => data.EL_ID == value)
            setClasseNow(filtedClient)
        }
        //onBlur={ (e) => setAbonnemmentData({...abonnemmentData, Eleve_ID: e.target.value })}
    }
   /*#########################[Card]##################################*/
 
 
    
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.retenueAjouter} />
        <br />
        <Bounce left>
            <div className='row'>
                <div className='col-12 col-lg-8'>
                    <h5 className='mb-0 text-secondary '> <span className='bi bi-person'></span> Eleve  </h5>
                    <datalist id="clientList">
                        {membreListe.map((test) =>
                        <option key={test.EL_ID} value={test.EL_ID}>{test.EL_Name} : {test.EL_Pere_Nom} | {test.EL_Mere_Nom}</option>
                        )}
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={abonnemmentData.Eleve_ID}   onBlur={ (e) => SelectClasseFunction(e.target.value)}  size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                        <div className='card-body border-div  mt-4 mb-3 bg-gray'>
                            <div className='row'>
                                <div className='col-4 '> <span className='bi bi-person-fill'></span> Eleve :  {classeNow.EL_Name  ? classeNow.EL_Name  : ''}</div>
                                <div className='col-4 '> <span className='bi bi-person-fill'></span> Eleve :  {classeNow.EL_Pere_Nom  ? classeNow.EL_Pere_Nom  : ''}</div>
                                <div className='col-4 '> <span className='bi bi-box'></span> Classe : {classeNow.CL_Name  ? classeNow.CL_Name  : ''} </div>
                            </div>
                        </div>
                    
                    <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-people'></span> Matiére  </h5>
                    <Dropdown
                        search
                        fluid
                        selection
                        wrapSelection={false}
                        options={forfaitListe}
                        placeholder={'Forfait'}
                        className='mb-3 shadow-sm'
                        onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Matiere_ID: value })}
                        value={abonnemmentData.Matiere_ID}
                    /> 
                    <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-people'></span> Prof   </h5>
                    <Dropdown
                        search
                        fluid
                        selection
                        wrapSelection={false}
                        options={profListe}
                        placeholder={'Forfait'}
                        className='mb-3 shadow-sm'
                        onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Prof_ID: value })}
                        value={abonnemmentData.Prof_ID}
                    /> 
                    <div className='row mb-3'>
 
                        <div className='col-12'>
                            <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-calendar'></span> Date   </h5>
                            <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={abonnemmentData.RT_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, RT_Date: e.target.value })}/> 
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-alarm'></span> De  </h5>
                            <Input icon='map marker' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='De'  fluid className='mb-1 shadow-sm'  value={abonnemmentData.RT_Time_De}  onChange={(e) => setAbonnemmentData({...abonnemmentData, RT_Time_De : e.target.value })}/>
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-alarm'></span> Vers  </h5>
                            <Input icon='map marker alternate'  type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='Vers'  fluid className='mb-1 shadow-sm' value={abonnemmentData.RT_Time_Vers}  onChange={(e) => setAbonnemmentData({...abonnemmentData, RT_Time_Vers: e.target.value })}/>
                        </div>
                    </div>
                    <div className='row'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-chat-square-dots-fill'></span> a Faire  :</h5>
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='Cause' className='w-100 shadow-sm rounded mb-3' value={abonnemmentData.RT_Cause} onChange={(e) => setAbonnemmentData({...abonnemmentData, RT_Cause: e.target.value })}/>
                            </Form>
                    </div>

                    <div className='text-end mt-4'>
                        <Button  className='rounded-pill text-secondary bg-system-btn'   disabled={btnState}    onClick={(e) => SaveAbonnementFunc()}><Icon name='edit outline' /> Enregistrer Client <Loader active={loaderState} /> </Button>
                    </div>
                </div>
                <div className='col-12 col-lg-4 align-self-center'>
                        <div className='text-center d-none d-lg-block  align-self-center'>
                        <img src='https://cdn.abyedh.com/Images/system/garderie/retenue.svg' width='80%'  height='200px' />  
                        </div>
                </div>
            </div>
        </Bounce>
    </> );
    }

export default AjouterFacture;