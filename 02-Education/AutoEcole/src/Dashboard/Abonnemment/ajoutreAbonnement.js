import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Icon, Input , Loader, Select, Tab} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
 
import { Bounce } from 'react-reveal';
import { NavLink } from 'react-router-dom';

 

function AjouterFacture() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [abonnemmentData, setAbonnemmentData] = useState({AB_Depart_Date: Today.toISOString().split('T')[0] , AB_Genre : Today.toISOString().split('T')[0] , AB_Depart_Time : new Date().toLocaleTimeString([],{ hourCycle: 'h23'}) , AB_Termine_Time : new Date().toLocaleTimeString([],{ hourCycle: 'h23'})})
    const [forfaitListe ,setForfaliListe] = useState([])
    const [membreListe ,setMmebreListe] = useState([])
    const [loaderState, setLS] = useState(false)
    const [btnState, setSaveBtnState] = useState(false)
    const SaisonChoise = [
        {id:1, value :'Code', text:'Code'},
        {id:2, value :'Conduit', text:'Conduit'},
        {id:3, value :'Code et Conduit', text:'Code et Conduit'},
         
    ]
    const serviceOptions = [
        {key:1, value:'A1', text:'صنف أ1'},
        {key:2, value:'A', text:' صنف أ'},
        {key:3, value:'BH', text:' صنف ب + هـ'},
        {key:4, value:'G', text:' صنف ب'},
        {key:5, value:'GH', text:' صنف ج + هـ'},
        {key:6, value:'D', text:'صنف د'},
        {key:7, value:'DH', text:' صنف د + هـ'},
        {key:8, value:'D1', text:' صنف د1'},
        {key:9, value:'K', text:' صنف ح '},
    ]

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

         axios.post(`${GConf.ApiLink}/condidat`, {
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
        else if (!abonnemmentData.Condidat_ID ) {toast.error("Condidat_ID est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.AB_Depart_Date ) {toast.error("Jour de Depart est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData.AB_Genre ) {toast.error("Jour de Terminaison est Invalide !", GConf.TostErrorGonf)}
        else if (!abonnemmentData. AB_Permis ) {toast.error("Temps de Depart  est Invalide !", GConf.TostErrorGonf)}
        // else if (!abonnemmentData. AB_Termine_Time ) {toast.error("Temps de Terminaison  est Invalide !", GConf.TostErrorGonf)}
        else {
            setLS(true)
            axios.post(`${GConf.ApiLink}/abonnement/ajouter`, {
                PID : GConf.PID,
                abonnemmentData: abonnemmentData,
            })
            .then(function (response) {
                console.log(response.data)  
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
        <BreadCrumb links={GConf.BreadCrumb.abonnemmentAjouter} />
        <br />
        <Bounce left>
            <div className='row'>
                <div className='col-12 col-lg-8'>
                    <h5 className='mb-0 text-secondary '> <span className='bi bi-person-x-fill'></span>  Mmebre  </h5>
                    <datalist id="clientList">
                        {membreListe.map((test) =>
                        <option key={test.CD_ID} value={test.CD_ID}>{test.CD_Name} : {test.CD_Phone}</option>
                        )}
                    </datalist>
                    {membreListe.length == 0 ? <small> Pas des Condidat Enregistreé , <NavLink to='/S/cd/ajouter'>Cliquer Ici</NavLink> Pour ajouter </small> : ''} 
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={abonnemmentData.Condidat_ID}   onBlur={ (e) => setAbonnemmentData({...abonnemmentData, Condidat_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                    <h5 className='mb-0 mt-4 text-secondary '> <span className='bi bi-person-x-fill'></span>  Forfait  </h5>
                    {forfaitListe.length == 0 ? <small> Pas des Forfait Enregistreé , <NavLink to='/S/of'>Cliquer Ici</NavLink> Pour ajouter </small> : ''} 
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
                    <h5 className='mb-0 mt-4 text-secondary'> <span className='bi bi-person-x-fill'></span> Genre de Permis  </h5>
                    <Select fluid placeholder='Permis' options={serviceOptions} onChange={ (e,data) => setAbonnemmentData({...abonnemmentData, AB_Permis: data.value})} />
                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-4 text-secondary '> <span className='bi bi-person-x-fill'></span>  Genre   </h5>
                            <Select placeholder='Genre'  options={SaisonChoise}  className='w-100 shadow-sm rounded mb-3' value={abonnemmentData.AB_Genre} onChange={(e, data) => setAbonnemmentData({...abonnemmentData, AB_Genre: data.value })} />
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-4 text-secondary '> <span className='bi bi-person-x-fill'></span>  Depart Le </h5>
                            <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={abonnemmentData.AB_Depart_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Depart_Date: e.target.value })}/> 
                        </div>
                    </div>

                     
                    <div className='text-end mt-4'>
                        <Button  className='rounded-pill text-secondary bg-system-btn'   disabled={btnState}    onClick={(e) => SaveAbonnementFunc()}><Icon name='edit outline' /> Enregistrer Abonnemment <Loader active={loaderState} /> </Button>
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