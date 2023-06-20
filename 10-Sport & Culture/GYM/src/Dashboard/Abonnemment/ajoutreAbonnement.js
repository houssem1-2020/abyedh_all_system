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
import { Bounce } from 'react-reveal';

 

function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [abonnemmentData, setAbonnemmentData] = useState({AB_Depart_Date: Today.toISOString().split('T')[0] , AB_Termine_Date : Today.toISOString().split('T')[0] , AB_Depart_Time : new Date().toLocaleTimeString([],{ hourCycle: 'h23'}) , AB_Termine_Time : new Date().toLocaleTimeString([],{ hourCycle: 'h23'})})
    const [forfaitListe ,setForfaliListe] = useState([])
    const [membreListe ,setMmebreListe] = useState([])
    const [loaderState, setLS] = useState(false)
    const [btnState, setSaveBtnState] = useState(false)
 
 

    /* ############################### UseEffect ########################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/forfait`, {
            PID : GConf.PID,
         })
         .then(function (response) {
            let forfaitToListe = [] 
            response.data.map((data,index) => forfaitToListe.push({
                key: index ,
                text: data.F_Name,
                value: data.F_ID
            }))
            setForfaliListe(forfaitToListe)
         }).catch((error) => {
            setForfaliListe([])
         });

         axios.post(`${GConf.ApiLink}/membres`, {
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
        if (!abonnemmentData.Forfait_ID ) {toast.error("Forfait_ID  est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.Membre_ID ) {toast.error("Membre_ID est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.AB_Depart_Date ) {toast.error("Jour de Depart est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.AB_Termine_Date ) {toast.error("Jour de Terminaison est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData. AB_Depart_Time ) {toast.error("Temps de Depart  est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData. AB_Termine_Time ) {toast.error("Temps de Terminaison  est Invalide !", GConf.TostErrorGonf)}
        else {
            setLS(true)
            axios.post(`${GConf.ApiLink}/abonnement/ajouter`, {
                PID : GConf.PID,
                abonnemmentData: abonnemmentData,
            })
            .then(function (response) {
                if(response.status = 200) {
                    setSaveBtnState(true)
                    toast.success("Abonnemment Enregistreé !", GConf.TostSuucessGonf)
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

   /*#########################[Card]##################################*/
 
 
    
    return (<>
        <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
        <br />
        <Bounce left>
            <div className='row'>
                <div className='col-12 col-lg-8'>
                    <h5 className='mb-0 text-secondary '> Mmebre  </h5>
                    <datalist id="clientList">
                        {membreListe.map((test) =>
                        <option key={test.ME_ID} value={test.ME_ID}>{test.ME_Name} : {test.Phone}</option>
                        )}
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={abonnemmentData.Membre_ID}   onBlur={ (e) => setAbonnemmentData({...abonnemmentData, Membre_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                
                    
                    <h5 className='mb-0 mt-2 text-secondary '>Forfait  </h5>
                    <Dropdown
                        search
                        fluid
                        selection
                        wrapSelection={false}
                        options={forfaitListe}
                        placeholder={'Forfait'}
                        className='mb-1 shadow-sm'
                        onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Forfait_ID: value })}
                        value={abonnemmentData.Forfait_ID}
                    /> 
                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Depart  </h5>
                            <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={abonnemmentData.AB_Depart_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Depart_Date: e.target.value })}/> 
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Terminer   </h5>
                            <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={abonnemmentData.AB_Termine_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Termine_Date: e.target.value })}/> 
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Temps d'entrainemment  </h5>
                            <Input icon='map marker' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='De'  fluid className='mb-1 shadow-sm'  value={abonnemmentData.AB_Depart_Time}  onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Depart_Time : e.target.value })}/>
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Temps d'entrainemment  </h5>
                            <Input icon='map marker alternate'  type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='Vers'  fluid className='mb-1 shadow-sm' value={abonnemmentData.AB_Termine_Time}  onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Termine_Time: e.target.value })}/>
                        </div>
                    </div>
                    <div className='text-end mt-4'>
                        <Button  className='rounded-pill text-secondary bg-system-btn'   disabled={btnState}    onClick={(e) => SaveAbonnementFunc()}><Icon name='edit outline' /> Enregistrer Client <Loader active={loaderState} /> </Button>
                    </div>
                </div>
                <div className='col-12 col-lg-4 align-self-center'>
                        <div className='text-center d-none d-lg-block  align-self-center'>
                                <img src='https://assets.ansl.tn/Images/usful/client-add.svg' width='80%'  height='200px' /> 
                        </div>
                </div>
            </div>
        </Bounce>
    </> );
    }

export default AjouterFacture;